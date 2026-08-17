import { useEffect, useState } from 'react'
import { useReducedMotion } from './useMediaQuery'

/** Animates 0 → target when `start` becomes true. Jumps straight to the target under reduced motion. */
export function useCountUp(target: number, start: boolean, durationMs = 1600): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (reduced) {
      setValue(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      // Clamp both ends: the first rAF timestamp can predate t0 (it is the
      // frame's vsync time), and a negative p would flash a negative value.
      const p = Math.min(1, Math.max(0, (now - t0) / durationMs))
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, durationMs, reduced])

  return value
}
