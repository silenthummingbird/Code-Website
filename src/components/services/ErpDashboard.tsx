import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Plus, Zap, MoreHorizontal, BarChart2, Video, VideoOff, Mic, MicOff, Search, Play, X } from 'lucide-react'

const VIDEO_LIGHT = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_103318_2aa26b55-df1a-43a6-903d-941e718c9366.mp4'
const VIDEO_DARK = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4'

const av = (u: string) => `https://i.pravatar.cc/100?u=${u}`
const BLUE_BARS = [35, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 80, 65, 55, 45, 70, 60, 75, 55, 65, 50, 75, 60, 55]
const GREY_BARS = [45, 70, 60, 75, 55, 65, 50, 75, 60, 85, 70, 55, 45, 70, 60, 75, 55, 65, 50, 75, 60, 55, 45, 70, 60, 75, 55, 65, 50, 75, 60, 55, 45, 70, 60, 75]

function Avatars({ users, count, dark }: { users: string[]; count: string; dark: boolean }) {
  return (
    <div className="flex items-center">
      {users.map((u, i) => (
        <img key={u} src={av(u)} alt="" className="size-8 rounded-full border-2 border-white/40 object-cover" style={{ marginLeft: i ? -12 : 0 }} />
      ))}
      <span className={`ml-2 flex size-[38px] items-center justify-center rounded-full text-xs font-medium ${dark ? 'bg-white/10 text-white' : 'bg-black/[0.08] text-black'}`}>{count}</span>
    </div>
  )
}

function Card({ children, glass, dark, alt }: { children: ReactNode; glass?: boolean; dark: boolean; alt?: boolean }) {
  const base = 'relative flex flex-col rounded-[40px] p-7 px-5 transition-transform duration-300 hover:-translate-y-[3px] hover:scale-[1.01]'
  if (glass) return <div className={`${base} erp-glass`} style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.18)', backdropFilter: 'blur(8px) saturate(1.8)' }}>{children}</div>
  return (
    <div
      className={base}
      style={{
        background: alt
          ? dark ? 'linear-gradient(to bottom, #202020 0%, #1a1a1a 50%)' : 'linear-gradient(to bottom, #f4f4f4 0%, #ffffff 50%, #ffffff 100%)'
          : dark ? 'rgba(26,26,26,0.98)' : '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.01)',
      }}
    >
      {children}
    </div>
  )
}

function VoiceDot() {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex size-[18px] items-center justify-center gap-[2px] rounded-full bg-white shadow">
      {[0, 0.2, 0.4].map((d) => (
        <span key={d} className="w-[2px] rounded bg-[#4b5563]" style={{ animation: `voice-wave 1s ease-in-out ${d}s infinite`, height: 4 }} />
      ))}
    </span>
  )
}

