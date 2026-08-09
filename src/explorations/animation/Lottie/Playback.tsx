import { useEffect, useRef } from 'react'
import {
  Lottie,
  type LottieRefCurrentProps,
} from '@songara/pwa-base/preview/lottie'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import { LottieStage, ReduceMotionToggle } from './_shared'
import { pulseAnimation } from './pulse'
import { useCatalogueLottie } from './useCatalogueLottie'

/**
 * Playback — autoplay/loop with resolveLottiePlayback + Simulate freeze.
 */
export function AnimationLottiePlaybackPage() {
  const record = getExploration('animation', 'Lottie/Playback')
  const {
    reduce,
    reduceId,
    forceReduce,
    setForceReduce,
    systemReduce,
    playback,
  } = useCatalogueLottie({ autoplay: true, loop: true })
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  // lottie-react only flips the autoplay flag when the prop changes — it does
  // not call play()/stop(). Drive playback explicitly under Simulate.
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
      lead="Autoplay + loop policy via Preview `resolveLottiePlayback` — freeze when system or Simulate reduced-motion is on. Prefer `SongaraLottie` in products for the system preference path."
      visualNote="Visual validation: blue square scales up/down in a loop when motion is allowed; hold on frame 0 when reduced (system preference or Simulate)."
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
          <li>Shared freeze helper across catalogue and products</li>
          <li>Simulate checkbox for QA without OS toggles</li>
          <li>Same Preview import surface as SongaraLottie</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Must drive play/stop via ref when toggling reduce</li>
          <li>Authoring lock-in to AE/plugin tooling</li>
          <li>Heavy files if unchecked</li>
        </ul>
      }
      developerExperience={
        <p>
          Use <code>resolveLottiePlayback</code> (or{' '}
          <code>useSongaraLottiePlayback</code>) instead of ad-hoc matchMedia.
          Score {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Empty states, success checkmarks, branded loaders authored by design.
        </p>
      }
      reusableIdeas={
        <p>
          Gate autoplay on reduced motion via Preview helpers. Drive play/stop
          via the Lottie ref — do not rely on toggling the <code>autoplay</code>{' '}
          prop alone.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={forceReduce}
        onChange={setForceReduce}
        systemReduce={systemReduce}
      />
      <LottieStage label="Lottie playback">
        <div className="cat__lottie-host">
          <Lottie
            key={reduce ? 'reduced' : 'motion'}
            lottieRef={lottieRef}
            animationData={pulseAnimation}
            loop={playback.loop}
            autoplay={playback.autoplay}
            style={{ width: 120, height: 120 }}
          />
        </div>
      </LottieStage>
    </ExplorationShell>
  )
}
