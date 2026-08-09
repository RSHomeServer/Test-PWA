import { useState } from 'react'
import { motion, type Variants } from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import {
  MOTION_SPRING,
  MotionStage,
  ReduceMotionToggle,
  useCatalogueMotion,
} from './_shared'

/**
 * Variants — orchestrated parent/child stagger via Preview Motion.
 */
export function AnimationVariantsPage() {
  const record = getExploration('animation', 'Motion/Variants')
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)
  const [open, setOpen] = useState(true)

  const list: Variants = {
    hidden: reduce
      ? { opacity: 1 }
      : { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce
        ? transition
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }

  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition },
  }

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Variants"
      record={record}
      lead="Named animation states (`variants`) with parent-driven stagger — Preview Motion’s tool for orchestrated sequences."
      visualNote="Visual validation: toggling replay staggers children in; under reduced motion the set appears at once."
      performance={
        <p>
          Stagger of small nodes is fine; avoid staggering huge trees. Score{' '}
          {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Motion JS runtime. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Reusable named states across screens</li>
          <li>Stagger without manual delays</li>
          <li>Propagates through the tree</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Variant graphs can get opaque</li>
          <li>Need reduced-motion variants</li>
          <li>Not a replacement for timelines like GSAP</li>
        </ul>
      }
      developerExperience={
        <p>
          Excellent for onboarding / menu opens. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Menu opens, checklist reveals, multi-step onboarding, empty-state
          sequences.
        </p>
      }
      reusableIdeas={
        <p>
          Keep 2–3 shared variant packs; swap to instant variants when{' '}
          <code>useSongaraMotion</code> reports reduced.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />
      <div className="cat__demo-row">
        <button type="button" onClick={() => setOpen((v) => !v)}>
          {open ? 'Hide' : 'Show'} sequence
        </button>
      </div>
      <MotionStage label="Variant stagger">
        {open ? (
          <motion.ul
            className="cat__variant-list"
            variants={list}
            initial="hidden"
            animate="show"
            key={reduce ? 'reduced' : 'motion'}
          >
            {['Prepare', 'Animate', 'Settle'].map((label) => (
              <motion.li key={label} className="cat__variant-item" variants={item}>
                {label}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="cat__muted">Sequence hidden — show again to replay.</p>
        )}
      </MotionStage>
    </ExplorationShell>
  )
}
