import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from '@/lib/data'
import FadeUp from '@/components/FadeUp'
import SpotlightBorder from '@/components/SpotlightBorder'
import { cn } from '@/lib/utils'

/** Category-tabbed FAQ with cursor spotlight rings and Radix accordion. */
export default function FaqSection() {
  const [active, setActive] = useState<FaqCategory>('general')

  return (
    <section id="faq" className="relative w-full bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-lime backdrop-blur">
                <span className="size-1.5 rounded-full bg-lime" /> FAQ
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-5 text-3xl font-light leading-[1.05] tracking-[-0.02em] text-paper sm:text-4xl">
                Answers to the questions
                <br className="hidden sm:block" /> that come up <em className="font-serif font-[350] text-lime">most</em>.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm text-white/55 sm:text-base">
              How Code@ works, what we cover, and what you can expect from day one to launch day.
            </p>
          </FadeUp>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Categories + contact card */}
          <div className="flex flex-col gap-4">
            <SpotlightBorder radius="2xl" size={280} className="flex flex-col gap-1 p-2 sm:p-3 lg:sticky lg:top-24">
              {FAQ_CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={cn(
                    'w-full rounded-full px-5 py-3 text-center text-sm transition-colors',
                    active === c.key
                      ? 'border border-lime/40 bg-lime/10 font-medium text-lime'
                      : 'border border-transparent text-white/55 hover:text-white',
                  )}
                >
                  {c.label}
                </button>
              ))}
            </SpotlightBorder>

            <SpotlightBorder radius="2xl" size={300} intensity={0.3} className="border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold text-paper">Got questions?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Need help with something specific? Our team makes things easy — don&apos;t hesitate to reach out.
              </p>
              <a href="mailto:hello@codeat.io" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-lime hover:brightness-110">
                Email us <span aria-hidden>→</span>
              </a>
            </SpotlightBorder>
          </div>

          {/* Accordion */}
          <SpotlightBorder radius="2xl" size={360} className="p-2 sm:p-3">
            <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
              {FAQS[active].map((f, idx) => (
                <FadeUp key={`${active}-${idx}`} delay={0.08 * idx} y={14}>
                  <Accordion.Item
                    value={`${active}-${idx}`}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.05] px-6 transition-colors data-[state=open]:bg-white/[0.09]"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between py-6 text-left text-sm font-medium text-paper sm:text-base">
                        <span className="flex-1 pr-4">{f.q}</span>
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:border-lime/40 group-data-[state=open]:text-lime">
                          <ChevronDown size={14} />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <p className="pb-6 text-sm leading-relaxed text-white/55">{f.a}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                </FadeUp>
              ))}
            </Accordion.Root>
          </SpotlightBorder>
        </div>
      </div>
    </section>
  )
}
