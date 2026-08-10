import { Link } from 'react-router-dom'
import {
  capabilityAreas,
  getAdjacentLabSections,
  getArea,
  getGroup,
  LAB_SECTIONS,
} from '../catalogue/registry'
import type { ExplorationStatus, LabSectionId } from '../catalogue/types'

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
  areaId?: string
  groupId?: string
  /** Active lab section when on Overview / Preview-Validation / Examples */
  sectionId?: LabSectionId
}

/**
 * Persistent lab browse chrome — areas → stacks → lab sections.
 */
export function CatalogueBrowseNav({
  areaId,
  groupId,
  sectionId,
}: CatalogueBrowseNavProps) {
  const area = areaId ? getArea(areaId) : undefined
  const group = areaId && groupId ? getGroup(areaId, groupId) : undefined
  const adjacent =
    areaId && groupId && sectionId
      ? getAdjacentLabSections(areaId, groupId, sectionId)
      : null

  return (
    <nav className="cat-nav" aria-label="Capability lab browse">
      <div className="cat-nav__row">
        <Link
          className={`cat-nav__home${areaId ? '' : ' cat-nav__link--current'}`}
          to="/"
          aria-current={areaId ? undefined : 'page'}
        >
          Lab
        </Link>
        <ul className="cat-nav__areas">
          {capabilityAreas.map((a) => {
            const current = a.id === areaId
            return (
              <li key={a.id}>
                <Link
                  className={`cat-nav__area${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${a.id}`}
                  aria-current={
                    current && !groupId && !sectionId ? 'page' : undefined
                  }
                >
                  /{a.id}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {area?.groups.length ? (
        <ul className="cat-nav__groups">
          {area.groups.map((g) => {
            const current = g.id === groupId
            return (
              <li key={g.id}>
                <Link
                  className={`cat-nav__group${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${area.id}/${g.id}`}
                  aria-current={current && !sectionId ? 'page' : undefined}
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
          {LAB_SECTIONS.map((section) => {
            const current = section.id === sectionId
            return (
              <li key={section.id}>
                <Link
                  className={`cat-nav__ex${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${areaId}/${group.id}/${section.id}`}
                  aria-current={current ? 'page' : undefined}
                >
                  <span className="cat__offering-name">{section.title}</span>
                  {section.id === 'Overview' ? (
                    <span className={`cat-nav__badge ${statusClass(group.status)}`}>
                      {group.status}
                    </span>
                  ) : null}
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
              ← {adjacent.prev.title}
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
              {adjacent.next.title} →
            </Link>
          ) : (
            <span className="cat-nav__pager-gap" />
          )}
        </div>
      ) : null}
    </nav>
  )
}
