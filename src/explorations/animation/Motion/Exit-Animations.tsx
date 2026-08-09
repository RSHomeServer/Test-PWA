import { useState } from 'react'
import { AnimatePresence, motion } from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import {
  MOTION_SPRING,
  MotionStage,
  ReduceMotionToggle,
  useCatalogueMotion,
} from './_shared'

/**
 * Exit Animations — AnimatePresence via Preview Motion.
 */
export function AnimationExitAnimationsPage() {
  const record = getExploration('animation', 'Motion/Exit-Animations')
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)
  const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma'])

  if (!record) return null

  const removeFirst = () => {
    setItems((prev) => prev.slice(1))
  }
  const reset = () => setItems(['Alpha', 'Beta', 'Gamma'])
  const add = () =>
    setItems((prev) => [...prev, `Item ${prev.length + 1}`])

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Exit-Animations"
      record={record}
      lead="Animate elements as they leave the React tree with `AnimatePresence` from `@songara/pwa-base/preview/motion`."
      visualNote="Visual validation: removing an item should fade/slide out when motion is allowed; disappear instantly when reduced."
      performance={
        <p>
          Fine for lists of a few dozen; exit + layout together can thrash.
          Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Motion JS runtime. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Exit without fighting React unmount timing</li>
          <li>Works with layout for list collapses</li>
          <li>Natural fit for toasts / sheets</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Keys must be stable</li>
          <li>Easy to forget mode=&quot;popLayout&quot; / wait</li>
          <li>Reduced motion must zero exit duration</li>
        </ul>
      }
      developerExperience={
        <p>
          Preview re-exports <code>AnimatePresence</code>. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>Toasts, dismissible chips, filter chips, modal exit, list deletes.</p>
      }
      reusableIdeas={
        <p>
          Always wrap conditional children; pass Preview{' '}
          <code>resolveTransition</code> into exit transitions.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />
      <div className="cat__demo-row">
        <button type="button" onClick={removeFirst} disabled={items.length === 0}>
          Remove first
        </button>
        <button type="button" onClick={add}>
          Add
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
      <MotionStage label="Exit list">
        <ul className="cat__exit-list">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                key={item}
                className="cat__exit-item"
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: 24, height: 0 }
                }
                transition={transition}
                layout={!reduce}
              >
                {item}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </MotionStage>
    </ExplorationShell>
  )
}
