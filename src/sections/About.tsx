import { useState } from 'react'
import { Briefcase, GraduationCap, MapPin, Sparkles, User } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { aboutIntro, stats } from '../data/profile'
import { siteConfig, publicAsset } from '../config/siteConfig'

/** Profile photo with a graceful abstract fallback when no image is provided. */
function ProfileVisual() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-accent-strong via-violet to-cyan"
      >
        <div className="bg-grid absolute inset-0 opacity-40" />
        <span className="relative font-display text-5xl font-bold text-white/95">{siteConfig.initials}</span>
      </div>
    )
  }

  return (
    <img
      src={publicAsset(siteConfig.profileImage)}
      alt={`Portrait of ${siteConfig.name}`}
      className="h-40 w-40 rounded-3xl object-cover"
      onError={() => setFailed(true)}
    />
  )
}

export function About() {
  const visibleStats = stats.filter((s) => typeof s.value === 'number')

  return (
    <Section
      id="about"
      kicker="About"
      title={aboutIntro.headline}
      subtitle="Product manager by title, builder by instinct — comfortable in roadmap reviews and stack traces alike."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Narrative */}
        <Reveal className="lg:col-span-3" delay={0.05}>
          <GlassCard hover={false} className="noise h-full p-7 md:p-9">
            {aboutIntro.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mb-5 leading-relaxed text-muted last:mb-0">
                {p}
              </p>
            ))}
            <p className="mt-2 mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <Sparkles size={15} aria-hidden="true" className="text-accent" />
              Current focus
            </p>
            <div className="flex flex-wrap gap-2">
              {aboutIntro.currentFocus.map((f) => (
                <Badge key={f} tone="accent">
                  {f}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        {/* Profile card */}
        <Reveal className="lg:col-span-2" delay={0.15}>
          <GlassCard hover={false} className="gradient-border h-full p-7 md:p-8">
            <div className="flex flex-col items-center text-center">
              <ProfileVisual />
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{siteConfig.name}</h3>
              <p className="mt-1 text-sm text-accent">{siteConfig.role}</p>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <dt className="text-faint"><Briefcase size={15} aria-hidden="true" /><span className="sr-only">Company</span></dt>
                <dd className="text-muted">{siteConfig.company}</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="text-faint"><MapPin size={15} aria-hidden="true" /><span className="sr-only">Location</span></dt>
                <dd className="text-muted">{siteConfig.location}</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="text-faint"><GraduationCap size={15} aria-hidden="true" /><span className="sr-only">Education</span></dt>
                <dd className="text-muted">{siteConfig.education}</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="text-faint"><User size={15} aria-hidden="true" /><span className="sr-only">Profile</span></dt>
                <dd className="text-muted">Product · Project · Development · Analysis</dd>
              </div>
            </dl>
          </GlassCard>
        </Reveal>
      </div>

      {/* Stats appear only when real values are configured in src/data/profile.ts */}
      {visibleStats.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {visibleStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <AnimatedCounter value={s.value as number} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
