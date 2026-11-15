import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { COMPANY } from '@/lib/data'

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.email.trim()) errors.email = 'An email lets us reply.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email address looks off.'
  if (!values.message.trim()) errors.message = 'Tell us a little about your project.'
  else if (values.message.trim().length < 10) errors.message = 'A few more words, please (10+ characters).'
  return errors
}

const inputBase =
  'w-full rounded-brand-sm border bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-lime'

/**
 * Fully client-side contact form — validation + success state, no backend.
 * Submitting resolves locally (a real endpoint can be wired into `onSubmit`).
 */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    // No backend: settle locally so the success state always renders.
    window.setTimeout(() => setStatus('sent'), 700)
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-lime text-ink">
          <Check size={28} strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-xl font-light tracking-tight text-paper">Message received.</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks, {values.name.trim().split(' ')[0] || 'there'}. We reply within one business day. For anything urgent,
          reach us directly at{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-lime hover:underline">
            {COMPANY.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: '', email: '', message: '' })
            setStatus('idle')
          }}
          className="mt-6 rounded-full border border-white/15 px-5 py-2 text-xs font-medium text-white/80 transition-colors hover:border-lime/40 hover:text-lime"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="text-sm leading-relaxed text-white/60">
        Start a conversation. Tell us what you&apos;re building and we&apos;ll reply within one business day.
      </p>

      <div>
        <label htmlFor="cf-name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
          placeholder="Your name"
          className={`${inputBase} ${errors.name ? 'border-[#fd5d5c]' : 'border-white/10 focus:border-lime'}`}
        />
        {errors.name && <p id="cf-name-err" className="mt-1.5 text-xs text-[#fd5d5c]">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
          placeholder="you@company.com"
          className={`${inputBase} ${errors.email ? 'border-[#fd5d5c]' : 'border-white/10 focus:border-lime'}`}
        />
        {errors.email && <p id="cf-email-err" className="mt-1.5 text-xs text-[#fd5d5c]">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Message
        </label>
        <textarea
          id="cf-message"
          rows={4}
          value={values.message}
          onChange={update('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          placeholder="Tell us about your project…"
          className={`${inputBase} resize-none ${errors.message ? 'border-[#fd5d5c]' : 'border-white/10 focus:border-lime'}`}
        />
        {errors.message && <p id="cf-message-err" className="mt-1.5 text-xs text-[#fd5d5c]">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
        {status !== 'sending' && (
          <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </button>
    </form>
  )
}
