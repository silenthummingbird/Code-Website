import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/data'
import { cn } from '@/lib/utils'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Code@ home">
      <span className="flex size-8 items-center justify-center rounded-full bg-lime font-mono text-[17px] font-semibold text-ink transition-transform duration-300 group-hover:rotate-12">
        @
      </span>
      <span className="text-xl font-semibold tracking-tight text-paper">
        Code<span className="text-lime">@</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 lg:px-10">
          <Logo />

          <div className="hidden items-center gap-1 rounded-full bg-white/[0.06] px-2 py-1.5 backdrop-blur-md lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-1.5 text-sm transition-all duration-200',
                    isActive ? 'bg-lime text-ink font-medium' : 'text-white/75 hover:bg-white/10 hover:text-white',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="mailto:hello@codeat.io"
              className="hidden rounded-full bg-lime px-5 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:brightness-110 active:scale-[0.97] lg:block"
            >
              Start a Project
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="relative flex size-10 items-center justify-center rounded-full transition-colors lg:hidden"
              style={{ backgroundColor: open ? '#1a1a1a' : 'rgba(255,255,255,0.06)' }}
            >
              <span className="relative block h-[10px] w-4">
                <motion.span
                  animate={open ? { rotate: 45, y: 4.25 } : { rotate: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-white"
                />
                <motion.span
                  animate={open ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-0 top-[4.25px] h-[1.5px] w-full rounded-full bg-white"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -4.25 } : { rotate: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-white"
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-black/95 px-10 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
              }}
              className="flex flex-col gap-7"
            >
              {[{ label: 'Work', to: '/' }, ...NAV_LINKS].map((l) => (
                <motion.div
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, x: 32, filter: 'blur(4px)' },
                    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 120, damping: 20 } },
                  }}
                >
                  <Link
                    to={l.to}
                    className="group flex items-center gap-3 text-3xl font-light tracking-tight text-white"
                  >
                    <span className="font-mono text-xs text-lime opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
                }}
                className="mt-6"
              >
                <a
                  href="mailto:hello@codeat.io"
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink"
                >
                  Start a Project <ArrowRight size={15} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
