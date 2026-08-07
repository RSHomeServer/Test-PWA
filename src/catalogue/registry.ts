import type { CapabilityArea } from './types'

/**
 * Living registry — capability summaries aggregate from this list.
 * Add a record when an exploration subroute ships.
 */
export const capabilityAreas: CapabilityArea[] = [
  {
    id: 'animation',
    title: 'Animation',
    description:
      'Motion, springs, timelines, and declarative animation stacks for Songara PWAs.',
    planned: [
      'motion',
      'springs',
      'layout-transitions',
      'shared-element',
      'particles',
      'lottie',
      'rive',
      'gsap',
    ],
    explorations: [
      {
        id: 'waapi',
        capability: 'Web Animations API',
        implementation: 'CSS + WAAPI spring-like pulse / reduced-motion gate',
        status: 'Ready',
        oss: 'Platform API (Web Animations / CSS)',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API',
        maturity: 5,
        performance: 5,
        browserSupport: 5,
        offline: 5,
        developerExperience: 3,
        visualQuality: 3,
        accessibility: 4,
        complexity: 2,
        recommended: true,
        overallScore: 8,
        notes:
          'Baseline before adopting Motion/GSAP. Prefer for simple UI motion; pair with prefers-reduced-motion.',
      },
    ],
  },
]

export function getArea(areaId: string): CapabilityArea | undefined {
  return capabilityAreas.find((a) => a.id === areaId)
}

export function getExploration(areaId: string, explorationId: string) {
  const area = getArea(areaId)
  return area?.explorations.find((e) => e.id === explorationId)
}
