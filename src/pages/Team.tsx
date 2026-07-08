import { useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { User, StickyNote } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
  </svg>
)

const BehanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.44 5.24c.72 0 1.38.06 1.97.19.6.13 1.1.34 1.53.62.42.28.75.66.98 1.13.23.47.35 1.05.35 1.73 0 .74-.17 1.36-.5 1.86-.34.5-.84.9-1.5 1.22.9.26 1.58.72 2.02 1.37.44.65.66 1.44.66 2.36 0 .74-.14 1.39-.43 1.93a3.77 3.77 0 0 1-1.16 1.34c-.48.35-1.04.6-1.66.77-.62.16-1.27.24-1.94.24H0V5.24h7.44Zm-.44 5.9c.59 0 1.08-.14 1.46-.42.38-.28.57-.74.57-1.37 0-.35-.06-.64-.19-.87a1.4 1.4 0 0 0-.51-.53 2.1 2.1 0 0 0-.73-.26 4.8 4.8 0 0 0-.86-.07H3.24v3.52H7Zm.19 6.22c.32 0 .63-.03.92-.1.3-.06.55-.17.77-.32.22-.15.4-.36.53-.62.13-.26.2-.6.2-1 0-.8-.23-1.37-.68-1.71-.45-.35-1.05-.52-1.8-.52H3.24v4.27h3.95ZM16.62 6.06h6.15v1.5h-6.15v-1.5ZM24 16.6c0 .08 0 .17-.02.26H16.9c0 .78.27 1.52.7 1.92.44.4 1.06.6 1.88.6.59 0 1.1-.15 1.52-.44.43-.3.69-.6.79-.93h2.06c-.33 1.02-.83 1.76-1.51 2.2a4.46 4.46 0 0 1-2.47.67c-.7 0-1.33-.11-1.9-.34a3.94 3.94 0 0 1-1.42-.96 4.3 4.3 0 0 1-.9-1.48 5.55 5.55 0 0 1-.32-1.9c0-.67.11-1.3.32-1.87a4.4 4.4 0 0 1 .93-1.5c.4-.42.88-.75 1.43-1 .55-.24 1.17-.36 1.84-.36.75 0 1.4.14 1.96.43a3.9 3.9 0 0 1 1.38 1.17c.36.49.62 1.05.78 1.68.16.63.21 1.28.16 1.85Zm-2.34-1.24a2.51 2.51 0 0 0-.62-1.58c-.35-.35-.88-.54-1.5-.54-.4 0-.74.07-1.01.2a2.1 2.1 0 0 0-.68.52c-.17.2-.3.42-.37.66-.08.23-.12.44-.13.64h4.31v.1Z" />
  </svg>
)
import { PROJECTS, TEAM, COMPANY, STATS, type Project } from '@/lib/data'
import ProjectModal from '@/components/home/ProjectModal'

const ANCHORS: { x: number; y: number }[] = [
  { x: 42.75, y: 46.5 },
  { x: 26, y: 27.5 },
  { x: 23.33, y: 60.88 },
  { x: 68, y: 62.13 },
  { x: 66.08, y: 19.63 },
  { x: 73.92, y: 40.75 },
]

function useDraggable(onTap: () => void) {
  const state = useRef({ dragging: false, sx: 0, sy: 0, ox: 0, oy: 0, moved: 0 })
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onPointerDown = (e: React.PointerEvent) => {
    const s = state.current
    s.dragging = true
    s.sx = e.clientX
    s.sy = e.clientY
    s.ox = pos.x
    s.oy = pos.y
    s.moved = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current
    if (!s.dragging) return
    const dx = e.clientX - s.sx
    const dy = e.clientY - s.sy
    s.moved = Math.max(s.moved, Math.abs(dx) + Math.abs(dy))
    setPos({ x: s.ox + dx, y: s.oy + dy })
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const s = state.current
    if (!s.dragging) return
    s.dragging = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    if (s.moved < 5) onTap()
  }
  return { pos, handlers: { onPointerDown, onPointerMove, onPointerUp } }
}

