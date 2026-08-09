import { useEffect, useId, useRef, useState, type ComponentType } from 'react'
import lottieReact from 'lottie-react'
import type { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import pulseAnimation from '../lottie-pulse.json'

/**
 * lottie-react ships CJS; Vite's ESM interop may wrap the component as
 * `{ default: Component }` or even `{ default: { default: Component } }`.
 * Walk until we get a renderable function.
 */
function resolveLottieComponent(mod: unknown): ComponentType<LottieComponentProps> {
  let current: unknown = mod
  for (let i = 0; i < 4; i++) {
    if (typeof current === 'function') {
      return current as ComponentType<LottieComponentProps>
    }
    if (
      current &&
      typeof current === 'object' &&
      'default' in current &&
      (current as { default: unknown }).default !== current
    ) {
      current = (current as { default: unknown }).default
      continue
    }
    break
  }
  throw new Error('lottie-react did not resolve to a React component under Vite ESM')
}

const Lottie = resolveLottieComponent(lottieReact)

/**
 * Exploration: Lottie / After Effects JSON playback via lottie-react.
 */
export function AnimationLottiePage() {
  const record = getExploration('animation', 'Lottie/Playback')
  const reduceId = useId()
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [systemReduce, setSystemReduce] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  const [forceReduce, setForceReduce] = useState(false)
  const reduce = forceReduce || systemReduce

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setSystemReduce(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // lottie-react only flips the autoplay flag when the prop changes — it does
  // not call play()/stop(). Drive playback explicitly.
  useEffect(() => {
    const api = lottieRef.current
    if (!api) return
    if (reduce) {
      api.goToAndStop(0, true)
    } else {
      api.setSpeed(1)
      api.goToAndPlay(0, true)
    }
  }, [reduce])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Lottie/Playback"
      record={record}
      lead="After Effects JSON playback for designer-authored motion. lottie-react (and later dotLottie) vs hand-coded WAAPI."
      visualNote="Visual validation: blue square should scale up/down in a loop when motion is allowed; hold on frame 0 when reduced (system preference or Simulate)."
      performance={
        <p>
          Canvas/SVG renderers are fine for small assets; large comps hurt mobile.
          Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>JS runtime — broad support. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Designer → engineer pipeline</li>
          <li>Rich vector motion without custom code</li>
          <li>Assets can ship offline in packs</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Authoring lock-in to AE/plugin tooling</li>
          <li>Hard to theme dynamically</li>
          <li>Heavy files if unchecked</li>
        </ul>
      }
      developerExperience={
        <p>
          Drop-in React player; asset pipeline is the hard part. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Empty states, success checkmarks, branded loaders authored by design.
        </p>
      }
      reusableIdeas={
        <p>
          Prefer small looping icons; gate autoplay on reduced motion; consider
          dotLottie for smaller payloads later. Drive play/stop via the Lottie
          ref — do not rely on toggling the <code>autoplay</code> prop alone.
        </p>
      }
    >
      <div className="cat__controls">
        <label htmlFor={reduceId}>
          <input
            id={reduceId}
            type="checkbox"
            checked={forceReduce}
            onChange={(e) => setForceReduce(e.target.checked)}
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
      <div className="cat__lottie-host">
        <Lottie
          key={reduce ? 'reduced' : 'motion'}
          lottieRef={lottieRef}
          animationData={pulseAnimation}
          loop={!reduce}
          autoplay={!reduce}
          style={{ width: 120, height: 120 }}
        />
      </div>
    </ExplorationShell>
  )
}
