import { Link, useLocation } from 'react-router-dom'
import { getExploration } from '../catalogue/registry'
import './catalogue.css'

/**
 * Placeholder exploration page until an Executor implements the artefact.
 * Route + registry row already exist — fill contract sections in place.
 */
export function ExplorationStubPage() {
  const { pathname } = useLocation()
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean)
  const areaId = parts[0] ?? ''
  const explorationId = parts[1] ?? ''
  const record = getExploration(areaId, explorationId)

  if (!record) {
    return (
      <main className="cat">
        <p>Unknown exploration.</p>
        <Link to="/">Back to catalogue</Link>
      </main>
    )
  }

  return (
    <main className="cat">
      <nav className="cat__crumb">
        <Link to="/">Catalogue</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/${areaId}`}>{areaId}</Link>
        <span aria-hidden="true"> / </span>
        <span>{explorationId}</span>
      </nav>

      <header className="cat__header">
        <p className="cat__eyebrow">Scaffold · Needs investigation</p>
        <h1 className="cat__title">{record.capability}</h1>
        <p className="cat__lead">
          This subroute is reserved for a permanent evaluation of{' '}
          <strong>{record.oss}</strong>. An Executor ticket should replace this
          shell with a practical implementation and complete the artefact
          contract below.
        </p>
        <p>
          <strong>Status:</strong> {record.status}
        </p>
      </header>

      <section className="cat__panel">
        <h2>Artefact contract (to complete)</h2>
        <ul>
          <li>Concise explanation</li>
          <li>OSS project(s) under evaluation</li>
          <li>Practical implementation using that stack</li>
          <li>Visual validation (where appropriate)</li>
          <li>Performance observations</li>
          <li>Browser compatibility</li>
          <li>Strengths / weaknesses</li>
          <li>Developer experience</li>
          <li>Product ideas unlocked</li>
          <li>Reusable implementation ideas</li>
          <li>
            Status: Ready · Experimental · Rejected · Needs investigation
          </li>
        </ul>
        <p className="cat__muted">
          Update scores and notes in <code>src/catalogue/registry.ts</code> when
          done. Architecture:{' '}
          <code>docs/architecture/capability-catalogue-app.md</code> · Deep dive:{' '}
          <code>docs/architecture/top-five-routes.md</code>
        </p>
      </section>
    </main>
  )
}
