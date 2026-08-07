import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getExploration } from '../../catalogue/registry'
import '../../pages/catalogue.css'

/**
 * Exploration: Web Animations API baseline for the Animation capability area.
 * Catalogue artefact — evaluate platform motion before adopting Motion/GSAP/etc.
 */
export function AnimationWaapiPage() {
  const record = getExploration('animation', 'waapi')
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
    <main className="cat">
      <nav className="cat__crumb">
        <Link to="/">Catalogue</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/animation">animation</Link>
        <span aria-hidden="true"> / </span>
        <span>waapi</span>
      </nav>

      <header className="cat__header">
        <h1 className="cat__title">{record.capability}</h1>
        <p className="cat__lead">
          Platform Web Animations API as the baseline motion stack. Use this
          exploration to judge when a dedicated OSS library is justified.
        </p>
        <p>
          <strong>Status:</strong> {record.status} · <strong>OSS:</strong>{' '}
          {record.oss}
        </p>
      </header>

      <section className="cat__panel" aria-labelledby="impl-heading">
        <h2 id="impl-heading">Practical implementation</h2>
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
        <p className="cat__muted">
          Visual validation: box should pulse when reduced motion is off; static
          when on.
        </p>
      </section>

      <section className="cat__grid-notes" aria-label="Evaluation notes">
        <div>
          <h2>Performance</h2>
          <p>
            Compositor-friendly transforms; negligible main-thread cost for a
            single element. Score {record.performance}/5.
          </p>
        </div>
        <div>
          <h2>Browser compatibility</h2>
          <p>
            Excellent on modern evergreen browsers. Score{' '}
            {record.browserSupport}/5.
          </p>
        </div>
        <div>
          <h2>Strengths</h2>
          <ul>
            <li>Zero dependency</li>
            <li>Works offline by definition</li>
            <li>Pairs cleanly with <code>prefers-reduced-motion</code></li>
          </ul>
        </div>
        <div>
          <h2>Weaknesses</h2>
          <ul>
            <li>Verbose for complex sequences</li>
            <li>No React-oriented spring model</li>
            <li>Layout animations require more work</li>
          </ul>
        </div>
        <div>
          <h2>Developer experience</h2>
          <p>
            Imperative API; fine for small cases, friction for app-wide motion
            systems. Score {record.developerExperience}/5.
          </p>
        </div>
        <div>
          <h2>Product ideas unlocked</h2>
          <p>
            Micro-interactions, attention cues, onboarding highlights — without
            pulling Motion/GSAP until needed.
          </p>
        </div>
        <div>
          <h2>Reusable ideas</h2>
          <p>
            Always gate decorative motion on reduced-motion preferences; prefer
            transform/opacity; keep a platform baseline before adopting heavy
            animation OSS.
          </p>
        </div>
      </section>
    </main>
  )
}
