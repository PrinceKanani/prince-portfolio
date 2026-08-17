import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { StageFlow } from '../components/ui/StageFlow'
import { Badge } from '../components/ui/Badge'
import { agileFlow, agilePractices } from '../data/flows'

export function Agile() {
  return (
    <Section
      id="agile"
      kicker="Agile"
      title="An Agile Delivery Rhythm"
      subtitle="Backlog to release and back again — the sprint cadence that keeps delivery predictable."
      wide
    >
      <StageFlow stages={agileFlow} loop />
      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap gap-2">
          {agilePractices.map((p) => (
            <Badge key={p} tone="accent">
              {p}
            </Badge>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
