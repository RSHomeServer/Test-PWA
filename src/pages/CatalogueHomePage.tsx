import { Link } from 'react-router-dom'
import { capabilityAreas, stackCount } from '../catalogue/registry'
import { CatalogueBrowseNav } from './CatalogueBrowseNav'
import './catalogue.css'

/** Lab home — index of capability areas. */
export function CatalogueHomePage() {
  return (
    <main className="cat">
      <CatalogueBrowseNav />
      <header className="cat__header">
        <p className="cat__eyebrow">Songara · Engineering Capability Lab</p>
        <h1 className="cat__title">Capability Lab</h1>
        <p className="cat__lead">
          Evaluate mature browser capabilities and OSS stacks for Songara PWAs.
          Each stack has Overview, Preview Validation, and Examples — not an
          MDN/Storybook API reference of facet leaves.
        </p>
      </header>

      <ul className="cat__area-list">
        {capabilityAreas.map((area) => (
          <li key={area.id}>
            <Link className="cat__area-link" to={`/${area.id}`}>
              <span className="cat__area-name">/{area.id}</span>
              <span className="cat__area-meta">
                {stackCount(area)} stack{stackCount(area) === 1 ? '' : 's'}
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
