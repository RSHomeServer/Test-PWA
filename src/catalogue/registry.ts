import type { CapabilityArea, CatalogueGroup, ExplorationRecord, LabSectionId } from './types'
import { LAB_SECTION_IDS, LAB_SECTIONS } from './types'
import { getWaveBFacet } from './waveBFacetArchive'

function stack(
  partial: Omit<CatalogueGroup, 'recommended'> & { recommended?: boolean },
): CatalogueGroup {
  return {
    recommended: false,
    ...partial,
  }
}

const PREVIEW_MOTION = {
  packageId: '@songara/pwa-base/preview/motion',
  peers: ['motion'],
  helpers: [
    'motion',
    'resolveTransition',
    'useSongaraMotion',
    'useReducedMotion',
    'AnimatePresence',
  ],
} as const

const PREVIEW_DEXIE = {
  packageId: '@songara/pwa-base/preview/dexie',
  peers: ['dexie'],
  helpers: [
    'Dexie',
    'createSongaraDb',
    'songaraDbName',
    'sortSchemaVersions',
    'applySchemaVersions',
  ],
} as const

const PREVIEW_LOTTIE = {
  packageId: '@songara/pwa-base/preview/lottie',
  peers: ['lottie-react'],
  helpers: [
    'Lottie',
    'SongaraLottie',
    'resolveLottiePlayback',
    'useSongaraLottiePlayback',
    'useReducedMotion',
  ],
} as const

const PREVIEW_RIVE = {
  packageId: '@songara/pwa-base/preview/rive',
  peers: ['@rive-app/react-canvas'],
  helpers: [
    'useRive',
    'resolveRivePlayback',
    'useSongaraRivePlayback',
    'useReducedMotion',
  ],
} as const

const PREVIEW_GSAP = {
  packageId: '@songara/pwa-base/preview/gsap',
  peers: ['gsap'],
  helpers: [
    'gsap',
    'resolveGsapPlayback',
    'useSongaraGsapPlayback',
    'useReducedMotion',
  ],
} as const

const PREVIEW_TSPARTICLES = {
  packageId: '@songara/pwa-base/preview/tsparticles',
  peers: ['@tsparticles/react', '@tsparticles/slim'],
  helpers: [
    'Particles',
    'loadSlim',
    'resolveParticlesMotion',
    'useSongaraParticlesMotion',
    'useReducedMotion',
  ],
} as const

const PREVIEW_RAPIER = {
  packageId: '@songara/pwa-base/preview/rapier2d',
  peers: ['@dimforge/rapier2d-compat'],
  helpers: [
    'RAPIER',
    'createSongaraRapierWorld',
    'initSongaraRapier',
    'songaraFixedStepSeconds',
  ],
} as const

const PREVIEW_MATTER = {
  packageId: '@songara/pwa-base/preview/matter',
  peers: ['matter-js'],
  helpers: [
    'Matter',
    'createSongaraMatterEngine',
    'resolveMatterRunner',
    'songaraFixedStepSeconds',
  ],
} as const

const PREVIEW_PLANCK = {
  packageId: '@songara/pwa-base/preview/planck',
  peers: ['planck'],
  helpers: ['planck', 'createSongaraPlanckWorld', 'songaraFixedStepSeconds'],
} as const

const PREVIEW_CANNON = {
  packageId: '@songara/pwa-base/preview/cannon',
  peers: ['cannon-es'],
  helpers: ['World', 'createSongaraCannonWorld', 'songaraFixedStepSeconds'],
} as const

const PREVIEW_REACT_WEBCAM = {
  packageId: '@songara/pwa-base/preview/react-webcam',
  peers: ['react-webcam'],
  helpers: ['Webcam', 'songaraWebcamConstraints'],
} as const

const PREVIEW_TONE = {
  packageId: '@songara/pwa-base/preview/tone',
  peers: ['tone'],
  helpers: ['Transport', 'Synth', 'resolveToneTransport'],
} as const

const PREVIEW_HOWLER = {
  packageId: '@songara/pwa-base/preview/howler',
  peers: ['howler'],
  helpers: ['Howl', 'Howler', 'createSongaraSfx'],
} as const

