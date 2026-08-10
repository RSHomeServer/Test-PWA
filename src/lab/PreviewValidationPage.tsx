import { Navigate, useLocation } from 'react-router-dom'
import { getArea, getGroup, LAB_SECTION_IDS } from '../catalogue/registry'
import type { LabSectionId } from '../catalogue/types'
import { CatalogueBrowseNav } from '../pages/CatalogueBrowseNav'

/**
 * Legacy Preview-Validation route → Overview with diagnostics panel open.
 */
export function PreviewValidationPage() {
  const { pathname } = useLocation()
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean)
  const areaId = parts[0] ?? ''
  const groupId = parts[1] ?? ''
  const raw = parts[2]
  const sectionId =
    raw && (LAB_SECTION_IDS as readonly string[]).includes(raw)
      ? (raw as LabSectionId)
      : null
  const group = getGroup(areaId, groupId)
  const area = getArea(areaId)

  if (!group || sectionId !== 'Preview-Validation') {
    return (
      <main className="cat">
        <CatalogueBrowseNav />
        <p>Unknown validation page.</p>
      </main>
    )
  }

  const canonicalArea = area?.id ?? areaId
  const canonicalGroup = group.id
  return (
    <Navigate
      to={`/${canonicalArea}/${canonicalGroup}/Overview#preview-validation`}
      replace
    />
  )
}
