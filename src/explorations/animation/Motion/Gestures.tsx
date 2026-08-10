import { motion } from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import { MotionStage, ReduceMotionToggle } from './_shared'
import { MOTION_SPRING, useCatalogueMotion } from './motionKit'

/**
 * Gestures — hover, tap, and drag via Preview Motion.
 */
export function AnimationGesturesPage() {
  const record = getExploration('animation', 'Motion/Gestures')
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Gestures"
      record={record}
      lead="Cross-device gesture recognisers on `motion` components — hover, tap, and drag — via `@songara/pwa-base/preview/motion`."
      visualNote="Visual validation: cards scale on hover/press; the drag tile moves freely when motion is allowed. Gestures disable under reduced motion."
      performance={
        <p>
          Gesture listeners are cheap for a few controls; avoid dozens of
          simultaneous drag targets. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          Pointer events via Motion — evergreen. Score {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>More reliable than CSS :hover alone on touch</li>
          <li>Declarative whileHover / whileTap / drag</li>
          <li>Works with spring transitions</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Easy to over-gesture chrome</li>
          <li>Drag needs constraints for production UIs</li>
          <li>Must honour reduced motion</li>
        </ul>
      }
      developerExperience={
        <p>
          Props on <code>motion.*</code> are straightforward. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Pressable cards, draggable sheets, reorder handles, playful FAB
          feedback.
        </p>
      }
      reusableIdeas={
        <p>
          Gate <code>whileHover</code> / <code>whileTap</code> / <code>drag</code>{' '}
          when reduced; pair with Preview <code>resolveTransition</code>.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />
      <MotionStage className="cat__gesture-stage" label="Gesture demos">
        <motion.button
          type="button"
          className="cat__gesture-card"
          whileHover={reduce ? undefined : { scale: 1.06, y: -4 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={transition}
        >
          Hover / tap
        </motion.button>
        <motion.div
          className="cat__gesture-card cat__gesture-card--drag"
          drag={!reduce}
          dragConstraints={{ left: -40, right: 40, top: -30, bottom: 30 }}
          dragElastic={0.2}
          whileDrag={reduce ? undefined : { scale: 1.05 }}
          transition={transition}
        >
          Drag me
        </motion.div>
      </MotionStage>
    </ExplorationShell>
  )
}
