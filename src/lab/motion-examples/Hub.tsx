import { Link } from 'react-router-dom'
import {
  MOTION_EXPERIENCES,
  motionExperiencePath,
} from './catalog'
import {
  ExperienceHeader,
  MotionExamplesChrome,
} from './shared'

/** Hub at `/animation/Motion/Examples`. */
export function MotionExamplesHub() {
  return (
    <MotionExamplesChrome>
      <ExperienceHeader
        title="Motion examples"
        lead="Product-shaped ports of public Motion tutorials (not Motion+) on `@songara/pwa-base/preview/motion` — menus, transitions, and pressables with reduced-motion honouring."
      />
      <ul className="mex__hub-grid">
        {MOTION_EXPERIENCES.map((e) => (
          <li key={e.id}>
            <Link className="mex__hub-card" to={motionExperiencePath(e.id)}>
              <span className="mex__hub-card-title">{e.title}</span>
              <span className="mex__hub-card-blurb">{e.blurb}</span>
              <span className="mex__hub-card-meta cat__muted">
                Inspired by{' '}
                {e.inspiredBy.map((s) => s.name).join(', ')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </MotionExamplesChrome>
  )
}
