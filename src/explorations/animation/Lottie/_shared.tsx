import type { ReactNode } from 'react'

export function ReduceMotionToggle({
  id,
  checked,
  onChange,
  systemReduce,
}: {
  id: string
  checked: boolean
  onChange: (next: boolean) => void
  systemReduce?: boolean
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
      {systemReduce ? (
        <p className="cat__muted">
          System <code>prefers-reduced-motion</code> is on — playback stays
          frozen unless you are only testing the checkbox path after disabling
          the OS/browser setting.
        </p>
      ) : null}
    </div>
  )
}

export function LottieStage({
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
      className={`cat__lottie-stage${className ? ` ${className}` : ''}`}
      aria-label={label}
    >
      {children}
    </div>
  )
}
