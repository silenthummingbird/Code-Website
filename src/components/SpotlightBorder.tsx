import { useEffect, useRef, type ReactNode, type ElementType } from 'react'
import { cn } from '@/lib/utils'

export function spotlightMaskStyle(size = 260, intensity = 0.4): React.CSSProperties {
  return {
    background: `radial-gradient(${size}px circle at var(--spot-x, -200px) var(--spot-y, -200px), rgba(130,181,65,${intensity}), rgba(130,181,65,0) 60%)`,
    padding: '1px',
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }
}

interface Props {
  children: ReactNode
  className?: string
  radius?: 'xl' | '2xl' | '3xl' | 'full'
  size?: number
  intensity?: number
  as?: ElementType
  onClick?: () => void
}

/** Cursor-tracked 1px lime gradient ring. */
export default function SpotlightBorder({
  children,
  className,
  radius = '2xl',
  size = 280,
  intensity = 0.35,
  as: Tag = 'div',
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const r = { xl: 'rounded-xl', '2xl': 'rounded-2xl', '3xl': 'rounded-3xl', full: 'rounded-full' }[radius]

  return (
    <Tag ref={ref} onClick={onClick} className={cn('relative', r, className)}>
      <span aria-hidden className={cn('pointer-events-none absolute inset-0', r)} style={spotlightMaskStyle(size, intensity)} />
      {children}
    </Tag>
  )
}
