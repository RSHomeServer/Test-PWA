import { Link, useLocation } from 'react-router-dom'
import { getArea, getGroup } from '../catalogue/registry'
import { CatalogueBrowseNav } from './CatalogueBrowseNav'
import './catalogue.css'

/**
 * Fallback page — Wave A routes should not need this; kept for safety.
 */
export function ExplorationStubPage() {
  const { pathname } = useLocation()
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean)
  const areaId = parts[0] ?? ''
  const groupId = parts[1]
  const area = getArea(areaId)
  const group = areaId && groupId ? getGroup(areaId, groupId) : undefined

  return (
    <main className="cat">
      <CatalogueBrowseNav areaId={areaId || undefined} groupId={groupId} />
      <header className="cat__header">
        <h1 className="cat__title">Unknown lab route</h1>
        <p className="cat__lead">
          Primary navigation uses Overview, Preview Validation, and Examples under
          each stack. Facet leaves redirect into those sections.
        </p>
      </header>
      <p>
        {group ? (
          <Link to={`/${areaId}/${groupId}`}>Open {group.title} hub</Link>
        ) : area ? (
          <Link to={`/${areaId}`}>Open /{area.id}</Link>
        ) : (
          <Link to="/">Back to lab</Link>
        )}
      </p>
    </main>
  )
}