const PREVIEW_IDB = {
  packageId: '@songara/pwa-base/preview/idb',
  peers: ['idb'],
  helpers: ['openDB', 'openSongaraDb', 'songaraDbName'],
} as const

const PREVIEW_LOCALFORAGE = {
  packageId: '@songara/pwa-base/preview/localforage',
  peers: ['localforage'],
  helpers: ['localforage', 'createSongaraLocalforage', 'songaraDbName'],
} as const

/** Platform APIs — not a Preview connector. */
const PLATFORM_NO_PREVIEW = {
  packageId: null,
  absence: 'platform' as const,
} as const

/** Stable foundation kit — not a Preview connector. */
const STABLE_KIT_NO_PREVIEW = {
  packageId: null,
  absence: 'stable-kit' as const,
  absenceDetail: '@songara/pwa-base/audio',
} as const

/** Runtime pack store — not a Preview connector. */
const RUNTIME_NO_PREVIEW = {
  packageId: null,
  absence: 'runtime' as const,
  absenceDetail: 'packStore',
} as const

/**
 * Living registry — Capability Lab stacks (Wave A four-section IA).
 * Hard rule: do not add new facet leaves to primary nav.
 */
export const capabilityAreas: CapabilityArea[] = [
  {
    id: 'animation',
    title: 'Animation',
    description:
      'Native platform motion and OSS stacks (Motion, Lottie, Rive, GSAP, tsParticles) for Songara PWAs.',
    groups: [
      stack({
        id: 'native',
        title: 'Native',
        oss: 'Platform APIs',
        ossUrl:
          'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API',
        description: 'Browser motion APIs and reduced-motion policy.',
        status: 'Ready',
        recommended: true,
        preview: PLATFORM_NO_PREVIEW,
        whatItDoes:
          'Covers the Web Animations API, CSS transitions/animations, View Transitions, and prefers-reduced-motion. Typical uses: simple UI pulses, page transitions, and accessibility gating before any OSS motion kit is introduced.',
        whyWeUseIt:
          'It is the free, zero-bundle baseline every browser already ships. We evaluate platform APIs first so OSS like Motion or GSAP is only adopted when the built-in surface is too thin.',
        a11yNotes:
          'Always honour prefers-reduced-motion; View Transitions need an instant fallback.',
        performanceNotes:
          'WAAPI/CSS are cheap for simple pulses; avoid layout thrash.',
        alternatives: 'Motion for React UI kits; Lottie/Rive for authored graphics.',
      }),
      stack({
        id: 'Motion',
        title: 'Motion',
        oss: 'Motion',
        ossUrl: 'https://motion.dev',
        description: 'Declarative React UI motion — springs, layout, gestures, presence.',
        status: 'Ready',
        recommended: true,
        hasExamples: true,
        preview: PREVIEW_MOTION,
        whatItDoes:
          'Motion (formerly Framer Motion) animates React UI: enter/exit presence, spring physics, layout morphs, gestures (hover/tap/drag), scroll-triggered reveals, and SVG path draws. Typical product uses are sheets, list reorders, micro-interactions, and onboarding sequences.',
        whyWeUseIt:
          'It is the most productive React-first kit when WAAPI becomes verbose — springs, gestures, layout, and AnimatePresence in one API. That combination is the default Songara choice for interactive chrome after platform APIs.',
        a11yNotes:
          'Gate gestures and layout under reduced motion; snap exits with AnimatePresence.',
        performanceNotes:
          'Excellent for UI-scale motion; layout animations can thrash on large lists.',
        alternatives: 'WAAPI/CSS for one-offs; Lottie/Rive for illustration; GSAP only with licence diligence.',
      }),
      stack({
        id: 'Lottie',
        title: 'Lottie',
        oss: 'Lottie',
        ossUrl: 'https://github.com/airbnb/lottie-web',
        description: 'Playback for designer-authored vector motion graphics.',
        status: 'Ready',
        recommended: true,
        preview: PREVIEW_LOTTIE,
        whatItDoes:
          'Plays JSON / dotLottie animations exported from After Effects (and similar tools). Typical uses are icon flourishes, empty states, loaders, and marketing moments where a designer owns the motion — not hand-coded DOM animation.',
        whyWeUseIt:
          'It is the standard pipeline from design tools to the web for authored graphics. We picked it so product teams can ship designer motion without rebuilding every path in Motion or SVG.',
        a11yNotes: 'Freeze or swap to static under reduced motion; keep assets small.',
        performanceNotes: 'JSON size and complexity dominate cost; prefer icon-scale assets.',
        alternatives: 'Rive for interactive state machines; Motion/SVG for simple draws.',
      }),
      stack({
        id: 'Rive',
        title: 'Rive',
        oss: 'Rive',
        ossUrl: 'https://rive.app',
        description: 'Interactive state-machine graphics.',
        status: 'Ready',
        preview: PREVIEW_RIVE,
        whatItDoes:
          'Runs .riv files with state machines so illustrations react to input (hover, progress, game-like states). Typical uses are interactive heroes, character UI, and complex illustration that Lottie cannot branch cleanly.',
        whyWeUseIt:
          'We evaluate it where Lottie’s linear playback is not enough — interactive state machines with a thin Preview connector and reduced-motion policy helpers.',
        a11yNotes: 'Pause state machines under reduced motion.',
        performanceNotes: 'Ship `.riv` offline via content packs — CDN samples are catalogue-only.',
        alternatives: 'Lottie for linear playback; Motion for UI chrome.',
      }),
      stack({
        id: 'GSAP',
        title: 'GSAP',
        oss: 'GSAP',
        ossUrl: 'https://gsap.com',
        description: 'Timeline-oriented animation for complex sequenced motion.',
        status: 'Ready',
        preview: PREVIEW_GSAP,
        whatItDoes:
          'Builds precise, timeline-driven animations across DOM/SVG/canvas. Typical uses are long marketing sequences, scrubbed scroll stories, and choreography that needs fine control beyond component springs.',
        whyWeUseIt:
          'Comparison for deep timeline work only. Licence diligence is required, so it is not a Songara default UI kit — Motion/WAAPI cover chrome first. Preview wires GSAP with reduced-motion playback helpers.',
        alternatives: 'Prefer Motion/WAAPI for chrome; GSAP only when timeline depth is essential.',
      }),
      stack({
        id: 'tsParticles',
        title: 'tsParticles',
        oss: 'tsParticles',
        ossUrl: 'https://github.com/tsparticles/tsparticles',
        description: 'Particle fields for ambient visual atmosphere.',
        status: 'Ready',
        preview: PREVIEW_TSPARTICLES,
        whatItDoes:
          'Renders configurable particle systems (stars, dust, networks) as background atmosphere. Typical uses are decorative hero fields — not functional UI motion.',
        whyWeUseIt:
          'Atmosphere comparison with a Preview connector. Branded glyph fields should prefer foundation ParticleField when available; tsParticles stays optional and motion-gated.',
        a11yNotes: 'Always gate / pause under reduced motion.',
        alternatives: 'CSS/canvas accents; foundation ParticleField.',
      }),
    ],
  },
  {
    id: 'physics',
    title: 'Physics',
    description:
      '2D/3D rigid-body and constraint simulation for interactive Songara experiences.',
    groups: [
      stack({
        id: 'Rapier',
        title: 'Rapier',
        oss: 'Rapier',
        ossUrl: 'https://rapier.rs',
        description: 'Modern WASM rigid-body physics (2D and 3D).',
        status: 'Ready',
        recommended: true,
        preview: PREVIEW_RAPIER,
        whatItDoes:
          'Simulates rigid bodies, joints, and collisions in 2D/3D via WebAssembly. Typical uses are interactive toys, puzzles, vehicle/cloth experiments, and any UI that needs believable physical response.',
        whyWeUseIt:
          'Leading modern WASM engine and Songara’s default candidate. Preview boots Rapier2D-compat with Songara world helpers and a fixed-step convention.',
        alternatives: 'Matter.js for approachable 2D; cannon-es for classic 3D.',
      }),
      stack({
        id: 'Matter.js',
        title: 'Matter.js',
        oss: 'Matter.js',
        ossUrl: 'https://brm.io/matter-js/',
        description: 'Approachable 2D rigid-body physics for the web.',
        status: 'Ready',
        preview: PREVIEW_MATTER,
        whatItDoes:
          '2D rigid-body engine with constraints, composites, and a gentle learning curve. Typical uses are prototypes, educational demos, and lightweight interactive scenes.',
        whyWeUseIt:
          'Comparison stack against Rapier for DX and constraint modelling — Preview-backed, not the intended long-term default.',
      }),
      stack({
        id: 'Planck.js',
        title: 'Planck.js',
        oss: 'Planck.js',
        ossUrl: 'https://piqnt.com/planck.js/',
        description: 'Box2D-style 2D physics for JavaScript.',
        status: 'Ready',
        preview: PREVIEW_PLANCK,
        whatItDoes:
          'Ports Box2D concepts to JavaScript for 2D worlds with fixtures, joints, and contacts. Typical uses are games and simulations that expect a Box2D mental model.',
        whyWeUseIt:
          'Evaluation comparison for teams already fluent in Box2D — Preview-backed, not a Songara default pick.',
      }),
      stack({
        id: 'cannon-es',
        title: 'cannon-es',
        oss: 'cannon-es',
        ossUrl: 'https://github.com/pmndrs/cannon-es',
        description: 'Classic 3D rigid-body physics (ES module fork of cannon.js).',
        status: 'Ready',
        preview: PREVIEW_CANNON,
        whatItDoes:
          '3D rigid-body simulation familiar from the cannon.js ecosystem. Typical uses are Three.js scenes needing bodies, contacts, and simple vehicles.',
        whyWeUseIt:
          '3D comparison against Rapier — Preview-backed to understand trade-offs, not as the preferred engine.',
      }),
    ],
  },
  {
    id: 'camera',
    title: 'Camera',
    description:
      'Camera access, device selection, still capture, and permission UX for Songara PWAs.',
    groups: [
      stack({
        id: 'native',
        title: 'Native',
        oss: 'Platform MediaDevices',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices',
        description: 'getUserMedia, devices, capture, and secure-context rules.',
        status: 'Ready',
        recommended: true,
        preview: PLATFORM_NO_PREVIEW,
        whatItDoes:
          'Browser MediaDevices APIs for live camera streams, device enumeration, still capture, track constraints, and permission flows. Typical uses are photo capture, QR/scan prep, and any feature that needs a live preview.',
        whyWeUseIt:
          'Platform baseline before wrappers. Understanding secure-context and permission UX here prevents fragile React glue later.',
        a11yNotes: 'Clear permission denial UX; never assume camera availability.',
      }),
      stack({
        id: 'react-webcam',
        title: 'react-webcam',
        oss: 'react-webcam',
        ossUrl: 'https://github.com/mozmorris/react-webcam',
        description: 'Thin React component over getUserMedia.',
        status: 'Ready',
        preview: PREVIEW_REACT_WEBCAM,
        whatItDoes:
          'Wraps getUserMedia in a React component for quick webcam previews and screenshots. Typical uses are prototypes and simple capture UIs.',
        whyWeUseIt:
          'Thin React glue comparison against MediaDevices directly — Preview-backed with Songara constraint helpers, not assumed default.',
      }),
    ],
  },
  {
    id: 'audio',
    title: 'Audio',
    description:
      'Playback, SFX, musical graphs, and comparison with the Songara audio kit.',
    groups: [
      stack({
        id: 'native',
        title: 'Native',
        oss: 'Platform audio APIs',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
        description: 'Web Audio, media elements, worklets, and recording.',
        status: 'Ready',
        recommended: true,
        preview: PLATFORM_NO_PREVIEW,
        whatItDoes:
          'Platform audio: HTMLAudioElement, AudioContext graphs, AudioWorklet, and MediaRecorder. Typical uses are SFX, voice notes, metering, and custom processing without an OSS kit.',
        whyWeUseIt:
          'Baseline before Tone, Howler, or the foundation kit — so we know what the browser already covers.',
      }),
      stack({
        id: 'Tone.js',
        title: 'Tone.js',
        oss: 'Tone.js',
        ossUrl: 'https://tonejs.github.io/',
        description: 'Musical timing, synthesis, and transport for the web.',
        status: 'Ready',
        preview: PREVIEW_TONE,
        whatItDoes:
          'High-level Web Audio for synths, samples, scheduling, and transport clocks. Typical uses are generative music, sequencers, and musical UX that needs sample-accurate timing.',
        whyWeUseIt:
          'Strong candidate when products need musical graphs — Preview-backed and evaluated against the Songara Stable audio kit for overlap and weight.',
      }),
      stack({
        id: 'Howler.js',
        title: 'Howler.js',
        oss: 'Howler.js',
        ossUrl: 'https://howlerjs.com/',
        description: 'Simple multi-format sound-effect playback.',
        status: 'Ready',
        preview: PREVIEW_HOWLER,
        whatItDoes:
          'Plays and pools short sounds across formats with sprites and spatial helpers. Typical uses are UI SFX, game one-shots, and sprite sheets of clicks/alerts.',
        whyWeUseIt:
          'SFX-oriented comparison with a thin Preview façade — does not replace Stable `@songara/pwa-base/audio`.',
      }),
      stack({
        id: 'Songara-Audio-Kit',
        title: 'Songara Audio Kit',
        oss: '@songara/pwa-base/audio',
        ossUrl: 'https://github.com/RSHomeServer/PWA-Base',
        description: 'Foundation Stable audio helpers for Songara PWAs.',
        status: 'Ready',
        recommended: true,
        preview: STABLE_KIT_NO_PREVIEW,
        whatItDoes:
          'Songara’s Stable audio surface for product apps — playback patterns and shared helpers rather than a full DAW. Typical uses are consistent SFX/voice loops across PWAs.',
        whyWeUseIt:
          'It is our owned Stable kit. The lab compares it with Tone/Howler/platform so products do not invent parallel helpers.',
      }),
    ],
  },
  {
    id: 'offline-storage',
    title: 'Offline Storage',
    description:
      'Durable client-side data: IndexedDB ergonomics, migrations, OPFS — no sync product yet.',
    groups: [
      stack({
        id: 'native',
        title: 'Native',
        oss: 'Platform storage APIs',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
        description: 'Raw IndexedDB and Origin Private File System.',
        status: 'Ready',
        recommended: true,
        preview: PLATFORM_NO_PREVIEW,
        whatItDoes:
          'Browser-native durable storage: IndexedDB for structured data and OPFS for file-like blobs. Typical uses are offline caches, large assets, and understanding platform limits before wrappers.',
        whyWeUseIt:
          'We learn ceilings and failure modes here first, then judge whether Dexie or idb is worth the abstraction.',
      }),
      stack({
        id: 'idb',
        title: 'idb',
        oss: 'idb',
        ossUrl: 'https://github.com/jakearchibald/idb',
        description: 'Tiny promise wrapper around IndexedDB.',
        status: 'Ready',
        preview: PREVIEW_IDB,
        whatItDoes:
          'Promisifies IndexedDB with a minimal API. Typical uses are small stores where a full ODM would be overkill.',
        whyWeUseIt:
          'Minimal-wrapper comparison against Dexie ergonomics — Preview-backed to see when “tiny” is enough.',
      }),
      stack({
        id: 'Dexie.js',
        title: 'Dexie.js',
        oss: 'Dexie.js',
        ossUrl: 'https://dexie.org/',
        description: 'Ergonomic IndexedDB with schemas and migrations.',
        status: 'Ready',
        recommended: true,
        preview: PREVIEW_DEXIE,
        whatItDoes:
          'Friendly IndexedDB API with typed tables, queries, live queries, and versioned schema upgrades. Typical uses are offline app state, notes/collections, and forward-only migrations without a server sync product.',
        whyWeUseIt:
          'Best IndexedDB DX for Songara apps so far — app-owned schema, no Dexie Cloud. Preferred over raw IDB and heavier legacy wrappers.',
        a11yNotes: 'Storage UX is mostly non-visual; surface migration failures clearly.',
        performanceNotes: 'Keep migrations forward-only; index thoughtfully.',
        alternatives: 'idb for minimal wrap; raw IndexedDB for learning ceilings.',
      }),
      stack({
        id: 'localForage',
        title: 'localForage',
        oss: 'localForage',
        ossUrl: 'https://localforage.github.io/localForage/',
        description: 'Legacy async key-value storage wrapper.',
        status: 'Ready',
        preview: PREVIEW_LOCALFORAGE,
        whatItDoes:
          'Async get/set storage that falls back across IndexedDB/WebSQL/localStorage. Typical uses are simple key-value persistence in older codebases.',
        whyWeUseIt:
          'Legacy comparison only — Preview-backed, not a Songara default when Dexie or idb fits.',
      }),
      stack({
        id: 'Songara-Pack-Store',
        title: 'Songara Pack Store',
        oss: '@songara/pwa-base runtime storage',
        ossUrl: 'https://github.com/RSHomeServer/PWA-Base',
        description: 'Foundation packStore for content packs vs app IDB.',
        status: 'Ready',
        preview: RUNTIME_NO_PREVIEW,
        whatItDoes:
          'Runtime storage for Songara content packs (cache/IDB details owned by the foundation). Typical uses are shipping offline content bundles — not general app databases.',
        whyWeUseIt:
          'Contrast with app IndexedDB (Dexie). PackStore is not a Dexie substitute; the lab documents the boundary.',
      }),
    ],
  },
]

