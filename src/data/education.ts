import type { EducationItem } from '../types'

export const education: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'LJ University',
    duration: 'Jun 2023 – Jul 2025',
    subjects: [
      'Software Engineering & System Design',
      'C# / ASP.NET Core',
      'DevExpress',
      'PHP',
      'Database Systems (MySQL / SQL Server)',
      'Algorithm Design',
      'Automation, APIs & QR/Barcode Integration',
    ],
    projects: ['Ticketing System (ASP.NET Core, Blazor, EF Core, DevExpress XAF)'],
    achievements: [
      'Completed the MCA with advanced coursework, hands-on projects and real-world problem solving (convocation 2026)',
    ],
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'RK University',
    duration: '2020 – 2023',
    subjects: [
      'Programming Fundamentals',
      'Web Technologies (PHP, HTML, CSS)',
      'Databases (MySQL)',
      'Computer Applications',
    ],
    projects: ['Cloth Sale Online — full-stack eCommerce website (PHP, MySQL)'],
    achievements: [],
  },
]
