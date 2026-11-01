// Code@ site content — sourced from the founder-written Lovable copy.

export const COMPANY = {
  name: 'Code@',
  tagline: 'Engineering Software At The Speed Of Innovation',
  sub: 'We build scalable software solutions, AI systems, web applications, mobile apps and digital products that help businesses grow faster.',
  about:
    'Code@ is a software solutions company focused on delivering modern digital experiences, enterprise systems, AI-powered products and custom software with exceptional quality and performance.',
  // NOTE: set to match the live domain (code-at.com). Confirm this mailbox exists.
  email: 'hello@code-at.com',
  phone: '+964 000 000 000',
  locations: 'Baghdad · Dubai · Remote',
}

export const STATS = [
  { value: '12+', label: 'Years of Combined Craft' },
  { value: '80+', label: 'Products Shipped' },
  { value: '96%', label: 'Client Retention' },
]

export interface Service {
  num: string
  title: string
  desc: string
  slug: string
}

export const SERVICES: Service[] = [
  { num: '01', title: 'Custom Software', desc: 'Tailored platforms engineered around your operations and growth.', slug: 'custom-software' },
  { num: '02', title: 'Web Development', desc: 'High-performance web experiences built with modern stacks.', slug: 'web-development' },
  { num: '03', title: 'Mobile Applications', desc: 'Native-feel iOS & Android apps with premium interaction.', slug: 'mobile' },
  { num: '04', title: 'Artificial Intelligence', desc: 'LLM copilots, RAG, computer vision and predictive systems.', slug: 'ai' },
  { num: '05', title: 'Cloud Solutions', desc: 'Resilient cloud architecture, DevOps and platform engineering.', slug: 'cloud' },
  { num: '06', title: 'UI/UX Design', desc: 'Design systems and interfaces that feel inevitable.', slug: 'design' },
  { num: '07', title: 'ERP & CRM Systems', desc: 'Operational backbones that align teams and data at scale.', slug: 'erp-crm' },
  { num: '08', title: 'Cyber Security', desc: 'Threat modeling, hardening and continuous protection.', slug: 'security' },
]

export interface Project {
  title: string
  client: string
  preview: string
  /** Live-site screenshot for the MacBook preview; falls back to `preview`. */
  screenshot?: string
  url?: string
  tags: string[]
}

// Live client work + studio products.
// NOTE: `preview` images are self-hosted on-brand placeholders in
// public/placeholders/. To publish a real project, swap `preview` (and
// optionally `screenshot`) for its real optimized asset — nothing else changes.
export const PROJECTS: Project[] = [
  {
    title: 'Makasib Al-Khair',
    client: 'Agricultural Solutions — Iraq',
    preview: '/placeholders/proj-01.svg',
    screenshot: '/screenshots/makasib.webp',
    url: 'https://makasibalkhair.com/',
    tags: ['Web', 'Bilingual AR/EN', 'E-commerce'],
  },
  {
    title: 'Shift Iraq',
    client: 'Shift — Iraq',
    preview: '/placeholders/proj-02.svg',
    url: 'https://shift-iraq.com/',
    tags: ['Web', 'Brand', 'Platform'],
  },
  {
    title: 'Nova Analytics',
    client: 'Helix Financial',
    preview: '/placeholders/proj-03.svg',
    tags: ['Data', 'Dashboards', 'AI'],
  },
  {
    title: 'Ledger One',
    client: 'Bay Bank',
    preview: '/placeholders/proj-04.svg',
    tags: ['Fintech', 'Security', 'Mobile'],
  },
  {
    title: 'Atelier Commerce',
    client: 'Maison Ora',
    preview: '/placeholders/proj-05.svg',
    tags: ['E-commerce', 'UI/UX'],
  },
  {
    title: 'Signal AI',
    client: 'Northwind Labs',
    preview: '/placeholders/proj-06.svg',
    tags: ['AI', 'LLM', 'RAG'],
  },
  {
    title: 'Orbit ERP',
    client: 'Sarco Industries',
    preview: '/placeholders/proj-07.svg',
    tags: ['ERP', 'Enterprise'],
  },
  {
    title: 'Nimbus Cloud',
    client: 'Kepler Systems',
    preview: '/placeholders/proj-08.svg',
    tags: ['Cloud', 'DevOps'],
  },
]

