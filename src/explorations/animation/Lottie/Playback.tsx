import { useId, useState, type ComponentType } from 'react'
import lottieReact from 'lottie-react'
import type { LottieComponentProps } from 'lottie-react'
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
  const [forceReduce, setForceReduce] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Lottie/Playback"
      record={record}
      lead="After Effects JSON playback for designer-authored motion. lottie-react (and later dotLottie) vs hand-coded WAAPI."
      visualNote="Visual validation: square should pulse via Lottie when motion is allowed; freeze on frame 0 when reduced."
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
          dotLottie for smaller payloads later.
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
      </div>
      <div className="cat__lottie-host">
        <Lottie
          animationData={pulseAnimation}
          loop={!forceReduce}
          autoplay={!forceReduce}
          style={{ width: 120, height: 120 }}
        />
      </div>
    </ExplorationShell>
  )
}
