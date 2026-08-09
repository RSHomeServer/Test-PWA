import { useId, useState } from 'react'
import {
  resolveLottiePlayback,
  useReducedMotion,
  type LottiePlaybackPrefs,
  type ResolvedLottiePlayback,
} from '@songara/pwa-base/preview/lottie'

/**
 * Catalogue reduced-motion: system preference OR Simulate checkbox.
 * Prefer this over ad-hoc matchMedia in Lottie explorations.
 */
export function useCatalogueLottie(
  prefs: LottiePlaybackPrefs = { autoplay: true, loop: true },
): {
  reduce: boolean
  reduceId: string
  forceReduce: boolean
  setForceReduce: (next: boolean) => void
  systemReduce: boolean
  playback: ResolvedLottiePlayback
} {
  const systemReduce = useReducedMotion()
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const reduce = forceReduce || systemReduce
  return {
    reduce,
    reduceId,
    forceReduce,
    setForceReduce,
    systemReduce,
    playback: resolveLottiePlayback(reduce, prefs),
  }
}
