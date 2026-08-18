export interface NavItem {
  id: string
  label: string
}

// Deliberately short (recruiter-critical stops only) — every other section is
// reachable by scrolling and via the footer links.
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]
