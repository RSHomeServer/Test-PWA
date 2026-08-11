import type { ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getAdjacentStacks, getArea, getGroup } from '../catalogue/registry'
import {
  labMaturityClass,
  labMaturityFor,
  labMaturityLabel,
} from '../catalogue/labMaturity'
import type { LabSectionId } from '../catalogue/types'
import { LAB_SECTION_IDS } from '../catalogue/types'
import { CatalogueBrowseNav } from '../pages/CatalogueBrowseNav'
import '../pages/catalogue.css'
import { MotionExamplesPage } from './motion-examples/MotionExamplesPage'
import { PreviewValidationPanel } from './PreviewValidationPanel'

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

function LabChrome({
  areaId,
  groupId,
  sectionId,
  children,
}: {
  areaId: string
  groupId: string
  sectionId?: LabSectionId
  children: ReactNode
}) {
  const group = getGroup(areaId, groupId)
  const adjacent = getAdjacentStacks(areaId, groupId)
  const maturity = group ? labMaturityFor(group) : null

  return (
    <main className={`cat${maturity ? ` ${labMaturityClass(maturity)}` : ''}`}>
      <CatalogueBrowseNav
        areaId={areaId}
        groupId={groupId}
        sectionId={sectionId}
      />
      <nav className="cat__crumb">
        <Link to="/">Lab</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/${areaId}`}>{areaId}</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/${areaId}/${groupId}/Overview`}>{groupId}</Link>
        {sectionId && sectionId !== 'Overview' ? (
          <>
            <span aria-hidden="true"> / </span>
            <span>{sectionId}</span>
          </>
        ) : null}
      </nav>
      {children}
      {adjacent && (adjacent.prev || adjacent.next) ? (
        <div className="cat-nav__pager cat-nav__pager--footer">
          {adjacent.prev ? (
            <Link
              className="cat-nav__pager-link"
              to={`/${areaId}/${adjacent.prev.groupId}/Overview`}
              rel="prev"
            >
              ← {adjacent.prev.title}
            </Link>
          ) : (
            <span className="cat-nav__pager-gap" />
          )}
          {adjacent.next ? (
            <Link
              className="cat-nav__pager-link cat-nav__pager-link--next"
              to={`/${areaId}/${adjacent.next.groupId}/Overview`}
              rel="next"
            >
              {adjacent.next.title} →
            </Link>
          ) : (
            <span className="cat-nav__pager-gap" />
          )}
        </div>
      ) : null}
      {!group ? <p className="cat__muted">Unknown stack.</p> : null}
    </main>
  )
}

/** Stack path without section → Overview (default land). */
export function StackHubPage() {
  const { pathname } = useLocation()
  const { areaId, groupId } = parseLabLocation(pathname)
  const group = getGroup(areaId, groupId)
  const area = getArea(areaId)

  if (!group || !area) {
    return (
      <main className="cat">
        <CatalogueBrowseNav areaId={areaId || undefined} />
        <p>Unknown stack.</p>
        <Link to={areaId ? `/${areaId}` : '/'}>Back</Link>
      </main>
    )
  }

  return <Navigate to={`/${area.id}/${group.id}/Overview`} replace />
}

