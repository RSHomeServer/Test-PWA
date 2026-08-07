import type { CapabilityArea } from './types'
import { investigationStub } from './stubs'

/**
 * Living registry — capability summaries aggregate from this list.
 * Top five areas: animation, physics, camera, audio, offline-storage.
 * See docs/architecture/top-five-routes.md
 */
export const capabilityAreas: CapabilityArea[] = [
  {
    id: 'animation',
    title: 'Animation',
    description:
      'Motion, springs, timelines, and declarative animation stacks for Songara PWAs.',
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
      {
        id: 'motion',
        capability: 'Motion (React)',
        implementation: 'motion/react spring toggle with reduced-motion gate',
        status: 'Ready',
        oss: 'motion',
        ossUrl: 'https://github.com/motiondivision/motion',
        maturity: 5,
        performance: 4,
        browserSupport: 5,
        offline: 5,
        developerExperience: 5,
        visualQuality: 5,
        accessibility: 4,
        complexity: 3,
        recommended: true,
        overallScore: 9,
        notes:
          'Default React UI motion kit when WAAPI becomes verbose. Honour reduced motion; watch bundle size.',
      },
      {
        id: 'springs',
        capability: 'Spring animations',
        implementation: 'Motion spring ball target flip vs reduced-motion snap',
        status: 'Ready',
        oss: 'Motion springs / WAAPI compare',
        ossUrl: 'https://motion.dev/docs/react-transitions',
        maturity: 5,
        performance: 4,
        browserSupport: 5,
        offline: 5,
        developerExperience: 5,
        visualQuality: 5,
        accessibility: 4,
        complexity: 3,
        recommended: true,
        overallScore: 8,
        notes:
          'Use 2–3 shared spring presets. WAAPI lacks first-class springs — Motion wins for tactile UX.',
      },
      {
        id: 'layout-transitions',
        capability: 'Layout transitions',
        implementation: 'Motion layout expand/collapse tile grid',
        status: 'Ready',
        oss: 'Motion layout / View Transitions',
        ossUrl: 'https://motion.dev/docs/react-layout-animations',
        maturity: 4,
        performance: 3,
        browserSupport: 5,
        offline: 5,
        developerExperience: 4,
        visualQuality: 5,
        accessibility: 4,
        complexity: 4,
        recommended: true,
        overallScore: 8,
        notes:
          'Great for small groups; avoid animating large lists. Disable under reduced motion.',
      },
      {
        id: 'shared-element',
        capability: 'Shared-element transitions',
        implementation: 'Motion layoutId highlight + View Transitions capability note',
        status: 'Experimental',
        oss: 'Motion / View Transitions API',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API',
        maturity: 3,
        performance: 3,
        browserSupport: 3,
        offline: 5,
        developerExperience: 3,
        visualQuality: 4,
        accessibility: 3,
        complexity: 4,
        recommended: false,
        overallScore: 6,
        notes:
          'layoutId solid in-route; document View Transitions still uneven — keep fallbacks.',
      },
      {
        id: 'particles',
        capability: 'Particle systems',
        implementation: 'tsparticles slim ambient field with reduced-motion pause',
        status: 'Experimental',
        oss: 'tsparticles',
        ossUrl: 'https://github.com/tsparticles/tsparticles',
        maturity: 4,
        performance: 3,
        browserSupport: 5,
        offline: 5,
        developerExperience: 3,
        visualQuality: 4,
        accessibility: 3,
        complexity: 3,
        recommended: false,
        overallScore: 6,
        notes:
          'Atmosphere only. Prefer @songara/pwa-base ParticleField for branded glyphs; always gate motion.',
      },
      {
        id: 'lottie',
        capability: 'Lottie playback',
        implementation: 'lottie-react with inlined pulse JSON asset',
        status: 'Ready',
        oss: 'lottie-web / lottie-react',
        ossUrl: 'https://github.com/airbnb/lottie-web',
        maturity: 5,
        performance: 3,
        browserSupport: 5,
        offline: 5,
        developerExperience: 4,
        visualQuality: 5,
        accessibility: 3,
        complexity: 3,
        recommended: true,
        overallScore: 8,
        notes:
          'Best for designer-authored icon/empty-state motion. Keep assets small; freeze when reduced.',
      },
      {
        id: 'rive',
        capability: 'Rive interactive graphics',
        implementation: '@rive-app/react-canvas with CDN sample + pause on reduced motion',
        status: 'Experimental',
        oss: '@rive-app/react-canvas',
        ossUrl: 'https://github.com/rive-app/rive-react',
        maturity: 4,
        performance: 4,
        browserSupport: 4,
        offline: 2,
        developerExperience: 4,
        visualQuality: 5,
        accessibility: 3,
        complexity: 4,
        recommended: false,
        overallScore: 6,
        notes:
          'Reserve for interactive illustrations. Ship .riv offline via content packs — CDN sample is catalogue-only.',
      },
      {
        id: 'gsap',
        capability: 'GSAP timelines',
        implementation: 'gsap timeline box+bar demo; licence diligence flagged',
        status: 'Experimental',
        oss: 'GSAP (licence diligence required)',
        ossUrl: 'https://github.com/greensock/GSAP',
        maturity: 5,
        performance: 4,
        browserSupport: 5,
        offline: 5,
        developerExperience: 4,
        visualQuality: 5,
        accessibility: 3,
        complexity: 4,
        recommended: false,
        overallScore: 5,
        notes:
          'Not recommended as default UI kit. Licence review required before product use; prefer Motion/WAAPI for chrome.',
      },
      {
        id: 'reduced-motion',
        capability: 'Reduced-motion policy',
        implementation: 'useReducedMotion from @songara/pwa-base/animation + QA overrides',
        status: 'Ready',
        oss: 'Platform + @songara/pwa-base/animation',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
        maturity: 5,
        performance: 5,
        browserSupport: 5,
        offline: 5,
        developerExperience: 5,
        visualQuality: 3,
        accessibility: 5,
        complexity: 2,
        recommended: true,
        overallScore: 9,
        notes:
          'Mandatory policy for all motion stacks. Use foundation hook; provide force overrides for QA.',
      },
    ],
  },
  {
    id: 'physics',
    title: 'Physics',
    description:
      '2D/3D rigid-body and constraint simulation for interactive Songara experiences.',
    explorations: [
      investigationStub({
        id: 'rapier2d',
        capability: 'Rapier 2D',
        oss: '@dimforge/rapier2d-compat',
        ossUrl: 'https://github.com/dimforge/rapier',
      }),
      investigationStub({
        id: 'rapier3d',
        capability: 'Rapier 3D',
        oss: '@dimforge/rapier3d-compat',
        ossUrl: 'https://github.com/dimforge/rapier',
      }),
      investigationStub({
        id: 'matter',
        capability: 'Matter.js 2D',
        oss: 'matter-js',
        ossUrl: 'https://github.com/liabru/matter-js',
      }),
      investigationStub({
        id: 'planck',
        capability: 'Planck.js',
        oss: 'planck-js',
        ossUrl: 'https://github.com/piqnt/planck.js',
      }),
      investigationStub({
        id: 'cannon-es',
        capability: 'cannon-es 3D',
        oss: 'cannon-es',
        ossUrl: 'https://github.com/pmndrs/cannon-es',
      }),
      investigationStub({
        id: 'constraints',
        capability: 'Joints & constraints',
        oss: 'Rapier / Matter patterns',
      }),
      investigationStub({
        id: 'soft-bodies',
        capability: 'Soft bodies',
        oss: 'Engine-specific / investigate',
      }),
      investigationStub({
        id: 'rope',
        capability: 'Rope / cable',
        oss: 'Engine-specific / investigate',
      }),
      investigationStub({
        id: 'cloth',
        capability: 'Cloth',
        oss: 'Engine-specific / investigate',
      }),
      investigationStub({
        id: 'vehicles',
        capability: 'Vehicle controllers',
        oss: 'Rapier / custom',
      }),
    ],
  },
  {
    id: 'camera',
    title: 'Camera',
    description:
      'Camera access, device selection, still capture, and permission UX for Songara PWAs.',
    explorations: [
      investigationStub({
        id: 'getusermedia',
        capability: 'getUserMedia baseline',
        oss: 'MediaDevices API',
        ossUrl:
          'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia',
      }),
      investigationStub({
        id: 'react-webcam',
        capability: 'react-webcam',
        oss: 'react-webcam',
        ossUrl: 'https://github.com/mozmorris/react-webcam',
      }),
      investigationStub({
        id: 'device-selection',
        capability: 'Device selection',
        oss: 'MediaDevices.enumerateDevices',
      }),
      investigationStub({
        id: 'still-capture',
        capability: 'Still capture',
        oss: 'Platform canvas / ImageCapture',
      }),
      investigationStub({
        id: 'constraints',
        capability: 'Track constraints',
        oss: 'MediaTrackConstraints',
      }),
      investigationStub({
        id: 'permissions-ux',
        capability: 'Permissions UX',
        oss: 'Patterns (platform)',
      }),
      investigationStub({
        id: 'secure-context',
        capability: 'Secure context requirements',
        oss: 'Platform',
      }),
    ],
  },
  {
    id: 'audio',
    title: 'Audio',
    description:
      'Playback, SFX, musical graphs, and comparison with the Songara audio kit.',
    explorations: [
      investigationStub({
        id: 'web-audio',
        capability: 'Web Audio API',
        oss: 'Platform AudioContext',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
      }),
      investigationStub({
        id: 'tone',
        capability: 'Tone.js',
        oss: 'tone',
        ossUrl: 'https://github.com/Tonejs/Tone.js',
      }),
      investigationStub({
        id: 'howler',
        capability: 'Howler.js',
        oss: 'howler',
        ossUrl: 'https://github.com/goldfire/howler.js',
      }),
      investigationStub({
        id: 'media-element',
        capability: 'HTMLAudioElement',
        oss: 'Platform',
      }),
      investigationStub({
        id: 'worklet',
        capability: 'AudioWorklet',
        oss: 'Platform AudioWorklet',
      }),
      investigationStub({
        id: 'recording-playback',
        capability: 'Record then play',
        oss: 'MediaRecorder + Web Audio',
      }),
      investigationStub({
        id: 'songara-audio-kit',
        capability: 'Songara audio kit',
        oss: '@songara/pwa-base/audio',
      }),
    ],
  },
  {
    id: 'offline-storage',
    title: 'Offline Storage',
    description:
      'Durable client-side data: IndexedDB ergonomics, migrations, OPFS — no sync product yet.',
    explorations: [
      investigationStub({
        id: 'indexeddb-raw',
        capability: 'Raw IndexedDB',
        oss: 'Platform IndexedDB',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
      }),
      investigationStub({
        id: 'idb',
        capability: 'idb wrapper',
        oss: 'idb',
        ossUrl: 'https://github.com/jakearchibald/idb',
      }),
      investigationStub({
        id: 'dexie',
        capability: 'Dexie.js',
        oss: 'dexie',
        ossUrl: 'https://github.com/dexie/Dexie.js',
      }),
      investigationStub({
        id: 'migrations',
        capability: 'Schema migrations',
        oss: 'Dexie / idb patterns',
      }),
      investigationStub({
        id: 'live-queries',
        capability: 'Live queries',
        oss: 'Dexie liveQuery',
      }),
      investigationStub({
        id: 'opfs',
        capability: 'Origin Private File System',
        oss: 'Platform OPFS',
      }),
      investigationStub({
        id: 'localforage',
        capability: 'localForage (legacy)',
        oss: 'localforage',
        ossUrl: 'https://github.com/localForage/localForage',
      }),
      investigationStub({
        id: 'pack-store',
        capability: 'Foundation packStore contrast',
        oss: '@songara/pwa-base runtime storage',
      }),
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

/** All catalogue routes for SoloSiteApp (explorations before area summaries). */
export function catalogueSiteRoutes(): { path: string; kind: 'area' | 'exploration'; areaId: string; explorationId?: string }[] {
  const routes: {
    path: string
    kind: 'area' | 'exploration'
    areaId: string
    explorationId?: string
  }[] = []
  for (const area of capabilityAreas) {
    for (const ex of area.explorations) {
      routes.push({
        path: `${area.id}/${ex.id}`,
        kind: 'exploration',
        areaId: area.id,
        explorationId: ex.id,
      })
    }
    routes.push({ path: area.id, kind: 'area', areaId: area.id })
  }
  return routes
}
