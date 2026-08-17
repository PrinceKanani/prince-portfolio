import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { ReactNode, MouseEvent } from 'react'
import { useReducedMotion } from '../../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. */
  max?: number
}

/** Card that tilts toward the cursor in 3D perspective. Inert under reduced motion / touch. */
export function TiltCard({ children, className = '', max = 7 }: TiltCardProps) {
  const reduced = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 20 })
  const sry = useSpring(ry, { stiffness: 180, damping: 20 })
  const transform = useTransform([srx, sry], ([x, y]) => `perspective(900px) rotateX(${x}deg) rotateY(${y}deg)`)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rx.set(-py * max * 2)
    ry.set(px * max * 2)
  }

  const onMouseLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      className={className}
      style={reduced ? undefined : { transform, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
