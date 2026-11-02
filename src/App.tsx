import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CursorGlow from '@/components/CursorGlow'
// Home is the landing + LCP page, so it ships in the main bundle for an
// instant first paint. Every other route is code-split, so the initial
// download no longer carries pages the visitor may never open.
// The heavy Spline runtime stays lazy inside LazySpline.
import Home from '@/pages/Home'
const Services = lazy(() => import('@/pages/Services'))
const Solutions = lazy(() => import('@/pages/Solutions'))
const Portfolio = lazy(() => import('@/pages/Portfolio'))
const UiUx = lazy(() => import('@/pages/UiUx'))
const AiStudio = lazy(() => import('@/pages/AiStudio'))
const Security = lazy(() => import('@/pages/Security'))
const Team = lazy(() => import('@/pages/Team'))
const ComingSoon = lazy(() => import('@/pages/ComingSoon'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': { title: 'Code@ — Engineering Software At The Speed Of Innovation', description: 'Code@ builds scalable software, AI systems, web & mobile apps and digital products for ambitious companies. Baghdad · Dubai · Remote.' },
  '/services': { title: 'Services — Code@', description: 'Custom software, web & mobile development, AI, cloud, UI/UX, ERP/CRM and cyber security — engineered end-to-end by Code@.' },
  '/solutions': { title: 'Solutions — Code@', description: 'Tailored software and AI solutions engineered around your operations and growth. See how Code@ solves hard problems.' },
  '/portfolio': { title: 'Portfolio — Code@', description: 'Selected work from Code@ — web platforms, AI products, dashboards and digital experiences shipped for clients worldwide.' },
  '/uiux': { title: 'UI/UX Design — Code@', description: 'UI/UX design at Code@ — design systems and interfaces that feel inevitable, designed and engineered under one roof.' },
  '/ai-studio': { title: 'AI Studio — Code@', description: 'Code@ AI Studio — LLM copilots, RAG pipelines, computer vision, predictive systems and AI-generated art for brands.' },
  '/security': { title: 'Security — Code@', description: 'Cyber security at Code@ — threat modeling, hardening, audits and continuous protection built into every engagement.' },
  '/team': { title: 'Team — Code@', description: 'Meet Code@ — two founders building the most impressive IT & AI solutions company in Iraq. See our work and get in touch.' },
}

/** Sets per-route <title>, meta description and canonical link (client-side). */
function RouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META['/']
    document.title = meta.title
    let desc = document.head.querySelector('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      document.head.appendChild(desc)
    }
    desc.setAttribute('content', meta.description)
    const url = 'https://www.code-at.com' + (pathname === '/' ? '/' : pathname)
    let canon = document.head.querySelector('link[rel="canonical"]')
    if (!canon) {
      canon = document.createElement('link')
      canon.setAttribute('rel', 'canonical')
      document.head.appendChild(canon)
    }
    canon.setAttribute('href', url)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <CursorGlow />
      <ScrollToTop />
      <RouteMeta />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-ink" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/uiux" element={<UiUx />} />
          <Route path="/ai-studio" element={<AiStudio />} />
          <Route path="/security" element={<Security />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
