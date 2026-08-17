import { Section } from '../components/ui/Section'
import { StageFlow } from '../components/ui/StageFlow'
import { productLifecycle } from '../data/flows'

export function ProductManagement() {
  return (
    <Section
      id="product-management"
      kicker="Product Management"
      title="How I Build Products"
      subtitle="Every product follows the same disciplined journey — from a raw idea to a shipped, measured, improved release."
      wide
    >
      <StageFlow stages={productLifecycle} loop />
    </Section>
  )
}
