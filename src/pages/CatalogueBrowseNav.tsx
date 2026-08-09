import { Link } from 'react-router-dom'
import {
  capabilityAreas,
  getAdjacentExplorations,
  getArea,
  getGroup,
  listExplorations,
} from '../catalogue/registry'
import type { ExplorationStatus } from '../catalogue/types'

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

export type CatalogueBrowseNavProps = {
  /** Active capability area id when on /{area} or deeper */
  areaId?: string
  /** Active OSS/native group id when on /{area}/{group}/… */
  groupId?: string
  /** Path under area for the active exploration, e.g. Motion/Layout-Transitions */
  relativePath?: string
}

/**
 * Persistent catalogue browse chrome — areas from registry; groups then
 * offerings under the active area; prev/next in registry order.
 */
export function CatalogueBrowseNav({
  areaId,
  groupId,
  relativePath,
}: CatalogueBrowseNavProps) {
  const area = areaId ? getArea(areaId) : undefined
  const group =
    areaId && groupId ? getGroup(areaId, groupId) : undefined
  const adjacent =
    areaId && relativePath
      ? getAdjacentExplorations(areaId, relativePath)
      : null
  const flatEntries = area && !area.groups?.length ? listExplorations(area) : []

  return (
    <nav className="cat-nav" aria-label="Catalogue browse">
      <div className="cat-nav__row">
        <Link
          className={`cat-nav__home${areaId ? '' : ' cat-nav__link--current'}`}
          to="/"
          aria-current={areaId ? undefined : 'page'}
        >
          Catalogue
        </Link>
        <ul className="cat-nav__areas">
          {capabilityAreas.map((a) => {
            const current = a.id === areaId
            return (
              <li key={a.id}>
                <Link
                  className={`cat-nav__area${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${a.id}`}
                  aria-current={current && !groupId && !relativePath ? 'page' : undefined}
                >
                  /{a.id}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {area?.groups?.length ? (
        <ul className="cat-nav__groups">
          {area.groups.map((g) => {
            const current = g.id === groupId
            return (
              <li key={g.id}>
                <Link
                  className={`cat-nav__group${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${area.id}/${g.id}`}
                  aria-current={current && !relativePath ? 'page' : undefined}
                >
                  {g.title}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}

      {group ? (
        <ul className="cat-nav__explorations">
          {group.explorations.map((ex) => {
            const path = `${group.id}/${ex.id}`
            const current = path === relativePath
            return (
              <li key={ex.id}>
                <Link
                  className={`cat-nav__ex${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${areaId}/${path}`}
                  aria-current={current ? 'page' : undefined}
                >
                  <span className="cat-nav__ex-name">{ex.capability}</span>
                  <span className={`cat-nav__badge ${statusClass(ex.status)}`}>
                    {ex.status}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}

      {flatEntries.length > 0 ? (
        <ul className="cat-nav__explorations">
          {flatEntries.map((entry) => {
            const current = entry.relativePath === relativePath
            return (
              <li key={entry.relativePath}>
                <Link
                  className={`cat-nav__ex${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${areaId}/${entry.relativePath}`}
                  aria-current={current ? 'page' : undefined}
                >
                  <span className="cat-nav__ex-name">
                    {entry.record.capability}
                  </span>
                  <span
                    className={`cat-nav__badge ${statusClass(entry.record.status)}`}
                  >
                    {entry.record.status}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}

      {adjacent && (adjacent.prev || adjacent.next) ? (
        <div className="cat-nav__pager">
          {adjacent.prev ? (
            <Link
              className="cat-nav__pager-link"
              to={`/${areaId}/${adjacent.prev.relativePath}`}
              rel="prev"
            >
              ← {adjacent.prev.capability}
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
              {adjacent.next.capability} →
            </Link>
          ) : (
            <span className="cat-nav__pager-gap" />
          )}
        </div>
      ) : null}
    </nav>
  )
}
