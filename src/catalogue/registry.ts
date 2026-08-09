import type {
  CapabilityArea,
  CatalogueGroup,
  ExplorationEntry,
  ExplorationRecord,
} from './types'
import { investigationStub } from './stubs'

/**
 * Living registry — capability summaries aggregate from this list.
 * Top five areas: animation, physics, camera, audio, offline-storage.
 * See docs/architecture/top-five-routes.md
 *
 * Animation uses nested groups: /animation/{OSS|native}/{Offering}
 */
export const capabilityAreas: CapabilityArea[] = [
  {
    id: 'animation',
    title: 'Animation',
    description:
      'Native platform motion and OSS stacks (Motion, Lottie, Rive, GSAP, tsParticles) for Songara PWAs.',
    groups: [
      {
        id: 'native',
        title: 'Native',
        oss: 'Platform APIs',
        ossUrl:
          'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API',
        description:
          'Browser platform motion APIs and accessibility policy — baseline before adopting OSS.',
        explorations: [
          {
            id: 'Web-Animations-API',
            capability: 'Web Animations API',
            implementation: 'CSS + WAAPI spring-like pulse / reduced-motion gate',
            status: 'Ready',
            oss: 'Platform API (Web Animations / CSS)',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API',
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
            id: 'Reduced-Motion',
            capability: 'Reduced Motion',
            implementation:
              'useReducedMotion from @songara/pwa-base/animation + QA overrides',
            status: 'Ready',
            oss: 'Platform + @songara/pwa-base/animation',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
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
          {
            id: 'View-Transitions',
            capability: 'View Transitions',
            implementation:
              'document.startViewTransition support detection + reduced-motion gate (scaffold demo)',
            status: 'Experimental',
            oss: 'View Transitions API',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API',
            maturity: 3,
            performance: 3,
            browserSupport: 3,
            offline: 5,
            developerExperience: 3,
            visualQuality: 3,
            accessibility: 3,
            complexity: 4,
            recommended: false,
            overallScore: 5,
            notes:
              'Cross-document / same-document navigations. Chromium solid; Safari improving; Firefox partial. Always keep instant fallback.',
          },
        ],
      },
      {
        id: 'Motion',
        title: 'Motion',
        oss: 'Motion',
        ossUrl: 'https://motion.dev',
        description:
          'Motion for React (npm motion) via @songara/pwa-base/preview/motion — Wave 1 Preview consume.',
        explorations: [
          {
            id: 'Overview',
            capability: 'Overview',
            implementation:
              '@songara/pwa-base/preview/motion spring toggle + resolveTransition',
            status: 'Ready',
            oss: 'Motion',
            ossUrl: 'https://motion.dev',
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
              'Consumes Preview Motion (Wave 1) — same import products use. Default React UI motion kit when WAAPI becomes verbose; watch bundle size.',
          },
          {
            id: 'Springs',
            capability: 'Springs',
            implementation:
              '@songara/pwa-base/preview/motion spring ball + resolveTransition',
            status: 'Ready',
            oss: 'Motion',
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
              'Preview consume. Use 2–3 shared spring presets. WAAPI lacks first-class springs — Motion wins for tactile UX.',
          },
          {
            id: 'Layout-Transitions',
            capability: 'Layout Transitions',
            implementation:
              '@songara/pwa-base/preview/motion layout expand/collapse tile grid',
            status: 'Ready',
            oss: 'Motion',
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
              'Preview consume. Great for small groups; avoid animating large lists. Disable under reduced motion.',
          },
          {
            id: 'Shared-Element',
            capability: 'Shared Element',
            implementation:
              '@songara/pwa-base/preview/motion layoutId highlight morph',
            status: 'Experimental',
            oss: 'Motion',
            ossUrl: 'https://motion.dev/docs/react-layout-animations',
            maturity: 3,
            performance: 3,
            browserSupport: 5,
            offline: 5,
            developerExperience: 3,
            visualQuality: 4,
            accessibility: 3,
            complexity: 4,
            recommended: false,
            overallScore: 6,
            notes:
              'Preview consume. layoutId solid in-route. For document navigations see /animation/native/View-Transitions.',
          },
          {
            id: 'Gestures',
            capability: 'Gestures',
            implementation:
              '@songara/pwa-base/preview/motion whileHover / whileTap / drag',
            status: 'Ready',
            oss: 'Motion',
            ossUrl: 'https://motion.dev/docs/react-gestures',
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
              'Preview consume. Gate gestures under reduced motion; constrain drag in products.',
          },
          {
            id: 'Scroll',
            capability: 'Scroll',
            implementation:
              '@songara/pwa-base/preview/motion whileInView scroll reveals',
            status: 'Ready',
            oss: 'Motion',
            ossUrl: 'https://motion.dev/docs/react-scroll-animations',
            maturity: 4,
            performance: 4,
            browserSupport: 5,
            offline: 5,
            developerExperience: 4,
            visualQuality: 4,
            accessibility: 4,
            complexity: 3,
            recommended: true,
            overallScore: 7,
            notes:
              'whileInView covered. Scroll-linked useScroll not on Preview barrel yet — note in exploration.',
          },
          {
            id: 'Exit-Animations',
            capability: 'Exit Animations',
            implementation:
              '@songara/pwa-base/preview/motion AnimatePresence list exits',
            status: 'Ready',
            oss: 'Motion',
            ossUrl: 'https://motion.dev/docs/react-animate-presence',
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
              'Preview re-exports AnimatePresence. Snap exits under reduced motion.',
          },
          {
            id: 'Variants',
            capability: 'Variants',
            implementation:
              '@songara/pwa-base/preview/motion parent/child stagger variants',
            status: 'Ready',
            oss: 'Motion',
            ossUrl: 'https://motion.dev/docs/react-animation',
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
              'Shared variant packs for onboarding/menus; instant variants when reduced.',
          },
          {
            id: 'SVG',
            capability: 'SVG',
            implementation:
              '@songara/pwa-base/preview/motion pathLength circle + check path',
            status: 'Ready',
            oss: 'Motion',
            ossUrl: 'https://motion.dev/docs/react-svg-animation',
            maturity: 5,
            performance: 4,
            browserSupport: 5,
            offline: 5,
            developerExperience: 4,
            visualQuality: 5,
            accessibility: 4,
            complexity: 3,
            recommended: true,
            overallScore: 8,
            notes:
              'Icon-scale draws. Prefer Lottie/Rive for heavy illustration.',
          },
          {
            id: 'Motion-Values',
            capability: 'Motion Values',
            implementation:
              '@songara/pwa-base/preview/motion useMotionValue / useSpring / useTransform',
            status: 'Ready',
            oss: 'Motion',
            ossUrl: 'https://motion.dev/docs/react-motion-value',
            maturity: 5,
            performance: 5,
            browserSupport: 5,
            offline: 5,
            developerExperience: 4,
            visualQuality: 5,
            accessibility: 4,
            complexity: 4,
            recommended: true,
            overallScore: 8,
            notes:
              'Preview re-exports value hooks. Jump springs to rest under reduced motion.',
          },
        ],
      },
      {
        id: 'Lottie',
        title: 'Lottie',
        oss: 'Lottie',
        ossUrl: 'https://github.com/airbnb/lottie-web',
        description:
          'Designer-authored JSON motion graphics via @songara/pwa-base/preview/lottie — Wave 1 Preview consume.',
        explorations: [
          {
            id: 'Overview',
            capability: 'Overview',
            implementation:
              '@songara/pwa-base/preview/lottie SongaraLottie + catalogue pulse JSON',
            status: 'Ready',
            oss: 'Lottie (lottie-web / lottie-react)',
            ossUrl: 'https://github.com/airbnb/lottie-web',
            maturity: 5,
            performance: 3,
            browserSupport: 5,
            offline: 5,
            developerExperience: 4,
            visualQuality: 5,
            accessibility: 4,
            complexity: 3,
            recommended: true,
            overallScore: 8,
            notes:
              'Consumes Preview Lottie (Wave 1) — same import products use. Prefer SongaraLottie; peer lottie-react required. dotLottie deferred.',
          },
          {
            id: 'Playback',
            capability: 'Playback',
            implementation:
              '@songara/pwa-base/preview/lottie resolveLottiePlayback + Simulate freeze',
            status: 'Ready',
            oss: 'Lottie (lottie-web / lottie-react)',
            ossUrl: 'https://github.com/airbnb/lottie-web',
            maturity: 5,
            performance: 3,
            browserSupport: 5,
            offline: 5,
            developerExperience: 4,
            visualQuality: 5,
            accessibility: 4,
            complexity: 3,
            recommended: true,
            overallScore: 8,
            notes:
              'Preview consume. Drive play/stop via ref when toggling reduce — autoplay prop alone is insufficient.',
          },
          {
            id: 'Controls',
            capability: 'Controls',
            implementation:
              '@songara/pwa-base/preview/lottie imperative ref transport',
            status: 'Ready',
            oss: 'Lottie (lottie-web / lottie-react)',
            ossUrl: 'https://github.com/airbnb/lottie-web',
            maturity: 5,
            performance: 3,
            browserSupport: 5,
            offline: 5,
            developerExperience: 4,
            visualQuality: 5,
            accessibility: 4,
            complexity: 3,
            recommended: true,
            overallScore: 8,
            notes:
              'Preview consume. Product chrome owns transport; gate under reduced motion.',
          },
          {
            id: 'Segments',
            capability: 'Segments',
            implementation:
              '@songara/pwa-base/preview/lottie playSegments / initialSegment',
            status: 'Ready',
            oss: 'Lottie (lottie-web / lottie-react)',
            ossUrl: 'https://github.com/airbnb/lottie-web',
            maturity: 4,
            performance: 3,
            browserSupport: 5,
            offline: 5,
            developerExperience: 4,
            visualQuality: 5,
            accessibility: 3,
            complexity: 3,
            recommended: true,
            overallScore: 7,
            notes:
              'Preview consume. Document frame maps with Content Pack assets; freeze on segment start when reduced.',
          },
          {
            id: 'Interactivity',
            capability: 'Interactivity',
            implementation:
              '@songara/pwa-base/preview/lottie useLottie + useLottieInteractivity',
            status: 'Ready',
            oss: 'Lottie (lottie-web / lottie-react)',
            ossUrl: 'https://lottiereact.com',
            maturity: 4,
            performance: 3,
            browserSupport: 5,
            offline: 5,
            developerExperience: 3,
            visualQuality: 5,
            accessibility: 3,
            complexity: 4,
            recommended: false,
            overallScore: 6,
            notes:
              'Preview re-export. Cursor/scroll helpers for light interaction; prefer Rive for real state machines. Disable under reduced motion.',
          },
        ],
      },
      {
        id: 'Rive',
        title: 'Rive',
        oss: 'Rive',
        ossUrl: 'https://rive.app',
        description: 'Interactive state-machine graphics.',
        explorations: [
          {
            id: 'Interactive-Graphics',
            capability: 'Interactive Graphics',
            implementation:
              '@rive-app/react-canvas with CDN sample + pause on reduced motion',
            status: 'Experimental',
            oss: 'Rive (@rive-app/react-canvas)',
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
        ],
      },
      {
        id: 'GSAP',
        title: 'GSAP',
        oss: 'GSAP',
        ossUrl: 'https://gsap.com',
        description: 'Timeline-oriented animation toolkit (licence diligence required).',
        explorations: [
          {
            id: 'Timelines',
            capability: 'Timelines',
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
        ],
      },
      {
        id: 'tsParticles',
        title: 'tsParticles',
        oss: 'tsParticles',
        ossUrl: 'https://github.com/tsparticles/tsparticles',
        description: 'Particle systems for ambient atmosphere.',
        explorations: [
          {
            id: 'Ambient-Field',
            capability: 'Ambient Field',
            implementation:
              'tsparticles slim ambient field with reduced-motion pause',
            status: 'Experimental',
            oss: 'tsParticles',
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
        ],
      },
    ],
  },
  {
    id: 'physics',
    title: 'Physics',
    description:
      '2D/3D rigid-body and constraint simulation for interactive Songara experiences.',
    groups: [
      {
        id: 'Rapier',
        title: 'Rapier',
        oss: 'Rapier',
        ossUrl: 'https://rapier.rs',
        description:
          'Modern WASM physics (2D/3D). Songara default engine candidate; Preview held for Wave 1b + product commit.',
        explorations: [
          investigationStub({
            id: 'Overview-2D',
            capability: 'Overview 2D',
            oss: 'Rapier (@dimforge/rapier2d-compat)',
            ossUrl: 'https://github.com/dimforge/rapier',
          }),
          investigationStub({
            id: 'Overview-3D',
            capability: 'Overview 3D',
            oss: 'Rapier (@dimforge/rapier3d-compat)',
            ossUrl: 'https://github.com/dimforge/rapier',
          }),
          investigationStub({
            id: 'Joints',
            capability: 'Joints',
            oss: 'Rapier',
            ossUrl: 'https://rapier.rs/docs/user_guides/javascript/joints',
          }),
          investigationStub({
            id: 'Soft-Bodies',
            capability: 'Soft Bodies',
            oss: 'Rapier',
            ossUrl: 'https://rapier.rs',
          }),
          investigationStub({
            id: 'Rope',
            capability: 'Rope',
            oss: 'Rapier',
            ossUrl: 'https://rapier.rs',
          }),
          investigationStub({
            id: 'Cloth',
            capability: 'Cloth',
            oss: 'Rapier',
            ossUrl: 'https://rapier.rs',
          }),
          investigationStub({
            id: 'Vehicles',
            capability: 'Vehicles',
            oss: 'Rapier',
            ossUrl: 'https://rapier.rs',
          }),
        ],
      },
      {
        id: 'Matter.js',
        title: 'Matter.js',
        oss: 'Matter.js',
        ossUrl: 'https://brm.io/matter-js/',
        description: 'Approachable 2D rigid-body engine for the web.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'Matter.js',
            ossUrl: 'https://github.com/liabru/matter-js',
          }),
          investigationStub({
            id: 'Constraints',
            capability: 'Constraints',
            oss: 'Matter.js',
            ossUrl: 'https://brm.io/matter-js/docs/classes/Constraint.html',
          }),
        ],
      },
      {
        id: 'Planck.js',
        title: 'Planck.js',
        oss: 'Planck.js',
        ossUrl: 'https://piqnt.com/planck.js/',
        description: 'Box2D-style 2D physics for JavaScript.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'Planck.js',
            ossUrl: 'https://github.com/piqnt/planck.js',
          }),
        ],
      },
      {
        id: 'cannon-es',
        title: 'cannon-es',
        oss: 'cannon-es',
        ossUrl: 'https://github.com/pmndrs/cannon-es',
        description: 'Classic 3D rigid-body engine (ES module fork of cannon.js).',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'cannon-es',
            ossUrl: 'https://github.com/pmndrs/cannon-es',
          }),
        ],
      },
    ],
  },
  {
    id: 'camera',
    title: 'Camera',
    description:
      'Camera access, device selection, still capture, and permission UX for Songara PWAs.',
    groups: [
      {
        id: 'native',
        title: 'Native',
        oss: 'Platform MediaDevices',
        ossUrl:
          'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices',
        description:
          'Browser platform camera APIs and permission patterns — baseline before wrappers.',
        explorations: [
          investigationStub({
            id: 'GetUserMedia',
            capability: 'GetUserMedia',
            oss: 'MediaDevices API',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia',
          }),
          investigationStub({
            id: 'Device-Selection',
            capability: 'Device Selection',
            oss: 'MediaDevices.enumerateDevices',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices',
          }),
          investigationStub({
            id: 'Still-Capture',
            capability: 'Still Capture',
            oss: 'Platform canvas / ImageCapture',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture',
          }),
          investigationStub({
            id: 'Track-Constraints',
            capability: 'Track Constraints',
            oss: 'MediaTrackConstraints',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints',
          }),
          investigationStub({
            id: 'Permissions-UX',
            capability: 'Permissions UX',
            oss: 'Platform patterns',
          }),
          investigationStub({
            id: 'Secure-Context',
            capability: 'Secure Context',
            oss: 'Platform',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts',
          }),
        ],
      },
      {
        id: 'react-webcam',
        title: 'react-webcam',
        oss: 'react-webcam',
        ossUrl: 'https://github.com/mozmorris/react-webcam',
        description: 'Thin React glue around getUserMedia.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'react-webcam',
            ossUrl: 'https://github.com/mozmorris/react-webcam',
          }),
        ],
      },
    ],
  },
  {
    id: 'audio',
    title: 'Audio',
    description:
      'Playback, SFX, musical graphs, and comparison with the Songara audio kit.',
    groups: [
      {
        id: 'native',
        title: 'Native',
        oss: 'Platform audio APIs',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
        description: 'Web Audio, media element, worklets, and recording baselines.',
        explorations: [
          investigationStub({
            id: 'Web-Audio-API',
            capability: 'Web Audio API',
            oss: 'Platform AudioContext',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
          }),
          investigationStub({
            id: 'HTMLAudioElement',
            capability: 'HTMLAudioElement',
            oss: 'Platform',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement',
          }),
          investigationStub({
            id: 'AudioWorklet',
            capability: 'AudioWorklet',
            oss: 'Platform AudioWorklet',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet',
          }),
          investigationStub({
            id: 'MediaRecorder',
            capability: 'MediaRecorder',
            oss: 'MediaRecorder',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder',
          }),
        ],
      },
      {
        id: 'Tone.js',
        title: 'Tone.js',
        oss: 'Tone.js',
        ossUrl: 'https://tonejs.github.io/',
        description: 'Musical timing, synthesis, and transport for the web.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'Tone.js',
            ossUrl: 'https://github.com/Tonejs/Tone.js',
          }),
          investigationStub({
            id: 'Synthesis',
            capability: 'Synthesis',
            oss: 'Tone.js',
            ossUrl: 'https://tonejs.github.io/',
          }),
          investigationStub({
            id: 'Transport',
            capability: 'Transport',
            oss: 'Tone.js',
            ossUrl: 'https://tonejs.github.io/docs/15.0.4/classes/Transport.html',
          }),
        ],
      },
      {
        id: 'Howler.js',
        title: 'Howler.js',
        oss: 'Howler.js',
        ossUrl: 'https://howlerjs.com/',
        description: 'Simple multi-format SFX playback.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'Howler.js',
            ossUrl: 'https://github.com/goldfire/howler.js',
          }),
          investigationStub({
            id: 'Sprites',
            capability: 'Sprites',
            oss: 'Howler.js',
            ossUrl: 'https://github.com/goldfire/howler.js#documentation',
          }),
        ],
      },
      {
        id: 'Songara-Audio-Kit',
        title: 'Songara Audio Kit',
        oss: '@songara/pwa-base/audio',
        ossUrl: 'https://github.com/RSHomeServer/PWA-Base',
        description:
          'Foundation Stable audio kit — compare against Tone/Howler/platform for Songara PWAs.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: '@songara/pwa-base/audio',
          }),
          investigationStub({
            id: 'Playback-Loop',
            capability: 'Playback Loop',
            oss: '@songara/pwa-base/audio + MediaRecorder patterns',
          }),
        ],
      },
    ],
  },
  {
    id: 'offline-storage',
    title: 'Offline Storage',
    description:
      'Durable client-side data: IndexedDB ergonomics, migrations, OPFS — no sync product yet.',
    groups: [
      {
        id: 'native',
        title: 'Native',
        oss: 'Platform storage APIs',
        ossUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
        description: 'Raw IndexedDB and Origin Private File System baselines.',
        explorations: [
          investigationStub({
            id: 'IndexedDB',
            capability: 'IndexedDB',
            oss: 'Platform IndexedDB',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
          }),
          investigationStub({
            id: 'OPFS',
            capability: 'OPFS',
            oss: 'Platform OPFS',
            ossUrl:
              'https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system',
          }),
        ],
      },
      {
        id: 'idb',
        title: 'idb',
        oss: 'idb',
        ossUrl: 'https://github.com/jakearchibald/idb',
        description: 'Tiny promise wrapper around IndexedDB.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'idb',
            ossUrl: 'https://github.com/jakearchibald/idb',
          }),
        ],
      },
      {
        id: 'Dexie.js',
        title: 'Dexie.js',
        oss: 'Dexie.js',
        ossUrl: 'https://dexie.org/',
        description:
          'Ergonomic IndexedDB via `@songara/pwa-base/preview/dexie` (Wave 1 Preview).',
        explorations: [
          {
            id: 'Overview',
            capability: 'Overview',
            implementation:
              '@songara/pwa-base/preview/dexie createSongaraDb + songaraDbName notes CRUD',
            status: 'Ready',
            oss: 'Dexie.js',
            ossUrl: 'https://github.com/dexie/Dexie.js',
            maturity: 5,
            performance: 4,
            browserSupport: 5,
            offline: 5,
            developerExperience: 5,
            visualQuality: 3,
            accessibility: 4,
            complexity: 3,
            recommended: true,
            overallScore: 9,
            notes:
              'Consumes Preview Dexie (Wave 1) — same import products use. App-owned schema; no Dexie Cloud. Peer `dexie` required in the consumer.',
          },
          {
            id: 'Migrations',
            capability: 'Migrations',
            implementation:
              '@songara/pwa-base/preview/dexie sortSchemaVersions + upgrade hooks (v1→v2)',
            status: 'Ready',
            oss: 'Dexie.js',
            ossUrl: 'https://github.com/dexie/Dexie.js',
            maturity: 4,
            performance: 4,
            browserSupport: 5,
            offline: 5,
            developerExperience: 5,
            visualQuality: 3,
            accessibility: 4,
            complexity: 3,
            recommended: true,
            overallScore: 8,
            notes:
              'Preview consume. Demonstrates SongaraSchemaVersion upgrade hooks; keep product migrations forward-only.',
          },
          investigationStub({
            id: 'Live-Queries',
            capability: 'Live Queries',
            oss: 'Dexie.js',
            ossUrl: 'https://dexie.org/docs/liveQuery()',
          }),
        ],
      },
      {
        id: 'localForage',
        title: 'localForage',
        oss: 'localForage',
        ossUrl: 'https://localforage.github.io/localForage/',
        description: 'Legacy async storage wrapper — compare only.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: 'localForage',
            ossUrl: 'https://github.com/localForage/localForage',
          }),
        ],
      },
      {
        id: 'Songara-Pack-Store',
        title: 'Songara Pack Store',
        oss: '@songara/pwa-base runtime storage',
        ossUrl: 'https://github.com/RSHomeServer/PWA-Base',
        description: 'Foundation packStore contrast for content packs vs app IDB.',
        explorations: [
          investigationStub({
            id: 'Overview',
            capability: 'Overview',
            oss: '@songara/pwa-base runtime storage',
          }),
        ],
      },
    ],
  },
]

