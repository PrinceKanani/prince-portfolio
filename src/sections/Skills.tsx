import { Suspense, lazy, useState } from 'react'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { skillCategories, universeNodes } from '../data/skills'
import { siteConfig } from '../config/siteConfig'
import { useInView } from '../hooks/useInView'
import { useWebGLSupport } from '../hooks/useWebGLSupport'
import { useIsTouchDevice } from '../hooks/useMediaQuery'

const SkillsUniverse3D = lazy(() => import('../components/three/SkillsUniverse3D'))

export function Skills() {
  const [selected, setSelected] = useState<string | null>(null)
  // Tracked separately from the category: several universe nodes share a
  // categoryId, and selecting one should not light up its siblings.
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const webgl = useWebGLSupport()
  const touch = useIsTouchDevice()
  // Non-latching in-view drives `paused` so the canvas stops rendering
  // off-screen; `everInView` latches so the scene mounts only once.
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px 0px' }, false)
  const [everInView, setEverInView] = useState(false)
  if (inView && !everInView) setEverInView(true)

  const onSelect = (categoryId: string, label: string) => {
    setSelected(categoryId)
    setSelectedNode(label)
    document.getElementById(`skill-${categoryId}`)?.scrollIntoView({ block: 'center' })
  }

  return (
    <Section
      id="skills"
      kicker="Skills"
      title="A Product–Technology Skill Ecosystem"
      subtitle="Explore the universe — click a node to jump to its skill set."
      wide
    >
      {/* 3D Skills Universe (falls back to interactive chips without WebGL) */}
      <div ref={ref} className="glass relative mb-10 h-105 overflow-hidden rounded-3xl md:h-120">
        {webgl && everInView ? (
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-muted">
                Assembling the universe…
              </div>
            }
          >
            <SkillsUniverse3D onSelect={onSelect} selectedNode={selectedNode} paused={!inView} />
          </Suspense>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
            <span className="gradient-text font-display text-2xl font-bold tracking-[0.3em]">
              {siteConfig.name.split(' ')[0].toUpperCase()}
            </span>
            <div className="flex max-w-xl flex-wrap items-center justify-center gap-2">
              {universeNodes.map((n) => (
                <button
                  key={n.label}
                  onClick={() => onSelect(n.categoryId, n.label)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                    selectedNode === n.label
                      ? 'border-cyan/60 bg-cyan/10 text-cyan'
                      : 'border-line text-muted hover:border-accent/50 hover:text-ink'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] tracking-widest text-faint uppercase">
          {!webgl ? 'Click a node' : touch ? 'Tap a node to explore' : 'Drag to orbit · click a node'}
        </p>
      </div>

      {/* Category cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon
          const active = selected === cat.id
          return (
            <Reveal key={cat.id} delay={Math.min(i * 0.07, 0.35)}>
              <TiltCard className="h-full">
                <GlassCard
                  id={`skill-${cat.id}`}
                  className={`group h-full scroll-mt-32 p-6 ${active ? 'border-cyan/60 ring-1 ring-cyan/40' : ''}`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-bold text-ink">{cat.title}</h3>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{cat.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <Badge key={s.name}>{s.name}</Badge>
                    ))}
                  </div>
                </GlassCard>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
