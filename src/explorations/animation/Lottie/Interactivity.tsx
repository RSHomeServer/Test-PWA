import { useEffect } from 'react'
import {
  useLottie,
  useLottieInteractivity,
} from '@songara/pwa-base/preview/lottie'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import { LottieStage, ReduceMotionToggle } from './_shared'
import { pulseAnimation } from './pulse'
import { useCatalogueLottie } from './useCatalogueLottie'

/**
 * Interactivity — cursor-driven seek via Preview useLottieInteractivity.
 */
export function AnimationLottieInteractivityPage() {
  const record = getExploration('animation', 'Lottie/Interactivity')
  const {
    reduce,
    reduceId,
    forceReduce,
    setForceReduce,
    systemReduce,
    playback,
  } = useCatalogueLottie({ autoplay: false, loop: false })

  const lottieObj = useLottie(
    {
      animationData: pulseAnimation,
      loop: playback.loop,
      autoplay: playback.autoplay,
    },
    { width: 160, height: 160 },
  )

  const { goToAndStop, View } = lottieObj

  useEffect(() => {
    if (!reduce) return
    goToAndStop(0, true)
  }, [reduce, goToAndStop])

  const InteractiveView = useLottieInteractivity({
    lottieObj,
    mode: 'cursor',
    actions: [
      {
        position: { x: [0, 1], y: [0, 1] },
        type: 'seek',
        frames: [0, 60],
      },
    ],
  })

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Lottie/Interactivity"
      record={record}
      lead="Cursor-driven frame seeking via Preview `useLottie` + `useLottieInteractivity` — prove the re-exported interactivity surface without a local wrapper."
      visualNote="Visual validation: move the pointer over the stage to scrub the pulse when motion is allowed; under reduced motion the asset freezes on frame 0 (static View, no cursor seek)."
      performance={
        <p>
          Cursor seek is fine for one hero graphic; avoid many simultaneous
          interactive Lotties. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Pointer events + lottie-web — evergreen. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Designer asset + light pointer mapping</li>
          <li>Scroll and cursor modes in one helper</li>
          <li>Still goes through Preview re-exports</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Not a full state machine (prefer Rive for that)</li>
          <li>Must disable under reduced motion</li>
          <li>Frame maps are asset-specific</li>
        </ul>
      }
      developerExperience={
        <p>
          Hook composition is clear once <code>lottieObj</code> is in hand.
          Score {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Hover-reactive badges, pointer-driven empty-state flourishes, scroll
          chapter markers (scroll mode).
        </p>
      }
      reusableIdeas={
        <p>
          When reduced, render the static <code>View</code> and skip
          interactivity wiring. Keep actions declarative next to the asset.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={forceReduce}
        onChange={setForceReduce}
        systemReduce={systemReduce}
      />
      <LottieStage
        className="cat__lottie-stage--interactive"
        label="Lottie cursor interactivity"
      >
        <div className="cat__lottie-host cat__lottie-host--wide">
          {reduce ? View : InteractiveView}
        </div>
      </LottieStage>
    </ExplorationShell>
  )
}
