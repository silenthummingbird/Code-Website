import { useState } from 'react'
import { motion } from 'motion/react'
import FadeUp from '@/components/FadeUp'

// `anchor` pins each label's near edge to the tip of its radial line.
const ANGLES = [
  { label: 'websites', angle: 215, anchor: 'translate(-100%, -60%)' },
  { label: 'AI systems', angle: 335, anchor: 'translate(0%, -40%)' },
  { label: 'automation', angle: 110, anchor: 'translate(-50%, 6px)' },
]

const GLITCH_BLOCKS: [number, number, number, number][] = [
  [2, -3, 22, 22], [12, -5, 14, 10], [28, -2, 10, 10],
  [82, 22, 8, 8], [-4, 75, 16, 12], [8, 82, 10, 10],
  [-2, 88, 18, 16], [56, 82, 12, 14], [70, 90, 10, 10],
  [42, 94, 8, 6],
]

const PORTRAIT =
  'https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=600'

function polar(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) }
}

/** Founder quote + interactive radial capability diagram. */
export default function RadialDiagram() {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <section className="overflow-x-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        {/* Header */}
        <div className="mb-20 flex items-start gap-4">
          <div>
            <FadeUp>
              <h2 className="text-[clamp(2rem,3.4vw,2.6rem)] font-light leading-[1.18] tracking-[-0.01em] text-muted">
                Our Comprehensive
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[clamp(2rem,3.4vw,2.6rem)] font-light leading-[1.18] tracking-[-0.01em] text-paper">
                Solutions <em className="font-serif font-[350] text-lime">Approach</em>
              </h2>
            </FadeUp>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-2 flex size-7 items-center justify-center border border-lime/40 text-lime"
            aria-hidden
          >
            <svg viewBox="0 0 12 12" width="12" height="12" stroke="currentColor" strokeWidth="1.3">
              <path d="M6 1v10M1 6h10" />
            </svg>
          </motion.span>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10">
          {/* Portrait + quote */}
          <div className="flex min-w-0 flex-1 flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative shrink-0"
              style={{ width: 250, height: 310 }}
            >
              <img src={PORTRAIT} alt="Code@ founder portrait" className="size-full rounded-lg object-cover grayscale" />
              {GLITCH_BLOCKS.map(([x, y, w, h], i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.5 + i * 0.05 }}
                  className="absolute bg-lime"
                  style={{ left: `${x}%`, top: `${y}%`, width: w, height: h }}
                  aria-hidden
                />
              ))}
            </motion.div>

            <div className="min-w-0 max-w-[420px]">
              <FadeUp delay={0.3} y={14}>
                <span className="font-serif text-[3.2rem] leading-[0.7] text-lime" aria-hidden>
                  “
                </span>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p className="mt-3 text-[clamp(1.05rem,1.5vw,1.28rem)] font-normal leading-[1.58] text-white/90">
                  We kept seeing the same pattern — businesses with potential lost between messy processes, scattered
                  systems, and forgettable websites. Code@ exists to align it all into one clear, engineered story.
                </p>
              </FadeUp>
              <FadeUp delay={0.55}>
                <div className="mt-10">
                  <p className="text-[1.15rem] font-medium tracking-[0.01em] text-paper">Saif</p>
                  <p className="mt-1 text-[0.85rem] tracking-wide text-muted">Co-Founder &amp; Managing Director</p>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Radial diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex w-full max-w-[360px] shrink-0 items-center justify-center self-center sm:max-w-[400px] lg:max-w-[440px]"
          >
            <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
                <circle cx="50" cy="50" r="30" stroke="#82B541" strokeWidth="0.18" opacity="0.45" fill="none" />
                {ANGLES.map(({ label, angle }) => {
                  const from = polar(angle, 30)
                  const to = polar(angle, 36)
                  const active = hover === label
                  return (
                    <line
                      key={label}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="#82B541"
                      strokeWidth={active ? 0.6 : 0.18}
                      opacity={active ? 1 : 0.45}
                      style={{ transition: 'stroke-width 0.3s, opacity 0.3s' }}
                    />
                  )
                })}
              </svg>
              {ANGLES.map(({ label, angle, anchor }, i) => {
                const pos = polar(angle, 37.5)
                const active = hover === label
                return (
                  <motion.button
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHover(label)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(label)}
                    onBlur={() => setHover(null)}
                    className="absolute whitespace-nowrap text-paper"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      fontSize: 'clamp(1.25rem, 2.8vw, 2.2rem)',
                      letterSpacing: '-0.01em',
                      fontWeight: active ? 600 : 300,
                      color: active ? '#82B541' : undefined,
                      transition: 'font-weight 0.25s, color 0.25s',
                    }}
                  >
                    {/* inner span carries the edge-anchor so motion's transform stays free */}
                    <span className="inline-block" style={{ transform: anchor }}>{label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
