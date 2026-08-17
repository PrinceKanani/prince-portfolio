import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { GithubIcon } from '../components/ui/BrandIcons'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { pill } from '../components/ui/pill'
import { projects } from '../data/projects'
import { isConfigured } from '../utils/placeholders'
import type { Project } from '../types'

const accentGradients: Record<Project['accent'], string> = {
  indigo: 'from-indigo-500/70 via-indigo-800/50 to-slate-900/80',
  cyan: 'from-cyan-500/60 via-sky-800/50 to-slate-900/80',
  violet: 'from-violet-500/70 via-purple-800/50 to-slate-900/80',
}

/** Elegant generated placeholder when a project has no screenshot. */
function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.name} screenshot`} className="h-44 w-full rounded-t-2xl object-cover" />
  }
  return (
    <div
      aria-hidden="true"
      className={`relative h-44 overflow-hidden rounded-t-2xl bg-gradient-to-br ${accentGradients[project.accent]}`}
    >
      {/* Fixed light grid lines: this tile stays dark in BOTH themes, so the
          theme-driven .bg-grid token would vanish in light mode. */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <span className="absolute bottom-4 left-5 font-display text-lg font-bold text-white/90">
        {project.name}
      </span>
      <span className="absolute top-4 right-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-medium tracking-wide text-white/90 uppercase backdrop-blur">
        {project.category}
      </span>
    </div>
  )
}

function ModalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold tracking-wide text-accent uppercase">{title}</h4>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </div>
  )
}

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null)

  return (
    <Section
      id="projects"
      kicker="Projects"
      title="Major Projects"
      subtitle="Products I've shaped end to end — click any card for the full story."
      wide
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i * 0.1, 0.3)}>
            <TiltCard className="h-full">
              {/* The h3/description live OUTSIDE the button: wrapping them in
                  it would strip the heading from the a11y tree and turn the
                  whole card text into one paragraph-length accessible name.
                  The button's ::after overlay keeps the full card clickable. */}
              <GlassCard className="group h-full overflow-hidden p-0">
                <ProjectVisual project={project} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">
                        <button
                          onClick={() => setOpenProject(project)}
                          aria-haspopup="dialog"
                          className="text-left after:absolute after:inset-0 after:content-['']"
                        >
                          {project.name}
                        </button>
                      </h3>
                      <p className="mt-0.5 text-sm text-accent">{project.tagline}</p>
                    </div>
                    <span className="mt-1 shrink-0 rounded-full border border-line p-2 text-muted opacity-0 transition-all duration-300 group-hover:border-accent/50 group-hover:text-ink group-hover:opacity-100">
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                    {project.technologies.length > 5 && <Badge>+{project.technologies.length - 5}</Badge>}
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Detail modal */}
      <Modal open={openProject !== null} onClose={() => setOpenProject(null)} labelledBy="project-modal-title">
        {openProject && (
          <div className="space-y-7">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">{openProject.category}</p>
              <h3 id="project-modal-title" className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
                {openProject.name}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{openProject.description}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <ModalBlock title="Problem">{openProject.problem}</ModalBlock>
              <ModalBlock title="Solution">{openProject.solution}</ModalBlock>
            </div>

            <ModalBlock title="My Role">
              <p>{openProject.role}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {openProject.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </ModalBlock>

            <ModalBlock title="Key Features">
              <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {openProject.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </ModalBlock>

            {openProject.architecture && <ModalBlock title="Architecture">{openProject.architecture}</ModalBlock>}

            {openProject.challenges && openProject.challenges.length > 0 && (
              <ModalBlock title="Challenges">
                <ul className="list-disc space-y-1 pl-5">
                  {openProject.challenges.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </ModalBlock>
            )}

            <ModalBlock title="Outcome">{openProject.impact}</ModalBlock>

            <div className="flex flex-wrap gap-1.5 border-t border-line pt-5">
              {openProject.technologies.map((t) => (
                <Badge key={t} tone="accent">
                  {t}
                </Badge>
              ))}
            </div>

            {(isConfigured(openProject.github) || isConfigured(openProject.demo)) && (
              <div className="flex flex-wrap gap-3">
                {isConfigured(openProject.github) && (
                  <a
                    href={openProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/50"
                  >
                    <GithubIcon size={15} aria-hidden="true" /> Source
                  </a>
                )}
                {isConfigured(openProject.demo) && (
                  <a
                    href={openProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pill('md')}
                  >
                    <ExternalLink size={15} aria-hidden="true" /> Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </Section>
  )
}
