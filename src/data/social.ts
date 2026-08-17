import { Mail } from 'lucide-react'
import type { ComponentType } from 'react'
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons'
import type { BrandIconProps } from '../components/ui/BrandIcons'
import { siteConfig, githubProfileUrl } from '../config/siteConfig'
import { isConfigured } from '../utils/placeholders'

export interface SocialLink {
  id: string
  label: string
  icon: ComponentType<BrandIconProps>
  href: string
  configured: boolean
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    icon: GithubIcon,
    href: isConfigured(siteConfig.githubUsername)
      ? githubProfileUrl(siteConfig.githubUsername)
      : '#',
    configured: isConfigured(siteConfig.githubUsername),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedinIcon,
    href: isConfigured(siteConfig.linkedinUrl) ? siteConfig.linkedinUrl : '#',
    configured: isConfigured(siteConfig.linkedinUrl),
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    href: isConfigured(siteConfig.email) ? `mailto:${siteConfig.email}` : '#',
    configured: isConfigured(siteConfig.email),
  },
]

/** Social links that are actually configured — used wherever fake links must not render. */
export const configuredSocialLinks = socialLinks.filter((l) => l.configured)
