import { useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  className?: string
  segmentClassName?: string
  splitBy?: 'words' | 'characters'
  stagger?: number
  delay?: number
  once?: boolean
}

/** Masked per-word/char reveal with blur — the "kinetic" headline treatment. */
export default function KineticText({
  text,
  className,
  segmentClassName,
  splitBy = 'words',
  stagger = 0.08,
  delay = 0,
  once = true,
}: Props) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLSpanElement>(null)
  // Observe the whole headline (segments are clipped by their masks, so
  // per-segment observers under-report visibility).
  const inView = useInView(rootRef, { once, amount: 0.2 })

  const segments = useMemo(() => {
    if (splitBy === 'characters') return Array.from(text).map((c) => ({ v: c, anim: !/\s/.test(c) }))
    return text.split(/(\s+)/).filter(Boolean).map((p) => ({ v: p, anim: !/^\s+$/.test(p) }))
  }, [text, splitBy])

  let i = 0
  return (
    <span ref={rootRef} className={cn('inline-flex flex-wrap whitespace-pre-wrap', className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      {segments.map((s, k) => {
        if (!s.anim) return <span key={k} aria-hidden>{s.v}</span>
        const idx = i++
        return (
          <span key={k} aria-hidden className="inline-block overflow-hidden pb-1 align-baseline">
            <motion.span
              className={cn('inline-block will-change-transform', segmentClassName)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: delay + idx * stagger }}
            >
              {s.v}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