export function getArea(areaId: string): CapabilityArea | undefined {
  const needle = areaId.toLowerCase()
  return capabilityAreas.find((a) => a.id === areaId || a.id.toLowerCase() === needle)
}

export function getGroup(
  areaId: string,
  groupId: string,
): CatalogueGroup | undefined {
  const area = getArea(areaId)
  if (!area) return undefined
  const needle = groupId.toLowerCase()
  return area.groups.find((g) => g.id === groupId || g.id.toLowerCase() === needle)
}

export function stackCount(area: CapabilityArea): number {
  return area.groups.length
}

export function listStacks(area: CapabilityArea): CatalogueGroup[] {
  return area.groups
}

/** Lab section path under an area: `Motion/Overview`. */
export function labSectionPath(groupId: string, section: LabSectionId): string {
  return `${groupId}/${section}`
}

export function getAdjacentLabSections(
  areaId: string,
  groupId: string,
  sectionId: LabSectionId,
): {
  prev: { relativePath: string; title: string } | null
  next: { relativePath: string; title: string } | null
} {
  const group = getGroup(areaId, groupId)
  if (!group) return { prev: null, next: null }
  const index = LAB_SECTION_IDS.indexOf(sectionId)
  if (index < 0) return { prev: null, next: null }
  const toNav = (id: LabSectionId) => {
    const meta = LAB_SECTIONS.find((s) => s.id === id)!
    return {
      relativePath: labSectionPath(groupId, id),
      title: meta.title,
    }
  }
  return {
    prev: index > 0 ? toNav(LAB_SECTION_IDS[index - 1]!) : null,
    next:
      index < LAB_SECTION_IDS.length - 1
        ? toNav(LAB_SECTION_IDS[index + 1]!)
        : null,
  }
}

