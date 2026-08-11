import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import { MotionStage, ReduceMotionToggle } from './_shared'
import { MOTION_SOFT_SPRING, useCatalogueMotion } from './motionKit'

/**
 * Motion Values — useMotionValue / useSpring / useTransform via Preview.
 */
export function AnimationMotionValuesPage() {
  const record = getExploration('animation', 'Motion/Motion-Values')
  const { reduce, reduceId, setForceReduce } =
    useCatalogueMotion(MOTION_SOFT_SPRING)

  const rawX = useMotionValue(0)
  const springX = useSpring(rawX, {
    stiffness: 180,
    damping: 16,
    mass: 0.7,
  })
  const rotate = useTransform(springX, [-80, 80], [-18, 18])
  const scale = useTransform(springX, [-80, 0, 80], [0.92, 1, 0.92])

  useEffect(() => {
    if (reduce) {
      rawX.set(0)
      springX.jump(0)
    }
  }, [reduce, rawX, springX])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Motion-Values"
      record={record}
      lead="Derived reactive motion with `useMotionValue`, `useSpring`, and `useTransform` from `@songara/pwa-base/preview/motion` — pointer-driven without React re-renders per frame."
      visualNote="Visual validation: drag horizontally in the stage — the orb trails with spring lag and derived rotate/scale. Under reduced motion it stays centred."
      performance={
        <p>
          Motion values avoid React render thrash; still limit concurrent
          springs. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Motion JS runtime. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>High-frame-rate without setState</li>
          <li>Composable derived values</li>
          <li>Spring-follow feels premium</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Harder mental model than animate props</li>
          <li>Must sync reduced-motion jumps</li>
          <li>Easy to over-engineer micro-interactions</li>
        </ul>
      }
      developerExperience={
        <p>
          Preview re-exports the value hooks. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Cursor-follow accents, scrubbers, tilt cards, scroll-linked UI when
          combined with scroll sources.
        </p>
      }
      reusableIdeas={
        <p>
          Drive UI chrome with values; call <code>spring.jump(0)</code> when
          reduced motion engages.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />
      <MotionStage
        className="cat__value-stage"
        label="Pointer-driven motion values"
      >
        <div
          className="cat__value-pad"
          onPointerMove={(e) => {
            if (reduce) return
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            rawX.set(Math.max(-80, Math.min(80, x)))
          }}
          onPointerLeave={() => {
            rawX.set(0)
          }}
        >
          <motion.div
            className="cat__value-orb"
            style={
              reduce
                ? { x: 0, rotate: 0, scale: 1 }
                : { x: springX, rotate, scale }
            }
          >
            Values
          </motion.div>
          <p className="cat__muted">Move pointer across the pad</p>
        </div>
      </MotionStage>
    </ExplorationShell>
  )
}
