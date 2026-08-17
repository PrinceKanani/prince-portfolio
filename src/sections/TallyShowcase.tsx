import { FileCode2, ShieldCheck, Activity } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { DataFlow } from '../components/ui/DataFlow'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { tallyPipeline } from '../data/flows'
import { projects } from '../data/projects'

const highlights = [
  {
    icon: FileCode2,
    title: 'XML & JSON payloads',
    text: 'JSON on the application side, transformed into Tally-compliant XML for the gateway — masters like Ledger, Stock Item and Stock Category stay in sync.',
  },
  {
    icon: ShieldCheck,
    title: 'Validation first',
    text: 'Every payload is validated before it leaves — bad data is caught at the boundary, not inside the ERP.',
  },
  {
    icon: Activity,
    title: 'Sync monitoring',
    text: 'Structured error handling, logging and retry make every synchronization observable and recoverable.',
  },
]

export function TallyShowcase() {
  const project = projects.find((p) => p.id === 'tally-integration')

  return (
    <Section
      id="tally-integration"
      kicker="ERP Integration"
      title="Tally / ERP Integration"
      subtitle="Data packets travel from business applications into Tally ERP — validated, transformed and monitored at every hop."
      wide
    >
      <Reveal>
        <div className="glass noise rounded-3xl p-6 md:p-10">
          <DataFlow stages={tallyPipeline} />
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {highlights.map((h, i) => {
          const Icon = h.icon
          return (
            <Reveal key={h.title} delay={i * 0.08}>
              <GlassCard className="h-full p-6">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-bold text-ink">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
              </GlassCard>
            </Reveal>
          )
        })}
      </div>

      {project && (
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <Badge key={t} tone="cyan">
                {t}
              </Badge>
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  )
}
