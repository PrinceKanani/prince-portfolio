import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, FileText, Send } from 'lucide-react'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { siteConfig, publicAsset } from '../config/siteConfig'
import { configuredSocialLinks } from '../data/social'
import { MagneticButton } from '../components/ui/MagneticButton'

const TICKER = [
  'Product Management',
  'AI-Assisted Development',
  'Claude',
  'Tally ERP',
  '.NET',
  'React',
  'SQL Server',
  'SaaS',
  'QR / Barcode',
  'Agile',
]

export function Hero() {
  const reduced = useReducedMotion()

  const stagger = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.35 + i * 0.12, ease: [0.22, 0.8, 0.3, 1] as const },
        }

  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-[5]" />
      <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            {...stagger(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-elevated/50 px-4 py-1.5 text-xs font-medium tracking-wide text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan motion-safe:animate-pulse" aria-hidden="true" />
            {siteConfig.company} · {siteConfig.location.split(',')[0]}
          </motion.p>

          <motion.p {...stagger(1)} className="font-display text-sm font-semibold tracking-[0.35em] text-muted uppercase">
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            {...stagger(1)}
            className="mt-1 font-display text-5xl leading-[0.98] font-bold tracking-tight sm:text-7xl md:text-8xl"
          >
            <span className="gradient-text">{siteConfig.name}</span>
          </motion.h1>

          <motion.p {...stagger(2)} className="mt-5 font-display text-lg font-medium text-ink/90 sm:text-2xl">
            {siteConfig.role}
          </motion.p>

          <motion.p {...stagger(3)} className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.tagline}
          </motion.p>

          <motion.div {...stagger(4)} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects">
              Explore My Work
              <ArrowRight size={16} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={publicAsset(siteConfig.resumePath)} variant="ghost" external>
              <FileText size={16} aria-hidden="true" />
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Send size={16} aria-hidden="true" />
              Contact Me
            </MagneticButton>
          </motion.div>

          {configuredSocialLinks.length > 0 && (
            <motion.div {...stagger(5)} className="mt-8 flex items-center gap-4">
              {configuredSocialLinks.map((l) => {
                const Icon = l.icon
                return (
                  <a
                    key={l.id}
                    href={l.href}
                    aria-label={l.label}
                    {...(l.id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {l.label}
                  </a>
                )
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* Slow tech ticker along the hero's base (hidden on short/small screens). */}
      <motion.div
        aria-hidden="true"
        className="marquee absolute inset-x-0 bottom-24 hidden md:block"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-3.5 font-display text-xs font-semibold tracking-[0.25em] whitespace-nowrap text-faint uppercase"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-accent/50" />
            </span>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-faint uppercase transition-colors hover:text-ink"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        Scroll to explore
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  )
}
