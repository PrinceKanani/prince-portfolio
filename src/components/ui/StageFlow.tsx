import { motion } from 'motion/react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { FlowStage } from '../../types'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useInView } from '../../hooks/useInView'

interface StageFlowProps {
  stages: FlowStage[]
  /** Show a "back to start" chip after the last stage (for iterative loops). */
  loop?: boolean
  /** Highlighted stage index (optional external control). */
  activeIndex?: number
}

/**
 * Horizontal, scroll-snapping journey of stages connected by arrows.
 * Reused by the product lifecycle, asset lifecycle, agile and product-thinking sections.
 *
 * The scrollbar is hidden for looks, so a plain mouse needs other ways in:
 *  - vertical wheel over the rail scrolls it horizontally (and hands scrolling
 *    back to the page once the rail hits either end),
 *  - click-and-drag pans it,
 *  - touch swipes and keyboard arrows (rail is focusable) work natively.
 */
export function StageFlow({ stages, loop = false, activeIndex }: StageFlowProps) {
  const reduced = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  // Own observer (not motion's whileInView): its enter notification can be
  // missed on programmatic scroll jumps, leaving every card stuck invisible.
  const { ref: revealRef, inView } = useInView<HTMLDivElement>()

  // Native non-passive listener: React's delegated wheel handlers are passive,
  // so e.preventDefault() there would be ignored and the page would scroll too.
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      // Trackpads emit real horizontal deltas — let those through untouched.
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return
      const canScroll = e.deltaY > 0 ? el.scrollLeft < max - 1 : el.scrollLeft > 1
      if (!canScroll) return // at the end: give the wheel back to the page
      e.preventDefault()
      el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + e.deltaY))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Mouse only — touch scrolling is native and must not be intercepted.
    if (e.pointerType !== 'mouse' || !railRef.current) return
    drag.current = { active: true, startX: e.clientX, startScroll: railRef.current.scrollLeft }
    railRef.current.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !railRef.current) return
    railRef.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX)
  }

  const endDrag = () => {
    drag.current.active = false
  }

  return (
    // tabIndex: keyboard-scrollable in browsers that don't auto-focus
    // scrollable regions (Safari); snap-x activates the cards' snap-start.
    <div
      ref={(el) => {
        railRef.current = el
        revealRef.current = el
      }}
      className="no-scrollbar -mx-5 cursor-grab snap-x overflow-x-auto px-5 pb-4 select-none active:cursor-grabbing sm:-mx-8 sm:px-8"
      role="list"
      tabIndex={0}
      aria-label="Process stages — scrolls horizontally"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="flex w-max items-stretch gap-2">
        {stages.map((stage, i) => {
          const Icon = stage.icon
          const active = activeIndex === i
          return (
            <div key={stage.title} role="listitem" className="flex items-center gap-2">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.7) }}
                className={`group glass relative h-full w-52 shrink-0 snap-start rounded-2xl p-5 transition-colors duration-300 hover:border-accent/50 ${
                  active ? 'border-accent/60 bg-accent/5' : ''
                }`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon size={19} aria-hidden="true" />
                </div>
                <p className="font-display text-sm font-semibold text-ink">{stage.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{stage.description}</p>
                {stage.detail && (
                  // Always visible: hiding it until hover reserved its layout
                  // space anyway, leaving an awkward dead area at the bottom
                  // of every card (and touch/keyboard users could miss it).
                  <p className="mt-2 text-xs leading-relaxed text-faint">{stage.detail}</p>
                )}
              </motion.div>
              {i < stages.length - 1 && (
                <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-faint" />
              )}
            </div>
          )
        })}
        {loop && (
          <div className="flex items-center gap-2 pl-1">
            <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-faint" />
            <div className="flex h-full shrink-0 items-center gap-2 rounded-2xl border border-dashed border-line px-4 text-xs text-muted">
              <RotateCcw size={14} aria-hidden="true" className="text-accent" />
              back to start
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
