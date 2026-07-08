import { CLIENTS } from '@/lib/data'
import FadeUp from '@/components/FadeUp'

/** "Our Clients" — infinite wordmark marquee with a static label column. */
export default function ClientsSection() {
  const row = [...CLIENTS, ...CLIENTS]
  return (
    <section className="border-y border-stroke bg-surface py-14 sm:py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-5 lg:flex-row lg:items-center lg:gap-14 lg:px-10">
        <FadeUp className="shrink-0">
          <p className="section-label mb-2">[ Our Clients ]</p>
          <p className="max-w-[220px] text-sm leading-relaxed text-white/50">
            Teams across Iraq and the Gulf trust Code@ with their digital backbone.
          </p>
        </FadeUp>

        <div className="relative min-w-0 flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <div className="animate-marquee flex w-max items-center gap-14 pr-14">
            {row.map((c, i) => (
              <span key={`${c}-${i}`} className="flex shrink-0 items-center gap-3 text-xl font-light tracking-tight text-white/40 transition-colors hover:text-white/80 sm:text-2xl">
                <span className="size-1.5 rounded-full bg-lime/60" aria-hidden />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
