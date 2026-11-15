// Generates lightweight, on-brand SVG placeholder mockups for the portfolio.
// Replaces ~50MB of hotlinked external GIFs with a few KB of self-hosted SVG.
// Run: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'placeholders')
mkdirSync(OUT, { recursive: true })

// Seeded PRNG so output is deterministic across runs.
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const INK = '#0a0b0a'
const INK2 = '#101210'
const LINE = 'rgba(255,255,255,0.08)'
const DIM = 'rgba(255,255,255,0.16)'
const DIM2 = 'rgba(255,255,255,0.28)'
// On-brand lime accents (kept tight to the brand).
const ACCENTS = ['#a3e635', '#bef264', '#84cc16', '#a3e635', '#c7f571']

const W = 1200
const H = 750

const rect = (x, y, w, h, fill, r = 6) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`

function chrome(accent) {
  // faux top browser/app bar
  return (
    rect(0, 0, W, 64, 'rgba(255,255,255,0.03)', 0) +
    `<circle cx="40" cy="32" r="7" fill="rgba(255,255,255,0.18)"/>` +
    `<circle cx="66" cy="32" r="7" fill="rgba(255,255,255,0.12)"/>` +
    `<circle cx="92" cy="32" r="7" fill="${accent}" opacity="0.6"/>` +
    rect(150, 22, 360, 20, 'rgba(255,255,255,0.05)', 10) +
    rect(W - 150, 22, 100, 20, accent, 10)
  )
}

// ---- Archetypes -------------------------------------------------------------

function dashboard(accent, rand) {
  let s = ''
  // sidebar
  s += rect(0, 64, 200, H - 64, 'rgba(255,255,255,0.02)', 0)
  for (let i = 0; i < 6; i++)
    s += rect(28, 110 + i * 46, i === 1 ? 140 : 110, 12, i === 1 ? accent : DIM, 6)
  // stat cards
  const cx = 236
  for (let i = 0; i < 3; i++) {
    const x = cx + i * 300
    s += rect(x, 100, 272, 120, INK2, 14)
    s += rect(x + 24, 124, 90, 12, DIM, 6)
    s += rect(x + 24, 150, 150, 30, i === 0 ? accent : DIM2, 8)
  }
  // area chart
  s += rect(cx, 250, 572, 380, INK2, 16)
  const bx = cx + 30
  const bw = 512
  const baseY = 590
  let path = `M ${bx} ${baseY}`
  const pts = 7
  for (let i = 0; i <= pts; i++) {
    const x = bx + (bw / pts) * i
    const y = 340 + rand() * 210
    path += ` L ${x.toFixed(0)} ${y.toFixed(0)}`
  }
  path += ` L ${bx + bw} ${baseY} Z`
  s += `<path d="${path}" fill="${accent}" opacity="0.14"/>`
  s += `<path d="${path.replace(/ Z$/, '').replace(` L ${bx + bw} ${baseY}`, '')}" fill="none" stroke="${accent}" stroke-width="3"/>`
  // right list
  s += rect(cx + 600, 250, 262, 380, INK2, 16)
  for (let i = 0; i < 5; i++) {
    s += `<circle cx="${cx + 632}" cy="${290 + i * 66}" r="14" fill="${DIM}"/>`
    s += rect(cx + 660, 278 + i * 66, 150, 12, DIM2, 6)
    s += rect(cx + 660, 298 + i * 66, 90, 10, LINE, 6)
  }
  return s
}

function landing(accent, rand) {
  let s = ''
  // nav
  s += rect(40, 100, 120, 18, accent, 9)
  for (let i = 0; i < 4; i++) s += rect(W - 360 + i * 80, 102, 54, 14, DIM, 7)
  // hero headline
  s += rect(80, 220, 720, 44, 'rgba(255,255,255,0.9)', 8)
  s += rect(80, 288, 560, 44, accent, 8)
  s += rect(80, 372, 460, 16, DIM2, 8)
  s += rect(80, 400, 400, 16, DIM, 8)
  s += rect(80, 456, 190, 52, accent, 26)
  s += rect(290, 456, 160, 52, 'rgba(255,255,255,0.08)', 26)
  // hero visual card
  s += rect(760, 200, 360, 420, INK2, 20)
  for (let i = 0; i < 3; i++) s += rect(792, 240 + i * 120, 296, 96, 'rgba(255,255,255,0.04)', 14)
  s += `<circle cx="940" cy="288" r="30" fill="${accent}" opacity="0.5"/>`
  return s
}

function mobileApp(accent, rand) {
  let s = ''
  // two phones
  for (let p = 0; p < 2; p++) {
    const x = 380 + p * 300
    const y = 110 + p * 40
    s += rect(x, y, 240, 520, INK2, 34)
    s += rect(x + 16, y + 16, 208, 488, 'rgba(255,255,255,0.03)', 26)
    s += rect(x + 40, y + 44, 160, 14, accent, 7)
    for (let i = 0; i < 4; i++) s += rect(x + 40, y + 90 + i * 92, 160, 72, 'rgba(255,255,255,0.05)', 14)
    s += `<circle cx="${x + 76}" cy="${y + 126}" r="18" fill="${accent}" opacity="0.5"/>`
  }
  // floating chips
  for (let i = 0; i < 4; i++)
    s += rect(140 + i * 30, 200 + i * 110, 120, 40, i % 2 ? accent : DIM, 20)
  return s
}

function analytics(accent, rand) {
  let s = ''
  s += rect(60, 110, 300, 30, 'rgba(255,255,255,0.85)', 8)
  // bar chart
  const bx = 80
  const baseY = 620
  for (let i = 0; i < 9; i++) {
    const h = 80 + rand() * 380
    s += rect(bx + i * 120, baseY - h, 70, h, i === 5 ? accent : 'rgba(255,255,255,0.10)', 8)
  }
  // ring
  const cx = 1000
  const cy = 300
  s += `<circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="28"/>`
  s += `<circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="${accent}" stroke-width="28" stroke-linecap="round" stroke-dasharray="${Math.round(2 * Math.PI * 120)}" stroke-dashoffset="${Math.round(2 * Math.PI * 120 * (0.25 + rand() * 0.4))}" transform="rotate(-90 ${cx} ${cy})"/>`
  return s
}

const ARCHETYPES = [dashboard, landing, mobileApp, analytics]

function make(seed, accent, archetype) {
  const rand = rng(seed)
  const inner = archetype(accent, rand)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Project preview">
  <defs>
    <radialGradient id="g${seed}" cx="18%" cy="12%" r="90%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="45%" stop-color="${accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect width="${W}" height="${H}" fill="url(#g${seed})"/>
  ${chrome(accent)}
  ${inner}
</svg>`
}

// ---- Emit -------------------------------------------------------------------
// 8 project posters + 12 marquee tiles, cycling archetypes/accents.
let count = 0
const write = (name, i) => {
  const accent = ACCENTS[i % ACCENTS.length]
  const arch = ARCHETYPES[i % ARCHETYPES.length]
  const svg = make(1000 + i * 7, accent, arch).replace(/\n\s*/g, '')
  writeFileSync(join(OUT, name), svg)
  count++
}
for (let i = 0; i < 8; i++) write(`proj-${String(i + 1).padStart(2, '0')}.svg`, i)
for (let i = 0; i < 12; i++) write(`tile-${String(i + 1).padStart(2, '0')}.svg`, i + 3)

console.log(`Wrote ${count} placeholder SVGs to public/placeholders/`)
