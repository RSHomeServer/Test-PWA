import { useEffect, useRef, useState } from 'react'
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
 * Controls — imperative play/pause/stop/speed/seek via Preview Lottie ref.
 */
export function AnimationLottieControlsPage() {
  const record = getExploration('animation', 'Lottie/Controls')
  const {
    reduce,
    reduceId,
    forceReduce,
    setForceReduce,
    systemReduce,
    playback,
  } = useCatalogueLottie({ autoplay: false, loop: true })
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [speed, setSpeed] = useState(1)
  const [status, setStatus] = useState('stopped')
  const displayStatus = reduce ? 'frozen' : status

  useEffect(() => {
    const api = lottieRef.current
    if (!api) return
    if (reduce) {
      api.goToAndStop(0, true)
      return
    }
    api.setSpeed(speed)
  }, [reduce, speed])

  if (!record) return null

  const run = (action: () => void, nextStatus: string) => {
    if (reduce) return
    action()
    setStatus(nextStatus)
  }

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Lottie/Controls"
      record={record}
      lead="Imperative transport via the Preview-re-exported Lottie ref — play, pause, stop, speed, and seek — with `resolveLottiePlayback` freeze under reduced motion."
      visualNote="Visual validation: transport buttons drive the pulse when motion is allowed; under reduced motion controls no-op and the asset stays on frame 0."
      performance={
        <p>
          Ref calls are cheap; avoid seeking every pointer move on large comps.
          Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Same JS runtime as Playback. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Full transport for product chrome (loaders, steppers)</li>
          <li>Speed / direction without re-authoring</li>
          <li>Pairs cleanly with Preview freeze helpers</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Imperative API is easy to desync from React state</li>
          <li>Must gate under reduced motion</li>
          <li>Seek needs frame knowledge of the asset</li>
        </ul>
      }
      developerExperience={
        <p>
          <code>LottieRefCurrentProps</code> from Preview matches lottie-react.
          Score {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Manual replay on success toasts, scrubbable onboarding beats, slow-mo
          QA tools.
        </p>
      }
      reusableIdeas={
        <p>
          Start with <code>autoplay: false</code> when the UI owns transport.
          Freeze with <code>goToAndStop(0, true)</code> when reduced.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={forceReduce}
        onChange={setForceReduce}
        systemReduce={systemReduce}
      />
      <div className="cat__lottie-toolbar" role="group" aria-label="Lottie transport">
        <button
          type="button"
          className="cat__lottie-btn"
          disabled={reduce}
          onClick={() =>
            run(() => lottieRef.current?.play(), 'playing')
          }
        >
          Play
        </button>
        <button
          type="button"
          className="cat__lottie-btn"
          disabled={reduce}
          onClick={() =>
            run(() => lottieRef.current?.pause(), 'paused')
          }
        >
          Pause
        </button>
        <button
          type="button"
          className="cat__lottie-btn"
          disabled={reduce}
          onClick={() =>
            run(() => lottieRef.current?.stop(), 'stopped')
          }
        >
          Stop
        </button>
        <button
          type="button"
          className="cat__lottie-btn"
          disabled={reduce}
          onClick={() =>
            run(() => lottieRef.current?.goToAndPlay(30, true), 'seek-mid')
          }
        >
          Seek mid
        </button>
        <label className="cat__lottie-speed">
          Speed{' '}
          <select
            value={speed}
            disabled={reduce}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </label>
        <span className="cat__muted">Status: {displayStatus}</span>
      </div>
      <LottieStage label="Lottie controls">
        <div className="cat__lottie-host">
          <Lottie
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