/** Adjacent stacks within an area (Overview-first pager). */
export function getAdjacentStacks(
  areaId: string,
  groupId: string,
): {
  prev: { groupId: string; title: string } | null
  next: { groupId: string; title: string } | null
} {
  const area = getArea(areaId)
  if (!area) return { prev: null, next: null }
  const index = area.groups.findIndex(
    (g) => g.id === groupId || g.id.toLowerCase() === groupId.toLowerCase(),
  )
  if (index < 0) return { prev: null, next: null }
  const toNav = (g: CatalogueGroup) => ({ groupId: g.id, title: g.title })
  return {
    prev: index > 0 ? toNav(area.groups[index - 1]!) : null,
    next: index < area.groups.length - 1 ? toNav(area.groups[index + 1]!) : null,
  }
}

export type CatalogueRouteKind = 'area' | 'group' | 'lab-section'

export type CatalogueSiteRoute = {
  path: string
  kind: CatalogueRouteKind
  areaId: string
  groupId?: string
  sectionId?: LabSectionId
  relativePath?: string
}

/**
 * Former facet / flat URLs → Wave A lab targets (Overview or stack hub).
 * Demo implementation files remain in `src/explorations/**` for Wave B.
 */
export const catalogueLegacyRedirects: Record<string, string> = {
  // Legacy flat animation
  'animation/waapi': 'animation/native/Overview',
  'animation/reduced-motion': 'animation/native/Overview',
  'animation/motion': 'animation/Motion/Overview',
  'animation/springs': 'animation/Motion/Overview',
  'animation/layout-transitions': 'animation/Motion/Overview',
  'animation/shared-element': 'animation/Motion/Overview',
  'animation/lottie': 'animation/Lottie/Overview',
  'animation/rive': 'animation/Rive/Overview',
  'animation/gsap': 'animation/GSAP/Overview',
  'animation/particles': 'animation/tsParticles/Overview',
  // Nested facet leaves → Overview
  'animation/native/Web-Animations-API': 'animation/native/Overview',
  'animation/native/Reduced-Motion': 'animation/native/Overview',
  'animation/native/View-Transitions': 'animation/native/Overview',
  'animation/Motion/Springs': 'animation/Motion/Overview',
  'animation/Motion/Layout-Transitions': 'animation/Motion/Overview',
  'animation/Motion/Shared-Element': 'animation/Motion/Overview',
  'animation/Motion/Gestures': 'animation/Motion/Overview',
  'animation/Motion/Scroll': 'animation/Motion/Overview',
  'animation/Motion/Exit-Animations': 'animation/Motion/Overview',
  'animation/Motion/Variants': 'animation/Motion/Overview',
  'animation/Motion/SVG': 'animation/Motion/Overview',
  'animation/Motion/Motion-Values': 'animation/Motion/Overview',
  'animation/Lottie/Playback': 'animation/Lottie/Overview',
  'animation/Rive/Interactive-Graphics': 'animation/Rive/Overview',
  'animation/GSAP/Timelines': 'animation/GSAP/Overview',
  'animation/tsParticles/Ambient-Field': 'animation/tsParticles/Overview',
  // Physics
  'physics/rapier2d': 'physics/Rapier/Overview',
  'physics/rapier3d': 'physics/Rapier/Overview',
  'physics/matter': 'physics/Matter.js/Overview',
  'physics/planck': 'physics/Planck.js/Overview',
  'physics/cannon-es': 'physics/cannon-es/Overview',
  'physics/constraints': 'physics/Rapier/Overview',
  'physics/soft-bodies': 'physics/Rapier/Overview',
  'physics/rope': 'physics/Rapier/Overview',
  'physics/cloth': 'physics/Rapier/Overview',
  'physics/vehicles': 'physics/Rapier/Overview',
  'physics/Rapier/Overview-2D': 'physics/Rapier/Overview',
  'physics/Rapier/Overview-3D': 'physics/Rapier/Overview',
  'physics/Rapier/Joints': 'physics/Rapier/Overview',
  'physics/Rapier/Soft-Bodies': 'physics/Rapier/Overview',
  'physics/Rapier/Rope': 'physics/Rapier/Overview',
  'physics/Rapier/Cloth': 'physics/Rapier/Overview',
  'physics/Rapier/Vehicles': 'physics/Rapier/Overview',
  'physics/Matter.js/Constraints': 'physics/Matter.js/Overview',
  // Camera
  'camera/getusermedia': 'camera/native/Overview',
  'camera/device-selection': 'camera/native/Overview',
  'camera/still-capture': 'camera/native/Overview',
  'camera/constraints': 'camera/native/Overview',
  'camera/permissions-ux': 'camera/native/Overview',
  'camera/secure-context': 'camera/native/Overview',
  'camera/react-webcam': 'camera/react-webcam/Overview',
  'camera/native/GetUserMedia': 'camera/native/Overview',
  'camera/native/Device-Selection': 'camera/native/Overview',
  'camera/native/Still-Capture': 'camera/native/Overview',
  'camera/native/Track-Constraints': 'camera/native/Overview',
  'camera/native/Permissions-UX': 'camera/native/Overview',
  'camera/native/Secure-Context': 'camera/native/Overview',
  // Audio
  'audio/web-audio': 'audio/native/Overview',
  'audio/media-element': 'audio/native/Overview',
  'audio/worklet': 'audio/native/Overview',
  'audio/recording-playback': 'audio/native/Overview',
  'audio/tone': 'audio/Tone.js/Overview',
  'audio/howler': 'audio/Howler.js/Overview',
  'audio/songara-audio-kit': 'audio/Songara-Audio-Kit/Overview',
  'audio/native/Web-Audio-API': 'audio/native/Overview',
  'audio/native/HTMLAudioElement': 'audio/native/Overview',
  'audio/native/AudioWorklet': 'audio/native/Overview',
  'audio/native/MediaRecorder': 'audio/native/Overview',
  'audio/Tone.js/Synthesis': 'audio/Tone.js/Overview',
  'audio/Tone.js/Transport': 'audio/Tone.js/Overview',
  'audio/Howler.js/Sprites': 'audio/Howler.js/Overview',
  'audio/Songara-Audio-Kit/Playback-Loop': 'audio/Songara-Audio-Kit/Overview',
  // Offline storage
  'offline-storage/indexeddb-raw': 'offline-storage/native/Overview',
  'offline-storage/opfs': 'offline-storage/native/Overview',
  'offline-storage/idb': 'offline-storage/idb/Overview',
  'offline-storage/dexie': 'offline-storage/Dexie.js/Overview',
  'offline-storage/migrations': 'offline-storage/Dexie.js/Overview',
  'offline-storage/live-queries': 'offline-storage/Dexie.js/Overview',
  'offline-storage/localforage': 'offline-storage/localForage/Overview',
  'offline-storage/pack-store': 'offline-storage/Songara-Pack-Store/Overview',
  'offline-storage/native/IndexedDB': 'offline-storage/native/Overview',
  'offline-storage/native/OPFS': 'offline-storage/native/Overview',
  'offline-storage/Dexie.js/Migrations': 'offline-storage/Dexie.js/Overview',
  'offline-storage/Dexie.js/Live-Queries': 'offline-storage/Dexie.js/Overview',
}

/** @deprecated Use catalogueLegacyRedirects */
export const animationLegacyRedirects = catalogueLegacyRedirects

/** All catalogue routes for SoloSiteApp (lab sections before hubs before areas). */
export function catalogueSiteRoutes(): CatalogueSiteRoute[] {
  const routes: CatalogueSiteRoute[] = []
  for (const area of capabilityAreas) {
    for (const group of area.groups) {
      for (const sectionId of LAB_SECTION_IDS) {
        const relativePath = labSectionPath(group.id, sectionId)
        routes.push({
          path: `${area.id}/${relativePath}`,
          kind: 'lab-section',
          areaId: area.id,
          groupId: group.id,
          sectionId,
          relativePath,
        })
      }
      routes.push({
        path: `${area.id}/${group.id}`,
        kind: 'group',
        areaId: area.id,
        groupId: group.id,
      })
    }
    routes.push({ path: area.id, kind: 'area', areaId: area.id })
  }
  return routes
}

export { LAB_SECTIONS, LAB_SECTION_IDS }

/** @deprecated Wave B demo lookup only — not primary lab routing. */
export function getExploration(
  _areaId: string,
  relativePath: string,
): ExplorationRecord | undefined {
  return getWaveBFacet(relativePath)
}