function DraggableCard({ project, anchor, onOpen }: { project: Project; anchor: { x: number; y: number }; onOpen: () => void }) {
  const { pos, handlers } = useDraggable(onOpen)
  return (
    <div
      {...handlers}
      className="group absolute z-[2] flex cursor-pointer touch-none select-none flex-col items-center gap-2"
      style={{
        left: `calc(${anchor.x}% - 62px)`,
        top: `calc(${anchor.y}% - 64px)`,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      <div className="rounded-lg border-2 border-transparent p-3 transition-all duration-200 group-hover:border-lime/30 group-hover:bg-black/40">
        <img
          src={project.preview}
          alt={project.title}
          draggable={false}
          className="h-auto w-[110px] rounded-lg border border-white/20 object-cover shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
        />
      </div>
      <span className="rounded px-2 py-1 text-[15px] tracking-[-0.04em] text-[#f7f7f7] transition-all duration-200 group-hover:bg-lime group-hover:text-ink">
        {project.title}
      </span>
    </div>
  )
}

function Window({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.86 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[70vh] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-[0_32px_80px_rgba(0,0,0,0.7)] ${wide ? 'max-w-3xl' : 'max-w-xl'}`}
      >
        <div className="flex h-10 shrink-0 cursor-grab items-center gap-2 border-b border-white/[0.07] px-4">
          <button onClick={onClose} aria-label="Close window" className="size-3 rounded-full bg-[#fd5d5c] hover:brightness-110" />
          <span className="size-3 rounded-full bg-[#fac900]" />
          <span className="size-3 rounded-full bg-[#34c75a]" />
          <span className="mx-auto pr-9 font-mono text-[11px] text-muted">{title}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </motion.div>
    </motion.div>
  )
}

function DockIcon({ label, children, onClick, href }: { label: string; children: ReactNode; onClick?: () => void; href?: string }) {
  const inner = (
    <motion.span
      whileHover={{ scale: 1.12, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="flex size-12 cursor-pointer items-center justify-center rounded-[28%] border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur transition-colors hover:border-lime/40 hover:text-lime"
    >
      {children}
    </motion.span>
  )
  return (
    <div className="group relative flex flex-col items-center">
      <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-paper px-3 py-1.5 text-xs font-medium tracking-[-0.02em] text-ink opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          {inner}
        </a>
      ) : (
        <button onClick={onClick} aria-label={label}>{inner}</button>
      )}
    </div>
  )
}

/** Team & portfolio desk — draggable project cards over a night-sky canvas, with a macOS dock. */
export default function Team() {
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const [window_, setWindow] = useState<'about' | 'team' | null>(null)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ink">
      {/* Night-sky backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(130,181,65,0.08), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(130,181,65,0.05), transparent 60%), #000',
        }}
      />
      <div className="grain absolute inset-0" aria-hidden />
      {/* bottom blur shelf */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-[47%] w-full -translate-x-1/2 backdrop-blur-[10px]"
        style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)' }}
      />

      <div className="pointer-events-none absolute left-1/2 top-24 z-[3] w-full -translate-x-1/2 px-6 text-center">
        <p className="section-label mb-3">[ The Desk ]</p>
        <h1 className="text-3xl font-light tracking-tight text-paper sm:text-4xl">
          Our work, <em className="font-serif font-[350] text-lime">scattered</em> like we left it.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Drag the cards around. Click one to open it. The dock knows the rest.
        </p>
      </div>

      {PROJECTS.slice(0, 6).map((p, i) => (
        <DraggableCard key={p.title} project={p} anchor={ANCHORS[i]} onOpen={() => setOpenProject(p)} />
      ))}

      {/* Dock */}
      <div className="absolute bottom-10 left-1/2 z-[4] flex -translate-x-1/2 items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
        <DockIcon label="About Code@" onClick={() => setWindow('about')}>
          <User size={20} />
        </DockIcon>
        <DockIcon label="Leadership" onClick={() => setWindow('team')}>
          <StickyNote size={20} />
        </DockIcon>
        <span className="h-12 w-px rounded-full bg-white/20" aria-hidden />
        <DockIcon label="Instagram" href="https://www.instagram.com/">
          <InstagramIcon />
        </DockIcon>
        <DockIcon label="X" href="https://www.x.com/">
          <XIcon />
        </DockIcon>
        <DockIcon label="Behance" href="https://www.behance.net/">
          <BehanceIcon />
        </DockIcon>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />

      <AnimatePresence>
        {window_ === 'about' && (
          <Window title="about.md — Code@" onClose={() => setWindow(null)}>
            <p className="text-sm leading-relaxed text-white/70">{COMPANY.about}</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-light text-lime">{s.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-muted">{COMPANY.locations} · {COMPANY.email}</p>
          </Window>
        )}
        {window_ === 'team' && (
          <Window title="leadership.md — Code@" onClose={() => setWindow(null)}>
            <div className="flex flex-col gap-4">
              {TEAM.map((m) => (
                <div key={m.name} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="flex size-12 items-center justify-center rounded-full bg-lime font-mono text-lg font-semibold text-ink">
                    {m.name[0]}
                  </span>
                  <div>
                    <p className="text-lg font-medium text-paper">{m.name}</p>
                    <p className="text-sm text-muted">{m.role}</p>
                  </div>
                </div>
              ))}
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Two founders, one standard: build the most impressive IT &amp; AI solutions company in Iraq — and prove
                it with every launch.
              </p>
            </div>
          </Window>
        )}
      </AnimatePresence>
    </div>
  )
}
