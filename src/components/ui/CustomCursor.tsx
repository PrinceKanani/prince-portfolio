import { useEffect, useRef, useState } from 'react'
import { useIsTouchDevice, useReducedMotion } from '../../hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]'

/** Dot + ring cursor with smooth interpolation. Only mounts on fine-pointer devices. */
export function CustomCursor() {
  const touch = useIsTouchDevice()
  const reduced = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (touch || reduced) return
    document.documentElement.classList.add('custom-cursor-active')

    const target = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let hovering = false
    let raf = 0
    let running = false

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16
      ring.y += (target.y - ring.y) * 0.16
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        const scale = hovering ? 1.8 : 1
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${scale})`
        ringRef.current.style.borderColor = hovering ? 'var(--c-accent)' : 'var(--c-line)'
      }
      // Park the loop once the ring has settled; onMove restarts it.
      if (Math.abs(target.x - ring.x) + Math.abs(target.y - ring.y) < 0.2) {
        running = false
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      setVisible(true)
      const el = e.target as Element | null
      hovering = Boolean(el?.closest?.(INTERACTIVE))
      wake()
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [touch, reduced])

  if (touch || reduced) return null

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[999] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-accent" />
      <div ref={ringRef} className="absolute h-9 w-9 rounded-full border transition-[border-color] duration-200" style={{ borderColor: 'var(--c-line)' }} />
    </div>
  )
}
