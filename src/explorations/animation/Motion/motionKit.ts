import { useId, useState } from 'react'
import {
  resolveTransition,
  useSongaraMotion,
  type Transition,
} from '@songara/pwa-base/preview/motion'

export const MOTION_SPRING = {
  type: 'spring',
  stiffness: 280,
  damping: 22,
} as const satisfies Transition

export const MOTION_SOFT_SPRING = {
  type: 'spring',
  stiffness: 160,
  damping: 14,
  mass: 0.85,
} as const satisfies Transition

export function useCatalogueMotion(transition: Transition = MOTION_SPRING) {
  const { reducedMotion: systemReduce } = useSongaraMotion(transition)
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const reduce = forceReduce || systemReduce
  return {
    reduce,
    reduceId,
    forceReduce,
    setForceReduce,
    transition: resolveTransition(reduce, transition),
  }
}
