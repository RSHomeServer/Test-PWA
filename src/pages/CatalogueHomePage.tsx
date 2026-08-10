import { Link } from 'react-router-dom'
import { capabilityAreas, stackCount } from '../catalogue/registry'
import {
  labMaturityClass,
  labMaturityFor,
} from '../catalogue/labMaturity'
import { CatalogueBrowseNav } from './CatalogueBrowseNav'
import './catalogue.css'

/** Lab home — areas with hover flyouts; legend explains stack colours. */
export function CatalogueHomePage() {
  return (
    <main className="cat">
      <CatalogueBrowseNav showLegend />
      <header className="cat__header">
        <p className="cat__eyebrow">Songara · Engineering Capability Lab</p>
        <h1 className="cat__title">Capability Lab</h1>
        <p className="cat__lead">
          Hover an area in the nav to jump straight into a stack Overview.
          Colours show how far each stack has progressed.
        </p>
      </header>

      <ul className="cat__area-list">
        {capabilityAreas.map((area) => {
          const tones = area.groups.reduce(
            (acc, g) => {
              acc[labMaturityFor(g)] += 1
              return acc
            },
            {
              'not-started': 0,
              'in-progress': 0,
              complete: 0,
              examples: 0,
            } as Record<string, number>,
          )
          return (
            <li key={area.id}>
              <Link className="cat__area-link" to={`/${area.id}`}>
                <span className="cat__area-name">/{area.id}</span>
                <span className="cat__area-meta">
                  {stackCount(area)} stack{stackCount(area) === 1 ? '' : 's'}
                  <span className="cat__area-tone-row" aria-hidden="true">
                    {(
                      [
                        'not-started',
                        'in-progress',
                        'complete',
                        'examples',
                      ] as const
                    ).map((tone) =>
                      tones[tone] ? (
                        <span
                          key={tone}
                          className={`cat__area-tone-chip ${labMaturityClass(tone)}`}
                        >
                          {tones[tone]}
                        </span>
                      ) : null,
                    )}
                  </span>
                </span>
                <span className="cat__area-desc">{area.description}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      <p className="cat__footnote">
        Architecture:{' '}
        <code>docs/architecture/capability-catalogue-app.md</code>
      </p>
    </main>
  )
}
