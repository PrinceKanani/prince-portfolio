/**
 * Central site configuration.
 *
 * Every personal detail lives here. Values wrapped in `[ADD ...]` are
 * placeholders — the UI hides or degrades the related feature until you
 * replace them with real values.
 *
 * Environment variables (see .env.example) override the matching fields,
 * so secrets/handles can also be provided at build time.
 */
const env = import.meta.env

export const siteConfig = {
  name: 'Prince Kanani',
  initials: 'PK',
  role: 'Assistant Product Manager — SaaS · Tally Integration · Web & Mobile Apps',
  company: 'Honest IT',
  location: 'Ahmedabad, Gujarat, India',
  education: 'MCA, LJ University',
  tagline:
    'Building products, managing projects, solving technical problems, and turning business requirements into shipped software — fast, with AI-assisted development.',

  /**
   * Public contact email (confirmed by the owner).
   * NOTE: the resume PDF still prints "gmali.com" — fix it there too.
   */
  // `||` (not `??`) so an env var injected as an empty string — e.g. an unset
  // repository variable in CI — still falls back to the default.
  email: (env.VITE_CONTACT_EMAIL as string | undefined) || 'princekanani4@gmail.com',

  /** GitHub username only (not the full URL). */
  githubUsername: (env.VITE_GITHUB_USERNAME as string | undefined) || 'PrinceKanani03',

  /** Full LinkedIn profile URL. */
  linkedinUrl:
    (env.VITE_LINKEDIN_URL as string | undefined) ||
    'https://www.linkedin.com/in/prince-kanani-312a79230',

  /** Optional POST endpoint for the contact form (Formspree, EmailJS, custom API). */
  contactEndpoint: (env.VITE_CONTACT_ENDPOINT as string | undefined) || '',

  /** Resume PDF served from /public. */
  resumePath: 'resume/Prince-Kanani-Resume.pdf',

  /** Profile photo served from /public. Leave as-is to use the abstract avatar. */
  profileImage: 'images/profile.jpg',

  defaultTheme: 'dark' as 'dark' | 'light',
} as const

export function githubProfileUrl(username: string): string {
  return `https://github.com/${username}`
}

/** Resolves a /public asset path against the Vite base URL. */
export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
