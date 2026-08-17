/**
 * Content that is not yet confirmed uses the `[ADD ...]` convention.
 * Components use these helpers to hide or gracefully degrade anything
 * still marked as a placeholder, so unverified content never ships as fact.
 */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true
  return /^\[ADD .*\]$/i.test(value.trim())
}

export function isConfigured(value: string | undefined | null): value is string {
  return !isPlaceholder(value)
}
