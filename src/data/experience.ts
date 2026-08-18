import type { ExperienceItem } from '../types'

/**
 * Career timeline (sourced from the resume + LinkedIn profile, Aug 2026).
 * Add new roles to the top of this array.
 */
export const experience: ExperienceItem[] = [
  {
    company: 'Honest IT',
    role: 'Assistant Product Manager',
    duration: 'Jan 2026 – Present',
    location: 'Ahmedabad, Gujarat, India',
    summary:
      'Leading product development for two key SaaS products serving SMEs and enterprises across India — and shipping them hands-on with AI-assisted development using Claude, from requirements and UX through implementation.',
    responsibilities: [
      'Independently designed and built the Intallysense application using Claude — owning requirements, UX and implementation without a traditional dev-team dependency',
      'Leading an ERP Finance Module, again built with AI-assisted development to accelerate delivery',
      'Managing the Asset Management platform — tracking and optimizing physical and digital assets across departments and locations',
      'Writing clear product requirements, prioritizing features, and coordinating delivery across client and technical stakeholders',
      'Gathering customer feedback from SME and enterprise clients to drive data-informed decisions',
    ],
    achievements: [
      'Launched Intallysense mobile apps on Google Play Store and Apple App Store',
    ],
    technologies: ['Product Management', 'AI-Assisted Development (Claude)', 'Tally ERP', 'DevExpress XAF', 'SQL Server', 'REST API', 'C#', '.NET'],
    projects: ['Intallysense', 'ERP Finance Module', 'Asset Management Platform'],
  },
  {
    company: 'Honest IT',
    role: 'Support Executive',
    // Ended when the Assistant PM role began (confirmed by the owner).
    duration: 'Apr 2025 – Jan 2026',
    location: 'Ahmedabad, Gujarat, India',
    summary:
      'Worked the Minda enterprise client project end-to-end — project implementation, on-site testing, UAT coordination and go-live — while delivering prompt support to enterprise clients.',
    responsibilities: [
      'Implemented Honest IT solutions for Minda: requirements walkthroughs, on-site testing and go-live',
      'Performed functional testing and UAT coordination to catch issues before client sign-off',
      'Delivered prompt support to enterprise clients and documented outcomes',
      'Improved onboarding with simplified training and support materials',
    ],
    achievements: [
      'Supported the Minda project from implementation through go-live and post-deployment resolution',
      // Dec 2025 — falls in this role's period, not the Jan-2026 PM role.
      'Represented Honest IT at Kutch Industrial Expo 2025 (Gandhidham, Gujarat)',
    ],
    technologies: ['Testing & QA', 'UAT', 'Client Communication', 'Documentation', 'SQL'],
    projects: ['Minda Project', 'Intallysense', 'Asset Management Platform'],
  },
  {
    company: 'Honest IT',
    role: 'Software Development Intern (.NET)',
    duration: 'Jan 2025 – Apr 2025',
    location: 'Ahmedabad, Gujarat, India',
    summary:
      'Hands-on exposure to enterprise software development using ASP.NET, .NET Core and C# — the foundation that now supports product and requirement decisions.',
    responsibilities: [
      'Built and tested web application modules in ASP.NET / .NET Core',
      'Fixed bugs and supported delivery of client projects',
    ],
    achievements: [],
    technologies: ['ASP.NET', '.NET Core', 'C#', 'SQL Server'],
    projects: ['Client web applications'],
  },
]
