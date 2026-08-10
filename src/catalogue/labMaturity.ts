import type { CatalogueGroup, ExplorationStatus } from './types'

/**
 * Visual maturity for lab chrome — maps registry status (+ examples) to
 * traffic-light tones the UI uses consistently.
 */
export type LabMaturity =
  | 'not-started'
  | 'in-progress'
  | 'complete'
  | 'examples'

export type LabMaturityMeta = {
  id: LabMaturity
  label: string
  /** Short legend copy */
  legend: string
}

export const LAB_MATURITY: LabMaturityMeta[] = [
  {
    id: 'not-started',
    label: 'Not started',
    legend: 'Scaffold only — Overview still thin / needs investigation',
  },
  {
    id: 'in-progress',
    label: 'In progress',
    legend: 'Evaluation underway — Experimental or incomplete',
  },
  {
    id: 'complete',
    label: 'Complete',
    legend: 'Overview + Preview Validation ready (Wave A)',
  },
  {
    id: 'examples',
    label: 'Examples ready',
    legend: 'Rich Examples experiences shipped (Wave B+)',
  },
]

export function labMaturityFor(
  group: Pick<CatalogueGroup, 'status' | 'hasExamples'>,
): LabMaturity {
  if (group.hasExamples) return 'examples'
  return maturityFromStatus(group.status)
}

function maturityFromStatus(status: ExplorationStatus): LabMaturity {
  switch (status) {
    case 'Ready':
      return 'complete'
    case 'Experimental':
      return 'in-progress'
    case 'Rejected':
    case 'Needs investigation':
    default:
      return 'not-started'
  }
}

export function labMaturityClass(maturity: LabMaturity): string {
  return `lab-tone--${maturity}`
}

export function labMaturityLabel(maturity: LabMaturity): string {
  return LAB_MATURITY.find((m) => m.id === maturity)?.label ?? maturity
}
