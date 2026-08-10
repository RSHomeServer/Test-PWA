import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  getMotionExperience,
  motionExamplesHubPath,
  motionExperiencePath,
  type MotionExperienceId,
  MOTION_EXPERIENCES,
} from './catalog'
import './motion-examples.css'

export function MotionExamplesChrome({
  experienceId,
  children,
}: {
  experienceId?: MotionExperienceId
  children: ReactNode
}) {
  const experience = experienceId
    ? getMotionExperience(experienceId)
    : undefined

  return (
    <>
      <nav className="mex__crumb" aria-label="Examples breadcrumb">
        <Link to={motionExamplesHubPath()}>Examples</Link>
        {experience ? (
          <>
            <span aria-hidden="true"> / </span>
            <span>{experience.title}</span>
          </>
        ) : null}
      </nav>
      {children}
      <nav className="mex__experience-rail" aria-label="Motion experiences">
        {MOTION_EXPERIENCES.map((e) => {
          const current = e.id === experienceId
          return (
            <Link
              key={e.id}
              className={`mex__rail-link${current ? ' mex__rail-link--current' : ''}`}
              to={motionExperiencePath(e.id)}
              aria-current={current ? 'page' : undefined}
            >
              {e.title}
            </Link>
          )
        })}
      </nav>
      <p className="mex__attr cat__muted">
        Patterns adapted from{' '}
        <a href="https://motion.dev/examples" target="_blank" rel="noreferrer">
          Motion examples
        </a>{' '}
        (MIT). Import only{' '}
        <code>@songara/pwa-base/preview/motion</code> in products.
      </p>
    </>
  )
}

export function ExperienceHeader({
  title,
  lead,
}: {
  title: string
  lead: string
}) {
  return (
    <header className="cat__header">
      <p className="cat__eyebrow">Motion · Examples</p>
      <h1 className="cat__title">{title}</h1>
      <p className="cat__lead">{lead}</p>
    </header>
  )
}

export function DemoBlock({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: ReactNode
}) {
  return (
    <section className="mex__demo">
      <div className="mex__demo-head">
        <h2 className="mex__demo-title">{title}</h2>
        {hint ? <p className="mex__demo-hint cat__muted">{hint}</p> : null}
      </div>
      {children}
    </section>
  )
}
