import { Link } from 'react-router-dom'
import {
  capabilityAreas,
  getAdjacentStacks,
  getArea,
  getGroup,
} from '../catalogue/registry'
import {
  labMaturityClass,
  labMaturityFor,
  labMaturityLabel,
  LAB_MATURITY,
} from '../catalogue/labMaturity'
import type { LabSectionId } from '../catalogue/types'

export type CatalogueBrowseNavProps = {
  areaId?: string
  groupId?: string
  sectionId?: LabSectionId
  /** Show the compact maturity legend under the area row */
  showLegend?: boolean
}

/**
 * Persistent lab chrome — area flyouts (hover/focus) → stacks land on Overview.
 */
export function CatalogueBrowseNav({
  areaId,
  groupId,
  sectionId,
  showLegend = false,
}: CatalogueBrowseNavProps) {
  const area = areaId ? getArea(areaId) : undefined
  const group = areaId && groupId ? getGroup(areaId, groupId) : undefined
  const adjacent =
    areaId && groupId ? getAdjacentStacks(areaId, groupId) : null

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
              <li key={a.id} className="cat-nav__area-item">
                <Link
                  className={`cat-nav__area${current ? ' cat-nav__link--current' : ''}`}
                  to={`/${a.id}`}
                  aria-current={
                    current && !groupId && !sectionId ? 'page' : undefined
                  }
                  aria-haspopup="true"
                >
                  /{a.id}
                </Link>
                <ul className="cat-nav__flyout" aria-label={`${a.title} stacks`}>
                  {a.groups.map((g) => {
                    const maturity = labMaturityFor(g)
                    const stackCurrent = current && g.id === groupId
                    const overviewPath = `/${a.id}/${g.id}/Overview`
                    const examplesPath = `/${a.id}/${g.id}/Examples`
                    const onOverview =
                      stackCurrent && (!sectionId || sectionId === 'Overview')
                    const onExamples =
                      stackCurrent && sectionId === 'Examples'
                    return (
                      <li key={g.id} className="cat-nav__flyout-item">
                        <Link
                          className={`cat-nav__flyout-link ${labMaturityClass(maturity)}${
                            stackCurrent ? ' cat-nav__link--current' : ''
                          }`}
                          to={overviewPath}
                          aria-current={stackCurrent ? 'page' : undefined}
                          aria-haspopup="true"
                        >
                          <span
                            className="lab-tone-dot"
                            aria-hidden="true"
                          />
                          <span className="cat-nav__flyout-title">{g.title}</span>
                          <span className="cat-nav__flyout-meta">
                            {labMaturityLabel(maturity)}
                            {g.preview.packageId
                              ? ' · Preview'
                              : g.preview.absence === 'stable-kit'
                                ? ' · Stable'
                                : g.preview.absence === 'runtime'
                                  ? ' · Runtime'
                                  : g.preview.absence === 'platform'
                                    ? ' · Platform'
                                    : ''}
                          </span>
                        </Link>
                        <ul
                          className="cat-nav__submenu"
                          aria-label={`${g.title} sections`}
                        >
                          <li>
                            <Link
                              className={`cat-nav__submenu-link${
                                onOverview ? ' cat-nav__link--current' : ''
                              }`}
                              to={overviewPath}
                              aria-current={onOverview ? 'page' : undefined}
                            >
                              Overview
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={`cat-nav__submenu-link${
                                onExamples ? ' cat-nav__link--current' : ''
                              }`}
                              to={examplesPath}
                              aria-current={onExamples ? 'page' : undefined}
                            >
                              Examples
                              {g.hasExamples ? '' : ' · later'}
                            </Link>
                          </li>
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>

      {area?.groups.length && groupId ? (
        <ul className="cat-nav__stack-rail" aria-label={`${area.title} stacks`}>
          {area.groups.map((g) => {
            const maturity = labMaturityFor(g)
            const current = g.id === groupId
            return (
              <li key={g.id}>
                <Link
                  className={`cat-nav__stack-chip ${labMaturityClass(maturity)}${
                    current ? ' cat-nav__link--current' : ''
                  }`}
                  to={`/${area.id}/${g.id}/Overview`}
                  aria-current={current ? 'page' : undefined}
                  title={`${g.title} — ${labMaturityLabel(maturity)}`}
                >
                  <span className="lab-tone-dot" aria-hidden="true" />
                  {g.title}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}

      {group ? (
        <div className="cat-nav__stack-tools">
          <Link
            className={`cat-nav__quiet-link${
              sectionId === 'Examples' ? ' cat-nav__link--current' : ''
            }`}
            to={`/${areaId}/${group.id}/Examples`}
            aria-current={sectionId === 'Examples' ? 'page' : undefined}
          >
            Examples
            {group.hasExamples ? ' · ready' : ' · later'}
          </Link>
          {adjacent && (adjacent.prev || adjacent.next) ? (
            <div className="cat-nav__pager">
              {adjacent.prev ? (
                <Link
                  className="cat-nav__pager-link"
                  to={`/${areaId}/${adjacent.prev.groupId}/Overview`}
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
                  to={`/${areaId}/${adjacent.next.groupId}/Overview`}
                  rel="next"
                >
                  {adjacent.next.title} →
                </Link>
              ) : (
                <span className="cat-nav__pager-gap" />
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {showLegend ? (
        <ul className="lab-legend" aria-label="Stack status legend">
          {LAB_MATURITY.map((m) => (
            <li key={m.id} className={`lab-legend__item ${labMaturityClass(m.id)}`}>
              <span className="lab-tone-dot" aria-hidden="true" />
              <span>
                <strong>{m.label}</strong>
                <span className="cat__muted"> — {m.legend}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  )
}
