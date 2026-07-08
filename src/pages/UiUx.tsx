import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, PenTool, ArrowUpRight } from 'lucide-react'

const FigmaIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
)
import { PROJECTS, type Project } from '@/lib/data'
import ProjectModal, { MacBookFrame } from '@/components/home/ProjectModal'
import SpotlightBorder from '@/components/SpotlightBorder'
import KineticText from '@/components/KineticText'
import FadeUp from '@/components/FadeUp'

const TABS = [
  {
    label: 'Research & UX Audits',
    caption: 'Interviews, journey maps and heuristic audits before a single pixel moves.',
    image: PROJECTS[2].preview,
  },
  {
    label: 'Wireframes & Flows',
    caption: 'Low-fi structure in Figma — every screen, every state, agreed before design.',
    image: PROJECTS[4].preview,
  },
  {
    label: 'UI Design Systems',
    caption: 'Token-driven component libraries in Figma and Adobe XD that scale with you.',
    image: PROJECTS[3].preview,
  },
  {
    label: 'Prototype & Handoff',
    caption: 'Clickable prototypes and dev-ready specs — design that ships, not sits.',
    image: PROJECTS[5].preview,
  },
]

const TOOLS = [
  {
    icon: FigmaIcon,
    name: 'Figma',
    desc: 'Our primary design environment — live collaboration, variables-driven design tokens, component libraries and clickable prototypes your whole team can comment on.',
  },
  {
    icon: PenTool,
    name: 'Adobe XD',
    desc: 'For teams standardized on Adobe, we design and prototype natively in XD — shared libraries, voice triggers and Creative Cloud round-trips with Photoshop and Illustrator.',
  },
]

/** Auto-rotating capability showcase — spotlight shells, 5s rotation, arrows + caption. */
function ProcessShowcase() {
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % TABS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const select = (i: number) => { paused.current = true; setActive(i) }
  const go = (d: number) => { paused.current = true; setActive((a) => (a + d + TABS.length) % TABS.length) }

  return (
    <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
      {/* Tab pills */}
      <SpotlightBorder radius="full" size={360} intensity={0.5} className="mx-auto mb-6 hidden w-full p-1 sm:block">
        <div className="grid grid-cols-2 gap-1 rounded-full p-1 sm:grid-cols-4">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => select(i)}
              className={`rounded-full px-4 py-2.5 text-sm transition-colors duration-300 ${
                i === active
                  ? 'border border-lime/30 bg-lime/[0.08] text-paper'
                  : 'border border-transparent text-white/55 hover:text-white/80'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </SpotlightBorder>

      {/* Stage */}
      <SpotlightBorder radius="2xl" size={600} intensity={0.5} className="relative mx-auto w-full p-2 sm:p-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10" style={{ backgroundColor: '#0e0e0e' }}>
          <div className="relative aspect-[16/10] w-full">
            {TABS.map((t, i) => (
              <img
                key={t.label}
                src={t.image}
                alt={t.label}
                loading="eager"
                decoding="async"
                className={`absolute inset-0 size-full object-cover transition-opacity duration-400 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
              <span className="rounded-full border border-lime/30 bg-black/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-lime backdrop-blur">
                {TABS[active].label}
              </span>
            </div>
          </div>
        </div>
      </SpotlightBorder>

      {/* Arrows + caption */}
      <SpotlightBorder radius="full" size={360} intensity={0.5} className="mx-auto mt-6 w-full p-1">
        <div className="flex items-center justify-between gap-4 rounded-full px-3 py-2">
          <button onClick={() => go(-1)} aria-label="Previous" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-lime">
            <ArrowLeft size={16} />
          </button>
          <div className="min-h-[1.5rem] flex-1 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={TABS[active].label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="px-2 text-sm text-white/75"
              >
                <span className="font-medium text-paper sm:hidden">{TABS[active].label}</span>
                <span className="hidden sm:inline">{TABS[active].caption}</span>
              </motion.p>
            </AnimatePresence>
          </div>
          <button onClick={() => go(1)} aria-label="Next" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-lime">
            <ArrowRight size={16} />
          </button>
        </div>
      </SpotlightBorder>
    </div>
  )
}

