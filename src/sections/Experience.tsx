import { motion } from 'motion/react'
import { Award, CheckCircle2, FolderKanban } from 'lucide-react'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { useInView } from '../hooks/useInView'
import { Section } from '../components/ui/Section'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { experience } from '../data/experience'
import { isConfigured } from '../utils/placeholders'

export function Experience() {
  const reduced = useReducedMotion()
  // Own observer instead of whileInView — see StageFlow for rationale.
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Section
      id="experience"
      kicker="Career"
      title="Experience Timeline"
      subtitle="Where I've built, shipped and managed."
    >
      <div ref={ref} className="relative">
        {/* Growing timeline line */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-accent via-violet to-transparent md:left-6"
          initial={reduced ? false : { scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : undefined}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <ol className="space-y-10">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`} className="relative pl-12 md:pl-16">
              {/* Node */}
              <motion.span
                aria-hidden="true"
                className="absolute top-7 left-4 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-6"
                initial={reduced ? false : { scale: 0 }}
                animate={inView ? { scale: 1 } : undefined}
                transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300, damping: 18 }}
              >
                <span className="absolute h-4 w-4 rounded-full bg-accent/30 motion-safe:animate-ping" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--c-accent)]" />
              </motion.span>

              <motion.div
                initial={reduced ? false : { opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.8, 0.3, 1] }}
              >
                <GlassCard hover={false} className="noise p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">{job.role}</h3>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {job.company}
                        {job.location ? <span className="text-faint"> · {job.location}</span> : null}
                      </p>
                    </div>
                    {isConfigured(job.duration) && (
                      <Badge tone="cyan">{job.duration}</Badge>
                    )}
                  </div>

                  <p className="mt-4 leading-relaxed text-muted">{job.summary}</p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-ink">Responsibilities</p>
                      <ul className="space-y-1.5">
                        {job.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2 text-sm text-muted">
                            <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-accent/70" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-5">
                      {job.achievements.filter(isConfigured).length > 0 && (
                        <div>
                          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
                            <Award size={14} aria-hidden="true" className="text-cyan" />
                            Achievements
                          </p>
                          <ul className="space-y-1.5">
                            {job.achievements.filter(isConfigured).map((a) => (
                              <li key={a} className="text-sm text-muted">{a}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {job.projects.filter(isConfigured).length > 0 && (
                        <div>
                          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
                            <FolderKanban size={14} aria-hidden="true" className="text-violet" />
                            Projects
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {job.projects.filter(isConfigured).map((p) => (
                              <Badge key={p}>{p}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {job.technologies.map((t, ti) => (
                      <motion.span
                        key={t}
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ delay: 0.4 + ti * 0.06 }}
                      >
                        <Badge tone="accent">{t}</Badge>
                      </motion.span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
