import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '@/lib/data'

interface Props {
  project: Project | null
  onClose: () => void
}

/** MacBook screen + deck frame around any content — shared with the UI/UX page. */
export function MacBookFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="w-full">
      {/* Screen */}
      <div className="relative rounded-t-[18px] border border-b-0 border-white/15 bg-[#0d0d0f] p-[10px] pb-0 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
        {/* camera notch */}
        <div className="absolute left-1/2 top-[10px] z-20 flex h-[16px] w-[120px] -translate-x-1/2 items-center justify-center rounded-b-[8px] bg-[#0d0d0f]">
          <span className="size-[5px] rounded-full bg-[#1c2b1a] ring-1 ring-black" />
        </div>
        <div className="overflow-hidden rounded-t-[10px] bg-black">
          {/* browser chrome inside the screen */}
          <div className="flex h-9 items-center gap-2 border-b border-white/[0.07] bg-[#161618] px-3">
            <span className="size-2.5 rounded-full bg-[#fd5d5c]" />
            <span className="size-2.5 rounded-full bg-[#fac900]" />
            <span className="size-2.5 rounded-full bg-[#34c75a]" />
            <span className="mx-auto flex h-5 items-center rounded-md bg-white/[0.06] px-4 font-mono text-[10px] tracking-wide text-white/50">
              {title}
            </span>
            <span className="w-10" aria-hidden />
          </div>
          {children}
        </div>
      </div>
      {/* Aluminum deck */}
      <div className="relative h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#3a3a3e] via-[#232327] to-[#131316]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[110px] -translate-x-1/2 rounded-b-[6px] bg-[#0f0f11]" />
      </div>
    </div>
  )
}

/** Portfolio preview — a MacBook opens with a screenshot of the live website. */
export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-lime hover:text-lime"
          >
            <X size={18} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <MacBookFrame title={project.url ? project.url.replace('https://', '').replace(/\/$/, '') : `${project.title.toLowerCase().replace(/\s/g, '')}.app`}>
              <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={project.screenshot ?? project.preview}
                  alt={`${project.title} website screenshot`}
                  className="size-full object-cover object-top"
                  onError={(e) => {
                    // screenshot service unavailable → fall back to the motion preview
                    if (project.screenshot && e.currentTarget.src !== project.preview) {
                      e.currentTarget.src = project.preview
                    }
                  }}
                />
              </div>
            </MacBookFrame>

            {/* Meta below the machine */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">{project.client}</p>
                <h3 className="mt-1.5 text-2xl font-medium tracking-tight text-paper">{project.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-all hover:brightness-110 active:scale-[0.97]"
                >
                  Visit live site
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
