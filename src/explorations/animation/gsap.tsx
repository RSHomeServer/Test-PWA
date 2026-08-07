import { useEffect, useId, useRef, useState } from 'react'
import gsap from 'gsap'
import { getExploration } from '../../catalogue/registry'
import { ExplorationShell } from '../ExplorationShell'

/**
 * Exploration: GSAP timelines — industry timeline tool with licence diligence.
 */
export function AnimationGsapPage() {
  const record = getExploration('animation', 'gsap')
  const boxRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const box = boxRef.current
    const bar = barRef.current
    if (!box || !bar) return

    if (forceReduce) {
      gsap.killTweensOf([box, bar])
      gsap.set(box, { x: 0, rotate: 0 })
      gsap.set(bar, { width: 0 })
      return
    }

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(box, { x: 96, rotate: 12, duration: 0.9, ease: 'power2.inOut' }, 0)
    tl.to(bar, { width: 160, duration: 0.9, ease: 'power2.inOut' }, 0)

    return () => {
      tl.kill()
    }
  }, [forceReduce])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      explorationId="gsap"
      record={record}
      lead="GSAP timeline sequencing for complex choreography. Powerful — but licence diligence is mandatory for commercial Songara use."
      visualNote="Visual validation: box and progress bar should timeline-tween when motion is allowed; static when reduced."
      performance={
        <p>
          Extremely capable; still JS-driven. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Excellent across modern browsers. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Industry-standard timelines</li>
          <li>Plugins for scroll, morph, etc.</li>
          <li>Precise sequencing</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>
            <strong>Licence:</strong> GSAP standard licence is free for most uses,
            but Club GreenSock plugins / some commercial contexts need diligence
          </li>
          <li>Heavier than WAAPI for simple UI</li>
          <li>Imperative style vs React declarative</li>
        </ul>
      }
      developerExperience={
        <p>
          Excellent for timeline authors; more friction in React trees. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Marketing choreography, complex onboarding sequences, scroll-linked
          storytelling (with licence review).
        </p>
      }
      reusableIdeas={
        <p>
          Prefer Motion/WAAPI for app chrome; consider GSAP only when timelines
          justify the dependency — document licence conclusion before product use.
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
      <div className="cat__demo-row">
        <div ref={boxRef} className="cat__motion-box">
          GSAP
        </div>
      </div>
      <div ref={barRef} className="cat__gsap-bar" aria-hidden="true" />
      <p className="cat__muted">
        Licence note: treat GSAP as <em>Experimental</em> until legal confirms
        intended plugins/usage for Songara products.
      </p>
    </ExplorationShell>
  )
}
