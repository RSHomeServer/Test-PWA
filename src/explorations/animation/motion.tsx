import { useId, useState } from 'react'
import { motion, useReducedMotion as useMotionReducedMotion } from 'motion/react'
import { getExploration } from '../../catalogue/registry'
import { ExplorationShell } from '../ExplorationShell'

/**
 * Exploration: Motion (ex-Framer Motion) for declarative React UI animation.
 */
export function AnimationMotionPage() {
  const record = getExploration('animation', 'motion')
  const systemReduce = useMotionReducedMotion()
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const [toggled, setToggled] = useState(false)
  const reduce = forceReduce || !!systemReduce

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      explorationId="motion"
      record={record}
      lead="Declarative React motion library (Motion / formerly Framer Motion). Compare gesture, variants, and springs against the WAAPI baseline."
      visualNote="Visual validation: box should spring between sizes when reduced motion is off; snap when on."
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
          <li>Strong docs and community</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Bundle cost vs WAAPI/CSS</li>
          <li>Easy to over-animate</li>
          <li>Another abstraction over platform APIs</li>
        </ul>
      }
      developerExperience={
        <p>
          High DX for component motion. Score {record.developerExperience}/5.
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
          Prefer Motion for app-wide React motion systems; keep WAAPI/CSS for
          one-off decorative pulses. Always honour reduced motion.
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
          transition={
            reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 18 }
          }
        >
          Motion
        </motion.div>
      </div>
    </ExplorationShell>
  )
}