/** Concise stack Overview — includes collapsible Preview Validation. */
export function StackOverviewPage() {
  const { pathname, hash } = useLocation()
  const { areaId, groupId, sectionId } = parseLabLocation(pathname)
  const group = getGroup(areaId, groupId)

  if (!group || sectionId !== 'Overview') {
    return (
      <main className="cat">
        <CatalogueBrowseNav />
        <p>Unknown overview.</p>
      </main>
    )
  }

  const area = getArea(areaId)
  if (area && (area.id !== areaId || group.id !== groupId)) {
    return (
      <Navigate
        to={`/${area.id}/${group.id}/Overview${hash || ''}`}
        replace
      />
    )
  }

  const maturity = labMaturityFor(group)
  const openPreview = hash === '#preview-validation'
  const areaKey = area?.id ?? areaId

  return (
    <LabChrome
      areaId={areaKey}
      groupId={group.id}
      sectionId="Overview"
    >
      <header className="cat__header cat__header--stack">
        <div className="cat__header-main">
          <p className="cat__eyebrow">
            {group.ossUrl ? (
              <a href={group.ossUrl} target="_blank" rel="noreferrer">
                {group.oss}
              </a>
            ) : (
              group.oss
            )}
          </p>
          <h1 className="cat__title">{group.title}</h1>
          <p className="cat__lead">{group.description}</p>
          <p className="cat__status-row">
            <span className={`lab-status-pill ${labMaturityClass(maturity)}`}>
              <span className="lab-tone-dot" aria-hidden="true" />
              {labMaturityLabel(maturity)}
            </span>
            <span className="cat__muted"> · {group.status}</span>
            {group.recommended ? (
              <span className="cat__muted"> · Recommended for Songara</span>
            ) : null}
          </p>
        </div>
        <Link
          className={`cat__examples-cta${
            group.hasExamples ? ' cat__examples-cta--ready' : ''
          }`}
          to={`/${areaKey}/${group.id}/Examples`}
        >
          <span className="cat__examples-cta-label">Examples</span>
          <span className="cat__examples-cta-meta">
            {group.hasExamples ? 'Open experiences' : 'Coming in a later wave'}
          </span>
        </Link>
      </header>

      <PreviewValidationPanel group={group} defaultOpen={openPreview} />

      <section className="cat__panel" aria-labelledby="what-heading">
        <h2 id="what-heading">What it does</h2>
        <p>{group.whatItDoes}</p>
      </section>

      <section className="cat__panel" aria-labelledby="why-heading">
        <h2 id="why-heading">Why we use it</h2>
        <p>{group.whyWeUseIt}</p>
      </section>

      <section className="cat__grid-notes" aria-label="Brief notes">
        {group.a11yNotes ? (
          <div>
            <h2>Accessibility</h2>
            <p>{group.a11yNotes}</p>
          </div>
        ) : null}
        {group.performanceNotes ? (
          <div>
            <h2>Performance</h2>
            <p>{group.performanceNotes}</p>
          </div>
        ) : null}
        {group.alternatives ? (
          <div>
            <h2>Alternatives</h2>
            <p>{group.alternatives}</p>
          </div>
        ) : null}
        {group.ossUrl ? (
          <div>
            <h2>Upstream</h2>
            <p>
              <a href={group.ossUrl} target="_blank" rel="noreferrer">
                {group.oss}
              </a>
            </p>
          </div>
        ) : null}
      </section>
    </LabChrome>
  )
}

/**
 * Examples hub — Motion ships rich experiences; other stacks stay on the
 * Wave A placeholder until their Examples wave.
 */
export function ExamplesPlaceholderPage() {
  const { pathname } = useLocation()
  const { areaId, groupId, sectionId } = parseLabLocation(pathname)
  const group = getGroup(areaId, groupId)

  // Named experience paths still have Examples as the lab section segment.
  const onExamplesSection =
    sectionId === 'Examples' ||
    pathname.includes(`/${groupId}/Examples/`)

  if (!group || !onExamplesSection) {
    return (
      <main className="cat">
        <CatalogueBrowseNav />
        <p>Unknown examples hub.</p>
      </main>
    )
  }

  const area = getArea(areaId)
  if (area && (area.id !== areaId || group.id !== groupId)) {
    return <Navigate to={`/${area.id}/${group.id}/Examples`} replace />
  }

  if (group.hasExamples && areaId === 'animation' && group.id === 'Motion') {
    return (
      <LabChrome
        areaId={area?.id ?? areaId}
        groupId={group.id}
        sectionId="Examples"
      >
        <MotionExamplesPage />
      </LabChrome>
    )
  }

  return (
    <LabChrome
      areaId={area?.id ?? areaId}
      groupId={group.id}
      sectionId="Examples"
    >
      <header className="cat__header">
        <p className="cat__eyebrow">Examples</p>
        <h1 className="cat__title">{group.title} examples</h1>
        <p className="cat__lead">
          Examples wave later. Wave A ships this placeholder only — prior facet
          demos are retained in source for Wave B folding.
        </p>
      </header>
      <section className="cat__panel">
        <p>
          Return to the{' '}
          <Link to={`/${area?.id ?? areaId}/${group.id}/Overview`}>
            Overview
          </Link>
          .
        </p>
      </section>
    </LabChrome>
  )
}
