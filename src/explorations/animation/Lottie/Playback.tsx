import { useId, useState } from 'react'
import LottieReact from 'lottie-react'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import pulseAnimation from '../lottie-pulse.json'

/** Vite ESM interop: default export is sometimes the module namespace, not the component. */
const Lottie =
  typeof LottieReact === 'function'
    ? LottieReact
    : ((LottieReact as { default?: unknown }).default as typeof LottieReact)

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
