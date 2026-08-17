/**
 * Shared solid CTA pill styling for plain anchors/buttons.
 * (MagneticButton covers the cursor-following variant; this is the static one.)
 */
const sizes = {
  sm: 'px-4 py-2',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3',
} as const

export function pill(size: keyof typeof sizes = 'md', extra = ''): string {
  return `inline-flex items-center gap-2 rounded-full bg-accent-strong ${sizes[size]} text-sm font-semibold text-white transition-[filter] hover:brightness-110 ${extra}`.trim()
}
