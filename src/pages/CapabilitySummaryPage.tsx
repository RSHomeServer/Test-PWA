import { Link, useLocation } from 'react-router-dom'
import { getArea, stackCount } from '../catalogue/registry'
import {
  labMaturityClass,
  labMaturityFor,
  labMaturityLabel,
} from '../catalogue/labMaturity'
import { CatalogueBrowseNav } from './CatalogueBrowseNav'
import './catalogue.css'

/** Capability area summary — colour-coded stacks landing on Overview. */
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
      <CatalogueBrowseNav areaId={area.id} showLegend />

      <nav className="cat__crumb">
        <Link to="/">Lab</Link>
        <span aria-hidden="true"> / </span>
        <span>{area.id}</span>
      </nav>

      <header className="cat__header">
        <h1 className="cat__title">/{area.id}</h1>
        <p className="cat__lead">{area.description}</p>
        <p className="cat__muted">
          {stackCount(area)} stack{stackCount(area) === 1 ? '' : 's'} · open a
          stack to land on its Overview (Preview Validation folds in there).
        </p>
      </header>

      <section className="cat__group-index" aria-label="Technology stacks">
        <h2 className="cat__section-title">Stacks</h2>
        <ul className="cat__group-list">
          {area.groups.map((g) => {
            const maturity = labMaturityFor(g)
            return (
              <li key={g.id}>
                <Link
                  className={`cat__group-card ${labMaturityClass(maturity)}`}
                  to={`/${area.id}/${g.id}/Overview`}
                >
                  <span className="cat__group-card-title">
                    <span className="lab-tone-dot" aria-hidden="true" />
                    {g.title}
                  </span>
                  <span className="cat__group-card-meta">
                    <span className={`lab-status-pill ${labMaturityClass(maturity)}`}>
                      {labMaturityLabel(maturity)}
                    </span>
                    {g.preview.packageId
                      ? ' · Preview'
                      : g.preview.absence === 'stable-kit'
                        ? ' · Stable kit'
                        : g.preview.absence === 'runtime'
                          ? ' · Runtime'
                          : g.preview.absence === 'platform'
                            ? ' · Platform'
                            : ' · no Preview'}
                    {g.recommended ? ' · recommended' : ''}
                  </span>
                  <span className="cat__group-card-desc">{g.description}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
