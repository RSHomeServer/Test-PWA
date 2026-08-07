import { Link, useLocation } from 'react-router-dom'
import { getArea } from '../catalogue/registry'
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

      <div className="cat__table-wrap">
        <table className="cat__table">
          <caption className="cat__caption">
            Explorations in this area (registry-driven)
          </caption>
          <thead>
            <tr>
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
            {area.explorations.map((row) => (
              <tr key={row.id}>
                <td>
                  <Link to={`/${area.id}/${row.id}`}>{row.capability}</Link>
                </td>
                <td>{row.implementation}</td>
                <td>{row.status}</td>
                <td>
                  {row.ossUrl ? (
                    <a href={row.ossUrl} rel="noreferrer" target="_blank">
                      {row.oss}
                    </a>
                  ) : (
                    row.oss
                  )}
                </td>
                <td>{row.maturity}</td>
                <td>{row.performance}</td>
                <td>{row.browserSupport}</td>
                <td>{row.offline}</td>
                <td>{row.developerExperience}</td>
                <td>{row.visualQuality}</td>
                <td>{row.accessibility}</td>
                <td>{row.complexity}</td>
                <td>{row.recommended ? 'Yes' : 'No'}</td>
                <td>{row.overallScore}</td>
                <td>{row.notes}</td>
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
