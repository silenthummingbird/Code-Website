import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface Props {
  scene: string
  className?: string
  style?: React.CSSProperties
}

/** Spline scene that only mounts when near the viewport, with a black fallback. */
export default function LazySpline({ scene, className, style }: Props) {
  const holderRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = holderRef.current
    if (!el) return
    // Skip the ~4.5MB Spline runtime on touch devices and for users who
    // prefer reduced motion — they get the static fallback instead.
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarsePointer || reducedMotion) return
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={holderRef} className={className} style={style} aria-hidden>
      {visible && (
        <Suspense fallback={<div className="absolute inset-0 bg-ink" />}>
          <Spline scene={scene} className="size-full" />
        </Suspense>
      )}
    </div>
  )
}
