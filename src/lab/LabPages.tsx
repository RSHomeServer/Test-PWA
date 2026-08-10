import type { ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  getAdjacentLabSections,
  getArea,
  getGroup,
  LAB_SECTIONS,
} from '../catalogue/registry'
import type { ExplorationStatus, LabSectionId } from '../catalogue/types'
import { LAB_SECTION_IDS } from '../catalogue/types'
import { CatalogueBrowseNav } from '../pages/CatalogueBrowseNav'
import '../pages/catalogue.css'

function statusClass(status: ExplorationStatus): string {
  switch (status) {
    case 'Ready':
      return 'cat-nav__badge--ready'
    case 'Experimental':
      return 'cat-nav__badge--experimental'
    case 'Rejected':
      return 'cat-nav__badge--rejected'
    case 'Needs investigation':
      return 'cat-nav__badge--investigate'
    default:
      return ''
  }
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
  const adjacent =
    sectionId != null
      ? getAdjacentLabSections(areaId, groupId, sectionId)
      : null

  return (
    <main className="cat">
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
        <Link to={`/${areaId}/${groupId}`}>{groupId}</Link>
        {sectionId ? (
          <>
            <span aria-hidden="true"> / </span>
            <span>{sectionId}</span>
          </>
        ) : null}
      </nav>
      {children}
      {adjacent && (adjacent.prev || adjacent.next) ? (
        <div className="cat-nav__pager" style={{ marginTop: '2rem' }}>
          {adjacent.prev ? (
            <Link
              className="cat-nav__pager-link"
              to={`/${areaId}/${adjacent.prev.relativePath}`}
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
              to={`/${areaId}/${adjacent.next.relativePath}`}
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

/** Slim stack hub — orientation + links to lab sections. */
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

  // Canonicalise casing (React Router may match Title-Case hubs case-insensitively).
  if (area.id !== areaId || group.id !== groupId) {
    return <Navigate to={`/${area.id}/${group.id}`} replace />
  }

  return (
    <LabChrome areaId={areaId} groupId={groupId}>
      <header className="cat__header">
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
        <p>
          <strong>Status:</strong>{' '}
          <span className={`cat-nav__badge ${statusClass(group.status)}`}>
            {group.status}
          </span>
          {group.recommended ? ' · Recommended' : null}
          {' · '}
          <strong>Preview:</strong>{' '}
          {group.preview.packageId ? (
            <code>{group.preview.packageId}</code>
          ) : (
            'not Preview-backed yet'
          )}
        </p>
      </header>

      <ul className="cat__offering-list" aria-label="Lab sections">
        {LAB_SECTIONS.map((section) => (
          <li key={section.id}>
            <Link
              className="cat__offering-link"
              to={`/${areaId}/${groupId}/${section.id}`}
            >
              <span className="cat__offering-name">{section.title}</span>
              <span className="cat__offering-impl">{section.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </LabChrome>
  )
}

/** Concise stack Overview (Wave A — not an API facet index). */
export function StackOverviewPage() {
  const { pathname } = useLocation()
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
    return <Navigate to={`/${area.id}/${group.id}/Overview`} replace />
  }

  return (
    <LabChrome areaId={area?.id ?? areaId} groupId={group.id} sectionId="Overview">
      <header className="cat__header">
        <p className="cat__eyebrow">Overview</p>
        <h1 className="cat__title">{group.title}</h1>
        <p className="cat__lead">{group.description}</p>
        <p>
          <strong>Status:</strong> {group.status}
          {group.recommended ? ' · Recommended for Songara' : null}
        </p>
      </header>

      <section className="cat__panel" aria-labelledby="what-heading">
        <h2 id="what-heading">What it does</h2>
        <p>{group.description}</p>
      </section>

      <section className="cat__panel" aria-labelledby="why-heading">
        <h2 id="why-heading">Why Songara</h2>
        <p>{group.whySongara}</p>
      </section>

      {group.preview.packageId ? (
        <section className="cat__panel" aria-labelledby="preview-heading">
          <h2 id="preview-heading">Preview package</h2>
          <p>
            <code>{group.preview.packageId}</code>
            {group.preview.peers?.length ? (
              <>
                {' '}
                · peers:{' '}
                {group.preview.peers.map((p) => (
                  <code key={p}>{p}</code>
                ))}
              </>
            ) : null}
          </p>
          <p>
            <Link to={`/${areaId}/${groupId}/Preview-Validation`}>
              Run Preview Validation →
            </Link>
          </p>
        </section>
      ) : (
        <section className="cat__panel" aria-labelledby="preview-heading">
          <h2 id="preview-heading">Preview package</h2>
          <p>
            Not Preview-backed yet. Validation will report that honestly — this is
            not a failing demo.
          </p>
        </section>
      )}

      {group.songaraBehaviour ? (
        <section className="cat__panel" aria-labelledby="behaviour-heading">
          <h2 id="behaviour-heading">Songara-specific behaviour</h2>
          <p>{group.songaraBehaviour}</p>
        </section>
      ) : null}

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

      <p className="cat__muted">
        Examples experiences land in Wave B —{' '}
        <Link to={`/${areaId}/${groupId}/Examples`}>Examples placeholder</Link>.
      </p>
    </LabChrome>
  )
}

/** Examples hub — Wave A placeholder only. */
export function ExamplesPlaceholderPage() {
  const { pathname } = useLocation()
  const { areaId, groupId, sectionId } = parseLabLocation(pathname)
  const group = getGroup(areaId, groupId)

  if (!group || sectionId !== 'Examples') {
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

  return (
    <LabChrome areaId={area?.id ?? areaId} groupId={group.id} sectionId="Examples">
      <header className="cat__header">
        <p className="cat__eyebrow">Examples</p>
        <h1 className="cat__title">{group.title} examples</h1>
        <p className="cat__lead">
          Examples wave later. Wave A ships this placeholder only — prior facet
          demos are retained in source for Wave B folding, not as primary nav.
        </p>
      </header>
      <section className="cat__panel">
        <p>
          No experience children in Wave A. Return to the{' '}
          <Link to={`/${areaId}/${groupId}`}>stack hub</Link> or read the{' '}
          <Link to={`/${areaId}/${groupId}/Overview`}>Overview</Link>.
        </p>
      </section>
    </LabChrome>
  )
}
