import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, STATS, MARQUEE_ROW_1, MARQUEE_ROW_2, type Project } from '@/lib/data'
import ProjectModal from '@/components/home/ProjectModal'
import KineticText from '@/components/KineticText'
import FadeUp from '@/components/FadeUp'

// Bento column spans — alternating 7/5/5/7 rhythm from the reference design.
const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7', 'md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7']

function BentoCard({ project, span, index, onOpen }: { project: Project; span: string; index: number; onOpen: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onOpen}
      className={`group relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-3xl border border-stroke bg-card text-left ${span}`}
    >
      <img
        src={project.preview}
        alt={`${project.title} — ${project.client}`}
        loading={index < 2 ? 'eager' : 'lazy'}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* halftone texture */}
      <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply" aria-hidden />
      {/* hover veil */}
      <div className="absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 backdrop-blur-lg transition-opacity duration-400 group-hover:opacity-100">
        <span className="gradient-ring rounded-full p-[1.5px]">
          <span className="flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink">
            View — <em className="font-serif italic">{project.title}</em>
          </span>
        </span>
      </div>
      {/* corner meta (always visible) */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5 pt-12 transition-opacity duration-300 group-hover:opacity-0">
        <div>
          <p className="text-base font-medium text-white">{project.title}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">{project.client}</p>
        </div>
        <span className="font-mono text-[10px] text-lime">/{String(index + 1).padStart(2, '0')}</span>
      </div>
    </motion.button>
  )
}

/** Scroll-driven two-column parallax over a sticky center headline. */
function Explorations() {
  const hostRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const host = hostRef.current
      if (host) {
        const rect = host.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, total)))
        if (leftRef.current) leftRef.current.style.transform = `translateY(${(1 - p) * 34 - 17}%)`
        if (rightRef.current) rightRef.current.style.transform = `translateY(${p * 34 - 17}%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const leftImgs = MARQUEE_ROW_1.slice(0, 4)
  const rightImgs = MARQUEE_ROW_2.slice(0, 4)

  return (
    <section ref={hostRef} className="relative min-h-[260vh] bg-ink">
      {/* pinned center */}
      <div className="sticky top-0 z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
        <p className="section-label mb-5">[ Explorations ]</p>
        <h2 className="max-w-xl text-4xl font-light leading-[1.08] tracking-tight text-paper sm:text-5xl">
          Visual <em className="font-serif font-[350] text-lime">playground</em>
        </h2>
        <p className="mt-4 max-w-sm text-sm text-white/50">
          Concepts, motion tests and interface studies that never stop moving through the studio.
        </p>
      </div>

      {/* parallax columns */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="sticky top-0 mx-auto grid h-screen max-w-[1400px] grid-cols-2 items-center gap-12 overflow-hidden px-6 md:gap-40 lg:px-16">
          <div ref={leftRef} className="flex flex-col items-start gap-10 will-change-transform">
            {leftImgs.map((src, i) => (
              <img key={src} src={src} alt="" loading="lazy" className={`pointer-events-auto aspect-square w-full max-w-[320px] rounded-2xl border border-white/10 object-cover ${i % 2 ? 'rotate-2' : '-rotate-2'}`} />
            ))}
          </div>
          <div ref={rightRef} className="flex flex-col items-end gap-10 will-change-transform">
            {rightImgs.map((src, i) => (
              <img key={src} src={src} alt="" loading="lazy" className={`pointer-events-auto aspect-square w-full max-w-[320px] rounded-2xl border border-white/10 object-cover ${i % 2 ? '-rotate-2' : 'rotate-2'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Code@ portfolio — bento grid of shipped work + parallax explorations. */
export default function Portfolio() {
  const [openProject, setOpenProject] = useState<Project | null>(null)

  return (
    <>
      {/* Header */}
      <section className="grain relative overflow-hidden bg-ink px-5 pb-16 pt-40 sm:pt-44 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[120vw] -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% -10%, rgba(130,181,65,0.12), transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-[1200px]">
          <FadeUp>
            <span className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Selected Work</span>
            </span>
          </FadeUp>
          <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] font-light leading-[1.04] tracking-[-0.02em] text-paper">
            <KineticText text="Featured" stagger={0.07} delay={0.1} />{' '}
            <KineticText text="projects" stagger={0.07} delay={0.3} segmentClassName="font-serif italic font-[340] text-lime" />
          </h1>
          <FadeUp delay={0.5}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
              A selection of projects we&apos;ve taken from concept to launch — engineered, designed and shipped by Code@.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Bento grid */}
      <section className="bg-ink px-5 pb-24 lg:px-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((p, i) => (
            <BentoCard key={p.title} project={p} span={SPANS[i % SPANS.length]} index={i} onOpen={() => setOpenProject(p)} />
          ))}
        </div>
      </section>

      <Explorations />

      {/* Stats */}
      <section className="border-t border-stroke bg-surface">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-stroke sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.12} className="px-8 py-12 lg:px-14">
              <p className="text-5xl font-extralight tracking-tight text-lime lg:text-6xl">{s.value}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{s.label}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink px-6 py-24 text-center">
        <FadeUp>
          <h2 className="text-3xl font-light tracking-tight text-paper sm:text-4xl">
            Your project, <em className="font-serif font-[350] text-lime">next</em>.
          </h2>
          <a
            href="mailto:hello@codeat.io?subject=New%20Project"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-3.5 text-sm font-semibold text-ink transition-all hover:brightness-110 active:scale-[0.97]"
          >
            Start a Project
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </FadeUp>
      </section>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  )
}
