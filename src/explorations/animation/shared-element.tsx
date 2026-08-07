import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion as useMotionReducedMotion } from 'motion/react'
import { getExploration } from '../../catalogue/registry'
import { ExplorationShell } from '../ExplorationShell'

type CardId = 'alpha' | 'beta'

/**
 * Exploration: shared-element continuity (Motion layoutId + View Transitions note).
 */
export function AnimationSharedElementPage() {
  const record = getExploration('animation', 'shared-element')
  const systemReduce = useMotionReducedMotion()
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const [active, setActive] = useState<CardId>('alpha')
  const reduce = forceReduce || !!systemReduce
  const supportsViewTransitions =
    typeof document !== 'undefined' && 'startViewTransition' in document

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      explorationId="shared-element"
      record={record}
      lead="Cross-state shared-element continuity: Motion layoutId for in-tree morphs; View Transitions API for document navigations."
      visualNote="Visual validation: switching cards should morph the shared highlight when motion is allowed."
      performance={
        <p>
          In-tree layoutId is fine for a few elements; document View Transitions
          cost depends on captured layers. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          Motion: evergreen. View Transitions: Chromium solid; Safari improving;
          Firefox partial. Detected here:{' '}
          {supportsViewTransitions ? 'supported' : 'not supported'}. Score{' '}
          {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>Continuity sells premium navigation</li>
          <li>layoutId is simple for same-route morphs</li>
          <li>View Transitions unlock cross-route without custom FLIP</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Cross-route VT still uneven across browsers</li>
          <li>React Router integration needs careful wrappers</li>
          <li>Fallback UX must not flash</li>
        </ul>
      }
      developerExperience={
        <p>
          Good for same-tree; cross-route needs platform checks. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Gallery → detail morphs, tab indicators, hero image continuity between
          list and detail routes.
        </p>
      }
      reusableIdeas={
        <p>
          Use layoutId within a route; adopt View Transitions for navigations when
          support is acceptable; always provide an instant fallback.
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
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 32 }
                  }
                />
              ) : null}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </ExplorationShell>
  )
}
