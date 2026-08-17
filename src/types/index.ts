import type { LucideIcon } from 'lucide-react'

export interface Stat {
  label: string
  /** Numeric target for the count-up animation. Leave undefined to hide the stat. */
  value?: number
  suffix?: string
}

export interface ExperienceItem {
  company: string
  role: string
  duration: string
  location?: string
  summary: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  projects: string[]
}

export interface Skill {
  name: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: LucideIcon
  description: string
  skills: Skill[]
}

export interface FlowStage {
  title: string
  icon: LucideIcon
  description: string
  detail?: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  category: string
  description: string
  problem: string
  solution: string
  role: string
  responsibilities: string[]
  features: string[]
  technologies: string[]
  architecture?: string
  challenges?: string[]
  impact: string
  github?: string
  demo?: string
  image?: string
  accent: 'indigo' | 'cyan' | 'violet'
}

export type AchievementCategory = 'Product' | 'Technical' | 'Professional'

export interface Achievement {
  category: AchievementCategory
  title: string
  description: string
}

export interface Certification {
  name: string
  organization: string
  date: string
  credentialId: string
  credentialUrl: string
  /** Optional extra line shown on the card back (score, coverage, etc.). */
  details?: string
  image?: string
}

export interface EducationItem {
  degree: string
  institution: string
  duration: string
  subjects: string[]
  projects: string[]
  achievements: string[]
}

export interface ProductItem {
  name: string
  category: string
  problem: string
  contribution: string
  features: string[]
  technologies: string[]
  status: string
}

export interface ArchitectureLayer {
  title: string
  icon: LucideIcon
  items: string[]
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  fork: boolean
  pushed_at: string
}

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  bio: string | null
}
