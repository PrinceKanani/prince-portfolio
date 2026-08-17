import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  label: string
}

export function AnimatedCounter({ value, suffix = '', label }: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const current = useCountUp(value, inView)

  return (
    <div ref={ref} className="glass gradient-border rounded-2xl p-6 text-center">
      <p className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        <span className="gradient-text">{current}</span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  )
}
