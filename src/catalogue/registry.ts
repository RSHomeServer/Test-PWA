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
      investigationStub({
        id: 'motion',
        capability: 'Motion (React)',
        oss: 'motion',
        ossUrl: 'https://github.com/motiondivision/motion',
      }),
      investigationStub({
        id: 'springs',
        capability: 'Spring animations',
        oss: 'Motion springs / WAAPI compare',
      }),
      investigationStub({
        id: 'layout-transitions',
        capability: 'Layout transitions',
        oss: 'Motion layout / View Transitions',
      }),
      investigationStub({
        id: 'shared-element',
        capability: 'Shared-element transitions',
        oss: 'Motion / View Transitions API',
      }),
      investigationStub({
        id: 'particles',
        capability: 'Particle systems',
        oss: 'tsparticles',
        ossUrl: 'https://github.com/tsparticles/tsparticles',
      }),
      investigationStub({
        id: 'lottie',
        capability: 'Lottie playback',
        oss: 'lottie-web / dotLottie',
      }),
      investigationStub({
        id: 'rive',
        capability: 'Rive interactive graphics',
        oss: '@rive-app/react-canvas',
      }),
      investigationStub({
        id: 'gsap',
        capability: 'GSAP timelines',
        oss: 'GSAP (licence diligence required)',
        ossUrl: 'https://github.com/greensock/GSAP',
      }),
      investigationStub({
        id: 'reduced-motion',
        capability: 'Reduced-motion policy',
        oss: 'Platform + @songara/pwa-base/animation',
      }),
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
