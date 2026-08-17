import { AnimatePresence, motion } from 'motion/react'
import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { navItems } from '../../data/navigation'
import { configuredSocialLinks } from '../../data/social'
import { siteConfig, publicAsset } from '../../config/siteConfig'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ThemeToggle } from '../ui/ThemeToggle'
import { pill } from '../ui/pill'
import type { Theme } from '../../hooks/useTheme'

interface NavigationProps {
  theme: Theme
  onToggleTheme: () => void
}

export function Navigation({ theme, onToggleTheme }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const sectionIds = useMemo(() => navItems.map((n) => n.id), [])
  const active = useActiveSection(sectionIds)

  // Close the mobile menu when a hash link is followed.
  useEffect(() => {
    if (!open) return
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [open])

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.8, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      {/* max-w-7xl: with 10 links + social icons + theme toggle + Resume, the
          content is ~1160px wide — a 6xl (1152px) bar overflows on the right. */}
      <nav
        aria-label="Primary"
        className="glass-strong mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4"
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2" aria-label={`${siteConfig.name} — home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-strong to-violet font-display text-sm font-bold text-white">
            {siteConfig.initials}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                  active === item.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {configuredSocialLinks
            .filter((l) => l.id !== 'email')
            .map((l) => {
              const Icon = l.icon
              return (
                <a
                  key={l.id}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink sm:flex"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              )
            })}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={publicAsset(siteConfig.resumePath)}
            target="_blank"
            rel="noopener noreferrer"
            className={pill('sm', 'max-md:hidden')}
          >
            <FileText size={14} aria-hidden="true" />
            Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink xl:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-auto mt-2 max-w-7xl rounded-3xl p-4 xl:hidden"
          >
            <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                      active === item.id ? 'bg-accent/15 text-ink' : 'text-muted hover:bg-elevated hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={publicAsset(siteConfig.resumePath)}
              target="_blank"
              rel="noopener noreferrer"
              className={pill('lg', 'mt-3 w-full justify-center')}
            >
              <FileText size={15} aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
