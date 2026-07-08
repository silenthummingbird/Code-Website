import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { COMPANY, SERVICES, STATS } from '@/lib/data'
import FadeUp from '@/components/FadeUp'
import KineticText from '@/components/KineticText'
import ErpDashboard from '@/components/services/ErpDashboard'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_155101_f2540600-6fe9-433e-8e48-b3f4b72f0727.mp4'
const ABOUT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260322_011532_86f9b93a-2ffc-42fd-8735-12a4c55ab536.mp4'

const PROCESS = [
  { step: '01', title: 'Discovery', desc: 'We map your operations, constraints and ambitions into a clear technical brief.' },
  { step: '02', title: 'Design', desc: 'Interfaces and architecture designed together, so nothing is lost in translation.' },
  { step: '03', title: 'Build', desc: 'Weekly demos on a live staging environment from week one. No black boxes.' },
  { step: '04', title: 'Launch & Iterate', desc: 'Hardening, monitoring and a support window — then continuous evolution.' },
]

export default function Services() {
  return (
    <>
      {/* HERO — full-screen video, centered statement */}
      <section className="relative h-screen w-full overflow-hidden bg-ink">
        <video
          className="absolute inset-0 z-0 size-full object-cover opacity-60"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-black" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <FadeUp>
            <p className="section-label mb-6">[ Services ]</p>
          </FadeUp>
          <h1 className="max-w-4xl text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.1] tracking-tight text-paper">
            <KineticText text="Where precision finds its edge" stagger={0.06} delay={0.15} />
            <br className="hidden sm:block" />
            <KineticText
              text="and vision rewrites what comes next."
              stagger={0.06}
              delay={0.55}
              segmentClassName="font-serif italic font-[340] text-lime"
            />
          </h1>
          <FadeUp delay={0.9}>
            <p className="mt-6 max-w-md font-mono text-sm leading-relaxed tracking-[0.01em] text-white/55">
              a seamless bridge — where raw ambition
              <br className="hidden sm:block" /> and machine clarity converge as one
            </p>
          </FadeUp>
          <FadeUp delay={1.1}>
            <a
              href="mailto:hello@codeat.io"
              className="group mt-8 flex items-center gap-2.5 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
            >
              Get Consultation
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* SERVICES BREAKDOWN — inverted light section (AKOR treatment) */}
      <section className="bg-paper px-5 py-24 text-ink lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <FadeUp>
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-black/50">[ Our Services ]</p>
            <div className="mb-16 h-px w-full bg-black/15" />
          </FadeUp>

          <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
            <div className="lg:w-[38%]">
              <div className="lg:sticky lg:top-28">
                <FadeUp>
                  <h2 className="text-3xl leading-[1.15] tracking-tight sm:text-4xl">
                    Software, automation, and AI —{' '}
                    <em className="font-serif font-[350]">helping businesses enhance efficiency</em>.
                  </h2>
                  <a
                    href="mailto:hello@codeat.io"
                    className="mt-10 inline-flex items-center gap-2 rounded-lg bg-ink px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-lime transition-all hover:bg-black/85 active:scale-[0.97]"
                  >
                    Get Consultation
                  </a>
                </FadeUp>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <FadeUp key={s.slug} delay={(i % 2) * 0.1} className="border-l border-black/15 pl-8">
                  <p className="font-mono text-xs text-black/35">/{s.num}</p>
                  <h3 className="mt-4 text-xl font-medium leading-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/55">{s.desc}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ERP & CRM — live dashboard showcase */}
      <section className="bg-ink px-5 py-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <FadeUp>
              <p className="section-label mb-5">[ ERP &amp; CRM Systems ]</p>
              <h2 className="max-w-2xl text-3xl font-light leading-[1.1] tracking-tight text-paper sm:text-4xl">
                Operational backbones your team <em className="font-serif font-[350] text-lime">actually enjoys</em> using.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="max-w-sm text-sm leading-relaxed text-white/50">
                Dashboards, meeting rooms, live metrics and screen-share — one glassmorphic workspace. This is a live
                interactive mock of the ERP surfaces we build; try the theme switch, views and call controls.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <ErpDashboard />
          </FadeUp>
        </div>
      </section>

      {/* ABOUT — dark, video + mission (AKOR About treatment) */}
      <section className="bg-ink px-5 py-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <FadeUp>
            <p className="section-label mb-8">[ About Us ]</p>
            <div className="mb-16 h-px w-full bg-white/10" />
          </FadeUp>

          <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:gap-0">
            <FadeUp className="lg:w-[45%]">
              <video src={ABOUT_VIDEO} autoPlay loop muted playsInline className="w-full rounded-2xl border border-white/10" />
            </FadeUp>
            <div className="hidden w-px bg-white/10 lg:mx-12 lg:block" />
            <div className="flex min-h-[400px] flex-1 flex-col justify-between gap-10">
              <FadeUp delay={0.15}>
                <h2 className="text-3xl leading-[1.15] tracking-tight text-paper sm:text-4xl">
                  Code@ delivers modern digital experiences, enterprise systems,{' '}
                  <em className="font-serif font-[350] text-lime">AI-powered products</em> and custom software with
                  exceptional quality and performance.
                </h2>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="mb-8 grid grid-cols-3 gap-6">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl font-extralight text-lime sm:text-4xl">{s.value}</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-lime px-10 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-ink transition-all hover:brightness-110 active:scale-[0.97]"
                >
                  Get Quote
                </a>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-stroke bg-surface px-5 py-24 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <FadeUp>
            <p className="section-label mb-5">[ Process ]</p>
            <h2 className="mb-16 max-w-2xl text-3xl font-light leading-[1.1] tracking-tight text-paper sm:text-4xl">
              From first call to <em className="font-serif font-[350] text-lime">shipped</em> — without the fog.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <FadeUp key={p.step} delay={i * 0.1} className="group bg-ink p-8 transition-colors hover:bg-card">
                <p className="font-mono text-[10px] tracking-widest text-lime">{p.step}</p>
                <h3 className="mt-5 text-lg font-medium text-paper">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/45">{p.desc}</p>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <div className="mt-12 flex justify-center">
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-lime"
              >
                See our automation solutions
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
