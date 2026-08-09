import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  resolveTransition,
  useSongaraMotion,
} from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'

type CardId = 'alpha' | 'beta'

const SPRING = { type: 'spring', stiffness: 380, damping: 32 } as const

/**
 * Exploration: shared-element continuity via Preview Motion layoutId.
 * Document View Transitions live under /animation/native/View-Transitions.
 */
export function AnimationSharedElementPage() {
  const record = getExploration('animation', 'Motion/Shared-Element')
  const { reducedMotion: systemReduce } = useSongaraMotion(SPRING)
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const [active, setActive] = useState<CardId>('alpha')
  const reduce = forceReduce || systemReduce
  const transition = resolveTransition(reduce, SPRING)

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Shared-Element"
      record={record}
      lead="Cross-state shared-element continuity via `@songara/pwa-base/preview/motion` layoutId within a route."
      visualNote="Visual validation: switching cards should morph the shared highlight when motion is allowed."
      performance={
        <p>
          In-tree layoutId is fine for a few elements. Score {record.performance}
          /5.
        </p>
      }
      browserCompatibility={
        <p>
          Motion JS runtime — evergreen browsers. Score {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>Continuity sells premium in-route UI</li>
          <li>layoutId is simple for same-tree morphs</li>
          <li>Pairs with spring transitions</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Not a document navigation API</li>
          <li>Too many shared ids become hard to reason about</li>
          <li>Must snap under reduced motion</li>
        </ul>
      }
      developerExperience={
        <p>
          Strong for same-tree morphs via Preview. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Tab indicators, selected-card highlights, hero continuity between list
          and detail within one screen.
        </p>
      }
      reusableIdeas={
        <p>
          Use Preview layoutId within a route; for document navigations see{' '}
          <Link to="/animation/native/View-Transitions">
            /animation/native/View-Transitions
          </Link>
          ; always provide an instant fallback under reduced motion.
        </p>
      }
    >
      <div className="cat__controls">
        <label htmlFor={reduceId}>
          <input
            id={reduceId}
            type="checkbox"
            checked={reduce}
            onChange={(e) => setForceReduce(e.target.checked)}
          />{' '}
          Simulate reduced motion
        </label>
      </div>
      <div className="cat__shared-stage">
        {(['alpha', 'beta'] as const).map((id) => (
          <button
            key={id}
            type="button"
            className="cat__shared-card"
            data-active={active === id ? 'true' : 'false'}
            onClick={() => setActive(id)}
          >
            <strong>{id}</strong>
            <AnimatePresence>
              {active === id ? (
                <motion.div
                  layoutId={reduce ? undefined : 'shared-highlight'}
                  className="cat__gsap-bar"
                  style={{ width: '70%', marginTop: '1rem' }}
                  transition={transition}
                />
              ) : null}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </ExplorationShell>
  )
}
