import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { StageFlow } from '../components/ui/StageFlow'
import { Badge } from '../components/ui/Badge'
import { productThinking, agilePractices } from '../data/flows'

export function ProductThinking() {
  return (
    <Section
      id="product-thinking"
      kicker="Product Thinking & Agile"
      title="The Questions Behind Every Build"
      subtitle="A continuous loop — each answer feeds the next question, delivered on an agile sprint cadence."
      wide
    >
      <StageFlow stages={productThinking} loop />
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