export const MARQUEE_ROW_1 = [
  '/placeholders/tile-01.svg',
  '/placeholders/tile-02.svg',
  '/placeholders/tile-03.svg',
  '/placeholders/tile-04.svg',
  '/placeholders/tile-05.svg',
  '/placeholders/tile-06.svg',
  '/placeholders/tile-07.svg',
  '/placeholders/tile-08.svg',
  '/placeholders/tile-09.svg',
  '/placeholders/tile-10.svg',
  '/placeholders/tile-11.svg',
]

export const MARQUEE_ROW_2 = [
  '/placeholders/tile-12.svg',
  '/placeholders/tile-09.svg',
  '/placeholders/tile-06.svg',
  '/placeholders/tile-03.svg',
  '/placeholders/tile-11.svg',
  '/placeholders/tile-08.svg',
  '/placeholders/tile-05.svg',
  '/placeholders/tile-02.svg',
  '/placeholders/tile-10.svg',
  '/placeholders/tile-07.svg',
]

export const TEAM = [
  { name: 'Saif', role: 'Co-Founder / Managing Director' },
  { name: 'Taha', role: 'Co-Founder / Technical Director' },
]

export type FaqCategory = 'general' | 'services' | 'security'

export const FAQ_CATEGORIES: { key: FaqCategory; label: string }[] = [
  { key: 'general', label: 'General' },
  { key: 'services', label: 'Services & Process' },
  { key: 'security', label: 'Security & Support' },
]

export const FAQS: Record<FaqCategory, { q: string; a: string }[]> = {
  general: [
    { q: 'What is Code@?', a: 'Code@ is a software solutions studio building the digital backbone of ambitious companies — scalable software, AI systems, web and mobile products engineered with exceptional quality.' },
    { q: 'Where are you based?', a: 'We operate from Baghdad and Dubai, and work remotely with clients worldwide. We are building the most impressive IT and AI solutions company in Iraq.' },
    { q: 'Who have you worked with?', a: 'Our portfolio spans enterprise clients including Toyota Iraq, fintech, agriculture, e-commerce and AI-driven startups — over 80 products shipped with 96% client retention.' },
    { q: 'How fast can you deliver?', a: 'We engineer software at the speed of innovation. Discovery to first release typically runs in weeks, not months, without compromising quality.' },
    { q: 'How do we start?', a: 'Start a conversation at hello@code-at.com. We reply within one business day with a clear next step.' },
  ],
  services: [
    { q: 'What services do you offer?', a: 'Custom software, web development, mobile applications, artificial intelligence, cloud solutions, UI/UX design, ERP & CRM systems, and cyber security.' },
    { q: 'Do you build AI products?', a: 'Yes — LLM copilots, RAG pipelines, computer vision, predictive systems, and AI avatars & generated art for brands.' },
    { q: 'Can you take over an existing codebase?', a: 'Absolutely. We audit, stabilize and extend existing systems — or rebuild them on modern stacks when that is the smarter investment.' },
    { q: 'Do you do design as well as engineering?', a: 'Yes. Design systems and interfaces that feel inevitable — designed and engineered under one roof so nothing is lost in translation.' },
    { q: 'What does your process look like?', a: 'Discovery → design → build → launch → iterate. You get a dedicated team, weekly demos, and a live staging environment from week one.' },
  ],
  security: [
    { q: 'How do you approach security?', a: 'Threat modeling, hardening and continuous protection are built into every engagement — not bolted on at the end.' },
    { q: 'Is my data safe with you?', a: 'Yes. Data is encrypted in transit and at rest, access is least-privilege, and we sign NDAs before any discovery call.' },
    { q: 'Do you offer ongoing support?', a: 'Every launch includes a support window, and most clients continue with a monthly engineering retainer for evolution and monitoring.' },
    { q: 'What about uptime and reliability?', a: 'We architect for high availability with automated monitoring, backups and incident response runbooks.' },
    { q: 'Can you audit our current systems?', a: 'Yes — we run security and architecture audits with a prioritized, actionable report within two weeks.' },
  ],
}

export const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'UI/UX', to: '/uiux' },
  { label: 'AI Studio', to: '/ai-studio' },
  { label: 'Security', to: '/security' },
  { label: 'Team', to: '/team' },
]

// Client roster — shown on Home ("Our Clients") and Security trusted-by row.
export const CLIENTS = ['Toyota Iraq', 'Makasib Al-Khair', 'Shift', 'Bay Bank', 'Sarco Industries', 'Helix Financial', 'Kepler Systems', 'Maison Ora']
