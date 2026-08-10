import type { CatalogueGroup } from '../catalogue/types'
import { loadPreviewModule } from './loadPreviewModule'

export type CheckResult = {
  name: string
  ok: boolean
  detail?: string
}

/** Diagnostics for Preview import / peers / helpers (or honest not-backed). */
export async function runPreviewChecks(
  group: CatalogueGroup,
): Promise<CheckResult[]> {
  const preview = group.preview
  if (!preview.packageId) {
    return [
      {
        name: 'Preview package',
        ok: false,
        detail:
          'Not Preview-backed yet — this is expected, not a failed capability demo.',
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
      if (peer === 'motion') {
        await import('motion/react')
      } else if (peer === 'dexie') {
        await import('dexie')
      } else if (peer === 'lottie-react') {
        await import('lottie-react')
      } else {
        const id = peer
        await import(/* @vite-ignore */ id)
      }
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
