import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { useReducedMotion } from '../hooks/useMediaQuery'
import { useInView } from '../hooks/useInView'
import { Section } from '../components/ui/Section'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { architectureLayers } from '../data/flows'

export function Architecture() {
  const reduced = useReducedMotion()
  // Own observer instead of whileInView — see StageFlow for rationale.
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Section
      id="architecture"
      kicker="Architecture"
      title="How the Systems Fit Together"
      subtitle="The typical shape of the products I work on — data flowing from user to database and out to integrations."
    >
      <div ref={ref} className="mx-auto max-w-2xl" role="list">
        {architectureLayers.map((layer, i) => {
          const Icon = layer.icon
          return (
            <div key={layer.title} role="listitem">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
              >
                <GlassCard className="flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm font-bold text-ink">{layer.title}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {layer.items.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {i < architectureLayers.length - 1 && (
                <div aria-hidden="true" className="relative mx-auto flex h-9 w-0.5 items-center justify-center bg-gradient-to-b from-accent/40 to-line">
                  {!reduced ? (
                    <span className="flow-y" style={{ animationDelay: `${i * 0.3}s` }} />
                  ) : (
                    <ArrowDown size={12} className="text-faint" />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Section>
  )
}
