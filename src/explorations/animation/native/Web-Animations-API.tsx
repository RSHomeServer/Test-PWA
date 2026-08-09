import { useEffect, useId, useRef, useState } from 'react'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'

/**
 * Exploration: Web Animations API baseline for the Animation capability area.
 * Catalogue artefact — evaluate platform motion before adopting Motion/GSAP/etc.
 */
export function AnimationWaapiPage() {
  const record = getExploration('animation', 'native/Web-Animations-API')
  const boxRef = useRef<HTMLDivElement>(null)
  const reduceId = useId()
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const el = boxRef.current
    if (!el || reduceMotion) {
      el?.getAnimations().forEach((a) => a.cancel())
      return
    }
    const anim = el.animate(
      [
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.08)', offset: 0.5 },
        { transform: 'scale(1)', offset: 1 },
      ],
      { duration: 1200, iterations: Infinity, easing: 'ease-in-out' },
    )
    return () => anim.cancel()
  }, [reduceMotion])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="native/Web-Animations-API"
      record={record}
      lead="Platform Web Animations API as the baseline motion stack. Use this exploration to judge when a dedicated OSS library is justified."
      visualNote="Visual validation: box should pulse when reduced motion is off; static when on."
      performance={
        <p>
          Compositor-friendly transforms; negligible main-thread cost for a
          single element. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>
          Excellent on modern evergreen browsers. Score {record.browserSupport}
          /5.
        </p>
      }
      strengths={
        <ul>
          <li>Zero dependency</li>
          <li>Works offline by definition</li>
          <li>
            Pairs cleanly with <code>prefers-reduced-motion</code>
          </li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Verbose for complex sequences</li>
          <li>No React-oriented spring model</li>
          <li>Layout animations require more work</li>
        </ul>
      }
      developerExperience={
        <p>
          Imperative API; fine for small cases, friction for app-wide motion
          systems. Score {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Micro-interactions, attention cues, onboarding highlights — without
          pulling Motion/GSAP until needed.
        </p>
      }
      reusableIdeas={
        <p>
          Always gate decorative motion on reduced-motion preferences; prefer
          transform/opacity; keep a platform baseline before adopting heavy
          animation OSS.
        </p>
      }
    >
      <div className="cat__controls">
        <label htmlFor={reduceId}>
          <input
            id={reduceId}
            type="checkbox"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
          />{' '}
          Simulate reduced motion
        </label>
      </div>
      <div
        ref={boxRef}
        className="cat__motion-box"
        data-reduced={reduceMotion ? 'true' : 'false'}
      >
        WAAPI
      </div>
    </ExplorationShell>
  )
}
