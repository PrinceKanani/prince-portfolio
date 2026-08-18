/**
 * Canonical page order of all numbered sections. The Section component derives
 * its displayed number from this list, so reordering or inserting a section
 * here renumbers the whole page automatically.
 */
export const sectionOrder = [
  'about',
  'skills',
  'experience',
  'product-management',
  'projects',
  'asset-management',
  'tally-integration',
  'qr-barcode',
  'product-thinking',
  'architecture',
  'achievements',
  'education',
  'certifications',
  'linkedin',
  'resume',
  'contact',
] as const
