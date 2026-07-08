import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'

const VIDEO_LEFT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4'
const VIDEO_RIGHT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4'

const GALLERY = [
  'hf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9',
  'hf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea',
  'hf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7',
  'hf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc',
  'hf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37',
  'hf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c',
  'hf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac',
  'hf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc',
  'hf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670',
  'hf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5',
].map(
  (id) =>
    `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${id}.png&w=1920&q=85`,
)

const SYMBOLS = ['8', '$', '^^', '%', '/']
const easeEntry = [0.25, 0.1, 0.25, 1] as const

/** Scatter layout: one card per row, a second every 3rd row. -1 = empty cell. */
function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = []
  let placed = 0
  let r = 0
  while (placed < count) {
    const row = new Array(cols).fill(-1)
    const a = (r * 2 + (r % 2)) % cols
    row[a] = placed++
    if (placed < count && r % 3 === 0) {
      let b = (a + 2) % cols
      if (b === a) b = (a + 1) % cols
      row[b] = placed++
    }
    rows.push(row)
    r++
  }
  return rows
}

/**
 * AI Studio — scroll-driven showcase for AI avatars, generated art & 3D.
 * Hero videos scrub with the cursor (desktop), a black gallery panel slides
 * up over them, cards scale in/out with scroll, and an outro CTA lands it.
 */
