/**
 * Engineering Capability Catalogue — registry types.
 * Summary tables are derived from these records (nothing throwaway).
 */

export type ExplorationStatus =
  | 'Ready'
  | 'Experimental'
  | 'Rejected'
  | 'Needs investigation'

export type Score1to5 = 1 | 2 | 3 | 4 | 5

export interface ExplorationRecord {
  /** URL segment under the area, e.g. "waapi" → /animation/waapi */
  id: string
  /** Short capability facet name shown in tables */
  capability: string
  /** What was implemented in this exploration */
  implementation: string
  status: ExplorationStatus
  /** OSS or "Platform API" */
  oss: string
  ossUrl?: string
  maturity: Score1to5
  performance: Score1to5
  browserSupport: Score1to5
  offline: Score1to5
  developerExperience: Score1to5
  visualQuality: Score1to5
  accessibility: Score1to5
  /** Higher = harder */
  complexity: Score1to5
  recommended: boolean
  /** Derived or author overall 1–10 */
  overallScore: number
  notes: string
}

export interface CapabilityArea {
  /** URL segment, e.g. "animation" */
  id: string
  title: string
  description: string
  explorations: ExplorationRecord[]
  /** Planned subroutes not yet implemented (shown on summary) */
  planned?: string[]
}
