import { navItems } from '../../data/navigation'
import { configuredSocialLinks } from '../../data/social'
import { siteConfig } from '../../config/siteConfig'

const footerLinkIds = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact']

export function Footer() {
  const links = navItems.filter((n) => footerLinkIds.includes(n.id))

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-strong to-violet font-display text-sm font-bold text-white">
                {siteConfig.initials}
              </span>
              <span className="font-display text-lg font-bold text-ink">{siteConfig.name}</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted">{siteConfig.role}</p>
            <p className="mt-4 text-sm text-faint italic">Built with passion, curiosity and technology.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {links.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-2">
            {configuredSocialLinks.map((l) => {
              const Icon = l.icon
              return (
                <a
                  key={l.id}
                  href={l.href}
                  aria-label={l.label}
                  {...(l.id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-center text-xs text-faint">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
