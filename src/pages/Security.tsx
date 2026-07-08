import { useEffect, useRef } from 'react'
import { Layers, ShieldCheck } from 'lucide-react'
import FadeUp from '@/components/FadeUp'
import { SERVICES } from '@/lib/data'

const CLIENTS = ['Toyota Iraq', 'Makasib Al-Khair', 'Shift', 'Bay Bank', 'Sarco Industries']

const SECURITY_POINTS = SERVICES.filter((s) =>
  ['security', 'cloud', 'erp-crm', 'ai'].includes(s.slug),
)

/**
 * Cybersecurity hero — layered CSS glow arc + grid mask + animated SVG beam
 * traveling through a 3-node encryption pipeline.
 */
export default function Security() {
  const beamGlow = useRef<SVGPathElement>(null)
  const beamCrisp = useRef<SVGPathElement>(null)
  const gradRef = useRef<SVGLinearGradientElement>(null)
  const leftNode = useRef<HTMLDivElement>(null)
  const centerNode = useRef<HTMLDivElement>(null)
  const rightNode = useRef<HTMLDivElement>(null)
  const splashRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let raf = 0
    let start = performance.now()
    let phase: 'p1' | 'splash' | 'p2' | 'idle' = 'p1'

    const setBeam = (from: number, to: number, visible: boolean) => {
      const svg = svgRef.current
      if (!svg || !gradRef.current || !beamGlow.current || !beamCrisp.current) return
      const rect = svg.getBoundingClientRect()
      if (rect.width === 0) return
      const y = rect.height / 2
      const d = `M ${from * rect.width} ${y} L ${to * rect.width} ${y}`
      beamGlow.current.setAttribute('d', d)
      beamCrisp.current.setAttribute('d', d)
      beamGlow.current.style.opacity = visible ? '0.6' : '0'
      beamCrisp.current.style.opacity = visible ? '1' : '0'
    }

    const tick = (now: number) => {
      const elapsed = now - start
      if (phase === 'p1') {
        const t = Math.min(1, elapsed / 800)
        setBeam(Math.max(0, t * 0.5 - 0.08), t * 0.5, true)
        leftNode.current?.classList.toggle('ring-lime/60', t < 0.4)
        if (t >= 1) { phase = 'splash'; start = now }
      } else if (phase === 'splash') {
        setBeam(0, 0, false)
        if (splashRef.current) {
          const t = Math.min(1, elapsed / 800)
          splashRef.current.style.opacity = `${(1 - t) * 0.7}`
          splashRef.current.style.transform = `translate(-50%, -50%) scale(${0.4 + t})`
        }
        if (elapsed >= 800) { phase = 'p2'; start = now }
      } else if (phase === 'p2') {
        const t = Math.min(1, elapsed / 800)
        setBeam(0.5 + t * 0.5 - 0.08, 0.5 + t * 0.5, true)
        rightNode.current?.classList.toggle('ring-lime/60', t > 0.6)
        if (t >= 1) { phase = 'idle'; start = now }
      } else {
        setBeam(0, 0, false)
        if (elapsed >= 1000) { phase = 'p1'; start = now }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div className="bg-ink px-3.5 pt-24">
        {/* HERO CARD */}
        <section className="grain relative mx-auto flex min-h-[640px] max-w-[1600px] flex-col items-center overflow-hidden rounded-[28px] border border-white/[0.07] bg-surface px-6 pb-16 pt-20 text-center md:px-10">
          {/* Radial arc glow — lime */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% -70%, transparent 60%, rgba(130,181,65,0.05) 66%, rgba(130,181,65,0.28) 76%, rgba(130,181,65,0.55) 84%, rgba(214,235,178,0.75) 90%, rgba(255,255,255,0.9) 95%, transparent 96.5%), radial-gradient(circle at 50% 35%, rgba(130,181,65,0.05), transparent 50%)',
            }}
          />
          {/* Grid overlay, masked to arc */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at 50% -70%, transparent 60%, black 78%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% -70%, transparent 60%, black 78%)',
            }}
          />

          {/* Icon pipeline */}
          <FadeUp className="relative z-10 mb-12 mt-4">
            <div className="flex items-center">
              <div
                ref={leftNode}
                className="flex size-11 items-center justify-center rounded-full bg-[#161616] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all duration-300"
              >
                <Layers size={18} className="text-white/80" />
              </div>

              <div className="relative h-px w-[90px] bg-gradient-to-r from-white/15 to-white/[0.07] sm:w-[160px]">
                <svg ref={svgRef} className="absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2 overflow-visible">
                  <defs>
                    <linearGradient ref={gradRef} id="beam-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="rgba(130,181,65,0)" />
                      <stop offset="0.5" stopColor="#ffffff" />
                      <stop offset="1" stopColor="rgba(130,181,65,0)" />
                    </linearGradient>
                  </defs>
                  <path ref={beamGlow} stroke="#82B541" strokeWidth="2.5" fill="none" style={{ filter: 'blur(3px)', opacity: 0 }} />
                  <path ref={beamCrisp} stroke="url(#beam-gradient)" strokeWidth="1" fill="none" style={{ opacity: 0 }} />
                </svg>
              </div>

              <div className="relative">
                <div
                  ref={splashRef}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 size-[100px] rounded-full opacity-0"
                  style={{ background: 'radial-gradient(circle, rgba(130,181,65,0.6), transparent 65%)', transform: 'translate(-50%, -50%) scale(0.4)' }}
                />
                <div
                  ref={centerNode}
                  className="relative flex size-16 items-center justify-center rounded-full bg-[#1a1a1a] font-mono text-2xl font-semibold text-lime shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_32px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
                >
                  @
                </div>
              </div>

              <div className="h-px w-[90px] bg-gradient-to-l from-white/15 to-white/[0.07] sm:w-[160px]" />

              <div
                ref={rightNode}
                className="flex size-11 items-center justify-center rounded-full bg-[#161616] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all duration-300"
              >
                <ShieldCheck size={18} className="text-lime" />
              </div>
            </div>
          </FadeUp>

          {/* Copy */}
          <div className="relative z-10 max-w-[640px]">
            <FadeUp delay={0.1}>
              <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-light leading-[1.1] tracking-[-0.02em] text-paper">
                The simple way to
                <br />
                <strong className="bg-gradient-to-r from-lime to-lime/50 bg-clip-text font-normal text-transparent">
                  secure your systems
                </strong>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mx-auto mt-6 max-w-[440px] text-sm leading-relaxed text-white/40">
                Threat modeling, hardening and continuous protection —<br className="hidden sm:block" /> engineered
                into every product from day one, not bolted on at the end.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <a
                href="mailto:hello@codeat.io?subject=Security%20Audit"
                className="mt-9 inline-block rounded-full bg-lime px-8 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-px hover:brightness-110 active:scale-[0.97]"
              >
                Request an Audit
              </a>
            </FadeUp>
          </div>
        </section>

        {/* Trusted-by row */}
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-14 gap-y-4 px-6 pb-6 pt-8">
          {CLIENTS.map((c, i) => (
            <FadeUp key={c} delay={i * 0.06}>
              <span className="flex items-center gap-2.5 text-[1.05rem] font-medium text-white/35 transition-colors hover:text-white/60">
                <span className="size-1.5 rounded-full bg-lime/50" />
                {c}
              </span>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Security capabilities */}
      <section className="bg-ink px-5 py-24 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <FadeUp>
            <p className="section-label mb-5">[ Protection Layers ]</p>
            <h2 className="mb-14 max-w-2xl text-3xl font-light leading-[1.1] tracking-tight text-paper sm:text-4xl">
              Defense in <em className="font-serif font-[350] text-lime">depth</em>, not in slides.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY_POINTS.map((s, i) => (
              <FadeUp key={s.slug} delay={i * 0.08} className="group bg-ink p-8 transition-colors hover:bg-card">
                <p className="font-mono text-[10px] tracking-widest text-lime">/{s.num}</p>
                <h3 className="mt-5 text-lg font-medium text-paper">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/45">{s.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