export default function AiStudio() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const leftVideoRef = useRef<HTMLVideoElement>(null)
  const rightVideoRef = useRef<HTMLVideoElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLAnchorElement>(null)
  const footRef = useRef<HTMLDivElement>(null)
  const symbolRef = useRef<HTMLSpanElement>(null)
  const heroUiRef = useRef<HTMLDivElement>(null)

  const [videosReady, setVideosReady] = useState(false)
  const [cols, setCols] = useState(4)

  const layout = useMemo(() => buildLayout(GALLERY.length, cols), [cols])

  // Responsive columns
  useEffect(() => {
    const onResize = () => setCols(window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Video interaction — scrub on desktop, alternate autoplay on touch
  useEffect(() => {
    const left = leftVideoRef.current
    const right = rightVideoRef.current
    if (!left || !right) return
    let ready = 0
    const onReady = () => { if (++ready >= 2) setVideosReady(true) }
    left.addEventListener('loadeddata', onReady)
    right.addEventListener('loadeddata', onReady)

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch || reduced) {
      left.style.display = 'block'
      right.style.display = 'none'
      if (!reduced) {
        left.play().catch(() => {})
        const onLeftEnd = () => { left.style.display = 'none'; right.style.display = 'block'; right.currentTime = 0; right.play().catch(() => {}) }
        const onRightEnd = () => { right.style.display = 'none'; left.style.display = 'block'; left.currentTime = 0; left.play().catch(() => {}) }
        left.addEventListener('ended', onLeftEnd)
        right.addEventListener('ended', onRightEnd)
        return () => {
          left.removeEventListener('loadeddata', onReady)
          right.removeEventListener('loadeddata', onReady)
          left.removeEventListener('ended', onLeftEnd)
          right.removeEventListener('ended', onRightEnd)
        }
      }
      return () => {
        left.removeEventListener('loadeddata', onReady)
        right.removeEventListener('loadeddata', onReady)
      }
    }

    // Desktop scrub
    let mouseX = window.innerWidth / 2
    let activeSide: 'left' | 'right' | null = null
    const onMove = (e: MouseEvent) => { mouseX = e.clientX }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf = 0
    const tick = () => {
      const w = window.innerWidth
      const center = w / 2
      const dead = Math.max(30, w * 0.05)
      if (Math.abs(mouseX - center) <= dead) {
        // dead zone — hold at frame 0, keep last active visible
        const v = activeSide === 'left' ? left : right
        if (!v.seeking && v.currentTime !== 0) v.currentTime = 0
      } else if (mouseX < center - dead) {
        if (activeSide !== 'right') {
          activeSide = 'right'
          right.style.display = 'block'
          left.style.display = 'none'
        }
        const range = center - dead
        const progress = Math.min(1, (center - dead - mouseX) / range)
        if (right.duration && !right.seeking) right.currentTime = progress * right.duration * 0.98
      } else {
        if (activeSide !== 'left') {
          activeSide = 'left'
          left.style.display = 'block'
          right.style.display = 'none'
        }
        const range = w - center - dead
        const progress = Math.min(1, (mouseX - center - dead) / range)
        if (left.duration && !left.seeking) left.currentTime = progress * left.duration * 0.98
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      left.removeEventListener('loadeddata', onReady)
      right.removeEventListener('loadeddata', onReady)
    }
  }, [])

  // Scroll choreography — panel slide, card scaling, outro
  useEffect(() => {
    const spacer = spacerRef.current
    const panel = panelRef.current
    const wrap = wrapRef.current
    if (!spacer || !panel || !wrap) return

    let lastSymbol = 0
    const cards = () => Array.from(wrap.querySelectorAll<HTMLElement>('.bp-card'))

    const setSpacer = () => {
      const vh = window.innerHeight
      const maxScroll = Math.max(0, wrap.scrollHeight - vh)
      spacer.style.height = `${vh + maxScroll + 2 * vh}px`
    }
    setSpacer()
    const ro = new ResizeObserver(setSpacer)
    ro.observe(wrap)

    let raf = 0
    const tick = () => {
      const vh = window.innerHeight
      const maxScroll = Math.max(0, wrap.scrollHeight - vh)
      const y = window.scrollY

      // Phase 1 & 2 — panel position
      if (y < vh) {
        panel.style.transform = `translateY(${vh - y}px)`
        wrap.style.transform = 'translateY(0px)'
      } else {
        panel.style.transform = 'translateY(0px)'
        wrap.style.transform = `translateY(${-(Math.min(y, vh + maxScroll) - vh)}px)`
      }

      // Hide hero videos once covered
      if (canvasRef.current) canvasRef.current.style.visibility = y > vh + 60 ? 'hidden' : 'visible'

      // Symbol randomizer (throttled)
      const now = performance.now()
      if (symbolRef.current && now - lastSymbol > 80 && y < vh) {
        lastSymbol = now
        symbolRef.current.textContent = SYMBOLS[Math.floor((y / 40) % SYMBOLS.length)]
      }

      // Card scaling
      for (const card of cards()) {
        const rect = card.getBoundingClientRect()
        if (rect.bottom <= 0 || rect.top >= vh) {
          card.style.transform = 'scale(0)'
          continue
        }
        const enter = Math.min(1, (vh - rect.top) / (vh * 0.6))
        const exit = Math.min(1, rect.bottom / (vh * 0.4))
        card.style.transform = `scale(${Math.max(0, Math.min(enter, exit))})`
      }

      // Outro
      const outroStart = vh + maxScroll
      const progress = Math.max(0, Math.min(1, (y - outroStart) / (vh - 100)))
      if (overlayRef.current) {
        overlayRef.current.style.opacity = `${progress}`
      }
      // hero UI (wordmark, caption, price) yields to the outro
      if (heroUiRef.current) heroUiRef.current.style.opacity = `${1 - progress}`
      if (infoRef.current) {
        infoRef.current.style.opacity = `${progress}`
        infoRef.current.style.transform = `translateY(${(1 - progress) * 40}px)`
      }
      if (viewRef.current) {
        viewRef.current.style.transform = `scale(${progress})`
        viewRef.current.style.pointerEvents = progress > 0.8 ? 'auto' : 'none'
      }
      if (footRef.current) footRef.current.style.opacity = `${progress}`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [layout])

  return (
    <div ref={spacerRef} className="relative select-none bg-ink" style={{ height: '500vh' }}>
      {/* Fixed video canvas */}
      <div
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-300"
        style={{ opacity: videosReady ? 1 : 0 }}
      >
        <video ref={leftVideoRef} src={VIDEO_LEFT} muted playsInline preload="auto" className="absolute inset-0 size-full object-cover" style={{ display: 'none' }} />
        <video ref={rightVideoRef} src={VIDEO_RIGHT} muted playsInline preload="auto" className="absolute inset-0 size-full object-cover" style={{ display: 'block' }} />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Fixed overlay UI — exclusion blend so it reads on any frame */}
      <div ref={heroUiRef}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeEntry }}
        className="pointer-events-none fixed left-4 top-20 z-20 mix-blend-exclusion lg:left-8 lg:top-24"
      >
        <p className="text-[clamp(2.6rem,7vw,5.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-white">
          AI Studio<span className="font-mono">®</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeEntry, delay: 0.3 }}
        className="pointer-events-none fixed left-4 z-20 mix-blend-exclusion lg:left-8"
        style={{ top: 'clamp(200px, 30vh, 300px)' }}
      >
        <p className="max-w-[min(90vw,560px)] text-xs font-medium leading-[140%] tracking-[-0.04em] text-white">
          AI avatars, generated art and 3D worlds for brands that move. Move your cursor — the machine answers.
          Scroll — the archive opens.
        </p>
      </motion.div>

      {/* Product info — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easeEntry, delay: 0.45 }}
        className="pointer-events-none fixed inset-x-0 bottom-12 z-20 flex flex-col items-center mix-blend-exclusion lg:inset-x-auto lg:right-8 lg:w-[330px]"
      >
        <div className="mb-4 flex w-[252px] flex-col items-start lg:mb-8 lg:w-full">
          <span className="relative mb-2 flex size-[26px] items-center justify-center lg:size-[30px]">
            <svg viewBox="0 0 40 40" className="absolute inset-0 size-full">
              <circle cx="20" cy="20" r="18.75" stroke="white" strokeWidth="2.5" fill="none" />
            </svg>
            <span ref={symbolRef} className="text-[11px] font-medium uppercase tracking-[-0.04em] text-white lg:text-[13px]">
              8
            </span>
          </span>
          <p className="text-[20px] font-medium uppercase leading-[100%] tracking-[-0.04em] text-white lg:text-[28px]">
            Generated Archive
            <br />
            &ldquo;Code@ AI&rdquo;
          </p>
        </div>
        <p className="text-[60px] font-medium leading-[100%] tracking-[-0.04em] text-white lg:text-[80px]">AI·3D</p>
      </motion.div>
      </div>

      {/* Black gallery panel */}
      <div ref={panelRef} className="fixed inset-0 z-10 bg-black" style={{ transform: 'translateY(100vh)', willChange: 'transform' }}>
        <div ref={wrapRef} className="w-full" style={{ paddingTop: 'min(400px, 40vh)', willChange: 'transform' }}>
          <div className="mx-auto grid max-w-[1600px] gap-4 px-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {layout.flatMap((row, r) =>
              row.map((imgIdx, c) =>
                imgIdx === -1 ? (
                  <div key={`${r}-${c}`} style={{ aspectRatio: '2 / 3' }} aria-hidden />
                ) : (
                  <div
                    key={`${r}-${c}`}
                    className="bp-card overflow-hidden rounded-xl"
                    style={{
                      aspectRatio: '2 / 3',
                      transform: 'scale(0)',
                      transformOrigin: c < cols / 2 ? 'right bottom' : 'left bottom',
                      willChange: 'transform',
                    }}
                  >
                    <img src={GALLERY[imgIdx]} alt={`AI generated artwork ${imgIdx + 1}`} loading="lazy" className="size-full object-cover" />
                  </div>
                ),
              ),
            )}
          </div>
          <div className="h-[20vh]" />
        </div>
      </div>

      {/* Outro overlay */}
      <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-[12] bg-paper" style={{ opacity: 0 }} />
      <div
        ref={infoRef}
        className="pointer-events-none fixed inset-x-0 top-[30vh] z-[13] flex flex-col items-center text-center"
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">[ AI Studio ]</p>
        <p className="mt-4 max-w-xl px-6 text-[clamp(1.6rem,4vw,2.6rem)] font-light leading-[1.1] tracking-tight text-ink">
          Avatars, art and 3D — <em className="font-serif font-[350]">generated for your brand</em>.
        </p>
      </div>
      <a
        ref={viewRef}
        href="mailto:hello@codeat.io?subject=AI%20Studio"
        className="fixed bottom-16 right-4 z-[14] flex h-[100px] w-[calc(100%-2rem)] items-center justify-center rounded-full bg-ink lg:bottom-8 lg:right-8 lg:h-[174px] lg:w-[330px]"
        style={{ transform: 'scale(0)', transformOrigin: 'right bottom', pointerEvents: 'none' }}
      >
        <span className="text-[64px] font-medium tracking-[-0.04em] text-lime lg:text-[96px]">start</span>
      </a>
      <div
        ref={footRef}
        className="pointer-events-none fixed bottom-8 left-4 z-[13] flex gap-10 font-mono text-[11px] uppercase tracking-[-0.02em] text-black/60"
        style={{ opacity: 0 }}
      >
        <span>CODE@ ® 2026</span>
        <span>AI STUDIO</span>
      </div>
    </div>
  )
}
