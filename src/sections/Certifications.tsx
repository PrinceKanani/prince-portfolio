import { Award, BadgeCheck, ExternalLink } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { certifications } from '../data/certifications'
import { isConfigured } from '../utils/placeholders'

export function Certifications() {
  const real = certifications.filter((c) => isConfigured(c.name))

  return (
    <Section
      id="certifications"
      kicker="Certifications"
      title="Credentials"
      subtitle={
        real.length > 0
          ? 'Hover a card to flip it and see the credential details.'
          : undefined
      }
    >
      {real.length === 0 ? (
        // Graceful state until real certifications are added in src/data/certifications.ts
        <Reveal>
          <GlassCard hover={false} className="mx-auto max-w-xl p-10 text-center">
            <Award size={36} aria-hidden="true" className="mx-auto text-accent/70" />
            <h3 className="mt-4 font-display text-lg font-bold text-ink">Certifications on the way</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Formal credentials will be listed here as they're completed. In the meantime, the projects above
              are the best proof of work.
            </p>
          </GlassCard>
        </Reveal>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {real.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 0.08}>
              <div className="flip-card h-64" tabIndex={0}>
                <div className="flip-inner relative h-full w-full">
                  {/* Front */}
                  <div className="flip-face glass gradient-border absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-center">
                    {cert.image ? (
                      <img src={cert.image} alt="" className="h-16 w-16 rounded-xl object-contain" />
                    ) : (
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                        <BadgeCheck size={30} aria-hidden="true" />
                      </span>
                    )}
                    <h3 className="mt-4 font-display text-base font-bold text-ink">{cert.name}</h3>
                    <p className="mt-1 text-sm text-muted">{cert.organization}</p>
                  </div>
                  {/* Back */}
                  <div className="flip-face flip-back glass-strong absolute inset-0 flex flex-col justify-center rounded-2xl p-6">
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-faint">Organization</dt>
                        <dd className="text-ink">{cert.organization}</dd>
                      </div>
                      {isConfigured(cert.date) && (
                        <div>
                          <dt className="text-faint">Date</dt>
                          <dd className="text-ink">{cert.date}</dd>
                        </div>
                      )}
                      {isConfigured(cert.credentialId) && (
                        <div>
                          <dt className="text-faint">Credential ID</dt>
                          <dd className="text-ink">{cert.credentialId}</dd>
                        </div>
                      )}
                    </dl>
                    {cert.details && (
                      <p className="mt-3 text-xs leading-relaxed text-muted">{cert.details}</p>
                    )}
                    {isConfigured(cert.credentialUrl) && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                      >
                        Verify credential <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
