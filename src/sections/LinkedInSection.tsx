import { ArrowUpRight } from 'lucide-react'
import { LinkedinIcon } from '../components/ui/BrandIcons'
import { Section } from '../components/ui/Section'
import { pill } from '../components/ui/pill'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { siteConfig } from '../config/siteConfig'
import { isConfigured } from '../utils/placeholders'

export function LinkedInSection() {
  const configured = isConfigured(siteConfig.linkedinUrl)

  return (
    <Section id="linkedin" kicker="Network" title="LinkedIn">
      <Reveal>
        <GlassCard hover={false} className="gradient-border mx-auto flex max-w-2xl flex-col items-center gap-4 p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a66c2]/15 text-[#3b82f6]">
            <LinkedinIcon size={26} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-ink">{siteConfig.name}</h3>
            <p className="mt-1 text-sm text-accent">{siteConfig.role}</p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Assistant Product Manager building SaaS for Indian SMEs — real-time Tally &amp; asset visibility on
            Web, iOS &amp; Android. Always open to connecting with product and technology people.
          </p>
          {configured ? (
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={pill('lg', 'mt-2')}
            >
              Connect on LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-2 text-xs text-faint">
              Set <code className="rounded bg-elevated px-1.5 py-0.5">VITE_LINKEDIN_URL</code> to enable the profile
              link.
            </p>
          )}
        </GlassCard>
      </Reveal>
    </Section>
  )
}
