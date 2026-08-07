import { useCallback, useId, useMemo, useState } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine, ISourceOptions } from '@tsparticles/engine'
import { getExploration } from '../../catalogue/registry'
import { ExplorationShell } from '../ExplorationShell'

async function registerSlim(engine: Engine) {
  await loadSlim(engine)
}

/**
 * Exploration: ambient particle fields via tsparticles (slim preset).
 */
export function AnimationParticlesPage() {
  const record = getExploration('animation', 'particles')
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: false,
      background: { color: { value: 'transparent' } },
      fpsLimit: 48,
      particles: {
        number: { value: forceReduce ? 0 : 28 },
        color: { value: '#5a7a9a' },
        links: {
          enable: !forceReduce,
          distance: 90,
          color: '#5a7a9a',
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: !forceReduce,
          speed: 0.6,
          outModes: { default: 'bounce' },
        },
        opacity: { value: 0.55 },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
    }),
    [forceReduce],
  )

  const onParticlesLoaded = useCallback(async () => {}, [])

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      explorationId="particles"
      record={record}
      lead="Ambient particle fields for atmosphere. tsparticles slim vs Songara ParticleField in @songara/pwa-base/animation."
      visualNote="Visual validation: soft linked particles when motion is allowed; empty field when reduced."
      performance={
        <p>
          Canvas particles are GPU-friendly at low counts; watch mobile thermal.
          Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Canvas 2D everywhere modern. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Rich preset ecosystem</li>
          <li>Configurable density/links</li>
          <li>Alternative: foundation ParticleField for branded labels</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Easy to overdo visually</li>
          <li>Dependency weight for ambience alone</li>
          <li>Must gate on reduced motion</li>
        </ul>
      }
      developerExperience={
        <p>
          Options-heavy config; fine once templated. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Landing atmosphere, calm waiting states, celebratory bursts (sparingly).
        </p>
      }
      reusableIdeas={
        <p>
          Cap particle count; pause when off-screen; prefer foundation ParticleField
          when branded glyphs matter; never ignore reduced motion.
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
      <div className="cat__particle-host" aria-hidden={forceReduce}>
        {forceReduce ? (
          <p className="cat__muted" style={{ padding: '1rem' }}>
            Particles paused (reduced motion).
          </p>
        ) : (
          <ParticlesProvider init={registerSlim}>
            <Particles
              id="catalogue-particles"
              options={options}
              particlesLoaded={onParticlesLoaded}
              style={{ width: '100%', height: '100%' }}
            />
          </ParticlesProvider>
        )}
      </div>
    </ExplorationShell>
  )
}
