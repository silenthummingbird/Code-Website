import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { COMPANY, SERVICES, STATS, type Project } from '@/lib/data'
import KineticText from '@/components/KineticText'
import FadeUp from '@/components/FadeUp'
import Carousel3D from '@/components/home/Carousel3D'
import ProjectModal from '@/components/home/ProjectModal'
import ScrollMarquee from '@/components/home/ScrollMarquee'
import ClientsSection from '@/components/home/ClientsSection'
import SocialPostsGrid from '@/components/home/SocialPostsGrid'
import FaqSection from '@/components/home/FaqSection'

function Preloader({ done }: { done: () => void }) {
  const [progress, setProgress] = useState(1)
  useEffect(() => {
    let v = 1
    const id = setInterval(() => {
      v = Math.min(100, v + (v > 85 ? 2 : Math.floor(Math.random() * 9) + 4))
      setProgress(v)
      if (v >= 100) {
        clearInterval(id)
        setTimeout(done, 350)
      }
    }, 40)
    return () => clearInterval(id)
  }, [done])
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        className="flex size-16 items-center justify-center rounded-full bg-lime font-mono text-3xl font-semibold text-ink"
      >
        @
      </motion.span>
      <span className="fixed bottom-8 right-8 font-sans text-7xl font-extralight tabular-nums tracking-tight text-white/90 sm:bottom-12 sm:right-16">
        {progress}%
      </span>
    </motion.div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('codeat-loaded'))
  const [openProject, setOpenProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!loading) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Preloader
            done={() => {
              sessionStorage.setItem('codeat-loaded', '1')
              setLoading(false)
            }}
          />
        )}
      </AnimatePresence>

      {/* HERO — headline + 3D carousel */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink pt-[72px] grain">
        {/* lime aura */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% -10%, rgba(130,181,65,0.13), transparent 65%)' }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-6 pt-14 text-center sm:pt-20">
          <FadeUp>
            <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-lime" />
              </span>
              Software · AI · {COMPANY.locations}
            </span>
          </FadeUp>

          <h1 className="text-[clamp(2.4rem,6.5vw,4.8rem)] font-light leading-[1.04] tracking-[-0.02em] text-paper">
            <KineticText text="Engineering Software At" stagger={0.07} delay={0.15} />
            <br />
            <KineticText
              text="The Speed Of Innovation."
              stagger={0.07}
              delay={0.5}
              segmentClassName="font-serif italic font-[340] text-lime"
            />
          </h1>

          <FadeUp delay={0.9}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/60 sm:text-base">
              {COMPANY.sub}
            </p>
          </FadeUp>

          <FadeUp delay={1.05}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:hello@codeat.io"
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
              >
                Start a Project
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/services"
                className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:border-lime hover:text-lime active:scale-[0.97]"
              >
                Explore Services
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="relative z-10 pb-8">
          <Carousel3D onOpen={setOpenProject} />
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-stroke bg-surface">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-stroke sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.12} className="px-8 py-10 lg:px-14 lg:py-14">
              <p className="text-5xl font-extralight tracking-tight text-lime lg:text-6xl">{s.value}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{s.label}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <FadeUp>
              <p className="section-label mb-5">[ What We Do ]</p>
              <h2 className="max-w-2xl text-4xl font-light leading-[1.08] tracking-tight text-paper sm:text-5xl">
                Eight disciplines. <em className="font-serif font-[350] text-lime">One</em> standard.
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-lime"
              >
                All services
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.slug} delay={(i % 4) * 0.08} className="group bg-ink p-7 transition-colors duration-300 hover:bg-card lg:p-8">
                <p className="font-mono text-[10px] tracking-widest text-muted transition-colors group-hover:text-lime">/{s.num}</p>
                <h3 className="mt-6 text-lg font-medium tracking-tight text-paper">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/45">{s.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <ClientsSection />
      <ScrollMarquee />
      <SocialPostsGrid />
      <FaqSection />
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  )
}
