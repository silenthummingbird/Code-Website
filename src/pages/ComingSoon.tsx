import { Link } from 'react-router-dom'
import LazySpline from '@/components/LazySpline'

const SPLINE_SCENE = 'https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode'

interface Props {
  title?: string
  accent?: string
  description?: string
  trustLine?: string
}

/**
 * Reusable "coming soon" hero for announced-but-unlaunched capabilities.
 * Drop a new route on it, override the copy, ship the teaser.
 */
export default function ComingSoon({
  title = 'CODE',
  accent = '@ NEXT',
  description = 'Something new is being engineered behind this page. Security systems, AI surveillance, smart access — all of it done right, not just fast.',
  trustLine = 'Trusted engineering partner. Baghdad · Dubai. 80+ products shipped.',
}: Props) {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-surface">
      <LazySpline scene={SPLINE_SCENE} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

      <div className="pointer-events-none relative z-10 w-full max-w-[90%] px-6 pb-10 pt-32 sm:max-w-md md:px-10 lg:max-w-2xl">
        <p className="section-label animate-fade-up mb-4 opacity-0" style={{ animationDelay: '0.1s' }}>
          [ Coming Soon ]
        </p>
        <h1
          className="animate-fade-up mb-2 text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] text-paper opacity-0 md:mb-4"
          style={{ animationDelay: '0.2s' }}
        >
          {title}
          <span className="text-lime">{accent}</span>
        </h1>
        <p
          className="animate-fade-up mb-3 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-white/80 opacity-0 md:mb-6"
          style={{ animationDelay: '0.4s' }}
        >
          We implement it correctly.
        </p>
        <p
          className="animate-fade-up mb-4 max-w-xl text-[clamp(0.875rem,1.5vw,1.25rem)] font-light text-muted opacity-0 md:mb-8"
          style={{ animationDelay: '0.55s' }}
        >
          {description}
        </p>
        <div className="animate-fade-up flex flex-wrap gap-3 font-bold opacity-0" style={{ animationDelay: '0.7s' }}>
          <a
            href="mailto:hello@codeat.io"
            className="pointer-events-auto cursor-pointer rounded-brand-sm bg-lime px-6 py-3 text-sm text-ink transition-all hover:brightness-110 active:scale-[0.97] md:px-8 md:py-4"
          >
            Book a Call
          </a>
          <Link
            to="/"
            className="pointer-events-auto cursor-pointer rounded-brand-sm bg-paper px-6 py-3 text-sm text-ink transition-all hover:brightness-90 active:scale-[0.97] md:px-8 md:py-4"
          >
            Our Work
          </Link>
        </div>
        <p className="animate-fade-up mt-4 text-xs font-light text-muted/70 opacity-0 md:mt-6" style={{ animationDelay: '0.85s' }}>
          {trustLine}
        </p>
      </div>
    </section>
  )
}
