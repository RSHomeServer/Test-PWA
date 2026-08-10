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

const NO_PREVIEW = { packageId: null } as const

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
        description:
          'Browser platform motion APIs and accessibility policy — baseline before adopting OSS.',
        status: 'Ready',
        recommended: true,
        preview: NO_PREVIEW,
        whySongara:
          'Baseline before Motion/GSAP. Prefer for simple UI motion; pair with prefers-reduced-motion.',
        songaraBehaviour:
          'Foundation `useReducedMotion` from `@songara/pwa-base/animation` is the policy source of truth.',
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
        description:
          'Motion for React (npm motion) via `@songara/pwa-base/preview/motion` — Wave 1 Preview consume.',
        status: 'Ready',
        recommended: true,
        preview: PREVIEW_MOTION,
        whySongara:
          'Default React UI motion kit when WAAPI becomes verbose — springs, gestures, layout, presence in one kit.',
        songaraBehaviour:
          'Import Preview only (`@songara/pwa-base/preview/motion`). Helpers honour foundation reduced-motion via `resolveTransition` / `useSongaraMotion`.',
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
        description:
          'Designer-authored JSON / dotLottie motion graphics via `@songara/pwa-base/preview/lottie`.',
        status: 'Ready',
        recommended: true,
        preview: PREVIEW_LOTTIE,
        whySongara:
          'Best for designer-authored icon and empty-state motion without hand-coding every path.',
        songaraBehaviour:
          'Prefer `SongaraLottie` / `resolveLottiePlayback` so reduced-motion freezes playback consistently.',
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
        status: 'Experimental',
        preview: NO_PREVIEW,
        whySongara:
          'Evaluating for interactive illustrations. No Songara Preview package yet.',
        a11yNotes: 'Pause state machines under reduced motion.',
        performanceNotes: 'Ship `.riv` offline via content packs — CDN samples are catalogue-only.',
        alternatives: 'Lottie for linear playback; Motion for UI chrome.',
      }),
      stack({
        id: 'GSAP',
        title: 'GSAP',
        oss: 'GSAP',
        ossUrl: 'https://gsap.com',
        description: 'Timeline-oriented animation toolkit (licence diligence required).',
        status: 'Experimental',
        preview: NO_PREVIEW,
        whySongara:
          'Not recommended as default UI kit. Licence review required before product use.',
        alternatives: 'Prefer Motion/WAAPI for chrome; GSAP only when timeline depth is essential.',
      }),
      stack({
        id: 'tsParticles',
        title: 'tsParticles',
        oss: 'tsParticles',
        ossUrl: 'https://github.com/tsparticles/tsparticles',
        description: 'Particle systems for ambient atmosphere.',
        status: 'Experimental',
        preview: NO_PREVIEW,
        whySongara:
          'Atmosphere only. Prefer `@songara/pwa-base` ParticleField for branded glyphs when available.',
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
        description:
          'Modern WASM physics (2D/3D). Songara default engine candidate; Preview held for product commit.',
        status: 'Needs investigation',
        recommended: true,
        preview: NO_PREVIEW,
        whySongara:
          'Default engine candidate. Preview package deferred until Wave 1b + product commit — not Preview-backed yet.',
        alternatives: 'Matter.js for approachable 2D; cannon-es for classic 3D.',
      }),
      stack({
        id: 'Matter.js',
        title: 'Matter.js',
        oss: 'Matter.js',
        ossUrl: 'https://brm.io/matter-js/',
        description: 'Approachable 2D rigid-body engine for the web.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara: 'Comparison stack for Rapier — evaluate DX and constraint model.',
      }),
      stack({
        id: 'Planck.js',
        title: 'Planck.js',
        oss: 'Planck.js',
        ossUrl: 'https://piqnt.com/planck.js/',
        description: 'Box2D-style 2D physics for JavaScript.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara: 'Box2D familiarity comparison — evaluation only.',
      }),
      stack({
        id: 'cannon-es',
        title: 'cannon-es',
        oss: 'cannon-es',
        ossUrl: 'https://github.com/pmndrs/cannon-es',
        description: 'Classic 3D rigid-body engine (ES module fork of cannon.js).',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara: '3D comparison vs Rapier 3D — evaluation only.',
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
        description:
          'Browser platform camera APIs and permission patterns — baseline before wrappers.',
        status: 'Needs investigation',
        recommended: true,
        preview: NO_PREVIEW,
        whySongara:
          'Platform baseline for getUserMedia, devices, capture, and secure-context constraints.',
        a11yNotes: 'Clear permission denial UX; never assume camera availability.',
      }),
      stack({
        id: 'react-webcam',
        title: 'react-webcam',
        oss: 'react-webcam',
        ossUrl: 'https://github.com/mozmorris/react-webcam',
        description: 'Thin React glue around getUserMedia.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara: 'Evaluate whether thin React glue beats direct MediaDevices usage.',
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
        description: 'Web Audio, media element, worklets, and recording baselines.',
        status: 'Needs investigation',
        recommended: true,
        preview: NO_PREVIEW,
        whySongara: 'Platform baseline before Tone/Howler or foundation kit choices.',
      }),
      stack({
        id: 'Tone.js',
        title: 'Tone.js',
        oss: 'Tone.js',
        ossUrl: 'https://tonejs.github.io/',
        description: 'Musical timing, synthesis, and transport for the web.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara: 'Musical graphs and transport — evaluate vs Songara audio kit.',
      }),
      stack({
        id: 'Howler.js',
        title: 'Howler.js',
        oss: 'Howler.js',
        ossUrl: 'https://howlerjs.com/',
        description: 'Simple multi-format SFX playback.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara:
          'SFX candidate. Howler Preview package is out of Wave A scope — not Preview-backed yet.',
      }),
      stack({
        id: 'Songara-Audio-Kit',
        title: 'Songara Audio Kit',
        oss: '@songara/pwa-base/audio',
        ossUrl: 'https://github.com/RSHomeServer/PWA-Base',
        description:
          'Foundation Stable audio kit — compare against Tone/Howler/platform for Songara PWAs.',
        status: 'Needs investigation',
        recommended: true,
        preview: NO_PREVIEW,
        whySongara:
          'Stable foundation kit for Songara PWAs. Lab validates fit vs OSS alternatives (not a Preview package).',
        songaraBehaviour: 'Import `@songara/pwa-base/audio` — do not fork playback helpers locally.',
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
        description: 'Raw IndexedDB and Origin Private File System baselines.',
        status: 'Needs investigation',
        recommended: true,
        preview: NO_PREVIEW,
        whySongara: 'Understand platform ceilings before choosing Dexie/idb wrappers.',
      }),
      stack({
        id: 'idb',
        title: 'idb',
        oss: 'idb',
        ossUrl: 'https://github.com/jakearchibald/idb',
        description: 'Tiny promise wrapper around IndexedDB.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara: 'Minimal wrapper comparison vs Dexie ergonomics.',
      }),
      stack({
        id: 'Dexie.js',
        title: 'Dexie.js',
        oss: 'Dexie.js',
        ossUrl: 'https://dexie.org/',
        description:
          'Ergonomic IndexedDB via `@songara/pwa-base/preview/dexie` (Wave 1 Preview).',
        status: 'Ready',
        recommended: true,
        preview: PREVIEW_DEXIE,
        whySongara:
          'Preferred IndexedDB DX for Songara apps — app-owned schema, no Dexie Cloud.',
        songaraBehaviour:
          '`createSongaraDb` + `songaraDbName` + schema version helpers. Peer `dexie` required in the consumer.',
        a11yNotes: 'Storage UX is mostly non-visual; surface migration failures clearly.',
        performanceNotes: 'Keep migrations forward-only; index thoughtfully.',
        alternatives: 'idb for minimal wrap; raw IndexedDB for learning ceilings.',
      }),
      stack({
        id: 'localForage',
        title: 'localForage',
        oss: 'localForage',
        ossUrl: 'https://localforage.github.io/localForage/',
        description: 'Legacy async storage wrapper — compare only.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara: 'Legacy comparison only — not a Songara default.',
      }),
      stack({
        id: 'Songara-Pack-Store',
        title: 'Songara Pack Store',
        oss: '@songara/pwa-base runtime storage',
        ossUrl: 'https://github.com/RSHomeServer/PWA-Base',
        description: 'Foundation packStore contrast for content packs vs app IDB.',
        status: 'Needs investigation',
        preview: NO_PREVIEW,
        whySongara:
          'Contrast content-pack storage vs app IndexedDB — packStore is not a Dexie substitute.',
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
