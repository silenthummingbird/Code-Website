import { useEffect, useRef } from 'react'

/** Lime glow that trails the cursor — desktop only. */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -400, y: -400 })
  const pos = useRef({ x: -400, y: -400 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }
    let raf = 0
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden size-[520px] rounded-full lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(130,181,65,0.10) 0%, rgba(130,181,65,0.04) 35%, transparent 70%)',
          mixBlendMode: 'screen',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden size-1.5 rounded-full bg-lime lg:block"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
