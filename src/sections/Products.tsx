import { CheckCircle2 } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { products } from '../data/products'

export function Products() {
  return (
    <Section
      id="products"
      kicker="Products"
      title="Products I've Worked On"
      subtitle="The product lines I've contributed to — each with a real problem behind it."
      wide
    >
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.name} delay={Math.min(i * 0.08, 0.3)}>
            <TiltCard max={4} className="h-full">
              <GlassCard className="noise flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">{product.category}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">{product.name}</h3>
                  </div>
                  <Badge tone="cyan" className="shrink-0 gap-1.5">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    {product.status}
                  </Badge>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-ink">Problem: </span>
                  {product.problem}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-ink">My contribution: </span>
                  {product.contribution}
                </p>

                <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted">
                      <CheckCircle2 size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-accent/70" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {product.technologies.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </GlassCard>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
