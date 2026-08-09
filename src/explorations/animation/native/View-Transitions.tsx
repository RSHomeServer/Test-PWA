import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'

/**
 * Native View Transitions API — document/same-document navigation morphs.
 * Distinct from Motion layoutId (see /animation/Motion/Shared-Element).
 */
export function AnimationViewTransitionsPage() {
  const record = getExploration('animation', 'native/View-Transitions')
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const [pane, setPane] = useState<'a' | 'b'>('a')
  const supports =
    typeof document !== 'undefined' && 'startViewTransition' in document

  if (!record) return null

  const flip = () => {
    if (forceReduce || !supports) {
      setPane((p) => (p === 'a' ? 'b' : 'a'))
      return
    }
    document.startViewTransition(() => {
      setPane((p) => (p === 'a' ? 'b' : 'a'))
    })
  }

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="native/View-Transitions"
      record={record}
      lead="Platform View Transitions API for same-document (and eventually cross-document) navigation morphs. Complementary to Motion layoutId within a route."
      visualNote="Visual validation: toggle panes — with support and motion allowed, the browser may cross-fade/morph; otherwise hard cut."
      performance={
        <p>
          Cost depends on captured layers and paint size. Score{' '}
          {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          Detected here: {supports ? 'supported' : 'not supported'}. Chromium
          solid; Safari improving; Firefox partial. Score{' '}
          {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>Native continuity without a motion library</li>
          <li>Pairs with SPA routers when wrapped carefully</li>
          <li>Clear fallback: instant navigation</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Uneven browser support</li>
          <li>React integration needs careful transition wrappers</li>
          <li>Not a substitute for in-tree layoutId morphs</li>
        </ul>
      }
      developerExperience={
        <p>
          Small API surface; router integration is the hard part. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          List → detail page morphs, tab transitions, soft navigations between
          catalogue areas.
        </p>
      }
      reusableIdeas={
        <p>
          Feature-detect <code>document.startViewTransition</code>; skip under
          reduced motion; keep Motion{' '}
          <Link to="/animation/Motion/Shared-Element">Shared Element</Link> for
          in-route continuity.
        </p>
      }
    >
      <div className="cat__controls">
        <label htmlFor={reduceId}>
          <input
            id={reduceId}
            type="checkbox"
            checked={forceReduce}
            onChange={(e) => setForceReduce(e.target.checked)}
          />{' '}
          Simulate reduced motion
        </label>
      </div>
      <p className="cat__muted">
        Support: <strong>{supports ? 'yes' : 'no'}</strong>
        {forceReduce ? ' · forced instant' : ''}
      </p>
      <div className="cat__demo-row">
        <button type="button" onClick={flip}>
          Toggle pane
        </button>
        <div
          className="cat__motion-box"
          style={{ viewTransitionName: forceReduce ? 'none' : 'cat-vt-pane' }}
        >
          Pane {pane.toUpperCase()}
        </div>
      </div>
    </ExplorationShell>
  )
}
