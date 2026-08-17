import type { Stat } from '../types'

export const aboutIntro = {
  headline: 'More Than a Job Title',
  paragraphs: [
    'I build real-world SaaS products that solve business problems for SMEs and enterprises across India — shaping strategy and roadmaps, translating business needs into clear requirements, and staying hands-on all the way to shipped software.',
    'My differentiator is AI-assisted product development: I use Claude to design, build and ship full applications — Intallysense went from requirements to live apps on the Play Store and App Store this way, and an ERP Finance Module is next. Alongside that, I bring real delivery experience: client implementation, testing and go-lives like the Minda enterprise project.',
  ],
  currentFocus: [
    'SaaS for Indian SMEs',
    'AI-assisted development with Claude',
    'Real-time Tally & asset visibility (Web, iOS & Android)',
    'ERP Finance Module',
    'ERP & third-party integrations',
    'Client implementation & delivery',
  ],
}

/**
 * Animated counters shown in the About section.
 * Every value below is derived from verified data elsewhere on this site
 * (projects.ts, products.ts, certifications.ts, skills.ts) — update them
 * together. Stats without a value are hidden automatically.
 */
export const stats: Stat[] = [
  // Delivered: Asset Management, Intallysense, QR/Barcode, Ticketing,
  // Cloth Sale Online, Minda implementation (ERP Finance still in progress).
  { label: 'Projects Delivered', value: 6, suffix: '+' },
  // Asset Management, Intallysense, ERP Finance Module, CRM, HRMS.
  { label: 'Products Worked On', value: 5, suffix: '' },
  // 5 verified (4 Anthropic + Unstop) + 4 completed training programs.
  { label: 'Certifications & Trainings', value: 9, suffix: '' },
  // Distinct technologies across the skills/projects data files.
  { label: 'Technologies Used', value: 20, suffix: '+' },
]
