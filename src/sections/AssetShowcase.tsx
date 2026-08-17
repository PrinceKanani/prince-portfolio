import { useEffect, useState } from 'react'
import { Boxes } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { StageFlow } from '../components/ui/StageFlow'
import { Badge } from '../components/ui/Badge'
import { GlassCard } from '../components/ui/GlassCard'
import { assetLifecycle } from '../data/flows'
import { projects } from '../data/projects'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useMediaQuery'

export function AssetShowcase() {
  const project = projects.find((p) => p.id === 'asset-management')
  const reduced = useReducedMotion()
  // Non-latching (`once = false`): the interval below pauses whenever the
  // stage flow scrolls out of view, instead of running for the whole session.
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '0px' }, false)
  const [active, setActive] = useState(0)

  // A virtual "asset" travels through the lifecycle stages.
  useEffect(() => {
    if (reduced || !inView) return
    const id = setInterval(() => setActive((a) => (a + 1) % assetLifecycle.length), 1800)
    return () => clearInterval(id)
  }, [reduced, inView])

  if (!project) return null

  return (
    <Section
      id="asset-management"
      kicker="Flagship Product"
      title="Asset Management System"
      subtitle="A SaaS platform that owns the entire life of an enterprise asset — watch one travel through its lifecycle."
      wide
    >
      <div ref={ref}>
        <StageFlow stages={assetLifecycle} loop activeIndex={reduced ? undefined : active} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <GlassCard hover={false} className="noise h-full p-7">
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Boxes size={18} aria-hidden="true" className="text-accent" />
              What it covers
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.features.map((f) => (
                <Badge key={f}>{f}</Badge>
              ))}
            </div>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard hover={false} className="h-full p-7">
            <h3 className="mb-3 font-display text-lg font-bold text-ink">Why it matters</h3>
            <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.impact}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <Badge key={t} tone="accent">
                  {t}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  )
}
