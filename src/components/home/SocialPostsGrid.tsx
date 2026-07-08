import { useEffect, useRef, useState } from 'react'
import { Sparkles, Zap, ArrowRight, Star } from 'lucide-react'
import FadeUp from '@/components/FadeUp'

const V = {
  ai: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260407_080531_1fe9b14c-9396-4b78-9372-42f4ddbd74c7.mp4',
  insights: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
  smarter: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_153826_e9005cf7-a1c7-4c7d-886f-fea22d644a9c.mp4',
  focus: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
  eternal: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4',
  bloom: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4',
}

const CARD = 'relative h-[384px] w-[384px] shrink-0 overflow-hidden rounded-xl'

function CardOne() {
  return (
    <div className={`${CARD} flex flex-col justify-between bg-black p-7`}>
      <video src={V.ai} autoPlay loop muted playsInline className="pointer-events-none absolute right-0 top-0 h-3/4 object-cover" style={{ transform: 'scaleX(-1)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="font-condiment text-sm tracking-wide text-amber-400">The Future Is Now</span>
        </div>
        <h3 className="font-grotesk text-[32px] uppercase leading-[1.05] tracking-tight text-white">
          Simplify<br />Your Work<br /><span className="text-amber-400">With AI</span>
        </h3>
      </div>
      <div className="relative z-10">
        <p className="mb-4 font-mono text-[10px] leading-relaxed text-white/60">
          Automate repetitive tasks, generate content in seconds, and let intelligent tools handle the heavy lifting — so you can focus on what truly matters.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/20">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">AI Powered</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="font-grotesk text-[10px] uppercase tracking-wide text-white">Learn More</span>
            <ArrowRight className="h-3.5 w-3.5 text-white" />
          </span>
        </div>
      </div>
    </div>
  )
}

function CardTwo() {
  return (
    <div className={`${CARD} bg-black`}>
      <video src={V.insights} autoPlay loop muted playsInline className="absolute inset-0 z-0 size-full object-cover" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-black/80" />
      <div className="relative z-10 flex h-full flex-col justify-between p-7">
        <div>
          <div className="liquid-glass animate-fade-rise mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-1.5">
            <span className="rounded-md bg-white px-1.5 py-0.5 text-[7px] font-medium text-black">New</span>
            <span className="font-inter text-[7px] font-medium text-white/60">Say Hello to Corewave v3.2</span>
          </div>
          <h3 className="animate-fade-rise-delay font-inter text-[36px] font-medium leading-[1.05] text-white" style={{ letterSpacing: '-1.5px' }}>
            Your Insights.<br />One Clear <em className="font-instrument font-normal italic text-white/80">Overview.</em>
          </h3>
          <p className="animate-fade-rise-delay-2 mt-3 max-w-[240px] font-inter text-[8.5px] leading-relaxed opacity-90" style={{ color: '#d4d8e8' }}>
            Neuralyn helps teams track metrics, goals, and progress with precision.
          </p>
        </div>
        <div className="animate-fade-rise-delay-2 flex items-center gap-3">
          <span className="font-inter text-[9px] font-semibold tracking-tight text-white/30">Neuralyn</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
          <span className="font-inter text-[7px] uppercase tracking-widest text-white/20">Analytics</span>
        </div>
      </div>
    </div>
  )
}

function CardThree() {
  return (
    <div className={`${CARD} bg-white font-inter`}>
      <video src={V.smarter} autoPlay loop muted playsInline className="pointer-events-none absolute inset-0 size-full object-cover pt-[140px]" />
      <div className="absolute left-0 right-0 z-10" style={{ top: 140, height: 120, background: 'linear-gradient(to bottom, white 0%, transparent 100%)' }} />
      <div className="relative z-20 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-start px-5 pt-10 text-center">
          <div className="animate-fade-in-up mb-2 flex items-center gap-1 opacity-0" style={{ animationDelay: '0.1s' }}>
            <Star className="h-3 w-3 fill-black text-black" />
            <span className="text-[8px] font-medium text-black">Stellar.ai</span>
          </div>
          <h3 className="animate-fade-in-up mb-2.5 text-[30px] font-normal leading-[1.08] tracking-tight text-black opacity-0" style={{ animationDelay: '0.2s' }}>
            Work Smarter.<br />Move Faster.<br />
            <span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">AI Powers You Up.</span>
          </h3>
          <p className="animate-fade-in-up max-w-[240px] text-[9px] leading-relaxed text-gray-500 opacity-0" style={{ animationDelay: '0.3s' }}>
            Intelligent automation syncs with the tools you love to streamline tasks, boost output, and save time.
          </p>
        </div>
        <div className="animate-fade-in-up flex flex-col items-center gap-2 pb-4 opacity-0" style={{ animationDelay: '0.4s' }}>
          <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[7px] font-medium text-white backdrop-blur-md">
            Collaborating with top aerospace pioneers globally
          </span>
          <div className="flex gap-5">
            {['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'].map((b) => (
              <span key={b} className="text-base italic tracking-tight text-white" style={{ fontFamily: 'Georgia, serif' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CardFour() {
  return (
    <div className={`${CARD} bg-black`}>
      <video src={V.focus} autoPlay loop muted playsInline className="absolute inset-0 z-0 size-full object-cover" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-7">
        <h3 className="animate-fade-rise font-instrument text-[32px] leading-[0.95] tracking-tight text-white">
          Focus in a<br />Distracted World
        </h3>
        <p className="animate-fade-rise-delay mt-3 max-w-[220px] font-inter text-[8px] leading-relaxed text-white/70">
          Designing tools for deep thinkers, bold creators, and quiet rebels. Digital spaces for sharp focus and inspired work.
        </p>
        <p className="animate-fade-rise-delay-2 mt-4 font-instrument text-[10px] tracking-tight text-white/25">
          Velorah<sup style={{ fontSize: 5 }}>®</sup>
        </p>
      </div>
    </div>
  )
}

/** Video with soft fade in/out at loop boundaries instead of a hard cut. */
function CardFive() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const FADE = 0.5
    let raf = 0
    const tick = () => {
      if (v.duration) {
        const t = v.currentTime
        if (t < FADE) v.style.opacity = String(t / FADE)
        else if (v.duration - t < FADE) v.style.opacity = String(Math.max(0, (v.duration - t) / FADE))
        else v.style.opacity = '1'
      }
      raf = requestAnimationFrame(tick)
    }
    const onEnded = () => {
      v.style.opacity = '0'
      setTimeout(() => { v.currentTime = 0; v.play().catch(() => {}) }, 100)
    }
    v.addEventListener('ended', onEnded)
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); v.removeEventListener('ended', onEnded) }
  }, [])
  return (
    <div className={`${CARD} bg-white`}>
      <div className="absolute inset-x-0 bottom-0" style={{ top: 140 }}>
        <video ref={videoRef} src={V.eternal} autoPlay muted playsInline className="size-full object-cover" style={{ opacity: 0 }} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, white 0%, white 20%, transparent 45%, transparent 65%, white 90%, white 100%)' }} />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <h3 className="animate-fade-rise font-instrument text-[34px] leading-[0.95] text-black" style={{ letterSpacing: '-0.8px' }}>
          Beyond <em style={{ color: '#6F6F6F' }}>silence,</em><br />we build <em style={{ color: '#6F6F6F' }}>the eternal.</em>
        </h3>
        <p className="animate-fade-rise-delay mt-3 max-w-[230px] font-inter text-[8px] leading-relaxed" style={{ color: '#6F6F6F' }}>
          Platforms for deep thinkers and fearless makers. Digital havens for focused work and pure creative flow.
        </p>
        <p className="animate-fade-rise-delay-2 mt-5 font-instrument text-[10px] tracking-tight text-black/30">
          Aethera<sup style={{ fontSize: 5 }}>®</sup>
        </p>
      </div>
    </div>
  )
}

function CardSix() {
  return (
    <div className={`${CARD} bg-black`}>
      <video src={V.bloom} autoPlay loop muted playsInline className="absolute inset-0 z-0 size-full object-cover" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-white/50" />
          <span className="font-poppins text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">AI-Powered Floral Design</span>
        </div>
        <div>
          <h3 className="animate-fade-rise font-poppins text-[38px] font-medium leading-[0.95] text-white" style={{ letterSpacing: '-0.05em' }}>
            Innovating the<br /><em className="font-source-serif font-medium italic text-white/80">spirit of</em> bloom
          </h3>
          <p className="animate-fade-rise-delay mt-3 max-w-[200px] font-poppins text-[8px] leading-relaxed text-white/50">
            Where artificial intelligence meets nature&apos;s artistry. Sculpting living compositions beyond imagination.
          </p>
          <div className="animate-fade-rise-delay-2 mt-4 flex gap-2">
            {['AI Generation', '3D Structures'].map((l) => (
              <span key={l} className="liquid-glass rounded-full px-3 py-1 font-poppins text-[7px] text-white/80">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** "A curation of our posts" — six social-media post cards over an ambient backdrop. */
export default function SocialPostsGrid() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)

  // Mount the six videos only when the section approaches the viewport.
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLive(true); io.disconnect() } },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={hostRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-x-auto bg-ink py-24"
      style={{
        backgroundImage: "url('/bg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="mb-14 px-6 text-center">
        <FadeUp>
          <p className="section-label mb-5">[ Social ]</p>
          <h2 className="text-4xl font-light leading-[1.08] tracking-tight text-paper sm:text-5xl">
            A curation of <em className="font-serif font-[350] text-lime">our posts</em>.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
            Motion-first social content we design and animate for brands — six recent pieces from the feed.
          </p>
        </FadeUp>
      </div>

      {live && (
        <div className="grid shrink-0 gap-4 px-6" style={{ gridTemplateColumns: 'repeat(auto-fit, 384px)', justifyContent: 'center', maxWidth: 1300 }}>
          <CardOne />
          <CardTwo />
          <CardThree />
          <CardFour />
          <CardFive />
          <CardSix />
        </div>
      )}
    </section>
  )
}
