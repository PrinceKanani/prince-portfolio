import { useCallback, useEffect, useState } from 'react'
import { siteConfig } from '../config/siteConfig'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'pk-theme'

function getInitialTheme(): Theme {
  // Visitor's stored choice wins; otherwise the configured default.
  // (index.html ships data-theme="dark" statically for pre-paint styling —
  // if defaultTheme is ever set to 'light', keep that attribute in sync to
  // avoid a one-frame dark flash.)
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Storage unavailable — fall through.
  }
  return siteConfig.defaultTheme
}

/** Matches --c-bg per theme so mobile browser chrome tints with the page. */
const THEME_COLOR: Record<Theme, string> = { dark: '#07090f', light: '#f5f6fb' }

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Storage may be unavailable (private mode) — theme still applies for the session.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
