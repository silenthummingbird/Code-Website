import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CursorGlow from '@/components/CursorGlow'
// Pages are bundled eagerly: route changes never wait on (or fail over) a
// network chunk fetch, so client-side nav is instant and refresh-proof.
// The heavy Spline runtime stays lazy inside LazySpline.
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import Solutions from '@/pages/Solutions'
import Portfolio from '@/pages/Portfolio'
import UiUx from '@/pages/UiUx'
import AiStudio from '@/pages/AiStudio'
import Security from '@/pages/Security'
import Team from '@/pages/Team'
import ComingSoon from '@/pages/ComingSoon'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <CursorGlow />
      <ScrollToTop />
      <Navbar />
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
      <Footer />
    </>
  )
}
