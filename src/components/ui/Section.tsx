import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { sectionOrder } from '../../data/sections'

interface SectionProps {
  id: string
  kicker: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  wide?: boolean
}

/**
 * Standard page section shell: numbered kicker, heading with gradient accent,
 * content. The section number comes from its position in `sectionOrder`.
 */
export function Section({ id, kicker, title, subtitle, children, className = '', wide = false }: SectionProps) {
  const index = sectionOrder.indexOf(id as (typeof sectionOrder)[number]) + 1

  return (
    <section id={id} className={`relative scroll-mt-28 py-20 md:py-28 ${className}`}>
      <div className={`mx-auto px-5 sm:px-8 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
        <Reveal>
          <p className="mb-3 flex items-center gap-3 font-display text-sm font-medium tracking-[0.2em] text-accent uppercase">
            {index > 0 && (
              <span aria-hidden="true" className="text-faint">{String(index).padStart(2, '0')}</span>
            )}
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            {kicker}
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>}
        </Reveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}
