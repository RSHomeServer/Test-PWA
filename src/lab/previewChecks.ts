import type { CatalogueGroup, PreviewAbsenceKind } from '../catalogue/types'
import { loadPreviewModule } from './loadPreviewModule'

export type CheckResult = {
  name: string
  ok: boolean
  detail?: string
}

const ABSENCE_LABEL: Record<PreviewAbsenceKind, string> = {
  platform: 'Platform APIs — not a Preview package',
  'stable-kit': 'Stable foundation kit — not a Preview connector',
  runtime: 'Runtime pack store — not a Preview connector',
}

async function importPeer(peer: string): Promise<void> {
  switch (peer) {
    case 'motion':
      await import('motion/react')
      return
    case 'dexie':
      await import('dexie')
      return
    case 'lottie-react':
      await import('lottie-react')
      return
    case '@rive-app/react-canvas':
      await import('@rive-app/react-canvas')
      return
    case 'gsap':
      await import('gsap')
      return
    case '@tsparticles/react':
      await import('@tsparticles/react')
      return
    case '@tsparticles/slim':
      await import('@tsparticles/slim')
      return
    case '@dimforge/rapier2d-compat':
      await import('@dimforge/rapier2d-compat')
      return
    case 'matter-js':
      await import('matter-js')
      return
    case 'planck':
      await import('planck')
      return
    case 'cannon-es':
      await import('cannon-es')
      return
    case 'react-webcam':
      await import('react-webcam')
      return
    case 'tone':
      await import('tone')
      return
    case 'howler':
      await import('howler')
      return
    case 'idb':
      await import('idb')
      return
    case 'localforage':
      await import('localforage')
      return
    default:
      throw new Error(`Unknown Preview peer: ${peer}`)
  }
}

/** Diagnostics for Preview import / peers / helpers (or honest non-connector). */
export async function runPreviewChecks(
  group: CatalogueGroup,
): Promise<CheckResult[]> {
  const preview = group.preview
  if (!preview.packageId) {
    const kind = preview.absence ?? 'platform'
    const label = ABSENCE_LABEL[kind]
    const detail = preview.absenceDetail
      ? `${label} (${preview.absenceDetail}).`
      : `${label}.`
    return [
      {
        name: 'Preview package',
        ok: true,
        detail,
      },
    ]
  }

  const checks: CheckResult[] = []
  let mod: Record<string, unknown> | null = null

  try {
    mod = await loadPreviewModule(preview.packageId)
    checks.push({
      name: `Import ${preview.packageId}`,
      ok: true,
    })
  } catch (err) {
    checks.push({
      name: `Import ${preview.packageId}`,
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    })
    return checks
  }

  for (const helper of preview.helpers ?? []) {
    const value = mod[helper]
    checks.push({
      name: `Helper \`${helper}\``,
      ok: value !== undefined,
      detail: value === undefined ? 'Missing on Preview barrel' : undefined,
    })
  }

  for (const peer of preview.peers ?? []) {
    try {
      await importPeer(peer)
      checks.push({ name: `Peer \`${peer}\``, ok: true })
    } catch (err) {
      checks.push({
        name: `Peer \`${peer}\``,
        ok: false,
        detail: err instanceof Error ? err.message : String(err),
      })
    }
  }

  const policyHelpers = (preview.helpers ?? []).filter((h) =>
    /reduced|resolve|Songara|Playback|Transition/i.test(h),
  )
  if (policyHelpers.length) {
    checks.push({
      name: 'Songara policy helpers present',
      ok: policyHelpers.every((h) => mod?.[h] !== undefined),
      detail: policyHelpers.join(', '),
    })
  }

  return checks
}
