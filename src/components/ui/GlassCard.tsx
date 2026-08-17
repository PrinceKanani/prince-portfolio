import type { HTMLAttributes, ReactNode } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true, ...rest }: GlassCardProps) {
  return (
    <div
      className={`glass relative rounded-2xl shadow-card transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:border-accent/40' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
