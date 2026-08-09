import { motion } from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import {
  MOTION_SPRING,
  MotionStage,
  ReduceMotionToggle,
  useCatalogueMotion,
} from './_shared'
import { useState } from 'react'

/**
 * SVG — path drawing / shape props via Preview Motion.
 */
export function AnimationSvgPage() {
  const record = getExploration('animation', 'Motion/SVG')
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)
  const [drawn, setDrawn] = useState(true)

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/SVG"
      record={record}
      lead="SVG attribute animation (`pathLength`, shapes) via `motion` SVG elements from `@songara/pwa-base/preview/motion`."
      visualNote="Visual validation: circle/path should draw on when motion is allowed; appear complete when reduced."
      performance={
        <p>
          SVG path animation is fine for icons; heavy illustrations prefer
          Lottie/Rive. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>SVG + Motion — evergreen. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Crisp icon-scale draws</li>
          <li>Same API as HTML motion</li>
          <li>Good for success checkmarks</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Complex paths are designer-heavy</li>
          <li>Not ideal for longform illustration</li>
          <li>Stroke draw needs careful pathLength setup</li>
        </ul>
      }
      developerExperience={
        <p>
          <code>motion.circle</code> / <code>motion.path</code> feel natural.
          Score {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>Success ticks, progress rings, branded icon reveals.</p>
      }
      reusableIdeas={
        <p>
          Prefer small inline SVG; freeze at pathLength 1 under reduced motion.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />
      <div className="cat__demo-row">
        <button type="button" onClick={() => setDrawn((v) => !v)}>
          {drawn ? 'Retract' : 'Draw'}
        </button>
      </div>
      <MotionStage className="cat__svg-stage" label="SVG draw demo">
        <svg viewBox="0 0 120 120" width="140" height="140" aria-hidden="true">
          <motion.circle
            cx="60"
            cy="60"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: reduce || drawn ? 1 : 0 }}
            transition={transition}
          />
          <motion.path
            d="M38 62 L54 78 L84 42"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: reduce || drawn ? 1 : 0 }}
            transition={{
              ...transition,
              delay: reduce ? 0 : drawn ? 0.15 : 0,
            }}
          />
        </svg>
      </MotionStage>
    </ExplorationShell>
  )
}
