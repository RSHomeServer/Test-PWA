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
  /**
   * URL segment for this offering.
   * Flat areas: e.g. "waapi" → /animation/waapi (legacy) or /physics/rapier2d
   * Grouped areas: e.g. "Layout-Transitions" → /animation/Motion/Layout-Transitions
   */
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

/** OSS or native parent under a capability area (nested IA). */
export interface CatalogueGroup {
  /** URL segment, e.g. "Motion" or "native" */
  id: string
  /** Display title */
  title: string
  /** Official OSS / platform label */
  oss: string
  ossUrl?: string
  description?: string
  explorations: ExplorationRecord[]
}

export interface CapabilityArea {
  /** URL segment, e.g. "animation" */
  id: string
  title: string
  description: string
  /**
   * Nested OSS/native groups (preferred for /animation).
   * When set, offerings live at /{area}/{group}/{offering}.
   */
  groups?: CatalogueGroup[]
  /**
   * Flat explorations when `groups` is absent (physics, camera, …).
   * Ignored when `groups` is set.
   */
  explorations?: ExplorationRecord[]
  /** Planned subroutes not yet implemented (shown on summary) */
  planned?: string[]
}

/** Flattened exploration with path under the area. */
export interface ExplorationEntry {
  /** Path under area: "Motion/Layout-Transitions" or "rapier2d" */
  relativePath: string
  group?: CatalogueGroup
  record: ExplorationRecord
}
