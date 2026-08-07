import { Link } from 'react-router-dom'
import {
  capabilityAreas,
  getAdjacentExplorations,
  getArea,
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
  /** Active capability area id when on /{area} or /{area}/{exploration} */
  areaId?: string
  /** Active exploration id when on /{area}/{exploration} */
  explorationId?: string
}

/**
 * Persistent catalogue browse chrome — areas from registry; explorations
 * under the active area with status badge and current highlight; prev/next
 * within the area in registry order.
 */
export function CatalogueBrowseNav({
  areaId,
  explorationId,
}: CatalogueBrowseNavProps) {
  const area = areaId ? getArea(areaId) : undefined
  const adjacent =
    areaId && explorationId
      ? getAdjacentExplorations(areaId, explorationId)
      : null

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
                  aria-current={current && !explorationId ? 'page' : undefined}
                >
                  /{a.id}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {area ? (
        <ul className="cat-nav__explorations">
          {area.explorations.map((ex) => {
            const current = ex.id === explorationId
            return (
              <li key={ex.id}>
                <Link
                  className={`cat-nav__ex${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${area.id}/${ex.id}`}
                  aria-current={current ? 'page' : undefined}
                >
                  <span className="cat-nav__ex-name">{ex.capability}</span>
                  <span
                    className={`cat-nav__badge ${statusClass(ex.status)}`}
                  >
                    {ex.status}
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
              to={`/${areaId}/${adjacent.prev.id}`}
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
              to={`/${areaId}/${adjacent.next.id}`}
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
