import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from '../../../shims/platform-animation'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'

/**
 * Exploration: reduced-motion policy patterns (platform + Songara animation kit).
 */
export function AnimationReducedMotionPage() {
  const record = getExploration('animation', 'native/Reduced-Motion')
  const kitReduced = useReducedMotion()
  const boxRef = useRef<HTMLDivElement>(null)
  const overrideId = useId()
  const [override, setOverride] = useState<'system' | 'force-on' | 'force-off'>(
    'system',
  )

  const effective =
    override === 'force-on' ? true : override === 'force-off' ? false : kitReduced

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    el.getAnimations().forEach((a) => a.cancel())
    if (effective) return
    const anim = el.animate(
      [
        { opacity: 0.55, transform: 'translateY(0px)' },
        { opacity: 1, transform: 'translateY(-8px)' },
        { opacity: 0.55, transform: 'translateY(0px)' },
      ],
      { duration: 1400, iterations: Infinity, easing: 'ease-in-out' },
    )
    return () => anim.cancel()
  }, [effective])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="native/Reduced-Motion"
      record={record}
      lead="Accessibility motion policy: honour prefers-reduced-motion, provide app overrides for QA, and use the foundation useReducedMotion hook (@songara/pwa-base/animation)."
      visualNote="Visual validation: box floats when motion allowed; static when reduced. Kit preference is shown live."
      performance={
        <p>
          Policy hooks are negligible cost. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          matchMedia('(prefers-reduced-motion: reduce)') is universal on target
          browsers. Score {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>Foundation hook already available</li>
          <li>Single source of truth across stacks</li>
          <li>Improves vestibular a11y</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Libraries each need their own gate</li>
          <li>Designers must supply reduced variants</li>
          <li>QA needs force-on/off toggles</li>
        </ul>
      }
      developerExperience={
        <p>
          useReducedMotion from the animation entry is the right default. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Global settings toggle, per-screen motion budgets, catalogue/QA force
          switches.
        </p>
      }
      reusableIdeas={
        <p>
          Centralise reduced-motion in one hook; decorative motion off by default
          when reduced; keep essential state changes instant, not animated.
        </p>
      }
    >
      <div className="cat__controls">
        <p>
          Kit <code>useReducedMotion()</code>:{' '}
          <strong>{kitReduced ? 'reduce' : 'no-preference'}</strong>
        </p>
        <label htmlFor={overrideId}>
          Policy override{' '}
          <select
            id={overrideId}
            value={override}
            onChange={(e) =>
              setOverride(e.target.value as 'system' | 'force-on' | 'force-off')
            }
          >
            <option value="system">Follow system / kit</option>
            <option value="force-on">Force reduced</option>
            <option value="force-off">Force motion</option>
          </select>
        </label>
        <p className="cat__muted">
          Effective policy: <strong>{effective ? 'reduced' : 'motion ok'}</strong>
        </p>
      </div>
      <div
        ref={boxRef}
        className="cat__motion-box"
        data-reduced={effective ? 'true' : 'false'}
      >
        Policy
      </div>
    </ExplorationShell>
  )
}
