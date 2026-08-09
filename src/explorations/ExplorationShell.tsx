import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ExplorationRecord } from '../catalogue/types'
import { CatalogueBrowseNav } from '../pages/CatalogueBrowseNav'
import '../pages/catalogue.css'

export interface ExplorationShellProps {
  areaId: string
  /** Path under area, e.g. Motion/Layout-Transitions or rapier2d */
  relativePath: string
  record: ExplorationRecord
  /** One-line concise explanation under the title */
  lead: string
  /** Practical demo / controls */
  children: ReactNode
  performance: ReactNode
  browserCompatibility: ReactNode
  strengths: ReactNode
  weaknesses: ReactNode
  developerExperience: ReactNode
  productIdeas: ReactNode
  reusableIdeas: ReactNode
  visualNote?: string
}

/** Shared artefact-contract layout for catalogue explorations. */
export function ExplorationShell({
  areaId,
  relativePath,
  record,
  lead,
  children,
  performance,
  browserCompatibility,
  strengths,
  weaknesses,
  developerExperience,
  productIdeas,
  reusableIdeas,
  visualNote,
}: ExplorationShellProps) {
  const segments = relativePath.split('/').filter(Boolean)
  const groupId = segments.length > 1 ? segments[0] : undefined
  const offeringId = segments.length > 1 ? segments.slice(1).join('/') : segments[0]

  return (
    <main className="cat">
      <CatalogueBrowseNav
        areaId={areaId}
        groupId={groupId}
        relativePath={relativePath}
      />

      <nav className="cat__crumb">
        <Link to="/">Catalogue</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/${areaId}`}>{areaId}</Link>
        {groupId ? (
          <>
            <span aria-hidden="true"> / </span>
            <Link to={`/${areaId}/${groupId}`}>{groupId}</Link>
          </>
        ) : null}
        <span aria-hidden="true"> / </span>
        <span>{offeringId}</span>
      </nav>

      <header className="cat__header">
        <h1 className="cat__title">{record.capability}</h1>
        <p className="cat__lead">{lead}</p>
        <p>
          <strong>Status:</strong> {record.status} · <strong>OSS:</strong>{' '}
          {record.ossUrl ? (
            <a href={record.ossUrl} target="_blank" rel="noreferrer">
              {record.oss}
            </a>
          ) : (
            record.oss
          )}
        </p>
      </header>

      <section className="cat__panel" aria-labelledby="impl-heading">
        <h2 id="impl-heading">Practical implementation</h2>
        {children}
        {visualNote ? <p className="cat__muted">{visualNote}</p> : null}
      </section>

      <section className="cat__grid-notes" aria-label="Evaluation notes">
        <div>
          <h2>Performance</h2>
          {performance}
        </div>
        <div>
          <h2>Browser compatibility</h2>
          {browserCompatibility}
        </div>
        <div>
          <h2>Strengths</h2>
          {strengths}
        </div>
        <div>
          <h2>Weaknesses</h2>
          {weaknesses}
        </div>
        <div>
          <h2>Developer experience</h2>
          {developerExperience}
        </div>
        <div>
          <h2>Product ideas unlocked</h2>
          {productIdeas}
        </div>
        <div>
          <h2>Reusable ideas</h2>
          {reusableIdeas}
        </div>
      </section>
    </main>
  )
}
