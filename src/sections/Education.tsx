import { GraduationCap } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { education } from '../data/education'
import { isConfigured } from '../utils/placeholders'

export function Education() {
  return (
    <Section id="education" kicker="Education" title="Academic Foundation">
      <div className="space-y-6">
        {education.map((item, i) => {
          const projects = item.projects.filter(isConfigured)
          const achievements = item.achievements.filter(isConfigured)
          return (
            <Reveal key={item.degree} delay={i * 0.1}>
              <GlassCard hover={false} className="noise p-7 md:p-9">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <GraduationCap size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">{item.degree}</h3>
                      {isConfigured(item.institution) && <p className="mt-1 text-sm text-accent">{item.institution}</p>}
                    </div>
                  </div>
                  {isConfigured(item.duration) && <Badge tone="cyan">{item.duration}</Badge>}
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-sm font-semibold text-ink">Relevant subjects</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.subjects.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>

                {(projects.length > 0 || achievements.length > 0) && (
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {projects.length > 0 && (
                      <div>
                        <p className="mb-2 text-sm font-semibold text-ink">Projects</p>
                        <ul className="space-y-1 text-sm text-muted">
                          {projects.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {achievements.length > 0 && (
                      <div>
                        <p className="mb-2 text-sm font-semibold text-ink">Achievements</p>
                        <ul className="space-y-1 text-sm text-muted">
                          {achievements.map((a) => (
                            <li key={a}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </GlassCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
