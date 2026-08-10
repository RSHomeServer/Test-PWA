import { useEffect, useId, useState } from 'react'
import type { CatalogueGroup, PreviewAbsenceKind } from '../catalogue/types'
import { runPreviewChecks, type CheckResult } from './previewChecks'

export type PreviewValidationPanelProps = {
  group: CatalogueGroup
  /** Open the details when landing via #preview-validation or failed checks */
  defaultOpen?: boolean
}

const ABSENCE_SUMMARY: Record<PreviewAbsenceKind, string> = {
  platform: 'Platform APIs — no Preview package',
  'stable-kit': 'Stable kit — not a Preview connector',
  runtime: 'Runtime pack store — not a Preview connector',
}

function absenceBody(group: CatalogueGroup): string {
  const kind = group.preview.absence ?? 'platform'
  switch (kind) {
    case 'platform':
      return 'This stack is browser / platform APIs. There is no `@songara/pwa-base/preview/*` package by design — Validation is not a failed connector check.'
    case 'stable-kit':
      return `This stack is a Stable foundation kit${
        group.preview.absenceDetail
          ? ` (${group.preview.absenceDetail})`
          : ''
      }, not a Preview connector. Product apps import the Stable surface directly.`
    case 'runtime':
      return `This stack is a foundation runtime detail${
        group.preview.absenceDetail
          ? ` (${group.preview.absenceDetail})`
          : ''
      }, not a Preview OSS connector. It is not an app IndexedDB substitute.`
  }
}

/**
 * Collapsible Preview Validation diagnostics for embedding on Overview.
 */
export function PreviewValidationPanel({
  group,
  defaultOpen = false,
}: PreviewValidationPanelProps) {
  const headingId = useId()
  const previewBacked = Boolean(group.preview.packageId)
  const [checks, setChecks] = useState<CheckResult[] | null>(null)
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    if (!defaultOpen) return
    const el = document.getElementById('preview-validation')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [defaultOpen])

  useEffect(() => {
    let cancelled = false
    void runPreviewChecks(group).then((result) => {
      if (cancelled) return
      setChecks(result)
      const failed = previewBacked && result.some((c) => !c.ok)
      if (failed || defaultOpen) setOpen(true)
    })
    return () => {
      cancelled = true
    }
  }, [group, previewBacked, defaultOpen])

  const allOk =
    checks != null && (previewBacked ? checks.every((c) => c.ok) : true)
  const bannerTone = !previewBacked
    ? 'lab-preview-banner--neutral'
    : checks == null
      ? 'lab-preview-banner--pending'
      : allOk
        ? 'lab-preview-banner--ok'
        : 'lab-preview-banner--fail'

  const summaryLabel = !previewBacked
    ? ABSENCE_SUMMARY[group.preview.absence ?? 'platform']
    : checks == null
      ? 'Running Preview diagnostics…'
      : allOk
        ? 'Preview Validation — all green'
        : 'Preview Validation — issues found'

  return (
    <details
      id="preview-validation"
      className={`lab-preview-banner ${bannerTone}`}
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="lab-preview-banner__summary">
        <span className="lab-preview-banner__dot" aria-hidden="true" />
        <span id={headingId}>{summaryLabel}</span>
        <span className="lab-preview-banner__hint">
          {open ? 'Hide' : 'Show'} diagnostics
        </span>
      </summary>

      <div className="lab-preview-banner__body">
        {!previewBacked ? (
          <p>{absenceBody(group)}</p>
        ) : (
          <>
            <p className="cat__muted">
              Import, peers, helpers, and Songara policy surface — not a
              capability showcase.
              {group.preview.packageId ? (
                <>
                  {' '}
                  Package: <code>{group.preview.packageId}</code>
                </>
              ) : null}
            </p>
            <ul className="cat__check-list" aria-labelledby={headingId}>
              {(checks ?? []).map((c) => (
                <li
                  key={c.name}
                  className={
                    c.ok
                      ? 'cat__check cat__check--ok'
                      : 'cat__check cat__check--fail'
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
            {checks == null ? (
              <p className="cat__muted">Running checks…</p>
            ) : null}
          </>
        )}
      </div>
    </details>
  )
}
