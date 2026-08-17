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
 * Set `value` to a real number to display a stat — stats without a value are
 * hidden automatically so no invented metrics ever ship.
 * Example: { label: 'Projects Delivered', value: 12, suffix: '+' }
 */
export const stats: Stat[] = [
  { label: 'Projects Delivered', value: undefined, suffix: '+' },
  { label: 'Products Worked On', value: undefined, suffix: '+' },
  { label: 'Years of Experience', value: undefined, suffix: '+' },
  { label: 'Technologies Used', value: undefined, suffix: '+' },
]