/** Conference/ops dashboard mock — fixed 1240×760 canvas scaled to fit its host. */
export default function ErpDashboard() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  const [dark, setDark] = useState(false)
  const [view, setView] = useState<'dashboard' | 'rooms'>('rooms')
  const [videoOff, setVideoOff] = useState(false)
  const [muted, setMuted] = useState(false)
  const [alertOpen, setAlertOpen] = useState(true)
  const W = 1240
  const H = 760

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(e.contentRect.width / W, e.contentRect.height / H)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const text = dark ? '#fff' : '#1a1a1a'
  const mutedText = dark ? '#b0b0b0' : '#6b7280'
  const pill = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'

  const cardTitle = (t: string, s?: string, icon?: ReactNode) => (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[1.35rem] font-normal leading-tight" style={{ letterSpacing: '-0.03em', color: text }}>{t}</p>
        {s && <p className="mt-1 text-xs" style={{ color: mutedText }}>{s}</p>}
      </div>
      {icon && <span style={{ color: text, opacity: 0.5 }}>{icon}</span>}
    </div>
  )

  return (
    <div ref={hostRef} className={`relative flex aspect-[1240/700] w-full items-center justify-center overflow-hidden rounded-[28px] border border-white/10 ${dark ? 'erp-dark' : ''}`}>
      {/* background video */}
      <video key={dark ? 'd' : 'l'} src={dark ? VIDEO_DARK : VIDEO_LIGHT} autoPlay muted loop playsInline className="absolute inset-0 -z-0 size-full object-cover" />

      <div className="relative shrink-0" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'center center', fontFamily: 'Inter, sans-serif' }}>
        <div className="flex h-full flex-col px-10 py-8">
          {/* Top nav */}
          <div className="mb-8 grid items-center gap-4" style={{ gridTemplateColumns: 'auto auto 1fr auto auto' }}>
            <img src={av('current_user')} alt="You" className="size-12 rounded-full object-cover ring-2 ring-white/40" />

            <div className="flex items-center gap-2 rounded-full p-1" style={{ background: pill, backdropFilter: 'blur(8px)' }}>
              {/* mode switch */}
              <button onClick={() => setDark(!dark)} aria-label="Toggle theme" className="relative h-12 w-[88px] rounded-full bg-white shadow-inner">
                <span className="absolute left-1.5 top-1 h-10 w-[76px] rounded-full bg-[#82B541]" />
                <span
                  className="absolute right-2.5 top-2 z-10 size-8 rounded-full bg-white shadow transition-transform duration-400"
                  style={{ transform: dark ? 'translateX(-36px)' : 'none', transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
                />
                <span className="absolute left-4 top-1/2 z-20 -translate-y-1/2 text-sm transition-transform duration-400" style={{ transform: dark ? 'translateX(42px) translateY(-50%)' : 'translateY(-50%)' }}>
                  {dark ? '☾' : '☀'}
                </span>
              </button>
              <span className="rounded-full px-6 py-2.5 text-sm" style={{ background: pill, color: text, backdropFilter: 'blur(8px)' }}>Settings</span>
            </div>

            {/* meeting alert */}
            <div className="flex justify-center">
              {alertOpen && (
                <div className="flex items-center gap-3 rounded-full bg-white py-1.5 pl-4 pr-1.5" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <img src={av('meeting_host')} alt="" className="size-8 rounded-full object-cover" />
                  <span className="text-sm text-black">Meeting is about to start</span>
                  <span className="rounded-full px-2.5 py-1 text-xs text-black" style={{ background: '#f0f0f0' }}>-5:23</span>
                  <button onClick={() => setAlertOpen(false)} aria-label="Dismiss" className="relative flex size-8 items-center justify-center">
                    <svg viewBox="0 0 32 32" className="absolute inset-0 -rotate-90">
                      <circle cx="16" cy="16" r="14" stroke="#e5e5e5" strokeWidth="2" fill="none" />
                      <circle cx="16" cy="16" r="14" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="88" strokeDashoffset="25" />
                    </svg>
                    <X size={12} className="text-black" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 rounded-full p-1" style={{ background: pill, backdropFilter: 'blur(8px)' }}>
              {(['dashboard', 'rooms'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="rounded-full px-5 py-2 text-sm capitalize transition-all"
                  style={view === v ? { background: '#fff', color: '#000', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } : { color: text }}
                >
                  {v}
                </button>
              ))}
            </div>

            <span className="flex size-12 items-center justify-center rounded-full" style={{ background: pill, color: text, backdropFilter: 'blur(8px)' }}>
              <Search size={18} />
            </span>
          </div>

          {/* Grid */}
          <div className="grid flex-1 grid-cols-4 grid-rows-2 gap-6">
            <Card glass dark={dark}>
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-white">
                <Plus size={32} />
                <span className="text-sm">Create a room</span>
              </div>
            </Card>

            <Card dark={dark}>
              {cardTitle('Subscription Growth Experiments', 'Sprint Retrospective', <Zap size={16} />)}
              <div className="mt-auto"><Avatars users={['1', '2', '3']} count="9" dark={dark} /></div>
            </Card>

            <Card dark={dark}>
              {cardTitle('Weekly Insights')}
              <div className="mt-4 flex h-[60px] items-end gap-[2px]">
                {BLUE_BARS.map((h, i) => <span key={`b${i}`} className="flex-1 rounded-sm bg-[#82B541]" style={{ height: `${h}%` }} />)}
                {GREY_BARS.map((h, i) => <span key={`g${i}`} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: dark ? '#333' : '#e5e7eb' }} />)}
              </div>
              <div className="mb-2 mt-2 flex justify-between px-5">
                <img src={av('m1')} alt="" className="size-[18px] rounded-full border border-white" />
                <span className="flex">
                  <img src={av('m2')} alt="" className="-mr-2 size-[18px] rounded-full border border-white" />
                  <img src={av('m3')} alt="" className="size-[18px] rounded-full border border-white" />
                </span>
                <span className="flex">
                  <img src={av('m4')} alt="" className="-mr-2 size-[18px] rounded-full border border-white" />
                  <img src={av('m5')} alt="" className="size-[18px] rounded-full border border-white" />
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <Avatars users={['large1', 'large2']} count="+" dark={dark} />
                <span className="flex size-[54px] items-center justify-center rounded-full" style={{ background: 'rgba(245,245,245,0.85)' }}>
                  <Play size={20} className="fill-black text-black" />
                </span>
              </div>
            </Card>

            <Card glass dark={dark}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[1.35rem] text-white" style={{ letterSpacing: '-0.03em' }}>Product Strategy 2023</p>
                  <p className="mt-1 text-xs text-white/60">No upcoming meetings</p>
                </div>
                <MoreHorizontal size={16} className="text-white/50" />
              </div>
              <div className="mt-auto"><Avatars users={['6']} count="32" dark={dark} /></div>
            </Card>

            <Card dark={dark}>
              {cardTitle('User Onboarding Team', 'Sprint Planning', <BarChart2 size={16} />)}
              <div className="mt-auto"><Avatars users={['7', '8', '9']} count="3" dark={dark} /></div>
            </Card>

            <Card glass dark={dark}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[1.35rem] text-white" style={{ letterSpacing: '-0.03em' }}>User &amp; Market Research</p>
                  <p className="mt-1 text-xs text-white/60">No upcoming meetings</p>
                </div>
                <MoreHorizontal size={16} className="text-white/50" />
              </div>
              <div className="mt-auto"><Avatars users={['10']} count="6" dark={dark} /></div>
            </Card>

            <Card dark={dark}>
              {cardTitle('Core Product Team', 'Core Product Team', <Video size={16} />)}
              <div className="mt-auto"><Avatars users={['11', '12']} count="2" dark={dark} /></div>
            </Card>

            <Card dark={dark} alt>
              <div className="flex gap-2">
                <span className="rounded-full bg-white px-3.5 py-1.5 text-xs text-[#82B541]" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>Screen Share</span>
                <span className="rounded-full bg-white px-3.5 py-1.5 text-xs text-black" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>0:30</span>
              </div>
              <div className="no-scrollbar -mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="relative h-[100px] w-[160px] shrink-0 overflow-hidden rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(https://picsum.photos/seed/screen${n}/300/200)` }}>
                    {n === 2 && (
                      <span className="absolute bottom-2 right-2 flex items-center gap-1">
                        <img src={av('alice_av')} alt="" className="size-6 rounded-full border border-white" />
                        <span className="rounded-full px-2 py-0.5 text-[0.65rem] text-white" style={{ background: '#e05e36' }}>Alice</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-auto"><Avatars users={['13', '14']} count="8" dark={dark} /></div>
            </Card>
          </div>

          {/* indicators */}
          <div className="mt-6 flex justify-center gap-4">
            <span className="size-3 rounded-full bg-white" />
            <span className="size-3 rounded-full bg-white opacity-30" />
            <span className="size-3 rounded-full bg-white opacity-30" />
          </div>
        </div>

        {/* bottom participant bar */}
        <div className="erp-glass absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full px-4 py-2.5">
          <span className="relative">
            <img src={av('speaker')} alt="Active speaker" className="size-11 rounded-full object-cover" />
            <VoiceDot />
          </span>
          <img src={av('p1')} alt="" className="size-10 rounded-full object-cover opacity-70" />
          <span className="relative">
            <img src={av('p2')} alt="" className="size-10 rounded-full object-cover" />
            <VoiceDot />
          </span>
          <img src={av('p3')} alt="" className="size-10 rounded-full object-cover" />
          <span className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: 'rgba(255,255,255,0.25)' }}>+17</span>
        </div>

        {/* components button */}
        <div className="absolute bottom-6 left-8 grid grid-cols-2 gap-1 rounded-[14px] p-1.5" style={{ background: pill, backdropFilter: 'blur(8px)' }}>
          {['c1', 'c2', 'c3', 'c4'].map((u) => <img key={u} src={av(u)} alt="" className="size-4 rounded-full object-cover" />)}
        </div>

        {/* floating controls */}
        <div className="absolute bottom-6 right-8 flex items-center gap-3 rounded-full px-3.5 py-2.5" style={{ background: pill, backdropFilter: 'blur(8px)' }}>
          <button
            onClick={() => setVideoOff(!videoOff)}
            aria-label="Toggle camera"
            className="flex size-11 items-center justify-center rounded-full transition-transform hover:scale-[1.08]"
            style={videoOff ? { background: '#ff4545', color: '#fff' } : { background: '#fff', color: '#000' }}
          >
            {videoOff ? <VideoOff size={18} /> : <Video size={18} />}
          </button>
          <button
            onClick={() => setMuted(!muted)}
            aria-label="Toggle microphone"
            className="flex size-11 items-center justify-center rounded-full transition-transform hover:scale-[1.08]"
            style={muted ? { background: '#ff4545', color: '#fff' } : { background: '#fff', color: '#000' }}
          >
            {muted ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}
