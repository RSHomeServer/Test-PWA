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

type SegmentId = 'full' | 'rise' | 'settle'

const SEGMENTS: Record<SegmentId, [number, number]> = {
  full: [0, 60],
  rise: [0, 30],
  settle: [30, 60],
}

/**
 * Segments — play frame ranges via playSegments / initialSegment.
 */
export function AnimationLottieSegmentsPage() {
  const record = getExploration('animation', 'Lottie/Segments')
  const {
    reduce,
    reduceId,
    forceReduce,
    setForceReduce,
    systemReduce,
    playback,
  } = useCatalogueLottie({ autoplay: true, loop: true })
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [segment, setSegment] = useState<SegmentId>('full')
  const range = SEGMENTS[segment]

  useEffect(() => {
    const api = lottieRef.current
    if (!api) return
    if (reduce) {
      api.goToAndStop(range[0], true)
      return
    }
    api.playSegments(range, true)
  }, [reduce, segment, range])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Lottie/Segments"
      record={record}
      lead="Frame-range playback via Preview Lottie `playSegments` / `initialSegment` — useful when one AE file holds multiple product beats."
      visualNote="Visual validation: Rise plays the first half of the pulse, Settle the second; Full loops the whole 0–60 range. Reduced motion freezes on the segment start frame."
      performance={
        <p>
          Segments avoid shipping multiple JSON files for related beats. Score{' '}
          {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>lottie-web segment API — evergreen. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>One asset, many product moments</li>
          <li>Force-flag restarts cleanly on segment change</li>
          <li>Works with Preview freeze policy</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Requires knowing frame numbers from the AE export</li>
          <li>Awkward if markers are not documented</li>
          <li>Still not a substitute for true interactive state machines (see Rive)</li>
        </ul>
      }
      developerExperience={
        <p>
          <code>playSegments([from, to], true)</code> is straightforward once
          frames are known. Score {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Intro vs loop tails in one loader, success vs idle in one badge file.
        </p>
      }
      reusableIdeas={
        <p>
          Document segment maps next to the JSON in Content Packs. Freeze on the
          segment start frame when reduced — do not keep scrubbing.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={forceReduce}
        onChange={setForceReduce}
        systemReduce={systemReduce}
      />
      <div className="cat__lottie-toolbar" role="group" aria-label="Lottie segments">
        {(Object.keys(SEGMENTS) as SegmentId[]).map((id) => (
          <button
            key={id}
            type="button"
            className="cat__lottie-btn"
            data-active={segment === id ? 'true' : 'false'}
            disabled={reduce}
            onClick={() => setSegment(id)}
          >
            {id === 'full' ? 'Full 0–60' : id === 'rise' ? 'Rise 0–30' : 'Settle 30–60'}
          </button>
        ))}
        <span className="cat__muted">
          Active: [{range[0]}, {range[1]}]
        </span>
      </div>
      <LottieStage label="Lottie segments">
        <div className="cat__lottie-host">
          <Lottie
            key={`${segment}-${reduce ? 'r' : 'm'}`}
            lottieRef={lottieRef}
            animationData={pulseAnimation}
            initialSegment={range}
            loop={playback.loop}
            autoplay={playback.autoplay}
            style={{ width: 120, height: 120 }}
          />
        </div>
      </LottieStage>
    </ExplorationShell>
  )
}
