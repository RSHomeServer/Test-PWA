/**
 * Archived facet exploration rows for Wave B demo modules.
 * Not primary nav — lab sections own routing in Wave A.
 */
import type { ExplorationRecord } from './types'

function ready(
  partial: Pick<ExplorationRecord, 'id' | 'capability' | 'implementation' | 'oss'> &
    Partial<ExplorationRecord>,
): ExplorationRecord {
  return {
    status: 'Ready',
    maturity: 4,
    performance: 4,
    browserSupport: 5,
    offline: 5,
    developerExperience: 4,
    visualQuality: 4,
    accessibility: 4,
    complexity: 3,
    recommended: true,
    overallScore: 8,
    notes: 'Wave B demo artefact — not primary lab nav.',
    ...partial,
  }
}

function experimental(
  partial: Parameters<typeof ready>[0],
): ExplorationRecord {
  return ready({
    status: 'Experimental',
    recommended: false,
    overallScore: 6,
    ...partial,
  })
}

/** Keyed by `areaId/groupId/facetId` relative path under area. */
export const waveBFacetRecords: Record<string, ExplorationRecord> = {
  'native/Web-Animations-API': ready({
    id: 'Web-Animations-API',
    capability: 'Web Animations API',
    implementation: 'CSS + WAAPI spring-like pulse / reduced-motion gate',
    oss: 'Platform API (Web Animations / CSS)',
    ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API',
  }),
  'native/Reduced-Motion': ready({
    id: 'Reduced-Motion',
    capability: 'Reduced Motion',
    implementation: 'useReducedMotion from @songara/pwa-base/animation + QA overrides',
    oss: 'Platform + @songara/pwa-base/animation',
    overallScore: 9,
  }),
  'native/View-Transitions': experimental({
    id: 'View-Transitions',
    capability: 'View Transitions',
    implementation:
      'document.startViewTransition support detection + reduced-motion gate',
    oss: 'View Transitions API',
  }),
  'Motion/Overview': ready({
    id: 'Overview',
    capability: 'Overview',
    implementation: '@songara/pwa-base/preview/motion spring toggle + resolveTransition',
    oss: 'Motion',
    ossUrl: 'https://motion.dev',
    overallScore: 9,
  }),
  'Motion/Springs': ready({
    id: 'Springs',
    capability: 'Springs',
    implementation: '@songara/pwa-base/preview/motion spring ball + resolveTransition',
    oss: 'Motion',
  }),
  'Motion/Layout-Transitions': ready({
    id: 'Layout-Transitions',
    capability: 'Layout Transitions',
    implementation: '@songara/pwa-base/preview/motion layout expand/collapse tile grid',
    oss: 'Motion',
  }),
  'Motion/Shared-Element': experimental({
    id: 'Shared-Element',
    capability: 'Shared Element',
    implementation: '@songara/pwa-base/preview/motion layoutId highlight morph',
    oss: 'Motion',
  }),
  'Motion/Gestures': ready({
    id: 'Gestures',
    capability: 'Gestures',
    implementation: '@songara/pwa-base/preview/motion whileHover / whileTap / drag',
    oss: 'Motion',
  }),
  'Motion/Scroll': ready({
    id: 'Scroll',
    capability: 'Scroll',
    implementation: '@songara/pwa-base/preview/motion whileInView scroll reveals',
    oss: 'Motion',
    overallScore: 7,
  }),
  'Motion/Exit-Animations': ready({
    id: 'Exit-Animations',
    capability: 'Exit Animations',
    implementation: '@songara/pwa-base/preview/motion AnimatePresence list exits',
    oss: 'Motion',
  }),
  'Motion/Variants': ready({
    id: 'Variants',
    capability: 'Variants',
    implementation: '@songara/pwa-base/preview/motion parent/child stagger variants',
    oss: 'Motion',
  }),
  'Motion/SVG': ready({
    id: 'SVG',
    capability: 'SVG',
    implementation: '@songara/pwa-base/preview/motion pathLength circle + check path',
    oss: 'Motion',
  }),
  'Motion/Motion-Values': ready({
    id: 'Motion-Values',
    capability: 'Motion Values',
    implementation:
      '@songara/pwa-base/preview/motion useMotionValue / useSpring / useTransform',
    oss: 'Motion',
  }),
  'Lottie/Playback': ready({
    id: 'Playback',
    capability: 'Playback',
    implementation: 'lottie-react with inlined pulse JSON asset',
    oss: 'Lottie (lottie-web / lottie-react)',
  }),
  'Rive/Interactive-Graphics': experimental({
    id: 'Interactive-Graphics',
    capability: 'Interactive Graphics',
    implementation: '@rive-app/react-canvas with CDN sample + pause on reduced motion',
    oss: 'Rive (@rive-app/react-canvas)',
  }),
  'GSAP/Timelines': experimental({
    id: 'Timelines',
    capability: 'Timelines',
    implementation: 'gsap timeline box+bar demo; licence diligence flagged',
    oss: 'GSAP (licence diligence required)',
    overallScore: 5,
  }),
  'tsParticles/Ambient-Field': experimental({
    id: 'Ambient-Field',
    capability: 'Ambient Field',
    implementation: 'tsparticles slim ambient field with reduced-motion pause',
    oss: 'tsParticles',
  }),
  'Dexie.js/Overview': ready({
    id: 'Overview',
    capability: 'Overview',
    implementation:
      '@songara/pwa-base/preview/dexie createSongaraDb + songaraDbName notes CRUD',
    oss: 'Dexie.js',
    overallScore: 9,
  }),
  'Dexie.js/Migrations': ready({
    id: 'Migrations',
    capability: 'Migrations',
    implementation:
      '@songara/pwa-base/preview/dexie sortSchemaVersions + upgrade hooks (v1→v2)',
    oss: 'Dexie.js',
  }),
}

export function getWaveBFacet(
  relativePath: string,
): ExplorationRecord | undefined {
  return waveBFacetRecords[relativePath]
}
