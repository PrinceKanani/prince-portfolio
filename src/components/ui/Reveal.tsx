import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useMediaQuery'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/**
 * Fade-and-rise reveal when the element scrolls into view.
 * Driven by our own IntersectionObserver (not motion's `whileInView`): the
 * observer re-fires whenever intersection state changes — including after a
 * programmatic jump or a hidden-tab resume — so content can never get stuck
 * invisible when an "enter" notification is missed mid-animation.
 */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '0px 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.8, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
