import { Link, useLocation } from 'react-router-dom'
import { getGroup } from '../catalogue/registry'
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

/** Hub for an OSS or native stack under a capability area. */
export function CatalogueGroupHubPage() {
  const { pathname } = useLocation()
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean)
  const areaId = parts[0] ?? ''
  const groupId = parts[1] ?? ''
  const group = getGroup(areaId, groupId)

  if (!group) {
    return (
      <main className="cat">
        <CatalogueBrowseNav areaId={areaId || undefined} />
        <p>Unknown stack.</p>
        <Link to={areaId ? `/${areaId}` : '/'}>Back</Link>
      </main>
    )
  }

  return (
    <main className="cat">
      <CatalogueBrowseNav areaId={areaId} groupId={groupId} />

      <nav className="cat__crumb">
        <Link to="/">Catalogue</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/${areaId}`}>{areaId}</Link>
        <span aria-hidden="true"> / </span>
        <span>{group.id}</span>
      </nav>

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
        {group.description ? (
          <p className="cat__lead">{group.description}</p>
        ) : null}
      </header>

      <ul className="cat__offering-list">
        {group.explorations.map((ex) => (
          <li key={ex.id}>
            <Link
              className="cat__offering-link"
              to={`/${areaId}/${group.id}/${ex.id}`}
            >
              <span className="cat__offering-name">{ex.capability}</span>
              <span className={`cat-nav__badge ${statusClass(ex.status)}`}>
                {ex.status}
              </span>
              <span className="cat__offering-impl">{ex.implementation}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
