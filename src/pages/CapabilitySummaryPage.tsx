import { Link, useLocation } from 'react-router-dom'
import {
  explorationCount,
  getArea,
  listExplorations,
} from '../catalogue/registry'
import { CatalogueBrowseNav } from './CatalogueBrowseNav'
import './catalogue.css'

/** Capability area summary — comparison table of explorations. */
export function CapabilitySummaryPage() {
  const { pathname } = useLocation()
  const areaId = pathname.replace(/^\//, '').split('/').filter(Boolean)[0] ?? ''
  const area = getArea(areaId)

  if (!area) {
    return (
      <main className="cat">
        <CatalogueBrowseNav />
        <p>Unknown capability area.</p>
        <Link to="/">Back to catalogue</Link>
      </main>
    )
  }

  const entries = listExplorations(area)
  const grouped = Boolean(area.groups?.length)

  return (
    <main className="cat">
      <CatalogueBrowseNav areaId={area.id} />

      <nav className="cat__crumb">
        <Link to="/">Catalogue</Link>
        <span aria-hidden="true"> / </span>
        <span>{area.id}</span>
      </nav>

      <header className="cat__header">
        <h1 className="cat__title">/{area.id}</h1>
        <p className="cat__lead">{area.description}</p>
      </header>

      {grouped ? (
        <section className="cat__group-index" aria-label="OSS and native groups">
          <h2 className="cat__section-title">Stacks</h2>
          <ul className="cat__group-list">
            {area.groups!.map((g) => (
              <li key={g.id}>
                <Link className="cat__group-card" to={`/${area.id}/${g.id}`}>
                  <span className="cat__group-card-title">{g.title}</span>
                  <span className="cat__group-card-meta">
                    {g.explorations.length} offering
                    {g.explorations.length === 1 ? '' : 's'}
                  </span>
                  {g.description ? (
                    <span className="cat__group-card-desc">{g.description}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="cat__table-wrap">
        <table className="cat__table">
          <caption className="cat__caption">
            Explorations in this area ({explorationCount(area)} registry rows)
          </caption>
          <thead>
            <tr>
              {grouped ? <th>Stack</th> : null}
              <th>Capability</th>
              <th>Implementation</th>
              <th>Status</th>
              <th>OSS</th>
              <th>Maturity</th>
              <th>Perf</th>
              <th>Browsers</th>
              <th>Offline</th>
              <th>DX</th>
              <th>Visual</th>
              <th>A11y</th>
              <th>Complexity</th>
              <th>Recommended</th>
              <th>Score</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.relativePath}>
                {grouped ? (
                  <td>
                    <Link to={`/${area.id}/${entry.group!.id}`}>
                      {entry.group!.title}
                    </Link>
                  </td>
                ) : null}
                <td>
                  <Link to={`/${area.id}/${entry.relativePath}`}>
                    {entry.record.capability}
                  </Link>
                </td>
                <td>{entry.record.implementation}</td>
                <td>{entry.record.status}</td>
                <td>
                  {entry.record.ossUrl ? (
                    <a
                      href={entry.record.ossUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {entry.record.oss}
                    </a>
                  ) : (
                    entry.record.oss
                  )}
                </td>
                <td>{entry.record.maturity}</td>
                <td>{entry.record.performance}</td>
                <td>{entry.record.browserSupport}</td>
                <td>{entry.record.offline}</td>
                <td>{entry.record.developerExperience}</td>
                <td>{entry.record.visualQuality}</td>
                <td>{entry.record.accessibility}</td>
                <td>{entry.record.complexity}</td>
                <td>{entry.record.recommended ? 'Yes' : 'No'}</td>
                <td>{entry.record.overallScore}</td>
                <td>{entry.record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {area.planned && area.planned.length > 0 ? (
        <section className="cat__planned">
          <h2>Planned explorations</h2>
          <ul>
            {area.planned.map((id) => (
              <li key={id}>
                <code>
                  /{area.id}/{id}
                </code>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}
