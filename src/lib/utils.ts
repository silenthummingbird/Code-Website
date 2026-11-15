import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Inline SVG data URIs used as graceful fallbacks when a third-party media
 * host (pravatar, pexels, etc.) fails — so the layout never shows a broken
 * image icon. They inherit the on-brand dark neutral surface.
 */
export const AVATAR_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%231f1f1f'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%234a4a4a'/%3E%3Cpath d='M6 40c0-8 6-13 14-13s14 5 14 13z' fill='%234a4a4a'/%3E%3C/svg%3E"

export const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23111111'/%3E%3Cpath d='M0 0h400v400H0z' fill='none'/%3E%3Cg fill='%23333'%3E%3Ccircle cx='150' cy='150' r='30'/%3E%3Cpath d='M60 320l90-110 60 70 60-50 70 90z'/%3E%3C/g%3E%3C/svg%3E"

/** onError handler that swaps a broken <img> for a fallback data URI, once. */
export function imgFallback(fallback: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget
    if (el.src === fallback) return
    el.onerror = null
    el.src = fallback
  }
}
