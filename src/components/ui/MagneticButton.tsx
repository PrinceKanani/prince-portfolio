import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ReactNode, MouseEvent } from 'react'
import { useReducedMotion } from '../../hooks/useMediaQuery'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  external?: boolean
  ariaLabel?: string
  type?: 'button' | 'submit'
}

const variants = {
  primary:
    'bg-accent-strong text-white shadow-[0_12px_32px_-12px_var(--c-accent-strong)] hover:brightness-110',
  ghost: 'glass text-ink hover:border-accent/50',
}

/** Button/link that subtly pulls toward the cursor. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  external = false,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[filter,border-color,background-color] duration-300 ${variants[variant]} ${className}`
  const style = { x: sx, y: sy }

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        className={cls}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      className={cls}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
