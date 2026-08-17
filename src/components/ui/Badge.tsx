import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'accent' | 'cyan'
  className?: string
}

const tones = {
  default: 'border-line bg-elevated/60 text-muted',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  cyan: 'border-cyan/30 bg-cyan/10 text-cyan',
}

export function Badge({ children, tone = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-300 hover:border-accent/50 hover:text-ink ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
