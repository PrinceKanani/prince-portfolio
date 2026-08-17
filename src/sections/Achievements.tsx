import { Trophy, Cpu, Users } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'
import { GlassCard } from '../components/ui/GlassCard'
import { achievements } from '../data/achievements'
import type { AchievementCategory } from '../types'

const categoryMeta: Record<AchievementCategory, { icon: typeof Trophy; tone: string }> = {
  Product: { icon: Trophy, tone: 'bg-accent/10 text-accent' },
  Technical: { icon: Cpu, tone: 'bg-cyan/10 text-cyan' },
  Professional: { icon: Users, tone: 'bg-violet/10 text-violet' },
}

export function Achievements() {
  const categories = Object.keys(categoryMeta) as AchievementCategory[]

  return (
    <Section
      id="achievements"
      kicker="Achievements"
      title="Work I'm Proud Of"
      subtitle="The product, technical and professional work that defines how I operate."
      wide
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {categories.map((cat, ci) => {
          const { icon: Icon, tone } = categoryMeta[cat]
          const items = achievements.filter((a) => a.category === cat)
          // Never render a category heading with nothing under it.
          if (items.length === 0) return null
          return (
            <div key={cat}>
              <Reveal delay={ci * 0.08}>
                <h3 className="mb-4 flex items-center gap-2.5 font-display text-lg font-bold text-ink">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  {cat}
                </h3>
              </Reveal>
              <div className="space-y-4">
                {items.map((a, i) => (
                  <Reveal key={a.title} delay={ci * 0.08 + i * 0.06}>
                    <TiltCard max={4}>
                      <GlassCard className="p-5">
                        <h4 className="text-sm font-semibold text-ink">{a.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.description}</p>
                      </GlassCard>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