export function getArea(areaId: string): CapabilityArea | undefined {
  return capabilityAreas.find((a) => a.id === areaId)
}

export function getGroup(
  areaId: string,
  groupId: string,
): CatalogueGroup | undefined {
  return getArea(areaId)?.groups?.find((g) => g.id === groupId)
}

/** Flatten offerings for an area (grouped or flat). */
export function listExplorations(area: CapabilityArea): ExplorationEntry[] {
  if (area.groups?.length) {
    return area.groups.flatMap((group) =>
      group.explorations.map((record) => ({
        relativePath: `${group.id}/${record.id}`,
        group,
        record,
      })),
    )
  }
  return (area.explorations ?? []).map((record) => ({
    relativePath: record.id,
    record,
  }))
}

export function explorationCount(area: CapabilityArea): number {
  return listExplorations(area).length
}

/**
 * Resolve an exploration by path under the area.
 * Grouped: "Motion/Layout-Transitions". Flat: "rapier2d".
 */
export function getExploration(
  areaId: string,
  relativePath: string,
): ExplorationRecord | undefined {
  const area = getArea(areaId)
  if (!area) return undefined
  return listExplorations(area).find((e) => e.relativePath === relativePath)
    ?.record
}

export function getExplorationEntry(
  areaId: string,
  relativePath: string,
): ExplorationEntry | undefined {
  const area = getArea(areaId)
  if (!area) return undefined
  return listExplorations(area).find((e) => e.relativePath === relativePath)
}

