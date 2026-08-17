import { useEffect, useState } from 'react'

/**
 * Tracks which page section is currently in view, for nav highlighting.
 * Deterministic scroll-based detection: the active section is the last one
 * whose top has crossed a reference line at 40% of the viewport. (An
 * IntersectionObserver approach goes stale here because several sections
 * mount lazily and jump-scrolls can skip the observation band.)
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    let raf = 0
    let queued = false

    const compute = () => {
      queued = false
      const line = window.innerHeight * 0.4
      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      // At the bottom of the page the last section is showing even if its top
      // never crosses the 40% line (short final section on a tall viewport).
      const doc = document.documentElement
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2 && sectionIds.length > 0) {
        current = sectionIds[sectionIds.length - 1]
      }
      setActive(current)
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      raf = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    compute()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [sectionIds])

  return active
}
