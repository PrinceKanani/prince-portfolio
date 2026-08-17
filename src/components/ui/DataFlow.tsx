import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { FlowStage } from '../../types'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useInView } from '../../hooks/useInView'

interface DataFlowProps {
  stages: FlowStage[]
}

/**
 * System pipeline with animated data packets traveling between nodes.
 * Renders vertically on small screens, horizontally from md up.
 */
export function DataFlow({ stages }: DataFlowProps) {
  const reduced = useReducedMotion()
  // Own observer instead of whileInView — see StageFlow for rationale.
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className="flex flex-col items-stretch gap-0 md:flex-row md:items-center" role="list">
      {stages.map((stage, i) => {
        const Icon = stage.icon
        return (
          <div key={stage.title} role="listitem" className="flex flex-1 flex-col items-center md:flex-row">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.45, delay: Math.min(i * 0.1, 0.6) }}
              className="glass gradient-border w-full rounded-2xl p-5 text-center md:min-w-36"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                <Icon size={19} aria-hidden="true" />
              </div>
              <p className="font-display text-sm font-semibold text-ink">{stage.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{stage.description}</p>
            </motion.div>

            {i < stages.length - 1 && (
              <div
                aria-hidden="true"
                className="relative h-10 w-0.5 self-center bg-gradient-to-b from-line via-accent/40 to-line md:h-0.5 md:w-full md:min-w-8 md:flex-1 md:bg-gradient-to-r"
              >
                {!reduced && (
                  <>
                    <span className="flow-y md:hidden" style={{ animationDelay: `${i * 0.35}s` }} />
                    <span className="flow-x hidden md:block" style={{ animationDelay: `${i * 0.35}s` }} />
                  </>
                )}
                {reduced && (
                  <ArrowRight
                    size={12}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-faint max-md:rotate-90"
                  />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