/** Adjacent explorations in registry order within an area (for prev/next chrome). */
export function getAdjacentExplorations(
  areaId: string,
  relativePath: string,
): {
  prev: { relativePath: string; capability: string } | null
  next: { relativePath: string; capability: string } | null
} {
  const area = getArea(areaId)
  if (!area) return { prev: null, next: null }
  const entries = listExplorations(area)
  const index = entries.findIndex((e) => e.relativePath === relativePath)
  if (index < 0) return { prev: null, next: null }
  const toNav = (e: ExplorationEntry) => ({
    relativePath: e.relativePath,
    capability: e.record.capability,
  })
  return {
    prev: index > 0 ? toNav(entries[index - 1]!) : null,
    next: index < entries.length - 1 ? toNav(entries[index + 1]!) : null,
  }
}

export type CatalogueRouteKind = 'area' | 'group' | 'exploration'

export type CatalogueSiteRoute = {
  path: string
  kind: CatalogueRouteKind
  areaId: string
  groupId?: string
  /** Path under area for explorations */
  relativePath?: string
}

/** Legacy flat catalogue URLs → nested OSS/native paths. */
export const catalogueLegacyRedirects: Record<string, string> = {
  'animation/waapi': 'animation/native/Web-Animations-API',
  'animation/reduced-motion': 'animation/native/Reduced-Motion',
  'animation/motion': 'animation/Motion/Overview',
  'animation/springs': 'animation/Motion/Springs',
  'animation/layout-transitions': 'animation/Motion/Layout-Transitions',
  'animation/shared-element': 'animation/Motion/Shared-Element',
  'animation/lottie': 'animation/Lottie/Overview',
  'animation/rive': 'animation/Rive/Interactive-Graphics',
  'animation/gsap': 'animation/GSAP/Timelines',
  'animation/particles': 'animation/tsParticles/Ambient-Field',
  'physics/rapier2d': 'physics/Rapier/Overview-2D',
  'physics/rapier3d': 'physics/Rapier/Overview-3D',
  'physics/matter': 'physics/Matter.js/Overview',
  'physics/planck': 'physics/Planck.js/Overview',
  'physics/cannon-es': 'physics/cannon-es/Overview',
  'physics/constraints': 'physics/Rapier/Joints',
  'physics/soft-bodies': 'physics/Rapier/Soft-Bodies',
  'physics/rope': 'physics/Rapier/Rope',
  'physics/cloth': 'physics/Rapier/Cloth',
  'physics/vehicles': 'physics/Rapier/Vehicles',
  'camera/getusermedia': 'camera/native/GetUserMedia',
  'camera/device-selection': 'camera/native/Device-Selection',
  'camera/still-capture': 'camera/native/Still-Capture',
  'camera/constraints': 'camera/native/Track-Constraints',
  'camera/permissions-ux': 'camera/native/Permissions-UX',
  'camera/secure-context': 'camera/native/Secure-Context',
  'camera/react-webcam': 'camera/react-webcam/Overview',
  'audio/web-audio': 'audio/native/Web-Audio-API',
  'audio/media-element': 'audio/native/HTMLAudioElement',
  'audio/worklet': 'audio/native/AudioWorklet',
  'audio/recording-playback': 'audio/native/MediaRecorder',
  'audio/tone': 'audio/Tone.js/Overview',
  'audio/howler': 'audio/Howler.js/Overview',
  'audio/songara-audio-kit': 'audio/Songara-Audio-Kit/Overview',
  'offline-storage/indexeddb-raw': 'offline-storage/native/IndexedDB',
  'offline-storage/opfs': 'offline-storage/native/OPFS',
  'offline-storage/idb': 'offline-storage/idb/Overview',
  'offline-storage/dexie': 'offline-storage/Dexie.js/Overview',
  'offline-storage/migrations': 'offline-storage/Dexie.js/Migrations',
  'offline-storage/live-queries': 'offline-storage/Dexie.js/Live-Queries',
  'offline-storage/localforage': 'offline-storage/localForage/Overview',
  'offline-storage/pack-store': 'offline-storage/Songara-Pack-Store/Overview',
}

/** @deprecated Use catalogueLegacyRedirects */
export const animationLegacyRedirects = catalogueLegacyRedirects

/** All catalogue routes for SoloSiteApp (leaf routes before area summaries). */
export function catalogueSiteRoutes(): CatalogueSiteRoute[] {
  const routes: CatalogueSiteRoute[] = []
  for (const area of capabilityAreas) {
    if (area.groups?.length) {
      for (const group of area.groups) {
        for (const ex of group.explorations) {
          const relativePath = `${group.id}/${ex.id}`
          routes.push({
            path: `${area.id}/${relativePath}`,
            kind: 'exploration',
            areaId: area.id,
            groupId: group.id,
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
    } else {
      for (const ex of area.explorations ?? []) {
        routes.push({
          path: `${area.id}/${ex.id}`,
          kind: 'exploration',
          areaId: area.id,
          relativePath: ex.id,
        })
      }
    }
    routes.push({ path: area.id, kind: 'area', areaId: area.id })
  }
  return routes
}
