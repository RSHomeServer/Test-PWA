import {
  motion,
} from '@songara/pwa-base/preview/motion'
import { Link } from 'react-router-dom'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import { MotionStage, ReduceMotionToggle } from './_shared'
import { MOTION_SPRING, useCatalogueMotion } from './motionKit'

/**
 * Motion Overview — declarative animate / initial via Preview Motion.
 */
export function AnimationMotionPage() {
  const record = getExploration('animation', 'Motion/Overview')
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)
  const tiles = ['A', 'B', 'C', 'D'] as const

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Overview"
      record={record}
      lead="Declarative React motion via PWA-Base Preview (`@songara/pwa-base/preview/motion`) — the same import products use. Sibling offerings cover springs, layout, gestures, scroll, and more."
      visualNote="Visual validation: tiles enter with stagger, then pulse on a loop when motion is allowed; snap / static under reduced motion."
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
          sequences with shared variants — see also{' '}
          <Link to="/animation/Motion/Variants">Variants</Link> and{' '}
          <Link to="/animation/Motion/Gestures">Gestures</Link>.
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
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />
      <MotionStage label="Declarative tile grid">
        <div className="cat__motion-tiles">
          {tiles.map((label, i) => (
            <motion.div
              key={label}
              className="cat__motion-tile"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.92 }}
              animate={
                reduce
                  ? { opacity: 1, y: 0, scale: 1 }
                  : {
                      opacity: 1,
                      y: [0, -6, 0],
                      scale: 1,
                    }
              }
              transition={
                reduce
                  ? transition
                  : {
                      ...transition,
                      delay: i * 0.08,
                      y: {
                        delay: 0.45 + i * 0.08,
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
              }
            >
              {label}
            </motion.div>
          ))}
        </div>
      </MotionStage>
    </ExplorationShell>
  )
}
