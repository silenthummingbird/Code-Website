import { motion } from 'motion/react'
import { Snowflake, Maximize, Zap } from 'lucide-react'
import LazySpline from '@/components/LazySpline'
import RadialDiagram from '@/components/solutions/RadialDiagram'

const SPLINE_SCENE = 'https://prod.spline.design/PIgTjpRFA03yfLyK/scene.splinecode'

const SPECS = [
  { label: 'Stack', value: 'React + Node + SQL' },
  { label: 'Logic', value: 'V8 — Runtime Logic' },
  { label: 'Uptime', value: '99.9% High-Avail' },
  { label: 'Scale', value: 'Responsive Modern Layout' },
]

const PILLS = ['TS/JS', 'AI', 'Full-Stack', 'Cloud-Ready']

/** Automation Machines hero + solutions approach. */
export default function Solutions() {
  return (
    <>
      <section className="relative min-h-screen overflow-x-hidden bg-ink text-paper selection:bg-paper selection:text-ink">
        {/* Spline 3D background, shifted right */}
        <LazySpline
          scene={SPLINE_SCENE}
          className="absolute inset-0 z-0"
          style={{ transform: 'translateX(15%)' }}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen flex-col justify-between px-4 pb-6 pt-28 md:h-screen md:px-6 md:pt-32">
          {/* Top block */}
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="max-w-xl bg-gradient-to-r from-white/20 via-white/70 to-white bg-clip-text text-[40px] font-extralight uppercase leading-[1] tracking-tight text-transparent sm:text-[56px] md:text-[72px] md:leading-[0.9]">
                Automation
                <br />
                Machines <span className="text-lime">&bull;</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md text-sm font-light leading-relaxed text-white"
            >
              Workflow engines, integrations and AI agents engineered for those who don&apos;t just run a business —
              they scale it. We automate the repetitive so your team ships the exceptional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4"
            >
              {[Snowflake, Maximize, Zap].map((Icon, i) => (
                <span
                  key={i}
                  className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 transition-colors hover:border-lime"
                >
                  <Icon size={16} className="text-white/80" />
                </span>
              ))}
            </motion.div>
          </div>

          {/* Bottom block */}
          <div className="mt-16 flex flex-col items-start justify-between gap-12 md:mt-0 md:flex-row md:items-end md:gap-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pointer-events-auto w-full rounded-2xl border border-white/[0.06] bg-black/40 p-6 backdrop-blur-sm md:max-w-md md:p-8"
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-lime">Technical Specs</p>
              <div className="space-y-4">
                {SPECS.map((s) => (
                  <div key={s.label} className="group flex cursor-default items-end justify-between border-b border-white/10 pb-3">
                    <span className="text-xs text-white/70 transition-colors group-hover:text-white">{s.label}</span>
                    <span className="font-mono text-xs tracking-tight text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex w-full items-center md:w-auto"
            >
              <div className="pointer-events-auto flex w-full flex-wrap gap-2 rounded-2xl border border-white/5 bg-white/10 p-2 backdrop-blur-md md:w-auto md:rounded-full">
                {PILLS.map((p, i) => (
                  <span
                    key={p}
                    className={
                      i === 0
                        ? 'rounded-full bg-lime px-4 py-2 font-mono text-[10px] font-semibold tracking-widest text-ink'
                        : 'rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] tracking-widest text-white'
                    }
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RadialDiagram />
    </>
  )
}
