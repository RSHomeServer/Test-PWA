import { useId, useState } from 'react'
import {
  motion,
  resolveTransition,
  useSongaraMotion,
} from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../catalogue/registry'
import { ExplorationShell } from '../ExplorationShell'

const SPRING = { type: 'spring', stiffness: 260, damping: 18 } as const

/**
 * Exploration: Motion via `@songara/pwa-base/preview/motion` (same API products use).
 */
export function AnimationMotionPage() {
  const record = getExploration('animation', 'motion')
  const { reducedMotion: systemReduce } = useSongaraMotion(SPRING)
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const [toggled, setToggled] = useState(false)
  const reduce = forceReduce || systemReduce
  const transition = resolveTransition(reduce, SPRING)

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      explorationId="motion"
      record={record}
      lead="Declarative React motion via PWA-Base Preview (`@songara/pwa-base/preview/motion`). Validates the same surface products will import — not a local wrapper."
      visualNote="Visual validation: box should spring between sizes when reduced motion is off; snap when on (system preference or Simulate)."
      performance={
        <p>
          Excellent for UI-scale motion; layout animations can thrash if overused.
          Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          Modern evergreen browsers via JS. Score {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>React-first API and variants</li>
          <li>Springs, gestures, layout in one kit</li>
          <li>Songara Preview helpers honour foundation reduced-motion</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Bundle cost vs WAAPI/CSS</li>
          <li>Easy to over-animate</li>
          <li>Preview API may evolve before Stable graduation</li>
        </ul>
      }
      developerExperience={
        <p>
          High DX for component motion; Preview re-exports Motion plus{' '}
          <code>useSongaraMotion</code> / <code>resolveTransition</code>. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Sheet/drawer motion, list reorders, micro-interactions, onboarding
          sequences with shared variants.
        </p>
      }
      reusableIdeas={
        <p>
          Import <code>@songara/pwa-base/preview/motion</code> in products — never
          deep-import <code>@platform/preview-motion</code> or duplicate a local
          wrapper. Keep WAAPI/CSS for one-off decorative pulses.
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
      <div className="cat__demo-row">
        <button type="button" onClick={() => setToggled((v) => !v)}>
          Toggle size
        </button>
        <motion.div
          className="cat__motion-box"
          animate={
            reduce
              ? { scale: 1, borderRadius: '0.5rem' }
              : {
                  scale: toggled ? 1.25 : 1,
                  borderRadius: toggled ? '1.25rem' : '0.5rem',
                }
          }
          transition={transition}
        >
          Motion
        </motion.div>
      </div>
    </ExplorationShell>
  )
}
