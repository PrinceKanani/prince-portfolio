import type { Project } from '../types'

/**
 * Project showcase. Add a new object to feature another project.
 * Optional fields (github, demo, image) are hidden when omitted.
 */
export const projects: Project[] = [
  {
    id: 'asset-management',
    name: 'Asset Management System',
    tagline: 'Full-lifecycle enterprise asset management SaaS',
    category: 'SaaS Product',
    description:
      'An end-to-end asset management platform covering the complete lifecycle of enterprise assets — from purchase and allocation through maintenance, verification, transfer and disposal — with QR/barcode identification and multi-location support.',
    problem:
      'Organizations tracked assets across spreadsheets and disconnected registers, making lifecycle events, warranties, AMC contracts and physical verification slow, error-prone and hard to audit.',
    solution:
      'A single system of record for every asset: masters for categories, vendors, locations, departments and employees; lifecycle workflows for movement, transfer, disposal and refurbishment; and QR/barcode labels that make any asset scannable and auditable.',
    role: 'Product & project ownership — requirements, feature design, planning, and hands-on development.',
    responsibilities: [
      'Defined masters and lifecycle workflows with stakeholders',
      'Designed QR/barcode identification and physical verification flows',
      'Planned releases and coordinated the development team',
      'Built core modules and reporting',
    ],
    features: [
      'Asset, Category, Vendor, Location, Department & Employee masters',
      'Asset creation, lifecycle, transfer, movement & disposal',
      'Physical verification with QR code / barcode scanning',
      'Warranty, AMC, maintenance, insurance & refurbishment tracking',
      'Capitalization & depreciation',
      'Bulk Excel upload and email alerts',
      'Dashboard with multi-location support',
    ],
    technologies: ['C#', '.NET', 'DevExpress XAF', 'SQL Server', 'REST API', 'QR/Barcode'],
    architecture:
      'Modular .NET application on SQL Server with a REST API layer, label-printing integration (ZPL) and scheduled email alerting.',
    challenges: [
      'Modeling a lifecycle flexible enough for very different asset types',
      'Making physical verification fast on handheld scanners',
    ],
    impact:
      'Replaced manual registers with a scannable, auditable single source of truth for assets across locations.',
    accent: 'indigo',
  },
  {
    id: 'tally-integration',
    name: 'Intallysense',
    tagline: 'Live Tally data on Web, iOS & Android',
    category: 'Cross-platform SaaS · ERP Integration',
    description:
      'A cross-platform product that brings live Tally accounting data to web, Android and iOS apps — giving Indian SMEs real-time financial visibility beyond the desktop, powered by an integration layer speaking Tally’s XML interface with JSON APIs on the application side.',
    problem:
      'Tally data lives on a desktop. Business owners had no real-time visibility on the move, and teams re-entered ledgers, stock items and transactions by hand — slow, inconsistent, and impossible to monitor.',
    solution:
      'A dedicated integration layer that validates data, transforms JSON payloads into Tally XML, syncs masters and transactions with monitoring and retry — surfaced through web, Android and iOS apps with live financial visibility.',
    role: 'End-to-end ownership — designed and built the application with AI-assisted development (Claude), owning product vision, requirements, UX and technical execution across web, Android and iOS.',
    responsibilities: [
      'Designed and built the application using Claude — no traditional dev-team dependency',
      'Led UX research and the mobile app launches on Play Store & App Store',
      'Mapped application entities to Tally masters (Ledger, Stock Item, Stock Category)',
      'Designed XML/JSON payload transformation and validation',
      'Drove continuous feature delivery from SME client feedback',
    ],
    features: [
      'Real-time Tally visibility on Web, iOS & Android',
      'Master synchronization: Ledger, Stock Item, Stock Category',
      'XML payload generation for the Tally gateway',
      'JSON APIs for application-side communication',
      'Data validation, error handling & sync monitoring',
    ],
    technologies: ['C#', '.NET', 'Tally ERP', 'XML', 'JSON', 'REST API', 'SQL Server', 'Mobile (iOS/Android)'],
    architecture:
      'Web / mobile apps → API → Integration layer (validate, transform, queue) → Tally ERP gateway → response handling and monitoring.',
    challenges: [
      'Handling Tally’s strict XML schema and error responses',
      'Keeping masters consistent across systems without duplicates',
      'Delivering a desktop-grade accounting view on mobile',
    ],
    impact:
      'Launched on Google Play Store and Apple App Store — SMEs get real-time Tally visibility anywhere, with every sync observable and recoverable.',
    accent: 'cyan',
  },
  {
    id: 'erp-finance',
    name: 'ERP Finance Module',
    tagline: 'Enterprise accounting, ledgers & financial reporting',
    category: 'Enterprise SaaS · In Progress',
    description:
      'A finance module for an enterprise ERP system covering accounting, ledgers and financial reporting — currently in active development, built with AI-assisted development using Claude to accelerate delivery and reduce iteration time.',
    problem:
      'Enterprise finance teams need accounting, ledgers and reporting inside their ERP — building such a module traditionally takes large teams and long timelines.',
    solution:
      'A web-based finance module designed and developed with AI-assisted workflows, keeping code quality high while compressing the requirement-to-feature cycle.',
    role: 'Product lead and hands-on builder — designing and developing the module with Claude.',
    responsibilities: [
      'Defining the accounting, ledger and reporting feature set',
      'Designing data models and workflows for enterprise finance',
      'Building with AI-assisted development to accelerate delivery',
    ],
    features: [
      'Accounting & ledger management',
      'Financial reporting',
      'ERP integration',
      'AI-accelerated development workflow',
    ],
    technologies: ['C#', '.NET', 'SQL Server', 'Claude (AI-assisted)', 'Web'],
    impact: 'In progress — compressing enterprise-module delivery timelines with AI-assisted development.',
    accent: 'indigo',
  },
  {
    id: 'ticketing-system',
    name: 'Ticketing System',
    tagline: 'Internal ticketing with sprint planning',
    category: 'Internal Tool',
    description:
      'An internal ticketing system with priority-based ticket creation, department routing, attachments and status tracking — plus threaded comments between users and departments, and sprint planning with story points.',
    problem:
      'Internal requests and issues were scattered across chats and mails, with no routing, status visibility or sprint planning.',
    solution:
      'A structured ticketing workflow: To Do / In Process / Done tracking, department routing, attachments, threaded discussion and story-point-based sprint planning.',
    role: 'Designed and built the system end to end.',
    responsibilities: [
      'Designed the ticket lifecycle, routing and sprint-planning model',
      'Built the application on ASP.NET Core, Blazor, EF Core and DevExpress XAF',
    ],
    features: [
      'Ticket creation with priority, routing & attachments',
      'Status tracking: To Do / In Process / Done',
      'Threaded comments between users and departments',
      'Sprint planning with story points',
    ],
    technologies: ['ASP.NET Core', 'Blazor', 'EF Core', 'DevExpress XAF', 'SQL Server'],
    impact: 'Structured internal work into a trackable, sprint-planned workflow.',
    accent: 'violet',
  },
  {
    id: 'cloth-sale-online',
    name: 'Cloth Sale Online',
    tagline: 'Full-stack eCommerce website',
    category: 'Academic / Full-stack',
    description:
      'A full-stack clothing store with product listings, shopping cart, purchasing flow and automated email confirmations — built as a full-stack project on the classic PHP/MySQL stack.',
    problem:
      'A complete storefront needed product browsing, cart, checkout and order confirmation from scratch.',
    solution:
      'A PHP + MySQL web application implementing listings, cart, purchase flow and automated confirmation emails end to end.',
    role: 'Full-stack developer — built the entire application.',
    responsibilities: [
      'Built product listing, cart and purchasing flows',
      'Implemented automated email confirmations',
      'Designed the MySQL schema',
    ],
    features: [
      'Product listings & shopping cart',
      'Purchasing flow',
      'Automated email confirmations',
    ],
    technologies: ['PHP', 'HTML', 'CSS', 'MySQL'],
    impact: 'A working end-to-end storefront, from catalog to confirmation email.',
    accent: 'cyan',
  },
  {
    id: 'qr-barcode',
    name: 'QR / Barcode System',
    tagline: 'Identification, labeling and scanning infrastructure',
    category: 'Technical System',
    description:
      'A complete identification stack: generating QR codes, barcodes and DataMatrix labels with serial-number tracking, printing them on Zebra printers via ZPL, and scanning them back for instant asset identification.',
    problem:
      'Physical items had no fast, reliable link to their digital records — lookups were manual and verification drives took days.',
    solution:
      'Serial-numbered QR/barcode/DataMatrix labels generated by the system, printed through Zebra ZPL integration, and read back by scanners to resolve any physical item to its record in one scan.',
    role: 'Designed and developed generation, printing and scanning integration end to end.',
    responsibilities: [
      'QR / barcode / DataMatrix generation with serial numbering',
      'Zebra printer integration using ZPL label templates',
      'Scanner integration for identification and verification flows',
    ],
    features: [
      'QR code, barcode & DataMatrix generation',
      'Serial number tracking',
      'Label printing via Zebra printers (ZPL)',
      'Scanner integration for asset identification',
      'Physical verification support',
    ],
    technologies: ['C#', '.NET', 'ZPL', 'Zebra Printers', 'QR/Barcode', 'SQL Server'],
    impact:
      'Every physical asset resolves to its digital record in a single scan, making verification and audits dramatically faster.',
    accent: 'violet',
  },
]
