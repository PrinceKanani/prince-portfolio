import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import { MapPin, Send, Terminal } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { MagneticButton } from '../components/ui/MagneticButton'
import { siteConfig } from '../config/siteConfig'
import { configuredSocialLinks } from '../data/social'
import { isConfigured } from '../utils/placeholders'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { useInView } from '../hooks/useInView'

type SendState = 'idle' | 'sending' | 'sent' | 'error'

// No focus:outline-none — that would suppress the site-wide :focus-visible
// ring and leave a below-3:1 border shift as the only focus indicator.
const inputCls =
  'w-full rounded-xl border border-line bg-elevated/60 px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent/60'

/** Floating "communication terminal" visual. */
function ContactTerminal() {
  const reduced = useReducedMotion()
  // Own observer instead of whileInView — see StageFlow for rationale.
  const { ref, inView } = useInView<HTMLParagraphElement>()
  const lines = [
    { prompt: true, text: 'contact --to prince' },
    { prompt: false, text: '> channel: open' },
    { prompt: false, text: '> response_time: usually fast' },
    { prompt: false, text: '> topics: product · projects · tech' },
    { prompt: true, text: 'send message ▌' },
  ]

  return (
    <motion.div
      animate={reduced ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <GlassCard hover={false} className="gradient-border overflow-hidden font-mono text-sm">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 flex items-center gap-1.5 text-xs text-faint">
            <Terminal size={12} /> pk-comms
          </span>
        </div>
        <div className="space-y-2.5 p-5">
          {lines.map((line, i) => (
            <motion.p
              key={line.text}
              ref={i === 0 ? ref : undefined}
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ delay: 0.3 + i * 0.35 }}
              className={line.prompt ? 'text-cyan' : 'text-muted'}
            >
              {line.prompt && <span className="mr-2 text-accent">$</span>}
              {line.text}
            </motion.p>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export function Contact() {
  const [state, setState] = useState<SendState>('idle')
  // Ref (not state) so a double-click in the same tick can't start two POSTs.
  const sendingRef = useRef(false)
  const emailConfigured = isConfigured(siteConfig.email)
  // isConfigured also rejects an "[ADD ...]" placeholder left in the field.
  const endpointConfigured = isConfigured(siteConfig.contactEndpoint)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sendingRef.current) return
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    if (endpointConfigured) {
      sendingRef.current = true
      setState('sending')
      try {
        const res = await fetch(siteConfig.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(`Status ${res.status}`)
        setState('sent')
        form.reset()
      } catch {
        setState('error')
      } finally {
        sendingRef.current = false
      }
      return
    }

    // No backend configured — compose the message in the visitor's mail client.
    const subject = encodeURIComponent(data.subject || `Portfolio contact from ${data.name}`)
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || '-'}\n\n${data.message}`,
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section
      id="contact"
      kicker="Contact"
      title="Let's Build Something"
      subtitle="A role, a product idea, a technical question — the terminal is open."
      wide
    >
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <Reveal className="lg:col-span-3">
          <GlassCard hover={false} className="noise p-7 md:p-9">
            {emailConfigured || endpointConfigured ? (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-xs font-medium text-muted">Name</label>
                  <input id="c-name" name="name" required autoComplete="name" className={inputCls} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-xs font-medium text-muted">Email</label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="c-company" className="mb-1.5 block text-xs font-medium text-muted">Company</label>
                  <input id="c-company" name="company" autoComplete="organization" className={inputCls} placeholder="Optional" />
                </div>
                <div>
                  <label htmlFor="c-subject" className="mb-1.5 block text-xs font-medium text-muted">Subject</label>
                  <input id="c-subject" name="subject" required className={inputCls} placeholder="What's this about?" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="mb-1.5 block text-xs font-medium text-muted">Message</label>
                  <textarea id="c-message" name="message" required rows={5} className={inputCls} placeholder="Tell me about it…" />
                </div>
                <div className="sm:col-span-2">
                  <MagneticButton type="submit" className="w-full sm:w-auto">
                    <Send size={15} aria-hidden="true" />
                    {state === 'sending' ? 'Sending…' : 'Send Message'}
                  </MagneticButton>
                  <p className="mt-3 text-xs text-faint" role="status">
                    {state === 'sent' && 'Message sent — thank you!'}
                    {state === 'error' && "Sending failed — please email me directly instead."}
                    {state === 'idle' && !endpointConfigured && 'Opens your email app with the message pre-filled.'}
                  </p>
                </div>
              </form>
            ) : (
              <p className="text-sm leading-relaxed text-muted">
                The contact form activates once an email address or endpoint is configured — set{' '}
                <code className="rounded bg-elevated px-1.5 py-0.5 text-xs">VITE_CONTACT_EMAIL</code> or{' '}
                <code className="rounded bg-elevated px-1.5 py-0.5 text-xs">VITE_CONTACT_ENDPOINT</code>{' '}
                (see <code className="rounded bg-elevated px-1.5 py-0.5 text-xs">.env.example</code>).
              </p>
            )}
          </GlassCard>
        </Reveal>

        {/* Terminal + direct channels */}
        <div className="space-y-5 lg:col-span-2">
          <Reveal delay={0.1}>
            <ContactTerminal />
          </Reveal>
          <Reveal delay={0.2}>
            <GlassCard hover={false} className="space-y-3 p-6 text-sm">
              {configuredSocialLinks.map((l) => {
                const Icon = l.icon
                return (
                  <a
                    key={l.id}
                    href={l.href}
                    {...(l.id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex items-center gap-3 text-muted transition-colors hover:text-ink"
                  >
                    <Icon size={16} aria-hidden="true" className="text-accent" />
                    {l.id === 'email' ? siteConfig.email : l.label}
                  </a>
                )
              })}
              <p className="flex items-center gap-3 text-muted">
                <MapPin size={16} aria-hidden="true" className="text-accent" /> {siteConfig.location}
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
