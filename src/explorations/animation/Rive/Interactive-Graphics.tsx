import { useEffect, useId, useState } from 'react'
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'

/** Public sample for catalogue smoke — product apps should ship .riv offline. */
const SAMPLE_RIV =
  'https://cdn.rive.app/animations/vehicles.riv'

/**
 * Exploration: Rive interactive state-machine graphics.
 */
export function AnimationRivePage() {
  const record = getExploration('animation', 'Rive/Interactive-Graphics')
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  const [loadError, setLoadError] = useState<string | null>(null)

  const { RiveComponent, rive } = useRive({
    src: SAMPLE_RIV,
    autoplay: !forceReduce,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoadError: () => setLoadError('Failed to load sample .riv (network or CDN).'),
  })

  useEffect(() => {
    if (!rive) return
    if (forceReduce) {
      rive.pause()
    } else {
      rive.play()
    }
  }, [forceReduce, rive])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Rive/Interactive-Graphics"
      record={record}
      lead="Interactive state-machine graphics via Rive. Strong for stateful illustrations; compare to Lottie for one-shot playback."
      visualNote="Visual validation: sample vehicle animation plays when motion is allowed; pauses when reduced. Requires network for the CDN sample."
      performance={
        <p>
          WASM runtime is efficient for interactive comps. Score{' '}
          {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          Modern browsers with WASM. Score {record.browserSupport}/5.
        </p>
      }
      strengths={
        <ul>
          <li>State machines + inputs</li>
          <li>Designer-authored interactivity</li>
          <li>Good React canvas bindings</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Tooling/licence/editor ecosystem</li>
          <li>Assets must be shipped offline for Songara PWAs</li>
          <li>Heavier than WAAPI for trivial motion</li>
        </ul>
      }
      developerExperience={
        <p>
          Solid React API; editor learning curve. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Interactive mascots, toggleable illustrations, onboarding characters with
          input-driven states.
        </p>
      }
      reusableIdeas={
        <p>
          Ship .riv via content packs; pause on reduced motion; reserve Rive for
          interactive graphics — not generic UI chrome.
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
      <div className="cat__rive-host" style={{ width: 240, height: 160 }}>
        {loadError ? (
          <p className="cat__muted">{loadError}</p>
        ) : (
          <RiveComponent style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </ExplorationShell>
  )
}
