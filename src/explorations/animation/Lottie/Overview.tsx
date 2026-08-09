import { Link } from 'react-router-dom'
import {
  SongaraLottie,
  useReducedMotion,
} from '@songara/pwa-base/preview/lottie'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import { LottieStage } from './_shared'
import { pulseAnimation } from './pulse'

/**
 * Lottie Overview — SongaraLottie via Preview (same import products use).
 */
export function AnimationLottieOverviewPage() {
  const record = getExploration('animation', 'Lottie/Overview')
  const systemReduce = useReducedMotion()

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Lottie/Overview"
      record={record}
      lead="Designer-authored After Effects JSON via PWA-Base Preview (`@songara/pwa-base/preview/lottie`) — the same import products use. Sibling offerings cover playback policy, imperative controls, segments, and cursor interactivity."
      visualNote="Visual validation: blue square scales in a loop when motion is allowed. SongaraLottie freezes on system prefers-reduced-motion; use Playback’s Simulate checkbox for forced QA freeze."
      performance={
        <p>
          Fine for small icon/empty-state comps; large AE exports hurt mobile.
          Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>JS runtime via lottie-web — broad support. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Designer → engineer pipeline</li>
          <li>Preview freezes on foundation reduced-motion</li>
          <li>Assets stay app / Content Pack owned</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Authoring lock-in to AE/plugin tooling</li>
          <li>Hard to theme dynamically</li>
          <li>Preview API may evolve before Stable graduation</li>
        </ul>
      }
      developerExperience={
        <p>
          Drop-in <code>SongaraLottie</code> plus{' '}
          <code>resolveLottiePlayback</code> /{' '}
          <code>useSongaraLottiePlayback</code>. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Empty states, success checkmarks, branded loaders — see{' '}
          <Link to="/animation/Lottie/Playback">Playback</Link>,{' '}
          <Link to="/animation/Lottie/Controls">Controls</Link>, and{' '}
          <Link to="/animation/Lottie/Interactivity">Interactivity</Link>.
        </p>
      }
      reusableIdeas={
        <p>
          Import <code>@songara/pwa-base/preview/lottie</code> in products — never
          deep-import <code>@platform/preview-lottie</code> or keep a parallel
          app-level player wrapper. Peer <code>lottie-react</code> is required in
          the consumer.
        </p>
      }
    >
      {systemReduce ? (
        <p className="cat__muted">
          System <code>prefers-reduced-motion</code> is on —{' '}
          <code>SongaraLottie</code> stays frozen on frame 0.
        </p>
      ) : (
        <p className="cat__muted">
          Motion allowed — <code>SongaraLottie</code> autoplays the catalogue
          pulse. For Simulate QA, open{' '}
          <Link to="/animation/Lottie/Playback">Playback</Link>.
        </p>
      )}
      <LottieStage label="SongaraLottie overview">
        <div className="cat__lottie-host">
          <SongaraLottie
            animationData={pulseAnimation}
            style={{ width: 120, height: 120 }}
          />
        </div>
      </LottieStage>
    </ExplorationShell>
  )
}
