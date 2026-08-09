import { useId, useState } from 'react'
import {
  motion,
  resolveTransition,
  useSongaraMotion,
} from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'

const SPRING = {
  type: 'spring',
  stiffness: 180,
  damping: 12,
  mass: 0.8,
} as const

/**
 * Exploration: spring physics UX patterns via Preview Motion.
 */
export function AnimationSpringsPage() {
  const record = getExploration('animation', 'Motion/Springs')
  const { reducedMotion: systemReduce } = useSongaraMotion(SPRING)
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const [x, setX] = useState(0)
  const reduce = forceReduce || systemReduce
  const transition = resolveTransition(reduce, SPRING)

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Springs"
      record={record}
      lead="Spring physics for tactile UI motion via `@songara/pwa-base/preview/motion`. Compare Preview spring configs against linear/ease WAAPI substitutes."
      visualNote="Visual validation: ball should overshoot and settle when springs are on; hard jump when reduced motion is on."
      performance={
        <p>
          Springs are cheap for a few elements; many concurrent springs add main-thread
          work. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Via Motion JS runtime — same as Motion Preview. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Natural interruptible motion</li>
          <li>Feels premium for drag/press feedback</li>
          <li>Params (stiffness/damping) are tunable</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Harder to sync to fixed timelines</li>
          <li>WAAPI alone lacks a first-class spring model</li>
          <li>Overshoot can look wrong for data UIs</li>
        </ul>
      }
      developerExperience={
        <p>
          Preview <code>resolveTransition</code> snaps under reduced motion. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Toggle switches, FAB press, pull-to-reveal panels, playful onboarding
          without timeline editors.
        </p>
      }
      reusableIdeas={
        <p>
          Standardise 2–3 spring presets (snappy, soft, heavy). Pass them through
          Preview <code>resolveTransition</code> / <code>useSongaraMotion</code>.
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
        <button type="button" onClick={() => setX((v) => (v === 0 ? 120 : 0))}>
          Flip target
        </button>
        <motion.div
          className="cat__spring-ball"
          animate={{ x }}
          transition={transition}
          aria-label="Spring demo ball"
        />
      </div>
    </ExplorationShell>
  )
}
