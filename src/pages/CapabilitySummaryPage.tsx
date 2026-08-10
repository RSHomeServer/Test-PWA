import { Link, useLocation } from 'react-router-dom'
import { getArea, stackCount } from '../catalogue/registry'
import type { ExplorationStatus } from '../catalogue/types'
import { CatalogueBrowseNav } from './CatalogueBrowseNav'
import './catalogue.css'

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

/** Capability area summary — stacks with lab status (not a facet score grid). */
export function CapabilitySummaryPage() {
  const { pathname } = useLocation()
  const areaId = pathname.replace(/^\//, '').split('/').filter(Boolean)[0] ?? ''
  const area = getArea(areaId)

  if (!area) {
    return (
      <main className="cat">
        <CatalogueBrowseNav />
        <p>Unknown capability area.</p>
        <Link to="/">Back to lab</Link>
      </main>
    )
  }

  return (
    <main className="cat">
      <CatalogueBrowseNav areaId={area.id} />

      <nav className="cat__crumb">
        <Link to="/">Lab</Link>
        <span aria-hidden="true"> / </span>
        <span>{area.id}</span>
      </nav>

      <header className="cat__header">
        <h1 className="cat__title">/{area.id}</h1>
        <p className="cat__lead">{area.description}</p>
        <p className="cat__muted">
          {stackCount(area)} stack{stackCount(area) === 1 ? '' : 's'} · each with
          Overview, Preview Validation, and Examples (placeholder).
        </p>
      </header>

      <section className="cat__group-index" aria-label="Technology stacks">
        <h2 className="cat__section-title">Stacks</h2>
        <ul className="cat__group-list">
          {area.groups.map((g) => (
            <li key={g.id}>
              <Link className="cat__group-card" to={`/${area.id}/${g.id}`}>
                <span className="cat__group-card-title">{g.title}</span>
                <span className="cat__group-card-meta">
                  <span className={`cat-nav__badge ${statusClass(g.status)}`}>
                    {g.status}
                  </span>
                  {g.preview.packageId ? ' · Preview' : ' · no Preview'}
                  {g.recommended ? ' · recommended' : ''}
                </span>
                <span className="cat__group-card-desc">{g.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
