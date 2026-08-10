import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getArea, getGroup, LAB_SECTION_IDS } from '../catalogue/registry'
import type { CatalogueGroup, LabSectionId } from '../catalogue/types'
import { CatalogueBrowseNav } from '../pages/CatalogueBrowseNav'
import '../pages/catalogue.css'
import { loadPreviewModule } from './loadPreviewModule'

type CheckResult = {
  name: string
  ok: boolean
  detail?: string
}

function parseLabLocation(pathname: string): {
  areaId: string
  groupId: string
  sectionId: LabSectionId | null
} {
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean)
  const areaId = parts[0] ?? ''
  const groupId = parts[1] ?? ''
  const raw = parts[2]
  const sectionId =
    raw && (LAB_SECTION_IDS as readonly string[]).includes(raw)
      ? (raw as LabSectionId)
      : null
  return { areaId, groupId, sectionId }
}

async function runPreviewChecks(group: CatalogueGroup): Promise<CheckResult[]> {
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

/** Preview Validation — diagnostics only (or honest not-backed message). */
export function PreviewValidationPage() {
  const { pathname } = useLocation()
  const { areaId, groupId, sectionId } = parseLabLocation(pathname)
  const group = getGroup(areaId, groupId)
  const [checks, setChecks] = useState<CheckResult[] | null>(null)

  useEffect(() => {
    if (!group || sectionId !== 'Preview-Validation') return
    let cancelled = false
    void runPreviewChecks(group).then((result) => {
      if (!cancelled) setChecks(result)
    })
    return () => {
      cancelled = true
    }
  }, [group, sectionId])

  if (!group || sectionId !== 'Preview-Validation') {
    return (
      <main className="cat">
        <CatalogueBrowseNav />
        <p>Unknown validation page.</p>
      </main>
    )
  }

  const area = getArea(areaId)
  if (area && (area.id !== areaId || group.id !== groupId)) {
    return (
      <Navigate to={`/${area.id}/${group.id}/Preview-Validation`} replace />
    )
  }

  const canonicalAreaId = area?.id ?? areaId
  const canonicalGroupId = group.id

  const previewBacked = Boolean(group.preview.packageId)
  const allOk =
    checks != null && (previewBacked ? checks.every((c) => c.ok) : true)

  return (
    <main className="cat">
      <CatalogueBrowseNav
        areaId={canonicalAreaId}
        groupId={canonicalGroupId}
        sectionId="Preview-Validation"
      />
      <nav className="cat__crumb">
        <Link to="/">Lab</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/${canonicalAreaId}`}>{canonicalAreaId}</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/${canonicalAreaId}/${canonicalGroupId}`}>
          {canonicalGroupId}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>Preview-Validation</span>
      </nav>

      <header className="cat__header">
        <p className="cat__eyebrow">Preview Validation</p>
        <h1 className="cat__title">{group.title}</h1>
        <p className="cat__lead">
          Diagnostics for Preview import, peers, helpers, and policies — not a
          capability showcase.
        </p>
      </header>

      {!previewBacked ? (
        <section className="cat__panel" role="status">
          <h2>Not Preview-backed yet</h2>
          <p>
            This stack has no `@songara/pwa-base/preview/*` package. That is an
            honest status, not a failed check and not a demo gap to paper over.
          </p>
          <p>
            See{' '}
            <Link to={`/${canonicalAreaId}/${canonicalGroupId}/Overview`}>
              Overview
            </Link>{' '}
            for evaluation posture.
          </p>
        </section>
      ) : (
        <section className="cat__panel" aria-labelledby="checks-heading">
          <h2 id="checks-heading">
            Diagnostics{' '}
            {checks == null
              ? '(running…)'
              : allOk
                ? '— all green'
                : '— issues found'}
          </h2>
          <ul className="cat__check-list">
            {(checks ?? []).map((c) => (
              <li
                key={c.name}
                className={
                  c.ok ? 'cat__check cat__check--ok' : 'cat__check cat__check--fail'
                }
              >
                <span aria-hidden="true">{c.ok ? '✓' : '✗'}</span>{' '}
                <strong>{c.name}</strong>
                {c.detail ? (
                  <span className="cat__muted"> — {c.detail}</span>
                ) : null}
              </li>
            ))}
          </ul>
          {checks == null ? <p className="cat__muted">Running checks…</p> : null}
        </section>
      )}

      <p>
        <Link to={`/${canonicalAreaId}/${canonicalGroupId}`}>← Stack hub</Link>
      </p>
    </main>
  )
}
