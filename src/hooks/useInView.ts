import { useEffect, useRef, useState } from 'react'

/**
 * IntersectionObserver wrapper. Once `once` is true (default), the value
 * stays true after the first intersection — used for reveal-on-scroll and
 * for mounting heavy content lazily.
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { rootMargin: '0px 0px -10% 0px' },
  once = true,
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (once && inView) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setInView(false)
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, inView])

  return { ref, inView }
}
