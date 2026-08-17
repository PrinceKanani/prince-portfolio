import { Monitor, Cable, Cpu, Server, RefreshCw } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { DataFlow } from '../components/ui/DataFlow'
import { GlassCard } from '../components/ui/GlassCard'
import { automationItems } from '../data/flows'
import type { FlowStage } from '../types'

const pipeline: FlowStage[] = [
  { title: 'Business Event', icon: Monitor, description: 'Something happens in an app' },
  { title: 'API / Webhook', icon: Cable, description: 'The event fires a trigger' },
  { title: 'Automation Layer', icon: Cpu, description: 'Rules, mapping & validation' },
  { title: 'Target System', icon: Server, description: 'ERP, CRM, email or service' },
  { title: 'Feedback', icon: RefreshCw, description: 'Result logged & monitored' },
]

export function Automation() {
  return (
    <Section
      id="automation"
      kicker="Automation"
      title="Automation & Integration"
      subtitle="Connecting systems and removing manual work — events in, validated actions out."
      wide
    >
      <Reveal>
        <div className="glass noise rounded-3xl p-6 md:p-10">
          <DataFlow stages={pipeline} />
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {automationItems.map((item, i) => {
          const Icon = item.icon
          return (
            <Reveal key={item.title} delay={Math.min(i * 0.06, 0.3)}>
              <GlassCard className="group h-full p-5">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.description}</p>
              </GlassCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