/** MacBook portfolio — the machine cycles our shipped work; click opens the full preview. */
function MacBookPortfolio({ onOpen }: { onOpen: (p: Project) => void }) {
  const [idx, setIdx] = useState(0)
  const featured = PROJECTS.slice(0, 6)
  const project = featured[idx]

  return (
    <div className="mx-auto max-w-3xl px-5">
      <button onClick={() => onOpen(project)} className="block w-full cursor-pointer text-left transition-transform duration-300 hover:scale-[1.01]">
        <MacBookFrame title={project.url ? project.url.replace('https://', '').replace(/\/$/, '') : `${project.title.toLowerCase().replace(/\s/g, '')}.app`}>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={project.title}
                src={project.screenshot ?? project.preview}
                alt={`${project.title} in the browser`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 size-full object-cover object-top"
              />
            </AnimatePresence>
            <span className="absolute bottom-4 right-4 rounded-full bg-lime px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
              Open ↗
            </span>
          </div>
        </MacBookFrame>
      </button>

      {/* project switcher */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {featured.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setIdx(i)}
            className={`rounded-full px-4 py-2 text-xs transition-colors ${
              i === idx ? 'border border-lime/40 bg-lime/10 font-medium text-lime' : 'border border-white/10 text-white/50 hover:text-white'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>
    </div>
  )
}

/** UI/UX — capabilities, process showcase, tools and the MacBook portfolio. */
export default function UiUx() {
  const [openProject, setOpenProject] = useState<Project | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-ink px-5 pb-20 pt-40 text-center sm:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[120vw] -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% -10%, rgba(130,181,65,0.12), transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <FadeUp>
            <p className="section-label mb-6">[ UI/UX Design ]</p>
          </FadeUp>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[1.06] tracking-[-0.02em] text-paper">
            <KineticText text="Interfaces that feel" stagger={0.06} delay={0.1} />
            <br />
            <KineticText text="inevitable." stagger={0.06} delay={0.45} segmentClassName="font-serif italic font-[340] text-lime" />
          </h1>
          <FadeUp delay={0.7}>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
              From research to pixel-perfect handoff, we design products people already know how to use. Built in
              Figma and Adobe XD, proven in production.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Process showcase */}
      <section className="bg-ink py-12 sm:py-16">
        <ProcessShowcase />
      </section>

      {/* Tools */}
      <section className="bg-ink px-5 py-20 lg:px-16">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2">
          {TOOLS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.12}>
              <SpotlightBorder radius="2xl" size={320} intensity={0.4} className="h-full border border-white/10 bg-white/[0.03] p-8">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-lime/10 text-lime">
                    <t.icon size={22} />
                  </span>
                  <h3 className="text-xl font-medium text-paper">{t.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{t.desc}</p>
              </SpotlightBorder>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* MacBook portfolio */}
      <section className="border-t border-stroke bg-surface py-24">
        <div className="mb-14 px-6 text-center">
          <FadeUp>
            <p className="section-label mb-5">[ In The Browser ]</p>
            <h2 className="text-3xl font-light tracking-tight text-paper sm:text-4xl">
              Our work, on <em className="font-serif font-[350] text-lime">the machine</em>.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
              Real launches on real hardware — click the screen for the full preview.
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.15}>
          <MacBookPortfolio onOpen={setOpenProject} />
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="bg-ink px-6 py-24 text-center">
        <FadeUp>
          <h2 className="text-3xl font-light tracking-tight text-paper sm:text-4xl">
            Have a product that <em className="font-serif font-[350] text-lime">deserves better</em>?
          </h2>
          <a
            href="mailto:hello@codeat.io?subject=UI%2FUX%20Design"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-3.5 text-sm font-semibold text-ink transition-all hover:brightness-110 active:scale-[0.97]"
          >
            Book a Design Sprint
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </FadeUp>
      </section>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  )
}
