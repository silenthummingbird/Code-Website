import { memo, useEffect, useRef, useState } from 'react'
import { PROJECTS, type Project } from '@/lib/data'

const N = PROJECTS.length
const BASE_ANGLE = 360 / N

interface Props {
  onOpen: (p: Project) => void
}

interface CardProps {
  project: Project
  idx: number
  cardW: number
  radius: number
  isFront: boolean
  onClick: (idx: number) => void
  register: (idx: number, el: HTMLDivElement | null) => void
}

/** Static-transform card; all per-frame motion happens on the ring element. */
const Card = memo(function Card({ project, idx, cardW, radius, isFront, onClick, register }: CardProps) {
  return (
    <div
      ref={(el) => register(idx, el)}
      className="group [grid-area:1/1] cursor-pointer overflow-hidden rounded-2xl border border-white/10"
      style={{
        width: cardW,
        height: cardW * 0.72,
        backfaceVisibility: 'hidden',
        transform: `rotateY(${idx * BASE_ANGLE}deg) translateZ(${radius}px)`,
        transition: 'opacity 0.5s ease',
        willChange: 'opacity',
      }}
      onClick={(e) => { e.stopPropagation(); onClick(idx) }}
    >
      <img
        src={project.preview}
        alt={`${project.title} — ${project.client}`}
        draggable={false}
        loading={idx < 4 ? 'eager' : 'lazy'}
        decoding="async"
        className="size-full object-cover"
      />
      <div
        className={`absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent p-3 pt-8 transition-opacity duration-300 ${isFront ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <div>
          <p className="text-[13px] font-medium leading-tight text-white">{project.title}</p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">{project.client}</p>
        </div>
        {isFront && (
          <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-ink">
            Open ↗
          </span>
        )}
      </div>
    </div>
  )
})

/**
 * Physics-driven 3D rotating carousel, fully ref-driven for 60fps:
 * the rAF loop writes transforms straight to the DOM; React only re-renders
 * when the front card changes or the viewport resizes.
 */
export default function Carousel3D({ onOpen }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const cardEls = useRef<(HTMLDivElement | null)[]>([])
  const [cardW, setCardW] = useState(300)
  const [frontIdx, setFrontIdx] = useState(0)
  const frontIdxRef = useRef(0)

  const target = useRef(0)
  const current = useRef(0)
  const prev = useRef(0)
  const velocity = useRef(0)
  const direction = useRef(-1)
  const clickTarget = useRef<number | null>(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startRot = useRef(0)
  const lastX = useRef(0)
  const lastT = useRef(0)
  const moved = useRef(0)
  const hovered = useRef(false)
  const deformV = useRef(0)
  const deformF = useRef(0)

  useEffect(() => {
    const onResize = () => setCardW(Math.min(320, Math.max(200, window.innerWidth * 0.24)))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Physics loop — writes styles imperatively, no state updates per frame
  useEffect(() => {
    let raf = 0
    const tick = () => {
      if (dragging.current) {
        current.current = target.current
        velocity.current = current.current - prev.current
      } else if (clickTarget.current !== null) {
        const diff = clickTarget.current - current.current
        if (Math.abs(diff) < 0.05) {
          current.current = clickTarget.current
          clickTarget.current = null
          velocity.current = 0
        } else {
          const s = diff * 0.08
          current.current += s
          velocity.current = s
        }
        target.current = current.current
      } else {
        // pause auto-rotation while the user is hovering, so the front card is clickable
        const auto = hovered.current ? 0 : 0.22 * direction.current
        velocity.current = auto + (velocity.current - auto) * 0.982
        current.current += velocity.current
        target.current = current.current
      }
      const instV = current.current - prev.current
      prev.current = current.current
      // Elastic deformation spring
      const force = -0.16 * (deformV.current - instV) - 0.52 * deformF.current
      deformF.current += force
      deformV.current += deformF.current
      deformV.current = Math.max(-25, Math.min(25, deformV.current))
      deformF.current = Math.max(-8, Math.min(8, deformF.current))

      const rot = current.current
      const defV = deformV.current
      const rz = Math.max(-10, Math.min(10, defV * 0.7))
      const skew = Math.max(-6, Math.min(6, defV * 0.28))
      const scale = 1 - Math.min(0.06, Math.abs(defV) * 0.002)
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${rot}deg) rotateZ(${rz}deg) skewX(${skew}deg) scale(${scale})`
      }

      // Per-card visibility + front detection (DOM writes only)
      let front = frontIdxRef.current
      for (let idx = 0; idx < N; idx++) {
        const el = cardEls.current[idx]
        if (!el) continue
        let diff = (idx * BASE_ANGLE + rot) % 360
        if (diff > 180) diff -= 360
        if (diff < -180) diff += 360
        const absDiff = Math.abs(diff)
        const out = absDiff > 92
        el.style.opacity = out ? '0' : '1'
        el.style.pointerEvents = out ? 'none' : 'auto'
        if (absDiff < BASE_ANGLE / 2) front = idx
      }
      if (front !== frontIdxRef.current) {
        frontIdxRef.current = front
        setFrontIdx(front)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Horizontal wheel spins the ring; vertical scroll passes through
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      clickTarget.current = null
      direction.current = e.deltaX > 0 ? -1 : 1
      const impulse = Math.max(-8, Math.min(8, -e.deltaX * 0.05))
      velocity.current = velocity.current * 0.45 + impulse * 0.55
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const snapBy = (dir: 1 | -1) => {
    const card = Math.round(-current.current / BASE_ANGLE)
    clickTarget.current = -(card + dir) * BASE_ANGLE
    target.current = clickTarget.current
    direction.current = -dir
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    clickTarget.current = null
    startX.current = e.clientX
    startRot.current = current.current
    lastX.current = e.clientX
    lastT.current = Date.now()
    moved.current = 0
    velocity.current = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startX.current
    moved.current = Math.max(moved.current, Math.abs(dx))
    target.current = startRot.current + dx * 0.18
    direction.current = dx > 0 ? 1 : -1
    const now = Date.now()
    const dt = now - lastT.current
    if (dt > 0) velocity.current = ((e.clientX - lastX.current) * 0.18) / (dt / 16.666)
    lastX.current = e.clientX
    lastT.current = now
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return
    dragging.current = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    velocity.current = Math.max(-12, Math.min(12, velocity.current))
  }

  const handleCardClick = (idx: number) => {
    if (moved.current > 5) return // it was a drag
    let diff = (idx * BASE_ANGLE + current.current) % 360
    if (diff > 180) diff -= 360
    if (diff < -180) diff += 360
    if (Math.abs(diff) < BASE_ANGLE / 2) {
      onOpen(PROJECTS[idx]) // already front — open full preview
      return
    }
    const targetAngle = idx * BASE_ANGLE
    const lap = Math.round(current.current / 360) * 360
    const candidates = [lap - targetAngle, lap - 360 - targetAngle, lap + 360 - targetAngle]
    let best = candidates[0]
    for (const c of candidates) if (Math.abs(c - current.current) < Math.abs(best - current.current)) best = c
    direction.current = best > current.current ? 1 : -1
    clickTarget.current = best
    target.current = best
  }

  const registerCard = (idx: number, el: HTMLDivElement | null) => {
    cardEls.current[idx] = el
  }

  const radius = (cardW / 2 + 14) / Math.tan(Math.PI / N)

  return (
    <div className="relative w-full select-none" aria-label="Portfolio carousel — drag to rotate, click a card to preview">
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[18%] bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[18%] bg-gradient-to-l from-ink to-transparent" />

      <div
        ref={stageRef}
        className="grid overflow-hidden"
        style={{ perspective: '1400px', height: cardW * 1.05 + 60 }}
        role="presentation"
        onPointerEnter={() => { hovered.current = true }}
        onPointerLeave={() => { hovered.current = false }}
      >
        <div
          ref={ringRef}
          className="grid cursor-grab place-self-center active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {PROJECTS.map((p, idx) => (
            <Card
              key={p.title}
              project={p}
              idx={idx}
              cardW={cardW}
              radius={radius}
              isFront={frontIdx === idx}
              onClick={handleCardClick}
              register={registerCard}
            />
          ))}
        </div>
      </div>

      {/* arrows */}
      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          onClick={() => snapBy(-1)}
          aria-label="Previous project"
          className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-lime hover:text-lime active:scale-90"
        >
          ←
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">drag · scroll · click</span>
        <button
          onClick={() => snapBy(1)}
          aria-label="Next project"
          className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-lime hover:text-lime active:scale-90"
        >
          →
        </button>
      </div>
    </div>
  )
}
