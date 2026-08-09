import { Link } from 'react-router-dom'
import { capabilityAreas, explorationCount } from '../catalogue/registry'
import { CatalogueBrowseNav } from './CatalogueBrowseNav'
import './catalogue.css'

/** Catalogue home — index of capability areas (engineering reference, not products). */
export function CatalogueHomePage() {
  return (
    <main className="cat">
      <CatalogueBrowseNav />
      <header className="cat__header">
        <p className="cat__eyebrow">Songara · Engineering reference</p>
        <h1 className="cat__title">Capability Catalogue</h1>
        <p className="cat__lead">
          Discover, evaluate, and document mature browser capabilities and the OSS
          behind them. Each area is a permanent reference — not a product, not a
          throwaway demo.
        </p>
      </header>

      <ul className="cat__area-list">
        {capabilityAreas.map((area) => (
          <li key={area.id}>
            <Link className="cat__area-link" to={`/${area.id}`}>
              <span className="cat__area-name">/{area.id}</span>
              <span className="cat__area-meta">
                {explorationCount(area)} exploration
                {explorationCount(area) === 1 ? '' : 's'}
                {area.groups?.length
                  ? ` · ${area.groups.length} stack${area.groups.length === 1 ? '' : 's'}`
                  : ''}
                {area.planned?.length
                  ? ` · ${area.planned.length} planned`
                  : ''}
              </span>
              <span className="cat__area-desc">{area.description}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="cat__footnote">
        Architecture:{' '}
        <code>docs/architecture/capability-catalogue-app.md</code>
      </p>
    </main>
  )
}
