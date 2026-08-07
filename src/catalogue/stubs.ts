import type { ExplorationRecord } from './types'

/** Placeholder row until an Executor fills the exploration artefact. */
export function investigationStub(
  partial: Pick<ExplorationRecord, 'id' | 'capability' | 'oss'> &
    Partial<ExplorationRecord>,
): ExplorationRecord {
  return {
    implementation: 'Scaffold only — Executor adds practical implementation',
    status: 'Needs investigation',
    maturity: 1,
    performance: 1,
    browserSupport: 1,
    offline: 1,
    developerExperience: 1,
    visualQuality: 1,
    accessibility: 1,
    complexity: 3,
    recommended: false,
    overallScore: 0,
    notes: 'Scaffolded route. Complete the exploration artefact contract.',
    ...partial,
  }
}
