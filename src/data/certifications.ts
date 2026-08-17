import type { Certification } from '../types'

/**
 * Certifications & completed training programs (as shared on LinkedIn).
 * `[ADD ...]` values (credential IDs/URLs) are hidden until filled in.
 */
export const certifications: Certification[] = [
  {
    name: 'Campus to Technical Careers Training Program',
    organization: 'TNS Foundation',
    date: '2025',
    credentialId: '[ADD CREDENTIAL ID]',
    credentialUrl: '[ADD CREDENTIAL URL]',
    details:
      'MySQL, Git, Core Java 8, Hibernate with JPA, Spring 5, Spring Boot, HTML/CSS/JavaScript and soft-skills development.',
  },
  {
    name: 'Java Training',
    organization: 'Spoken Tutorial Project, IIT Bombay (via LJ University)',
    date: '2024',
    credentialId: '[ADD CREDENTIAL ID]',
    credentialUrl: '[ADD CREDENTIAL URL]',
    details: '4-credit course completed with a score of 77.50%.',
  },
  {
    name: 'PHP Developer Training',
    organization: 'YR Coder',
    date: 'Aug 2023 – Dec 2023',
    credentialId: '[ADD CREDENTIAL ID]',
    credentialUrl: '[ADD CREDENTIAL URL]',
    details: 'Hands-on PHP web development training completed alongside the MCA.',
  },
  {
    name: 'Spark AR Community Hackathon — Participation',
    organization: 'Meta × Reskilll',
    date: '2025',
    credentialId: '[ADD CREDENTIAL ID]',
    credentialUrl: '[ADD CREDENTIAL URL]',
    details: 'Built with augmented-reality tooling in a community hackathon setting.',
  },
]
