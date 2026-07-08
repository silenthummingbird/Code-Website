import { useEffect, useRef } from 'react'
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '@/lib/data'
import FadeUp from '@/components/FadeUp'

function Row({ images, forward, rowRef }: { images: string[]; forward: boolean; rowRef: React.RefObject<HTMLDivElement | null> }) {
  const tripled = [...images, ...images, ...images]
  return (
    <div className="w-full overflow-hidden">
      <div
        ref={rowRef}
        className="flex gap-3"
        style={{ transform: `translateX(${forward ? -200 : 200}px)`, willChange: 'transform' }}
      >
        {tripled.map((src, i) => (
          <div
            key={i}
            className="h-[160px] w-[250px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] sm:h-[220px] sm:w-[340px] lg:h-[270px] lg:w-[420px]"
          >
            <img src={src} alt="" loading="lazy" draggable={false} className="size-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Scroll-driven double marquee — rows drift in opposite directions as you scroll. */
export default function ScrollMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1 = useRef<HTMLDivElement>(null)
  const row2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const top = section.getBoundingClientRect().top + window.scrollY
      const scrolled = window.scrollY - top + window.innerHeight
      const offset = scrolled * 0.3
      if (row1.current) row1.current.style.transform = `translateX(${offset - 200}px)`
      if (row2.current) row2.current.style.transform = `translateX(${-(offset - 200)}px)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-ink pb-10 pt-24 sm:pt-32">
      <FadeUp className="mx-auto mb-14 max-w-[1600px] px-5 lg:px-10">
        <p className="section-label mb-5">[ Selected Work ]</p>
        <h2 className="max-w-3xl text-4xl font-light leading-[1.08] tracking-tight text-paper sm:text-5xl">
          Interfaces people <em className="font-serif font-[350] text-lime">remember</em>.
        </h2>
      </FadeUp>
      <div className="flex flex-col gap-3">
        <Row images={MARQUEE_ROW_1} forward rowRef={row1} />
        <Row images={MARQUEE_ROW_2} forward={false} rowRef={row2} />
      </div>
    </section>
  )
}
