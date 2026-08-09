import { useId, useState, type ReactNode } from 'react'
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

export function ReduceMotionToggle({
  id,
  checked,
  onChange,
}: {
  id: string
  checked: boolean
  onChange: (next: boolean) => void
}) {
  return (
    <div className="cat__controls">
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />{' '}
        Simulate reduced motion
      </label>
    </div>
  )
}

export function MotionStage({
  children,
  className = '',
  label,
}: {
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <div
      className={`cat__motion-stage${className ? ` ${className}` : ''}`}
      aria-label={label}
    >
      {children}
    </div>
  )
}
