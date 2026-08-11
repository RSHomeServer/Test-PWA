import type { ReactNode } from 'react'

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
