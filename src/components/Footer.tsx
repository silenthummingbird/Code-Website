import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { COMPANY, NAV_LINKS } from '@/lib/data'
import FadeUp from '@/components/FadeUp'

export default function Footer() {
  return (
    <footer className="relative border-t border-stroke bg-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
        <FadeUp>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="section-label mb-6">[ Contact ]</p>
              <h2 className="text-4xl font-light leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
                Let&apos;s build something{' '}
                <em className="font-serif font-[350] text-lime">exceptional</em> together.
              </h2>
              <p className="mt-5 text-muted">Start a conversation. We reply within one business day.</p>
              <a
                href={`mailto:${COMPANY.email}`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
              >
                {COMPANY.email}
                <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Explore</p>
                <ul className="space-y-2.5">
                  {[{ label: 'Work', to: '/' }, ...NAV_LINKS].map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm text-white/70 transition-colors hover:text-lime">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Reach us</p>
                <ul className="space-y-2.5 text-sm text-white/70">
                  <li className="flex items-center gap-2"><Mail size={13} className="text-lime" /> {COMPANY.email}</li>
                  <li className="flex items-center gap-2"><Phone size={13} className="text-lime" /> {COMPANY.phone}</li>
                  <li className="flex items-center gap-2"><MapPin size={13} className="text-lime" /> {COMPANY.locations}</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-stroke pt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-muted sm:flex-row sm:items-center">
          <span>© 2026 Code@. All rights reserved.</span>
          <span>Made with precision. Baghdad · Dubai · Remote</span>
        </div>
      </div>
    </footer>
  )
}
