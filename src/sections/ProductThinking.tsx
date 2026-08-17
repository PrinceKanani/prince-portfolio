import { Section } from '../components/ui/Section'
import { StageFlow } from '../components/ui/StageFlow'
import { productThinking } from '../data/flows'

export function ProductThinking() {
  return (
    <Section
      id="product-thinking"
      kicker="Product Thinking"
      title="The Questions Behind Every Build"
      subtitle="A continuous loop — each answer feeds the next question, and iteration starts the loop again."
      wide
    >
      <StageFlow stages={productThinking} loop />
    </Section>
  )
}
