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
