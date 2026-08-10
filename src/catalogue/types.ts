/**
 * Engineering Capability Lab — registry types.
 * Primary IA is stack → lab sections (Overview / Preview Validation / Examples).
 * Facet leaves are frozen; do not add new ones to primary nav.
 */

export type ExplorationStatus =
  | 'Ready'
  | 'Experimental'
  | 'Rejected'
  | 'Needs investigation'

/** Fixed lab sections under every technology stack. */
export const LAB_SECTION_IDS = [
  'Overview',
  'Preview-Validation',
  'Examples',
] as const

export type LabSectionId = (typeof LAB_SECTION_IDS)[number]

export type LabSectionMeta = {
  id: LabSectionId
  title: string
  /** Short hub blurb */
  blurb: string
}

export const LAB_SECTIONS: LabSectionMeta[] = [
  {
    id: 'Overview',
    title: 'Overview',
    blurb: 'What it does, why Songara selected it, status, and brief notes.',
  },
  {
    id: 'Preview-Validation',
    title: 'Preview Validation',
    blurb: 'Diagnostics for Preview import, peers, helpers, and policies.',
  },
  {
    id: 'Examples',
    title: 'Examples',
    blurb: 'Experience demos — Wave B (placeholder in Wave A).',
  },
]

/** Preview package backing for a stack (or honest absence). */
export interface PreviewBacking {
  /** Public import, e.g. `@songara/pwa-base/preview/motion` */
  packageId: string | null
  /** Declared peer packages the consumer must install */
  peers?: readonly string[]
  /** Named helpers / policies expected on the Preview barrel */
  helpers?: readonly string[]
}

/** OSS or native technology stack under a capability area. */
export interface CatalogueGroup {
  /** URL segment, e.g. "Motion" or "native" */
  id: string
  title: string
  oss: string
  ossUrl?: string
  description: string
  status: ExplorationStatus
  recommended: boolean
  /**
   * True when rich Examples experiences exist under this stack (Wave B+).
   * Wave A leaves this false — placeholder only.
   */
  hasExamples?: boolean
  preview: PreviewBacking
  /** Why Songara selected it, or current evaluation posture */
  whySongara: string
  /** Songara-specific behaviour / integration notes */
  songaraBehaviour?: string
  a11yNotes?: string
  performanceNotes?: string
  alternatives?: string
}

export interface CapabilityArea {
  /** URL segment, e.g. "animation" */
  id: string
  title: string
  description: string
  groups: CatalogueGroup[]
  /** Planned stacks not yet registered */
  planned?: string[]
}

/** @deprecated Wave A retires facet records from primary IA. Kept for type refs in Wave B demos. */
export type Score1to5 = 1 | 2 | 3 | 4 | 5

/** @deprecated Facet exploration row — do not add new primary-nav leaves. */
export interface ExplorationRecord {
  id: string
  capability: string
  implementation: string
  status: ExplorationStatus
  oss: string
  ossUrl?: string
  maturity: Score1to5
  performance: Score1to5
  browserSupport: Score1to5
  offline: Score1to5
  developerExperience: Score1to5
  visualQuality: Score1to5
  accessibility: Score1to5
  complexity: Score1to5
  recommended: boolean
  overallScore: number
  notes: string
}
