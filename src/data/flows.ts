import {
  Lightbulb,
  Search,
  ClipboardList,
  CalendarCheck,
  PenTool,
  Code2,
  Bug,
  Rocket,
  MessageSquare,
  RefreshCw,
  ShoppingCart,
  UserCheck,
  Truck,
  Wrench,
  ScanLine,
  ArrowLeftRight,
  Trash2,
  ListTodo,
  ListOrdered,
  CalendarRange,
  Eye,
  Users,
  Target,
  BarChart3,
  Repeat,
  Monitor,
  Server,
  Cpu,
  Database,
  Cable,
  Zap,
  Webhook,
  Mail,
  FolderSync,
  Boxes,
} from 'lucide-react'
import type { ArchitectureLayer, FlowStage } from '../types'

/** §12 — How I Build Products */
export const productLifecycle: FlowStage[] = [
  { title: 'Idea', icon: Lightbulb, description: 'Spot the opportunity', detail: 'Capture problems worth solving from users, stakeholders and the market.' },
  { title: 'Research', icon: Search, description: 'Understand the space', detail: 'Talk to users, study workflows and validate that the problem is real.' },
  { title: 'Requirements', icon: ClipboardList, description: 'Define the “what”', detail: 'Write clear requirements, user stories and acceptance criteria.' },
  { title: 'Planning', icon: CalendarCheck, description: 'Sequence the work', detail: 'Prioritize features, plan releases and align the team on scope.' },
  { title: 'Design', icon: PenTool, description: 'Shape the solution', detail: 'Design flows, data models and UX before a line of code is written.' },
  { title: 'Development', icon: Code2, description: 'Build it', detail: 'Coordinate sprints — and get hands-on with the code where it matters.' },
  { title: 'Testing', icon: Bug, description: 'Prove it works', detail: 'Validate against acceptance criteria, edge cases and real data.' },
  { title: 'Release', icon: Rocket, description: 'Ship it', detail: 'Manage the release, migrations and rollout communication.' },
  { title: 'Feedback', icon: MessageSquare, description: 'Listen', detail: 'Gather feedback from users and support channels.' },
  { title: 'Improvement', icon: RefreshCw, description: 'Iterate', detail: 'Fold learnings back into the roadmap and start again.' },
]

/** §13 — Animated asset lifecycle */
export const assetLifecycle: FlowStage[] = [
  { title: 'Purchase', icon: ShoppingCart, description: 'Asset acquired and capitalized' },
  { title: 'Allocation', icon: UserCheck, description: 'Assigned to employee, department & location' },
  { title: 'Movement', icon: Truck, description: 'Tracked across locations' },
  { title: 'Maintenance', icon: Wrench, description: 'AMC, warranty & servicing' },
  { title: 'Verification', icon: ScanLine, description: 'Physical verification via QR scan' },
  { title: 'Transfer', icon: ArrowLeftRight, description: 'Re-assigned between owners' },
  { title: 'Disposal', icon: Trash2, description: 'Retired, sold or scrapped' },
]

/** §21 — Product thinking loop */
export const productThinking: FlowStage[] = [
  { title: 'Problem', icon: Target, description: 'What problem are we solving?' },
  { title: 'Users', icon: Users, description: 'Who experiences the problem?' },
  { title: 'Research', icon: Search, description: 'What do we know?' },
  { title: 'Solution', icon: Lightbulb, description: 'What should we build?' },
  { title: 'Prioritization', icon: ListOrdered, description: 'What should we build first?' },
  { title: 'Metrics', icon: BarChart3, description: 'How do we measure success?' },
  { title: 'Feedback', icon: MessageSquare, description: 'What should we improve?' },
  { title: 'Iteration', icon: Repeat, description: 'What comes next?' },
]

/** §22 — Agile workflow loop */
export const agileFlow: FlowStage[] = [
  { title: 'Backlog', icon: ListTodo, description: 'Product backlog of user stories' },
  { title: 'Prioritize', icon: ListOrdered, description: 'Order by value and effort' },
  { title: 'Sprint Planning', icon: CalendarRange, description: 'Commit the sprint backlog' },
  { title: 'Development', icon: Code2, description: 'Build with daily stand-ups' },
  { title: 'Testing', icon: Bug, description: 'Verify acceptance criteria' },
  { title: 'Review', icon: Eye, description: 'Sprint review with stakeholders' },
  { title: 'Release', icon: Rocket, description: 'Ship the increment' },
  { title: 'Feedback', icon: MessageSquare, description: 'Retrospective & user feedback' },
]

export const agilePractices = [
  'Scrum',
  'Sprint',
  'User Stories',
  'Acceptance Criteria',
  'Product Backlog',
  'Sprint Backlog',
  'Daily Stand-up',
  'Sprint Review',
  'Retrospective',
]

/** §14 — Tally integration pipeline */
export const tallyPipeline: FlowStage[] = [
  { title: 'CRM / Application', icon: Monitor, description: 'Business data originates here' },
  { title: 'API', icon: Cable, description: 'JSON payloads over REST' },
  { title: 'Integration Layer', icon: Cpu, description: 'Validate, transform JSON → XML, queue' },
  { title: 'Tally ERP', icon: Boxes, description: 'XML gateway processes masters' },
  { title: 'Response', icon: RefreshCw, description: 'Result parsed, logged & monitored' },
]

/** §16 — Automation & integration capabilities */
export const automationItems: FlowStage[] = [
  { title: 'APIs', icon: Cable, description: 'REST APIs for system-to-system communication' },
  { title: 'Webhooks', icon: Webhook, description: 'Event-driven triggers between services' },
  { title: 'ERP Integration', icon: Boxes, description: 'Tally masters & transactions in sync' },
  { title: 'CRM Integration', icon: Monitor, description: 'Customer data connected to operations' },
  { title: 'Email Triggers', icon: Mail, description: 'Automated alerts on business events' },
  { title: 'Data Synchronization', icon: FolderSync, description: 'Consistent data across systems' },
  { title: 'Automation', icon: Zap, description: 'Manual processes turned into workflows' },
]

/** §23 — Technical architecture layers */
export const architectureLayers: ArchitectureLayer[] = [
  { title: 'User', icon: Users, items: ['Web', 'Desktop', 'Scanner devices'] },
  { title: 'Frontend', icon: Monitor, items: ['React', 'Blazor', 'WinForms'] },
  { title: 'API', icon: Cable, items: ['REST', 'JSON', 'Webhooks'] },
  { title: 'Business Logic', icon: Cpu, items: ['.NET', 'C#', 'DevExpress XAF'] },
  { title: 'Database', icon: Database, items: ['SQL Server', 'Reporting'] },
  { title: 'External Integrations', icon: Server, items: ['Tally ERP', 'QR/Barcode', 'Email', 'Zebra ZPL'] },
]
