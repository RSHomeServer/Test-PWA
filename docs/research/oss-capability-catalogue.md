# Research Report: OSS capability catalogue for Songara PWAs

> Produced by Discovery for **informational** use. This is a long-term technology
> survey, not an implementation ticket. Package layout and promotion decisions remain
> with Architect / Maintainer under [ADR-007](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/007-pwa-base-reusable-foundation.md)
> and the [two-consumer rule](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/003-phase2-shared-packages.md)
> ([promote-to-pwa-base](https://github.com/RSHomeServer/PWA-Base/blob/main/.kandev/workflows/promote-to-pwa-base.md)).

- **Date:** 2026-08-06
- **Author:** Discovery (Test-PWA research lane)
- **Question:** Which mature, browser-first open-source projects should Songara treat as the default reference set when future PWAs need common capabilities—without inventing that infrastructure from scratch?

## Summary

Songara should maintain a **living catalogue of mature OSS** across media, ML-in-browser, graphics, offline data, PWA runtime, forms/a11y/i18n, and engineering tooling. Most capabilities belong **application-local** until two concrete apps share an unchanged API. A smaller set—service-worker / update UX patterns, IndexedDB ergonomics, headless a11y primitives, i18n formatting, testing harnesses—is **credible to wrap later** inside `@songara/pwa-base` once the two-consumer gate is met. Heavy vertical stacks (Three.js scenes, MediaPipe pipelines, map styles, rich-text schemas, game engines) should stay **app-owned**, optionally with thin Songara adapters. This report does **not** select libraries for a current app and does **not** prescribe implementation.

**How to read suitability**

| Label | Meaning |
| --- | --- |
| **Application-local** | Use inside a sibling PWA; do not promote to foundation yet |
| **Wrap in PWA-Base** | Credible shared kit/contract *after* two-consumer (or an explicit foundation milestone) |
| **Investigate further** | Promising or best-in-class, but license, telemetry, browser gaps, or product fit need a dedicated pass |

Maturity / maintenance / adoption scores are qualitative snapshots as of **2026-08** (High / Medium / Emerging). Prefer MIT or Apache-2.0. Always re-check GitHub activity and SPDX before adoption.

## Findings

1. **Browser platform APIs already cover a lot** (MediaStream, Web Audio, Web Speech, WebGPU, Cache/IndexedDB, Push). OSS value is usually ergonomics, codecs, models, and cross-browser fixes—not replacing the platform.
2. **Offline-first Songara PWAs** need a short list of durable data/sync building blocks (Dexie / RxDB / Yjs family) more than yet another UI kit.
3. **On-device vision/speech/ML** is led by MediaPipe Tasks, Transformers.js, ONNX Runtime Web, and TensorFlow.js—with model size, WASM/WebGPU fallbacks, and occasional telemetry/privacy notices as the main risks.
4. **Graphics** splits cleanly: Three.js / R3F for 3D; PixiJS / Canvas Kit / Skia for 2D; Matter.js / Rapier / cannon-es for physics; avoid embedding a full game engine in the foundation.
5. **PWA infrastructure** remains Workbox-oriented (`vite-plugin-pwa` + `workbox-window`) with **Serwist** as the active fork path if Workbox stagnates again.
6. **Foundation identity** ([VISION](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/milestones/VISION.md)): extract shared contracts/kits only when reuse is real; keep product verticals in sibling repos.

## Options considered

| Option | Pros | Cons |
| --- | --- | --- |
| A. Living OSS catalogue (this document) | Avoids reinvention; informs every future PWA | Needs periodic refresh |
| B. Pick one stack per category now | Faster short-term | Premature; violates two-consumer |
| C. Invent Songara-only kits for every capability | Full control | Costly; weaker than mature OSS |

**Direction:** Option A. No implementation from this report.

## Recommendation

Treat this catalogue as **Architect / Maintainer SoT for “what exists in the ecosystem”**. When a sibling app needs a capability, start from the **Recommended OSS** row, re-verify license and maintenance, then decide app-local vs promote. Do **not** open foundation work solely because a library is listed under “Wrap in PWA-Base”—that column means *eligible for future consideration*, not approved extraction.

**Confidence:** High that the listed projects are the right *shortlist* for Songara’s offline-first PWA scope; Medium on exact wrap timing (depends on second consumers).

**Assumption:** Songara apps remain browser/PWA-first (React + Vite family), household/self-hosted, not multi-tenant SaaS.

---

## Capability catalogue

Field abbreviations: **GH** = GitHub URL · **Suit.** = Application-local / Wrap in PWA-Base / Investigate further.

### 1. Camera & image capture

| Field | Detail |
| --- | --- |
| Capability | Camera access, still capture, device selection |
| Recommended | Browser `MediaDevices.getUserMedia` + thin app helpers; **react-webcam** for React glue |
| GH | https://github.com/mozmorris/react-webcam |
| Licence | MIT |
| Maturity / maintenance / adoption | High / Medium / High |
| Browser support | Chromium, Firefox, Safari (HTTPS / secure context; permission UX varies on iOS) |
| Strengths | Tiny; stays close to platform API |
| Weaknesses | Not a full capture pipeline (focus, torch, resolution constraints still manual) |
| Alternatives | `navigator.mediaDevices` only; Capacitor Camera (native shell) |
| Suit. | **Application-local**; platform API is enough for foundation |

### 2. Video recording

| Field | Detail |
| --- | --- |
| Capability | Record camera/screen to Blob/file |
| Recommended | **MediaRecorder** API; **RecordRTC** when needing broader codec/UX helpers |
| GH | https://github.com/muaz-khan/RecordRTC |
| Licence | MIT |
| Maturity / maintenance / adoption | High (API) / Medium (RecordRTC) / High |
| Browser support | Strong on Chromium; Safari improving; codec availability varies |
| Strengths | Native recording path; RecordRTC papers over gaps |
| Weaknesses | Codec/container fragmentation; large dependency if used wholesale |
| Alternatives | `MediaRecorder` only; ffmpeg.wasm (heavy) for remux/transcode |
| Suit. | **Application-local**; **Investigate** ffmpeg.wasm only for offline transcode apps |

### 3. Audio recording

| Field | Detail |
| --- | --- |
| Capability | Microphone capture to audio files / PCM |
| Recommended | **MediaRecorder** + Web Audio `AudioWorklet`; **extendable-media-recorder** for WAV/etc. polyfills |
| GH | https://github.com/chrisguttandin/extendable-media-recorder |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / Medium |
| Browser support | Broad; worklets need secure context |
| Strengths | Format flexibility without native apps |
| Weaknesses | iOS quirks; worklet bundling complexity |
| Alternatives | Raw MediaRecorder; RecordRTC |
| Suit. | **Application-local**; shared mic permission UX could later **Wrap** as a tiny kit |

### 4. Audio playback & music

| Field | Detail |
| --- | --- |
| Capability | Playback, scheduling, music-like graphs |
| Recommended | Web Audio API; **Tone.js** for musical timing/synthesis; **Howler.js** for simple multi-format SFX |
| GH | https://github.com/Tonejs/Tone.js · https://github.com/goldfire/howler.js |
| Licence | MIT (both) |
| Maturity / maintenance / adoption | High / Medium–High / High |
| Browser support | Excellent modern browsers; autoplay policies apply |
| Strengths | Tone = composition; Howler = pragmatic SFX |
| Weaknesses | Tone learning curve; Howler less “musical” |
| Alternatives | `HTMLAudioElement`; Pixi Sound; foundation already has a Songara audio kit path for shared graphs |
| Suit. | **Application-local** for Tone/Howler; Songara audio kit remains the foundation lane for shared engine patterns |

### 5. Speech recognition

| Field | Detail |
| --- | --- |
| Capability | Speech-to-text in browser |
| Recommended | **Web Speech API** (`SpeechRecognition`) where available; **Transformers.js** Whisper / similar for offline |
| GH | https://github.com/huggingface/transformers.js |
| Licence | Apache-2.0 (Transformers.js); Web Speech is browser-built-in |
| Maturity / maintenance / adoption | High (HF) / High / High |
| Browser support | Web Speech: Chromium-best; Safari limited; Transformers.js: WASM/WebGPU, model download size |
| Strengths | Built-in = zero model weight; Transformers.js = offline/privacy |
| Weaknesses | Cloud-backed recognition on some browsers; models are large |
| Alternatives | Vosk (WASM), Whisper.cpp WASM ports |
| Suit. | **Application-local**; offline STT stack = **Investigate further** for shared pack hosting |

### 6. Speech synthesis

| Field | Detail |
| --- | --- |
| Capability | Text-to-speech |
| Recommended | **speechSynthesis** API; **speak-tts** thin wrapper; neural TTS via Transformers.js / ONNX when quality matters |
| GH | https://github.com/tom-s/speak-tts (wrapper) · Transformers.js above |
| Licence | MIT (wrapper); Apache-2.0 (HF) |
| Maturity / maintenance / adoption | High (API) / Medium (wrappers) / High |
| Browser support | Broad; voice lists OS-dependent |
| Strengths | Instant, offline voices on device |
| Weaknesses | Quality/voice variance; neural TTS heavy |
| Alternatives | Amazon Polly etc. (not offline-first) |
| Suit. | **Application-local** |

### 7. AI inference in browser

| Field | Detail |
| --- | --- |
| Capability | Run ML models client-side |
| Recommended | **ONNX Runtime Web**; **Transformers.js**; **TensorFlow.js** |
| GH | https://github.com/microsoft/onnxruntime · https://github.com/huggingface/transformers.js · https://github.com/tensorflow/tfjs |
| Licence | MIT (ORT) · Apache-2.0 (HF, TF.js) |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | WASM everywhere; WebGPU on Chromium/Edge (expanding); WebNN experimental |
| Strengths | ORT = portable models; HF = NLP/CV pipelines; TF.js = large ecosystem |
| Weaknesses | Bundle/model size; EP differences; memory on mobile |
| Alternatives | MediaPipe Tasks (task-specific); WebLLM / MLC for LLMs |
| Suit. | **Application-local**; shared model-pack + loader contracts = **Wrap** candidate later; WebLLM = **Investigate** |

### 8. WebGPU

| Field | Detail |
| --- | --- |
| Capability | Modern GPU compute/render in browser |
| Recommended | Native **WebGPU**; **wgpu** ecosystem knowledge; **TypeGPU** / **webgpu-utils** for ergonomics |
| GH | https://github.com/gpuweb/gpuweb (spec) · https://github.com/iwoplaza/typegpu · https://github.com/greggman/webgpu-utils |
| Licence | Spec W3C; helpers typically MIT |
| Maturity / maintenance / adoption | High (Chromium) / High / Rising |
| Browser support | Chrome/Edge strong; Safari shipping progressively; Firefox behind/flags historically |
| Strengths | Future default for ML + advanced graphics |
| Weaknesses | Incomplete universal support; debugging hardness |
| Alternatives | WebGL 2 fallback |
| Suit. | **Application-local** / **Investigate** shared capability probes (foundation already has browser probes lane) |

### 9. WebGL

| Field | Detail |
| --- | --- |
| Capability | Cross-browser GPU rendering fallback |
| Recommended | **Three.js** (3D) or **regl** / raw WebGL2 for bespoke |
| GH | https://github.com/mrdoob/three.js · https://github.com/regl-project/regl |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | Universal modern browsers |
| Strengths | Ubiquitous; huge examples corpus |
| Weaknesses | Easy to build unmaintainable scenes; not a Songara “kit” by default |
| Alternatives | Babylon.js |
| Suit. | **Application-local** |

### 10. Three.js ecosystem

| Field | Detail |
| --- | --- |
| Capability | Declarative 3D in React / tooling |
| Recommended | **three**; **@react-three/fiber** + **@react-three/drei** |
| GH | https://github.com/pmndrs/react-three-fiber · https://github.com/pmndrs/drei |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | Same as WebGL/WebGPU backends used |
| Strengths | Best-in-class React 3D DX |
| Weaknesses | Bundle weight; scene code is product-specific |
| Alternatives | Threlte (Svelte); Babylon React |
| Suit. | **Application-local** |

### 11. Physics

| Field | Detail |
| --- | --- |
| Capability | 2D/3D rigid body simulation |
| Recommended | **Rapier** (`@dimforge/rapier2d` / `rapier3d` WASM); **Matter.js** (2D simple); **cannon-es** (3D classic) |
| GH | https://github.com/dimforge/rapier · https://github.com/liabru/matter-js · https://github.com/pmndrs/cannon-es |
| Licence | Apache-2.0 (Rapier) · MIT (Matter, cannon-es) |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | WASM-capable browsers |
| Strengths | Rapier = modern performance; Matter = approachable 2D |
| Weaknesses | Determinism/threading nuances; WASM size |
| Alternatives | Planck.js; Ammo.js |
| Suit. | **Application-local**; numeric helpers may stay in foundation math/physics packages—engines stay app-local |

### 12. 2D rendering

| Field | Detail |
| --- | --- |
| Capability | Fast 2D sprites/scene graphs |
| Recommended | **PixiJS**; **Konva** / **react-konva** for interactive stage editing |
| GH | https://github.com/pixijs/pixijs · https://github.com/konvajs/konva |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent |
| Strengths | Pixi = games/vis; Konva = editor UX |
| Weaknesses | Overkill for simple canvas demos |
| Alternatives | Fabric.js; raw Canvas 2D; foundation render kit for RAF/canvas setup |
| Suit. | **Application-local**; low-level canvas helpers already foundation-shaped |

### 13. Animation

| Field | Detail |
| --- | --- |
| Capability | Timeline / spring / scroll-linked motion |
| Recommended | **Motion** (formerly Framer Motion); **GSAP** (license caveat); **@theatre/core** for cinematic timelines |
| GH | https://github.com/motiondivision/motion · https://github.com/greensock/GSAP · https://github.com/theatre-js/theatre |
| Licence | MIT (Motion, Theatre) · **GSAP: proprietary standard license** (free for most end products; check terms) |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | Excellent |
| Strengths | Motion = React-native feel; GSAP = industry timelines |
| Weaknesses | GSAP licensing must be reviewed for Songara; don’t silently vendor |
| Alternatives | Anime.js; Popmotion; WAAPI |
| Suit. | **Application-local**; reduced-motion hooks fit **Wrap** (foundation already values this) |

### 14. Particle systems

| Field | Detail |
| --- | --- |
| Capability | GPU/CPU particles for ambience or labs |
| Recommended | Three.js examples / **tsparticles**; app-specific WebGL |
| GH | https://github.com/tsparticles/tsparticles |
| Licence | MIT |
| Maturity / maintenance / adoption | High / Medium–High / High |
| Browser support | Excellent |
| Strengths | Declarative configs; many presets |
| Weaknesses | Easy visual noise; perf on low-end mobiles |
| Alternatives | Custom shaders; foundation ParticleField-style kits for simple cases |
| Suit. | **Application-local** |

### 15. Charts

| Field | Detail |
| --- | --- |
| Capability | Statistical / dashboard charts |
| Recommended | **Apache ECharts**; **Visx** (low-level React+D3); **Chart.js** for simple cases |
| GH | https://github.com/apache/echarts · https://github.com/airbnb/visx · https://github.com/chartjs/Chart.js |
| Licence | Apache-2.0 (ECharts) · MIT (Visx, Chart.js) |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | Excellent |
| Strengths | ECharts = rich; Visx = design-system friendly |
| Weaknesses | No single API fits all Songara apps (ADR-003 historically kept charting app-local) |
| Alternatives | Recharts; Nivo; Plotly.js (heavier) |
| Suit. | **Application-local** until two apps share one chart contract |

### 16. Graph visualisation

| Field | Detail |
| --- | --- |
| Capability | Node-link diagrams |
| Recommended | **Cytoscape.js**; **@xyflow/react** (React Flow) for editor-style graphs |
| GH | https://github.com/cytoscape/cytoscape.js · https://github.com/xyflow/xyflow |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent |
| Strengths | Cytoscape = analysis; XYFlow = product UX |
| Weaknesses | Large graphs need virtualisation/WebGL strategies |
| Alternatives | Sigma.js; G6 |
| Suit. | **Application-local** |

### 17. Timelines

| Field | Detail |
| --- | --- |
| Capability | Editorial / media / history timelines |
| Recommended | **vis-timeline**; **Theatre.js** (animation); CSS Grid custom |
| GH | https://github.com/visjs/vis-timeline |
| Licence | Apache-2.0 / MIT (vis ecosystem—verify package SPDX) |
| Maturity / maintenance / adoption | High / Medium / Medium–High |
| Browser support | Excellent |
| Strengths | Interaction patterns solved |
| Weaknesses | Styling to Songara tokens takes work |
| Alternatives | Custom; FullCalendar (scheduling, not narrative) |
| Suit. | **Application-local** |

### 18. Maps & geospatial

| Field | Detail |
| --- | --- |
| Capability | Interactive maps, vector tiles, geo compute |
| Recommended | **MapLibre GL JS**; **Turf.js** for geo algorithms; **Protomaps** / PMTiles for offline tiles |
| GH | https://github.com/maplibre/maplibre-gl-js · https://github.com/Turfjs/turf · https://github.com/protomaps/PMTiles |
| Licence | BSD-3 (MapLibre) · MIT (Turf, PMTiles) |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent; WebGL required for MapLibre |
| Strengths | MapLibre = Mapbox GL OSS fork; PMTiles = offline-friendly |
| Weaknesses | Tile hosting/licensing separate from library; style complexity |
| Alternatives | Leaflet; OpenLayers; deck.gl |
| Suit. | **Application-local**; offline tile pack conventions = **Investigate** / possible later **Wrap** |

### 19. Markdown

| Field | Detail |
| --- | --- |
| Capability | Render GFM Markdown safely |
| Recommended | **react-markdown** + **remark-gfm** + **rehype-sanitize** / highlight stack |
| GH | https://github.com/remarkjs/react-markdown · https://github.com/remarkjs/remark-gfm |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | N/A (JS) |
| Strengths | Composable unified ecosystem |
| Weaknesses | XSS if rehype-sanitize omitted |
| Alternatives | marked; markdown-it |
| Suit. | **Wrap in PWA-Base** (already aligns with foundation markdown kit direction) |

### 20. Rich text editing

| Field | Detail |
| --- | --- |
| Capability | Collaborative or structured rich text |
| Recommended | **TipTap** (ProseMirror); **Lexical** (Meta); **Plate** (Slate-based) |
| GH | https://github.com/ueberdosis/tiptap · https://github.com/facebook/lexical · https://github.com/udecode/plate |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent |
| Strengths | TipTap DX; Lexical performance/extensibility |
| Weaknesses | Schema lock-in; collaboration needs Yjs layer |
| Alternatives | Slate; Quill; ProseMirror raw |
| Suit. | **Application-local**; shared editor theme/a11y shell = **Investigate** only |

### 21. Whiteboards / canvas editing / drawing

| Field | Detail |
| --- | --- |
| Capability | Infinite canvas, shapes, freehand |
| Recommended | **tldraw** (productized); **Excalidraw** (OSS); **Fabric.js**; **rough.js** for sketch style |
| GH | https://github.com/tldraw/tldraw · https://github.com/excalidraw/excalidraw · https://github.com/fabricjs/fabric.js · https://github.com/rough-stuff/rough |
| Licence | **tldraw: functional source available—verify current license for redistribution**; Excalidraw MIT; Fabric MIT; Rough MIT |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent |
| Strengths | Excalidraw/tldraw = complete UX |
| Weaknesses | License diligence critical for tldraw; heavy bundles |
| Alternatives | Perfect Freehand; custom Konva |
| Suit. | **Application-local**; **Investigate** tldraw license before any wrap |

### 22. OCR

| Field | Detail |
| --- | --- |
| Capability | Optical character recognition in browser |
| Recommended | **Tesseract.js** |
| GH | https://github.com/naptha/tesseract.js |
| Licence | Apache-2.0 |
| Maturity / maintenance / adoption | High / Medium–High / High |
| Browser support | WASM; workers recommended |
| Strengths | Proven; multi-language traineddata |
| Weaknesses | Accuracy/speed vs native; model download |
| Alternatives | MediaPipe / custom ORT models; cloud OCR (not offline-first) |
| Suit. | **Application-local** |

### 23. QR codes & barcode scanning

| Field | Detail |
| --- | --- |
| Capability | Generate/scan 1D/2D codes |
| Recommended | **html5-qrcode**; **@zxing/library**; **qrcode** (generate) |
| GH | https://github.com/mebjas/html5-qrcode · https://github.com/zxing-js/library · https://github.com/soldair/node-qrcode |
| Licence | Apache-2.0 (html5-qrcode, ZXing) · MIT (qrcode) |
| Maturity / maintenance / adoption | High / Medium–High / High |
| Browser support | Camera + BarcodeDetector where available |
| Strengths | Works without native apps |
| Weaknesses | Lighting/performance sensitive |
| Alternatives | Native `BarcodeDetector` API |
| Suit. | **Application-local** |

### 24. Computer vision, face / hand / pose / gesture

| Field | Detail |
| --- | --- |
| Capability | Landmarks, pose, hands, face mesh, gesture |
| Recommended | **MediaPipe Tasks** (`@mediapipe/tasks-vision`) |
| GH | https://github.com/google-ai-edge/mediapipe |
| Licence | Apache-2.0 (code); check model asset terms; note **privacy/metrics notices** on Tasks |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | WASM; WebGPU paths evolving |
| Strengths | Best-in-class task APIs; strong docs |
| Weaknesses | Telemetry/consent obligations may apply; model hosting; binary size |
| Alternatives | TensorFlow.js models; Transformers.js vision; OpenCV.js (heavy) |
| Suit. | **Application-local**; shared vision bootstrap = **Investigate further** (privacy) |

### 25. Webcam effects

| Field | Detail |
| --- | --- |
| Capability | Background blur/replace, filters |
| Recommended | MediaPipe selfie segmentation + Canvas/WebGL composite; **BodyPix** (TF.js, older) |
| GH | MediaPipe above · https://github.com/tensorflow/tfjs-models |
| Licence | Apache-2.0 |
| Maturity / maintenance / adoption | High / Medium / High |
| Browser support | Needs decent GPU; mobile thermal limits |
| Strengths | Achievable fully on-device |
| Weaknesses | Perf tuning is product work |
| Alternatives | Native platform effects (not web-portable) |
| Suit. | **Application-local** |

### 26. File handling & drag-and-drop

| Field | Detail |
| --- | --- |
| Capability | Pickers, DnD, directory access |
| Recommended | Platform File/Drag APIs; **react-dropzone**; **browser-fs-access** |
| GH | https://github.com/react-dropzone/react-dropzone · https://github.com/GoogleChromeLabs/browser-fs-access |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Strong; FS Access API Chromium-led |
| Strengths | Excellent UX primitives |
| Weaknesses | Safari FS Access gaps |
| Alternatives | `showOpenFilePicker` direct |
| Suit. | **Application-local**; shared dropzone styled to tokens = later **Wrap** candidate |

### 27. Offline storage, IndexedDB, local databases, sync

| Field | Detail |
| --- | --- |
| Capability | Durable client data + optional sync |
| Recommended | **Dexie.js** (IDB ergonomics); **RxDB** (reactive local-first); **Yjs** (+ providers) for CRDT collab; **ElectricSQL** / **PowerSync** for Postgres-shaped sync (**Investigate**) |
| GH | https://github.com/dexie/Dexie.js · https://github.com/pubkey/rxdb · https://github.com/yjs/yjs · https://github.com/electric-sql/electric |
| Licence | Apache-2.0 (Dexie, RxDB) · MIT (Yjs) · verify Electric |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | IndexedDB universal; OPFS rising |
| Strengths | Dexie = pragmatic; RxDB = sync plugins; Yjs = collab standard |
| Weaknesses | Sync product/licensing tiers (Dexie Cloud, RxDB premium plugins)—keep core OSS clear |
| Alternatives | localForage; idb; PouchDB (maintenance caution) |
| Suit. | Dexie/idb helpers **Wrap** candidates; RxDB/Yjs/Electric **Application-local** or **Investigate** |

### 28. Authentication

| Field | Detail |
| --- | --- |
| Capability | OIDC/OAuth SPA login |
| Recommended | **oidc-client-ts**; **openid-client** patterns; IdP-specific SDKs only when required |
| GH | https://github.com/authts/oidc-client-ts |
| Licence | Apache-2.0 |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent (SPA redirect/PKCE) |
| Strengths | Standards-based; works with Keycloak/Authelia/etc. |
| Weaknesses | Token storage XSS surface—architecture sensitive |
| Alternatives | Auth.js (broader); proprietary IdP SDKs |
| Suit. | **Application-local**; shared PKCE helper = **Investigate** / eventual **Wrap** |

### 29. Cryptography

| Field | Detail |
| --- | --- |
| Capability | Hashing, encryption, JWTs client-side |
| Recommended | **Web Crypto API**; **jose** for JWT/JWE; **libsodium-wrappers** when needed |
| GH | https://github.com/panva/jose · https://github.com/jedisct1/libsodium.js |
| Licence | MIT (jose) · ISC-like (libsodium wrappers—verify) |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Web Crypto excellent on modern browsers |
| Strengths | Prefer platform crypto; jose is TS-first |
| Weaknesses | Key management is the hard part—not the library |
| Alternatives | tweetnacl; Noble curves |
| Suit. | **Application-local**; never invent crypto in foundation |

### 30. Payments

| Field | Detail |
| --- | --- |
| Capability | Checkout / Payment Request |
| Recommended | **Payment Request API** where merchants apply; Stripe.js etc. as vendor SDKs |
| GH | W3C Payment Request; vendor repos |
| Licence | Vendor terms |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Uneven internationally |
| Strengths | Native sheet UX where supported |
| Weaknesses | Not core to household offline PWAs; compliance burden |
| Alternatives | Server-only checkout |
| Suit. | **Application-local** / usually **out of Songara foundation scope** |

### 31. Notifications & background sync

| Field | Detail |
| --- | --- |
| Capability | Web Push, background sync/periodic sync |
| Recommended | Browser Push + service worker; **web-push** on server; Background Sync / Periodic Background Sync where available |
| GH | https://github.com/web-push-libs/web-push |
| Licence | MIT |
| Maturity / maintenance / adoption | High / Medium (browser APIs) / High |
| Browser support | Push strong on Android/desktop; iOS limited historically; Background Sync Chromium-centric |
| Strengths | Real engagement when permitted |
| Weaknesses | Permission fatigue; iOS constraints; foundation docs already treat push as non-goal historically—revisit per product |
| Alternatives | Email/Telegram bridges |
| Suit. | **Application-local**; SW integration patterns **Wrap**-adjacent with PWA runtime |

### 32. Service workers / PWA tooling

| Field | Detail |
| --- | --- |
| Capability | Precache, runtime caching, update UX, manifests |
| Recommended | **vite-plugin-pwa** + **workbox-window**; watch **Serwist** / `@serwist/vite` as Workbox fork path; **@vite-pwa/assets-generator** for icons |
| GH | https://github.com/vite-pwa/vite-plugin-pwa · https://github.com/GoogleChrome/workbox · https://github.com/serwist/serwist · https://github.com/vite-pwa/assets-generator |
| Licence | MIT |
| Maturity / maintenance / adoption | High / Medium (Workbox) · High (Serwist) / Very high |
| Browser support | SW universal on modern browsers (HTTPS) |
| Strengths | De-facto Vite PWA stack; Serwist actively maintained |
| Weaknesses | Workbox upstream velocity risk; Serwist migration cost |
| Alternatives | Custom SW; Workbox without Vite plugin |
| Suit. | **Wrap in PWA-Base** (presets/helpers + update UX)—strongest shared infrastructure candidate |

### 33. Forms

| Field | Detail |
| --- | --- |
| Capability | Form state, validation |
| Recommended | **React Hook Form** + **Zod** (+ `@hookform/resolvers`) |
| GH | https://github.com/react-hook-form/react-hook-form · https://github.com/colinhacks/zod |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | N/A |
| Strengths | Perf + schema-first TS |
| Weaknesses | Validation UX still app-specific |
| Alternatives | Conform; Formik; Valibot |
| Suit. | **Application-local**; token-styled fields already foundation-shaped—not the form engine |

### 34. Accessibility

| Field | Detail |
| --- | --- |
| Capability | Accessible headless primitives & testing |
| Recommended | **React Aria Components** / **react-aria**; **Radix Primitives**; **Base UI**; testing with **axe-core** |
| GH | https://github.com/adobe/react-spectrum · https://github.com/radix-ui/primitives · https://github.com/mui/base-ui · https://github.com/dequelabs/axe-core |
| Licence | Apache-2.0 (React Aria) · MIT (Radix, Base UI) · MPL-2.0 (axe-core) |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | Excellent |
| Strengths | Don’t hand-roll focus traps/menus |
| Weaknesses | Pick one headless family before wrapping; axe is MPL (OK for tooling) |
| Alternatives | Headless UI; Ark UI |
| Suit. | Headless wrappers **Wrap** when promoting overlays; axe in CI **Wrap**/tooling |

### 35. Internationalisation

| Field | Detail |
| --- | --- |
| Capability | Message catalogs, locale formatting |
| Recommended | **FormatJS** (`react-intl`) or **i18next** + **react-i18next**; **Temporal** polyfill / `@js-temporal/polyfill` for dates |
| GH | https://github.com/formatjs/formatjs · https://github.com/i18next/i18next · https://github.com/js-temporal/temporal-polyfill |
| Licence | MIT / BSD-ish (verify package) |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | `Intl.*` excellent; Temporal still polyfill-led |
| Strengths | Mature message workflows |
| Weaknesses | Process/content ops dominate over library choice |
| Alternatives | Lingui |
| Suit. | **Application-local** catalogs; shared `Intl` helpers **Wrap** candidate |

### 36. Keyboard shortcuts

| Field | Detail |
| --- | --- |
| Capability | App hotkeys with sequences |
| Recommended | **hotkeys-js** or **react-hotkeys-hook**; respect accessibility (no hijacking inputs) |
| GH | https://github.com/jaywcjlove/hotkeys-js · https://github.com/JohannesKlauss/react-hotkeys-hook |
| Licence | MIT |
| Maturity / maintenance / adoption | High / Medium–High / High |
| Browser support | Excellent |
| Strengths | Small; well understood |
| Weaknesses | Conflicts with AT / browser shortcuts |
| Alternatives | Mousetrap (older) |
| Suit. | **Application-local** |

### 37. Game engines

| Field | Detail |
| --- | --- |
| Capability | Full games in browser |
| Recommended | **Phaser**; **PlayCanvas**; **Babylon.js** (also engine-like) |
| GH | https://github.com/phaserjs/phaser · https://github.com/playcanvas/engine · https://github.com/BabylonJS/Babylon.js |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent |
| Strengths | Complete loops (assets, scenes, input) |
| Weaknesses | Wrong abstraction for most Songara utility PWAs |
| Alternatives | Custom Pixi + Rapier |
| Suit. | **Application-local** only |

### 38. UI primitives & icons

| Field | Detail |
| --- | --- |
| Capability | Design-system primitives / icon sets |
| Recommended | Headless: Radix / React Aria / Base UI (see §34); Icons: **Lucide**, **Phosphor**, **Heroicons** |
| GH | https://github.com/lucide-icons/lucide · https://github.com/phosphor-icons/homepage · https://github.com/tailwindlabs/heroicons |
| Licence | ISC/MIT (Lucide) · MIT (Phosphor, Heroicons) |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | SVG |
| Strengths | Consistent stroke icons |
| Weaknesses | Icon set is brand-sensitive—apps differ |
| Alternatives | Feather; Tabler |
| Suit. | Icons **Application-local**; primitives **Wrap** when shared overlays ship |

### 39. Motion libraries

Covered under **Animation (§13)**. Prefer **Motion** (MIT) for React PWAs; treat GSAP as license-reviewed exception.

### 40. Virtualisation

| Field | Detail |
| --- | --- |
| Capability | Large lists/grids |
| Recommended | **@tanstack/react-virtual**; **react-window** |
| GH | https://github.com/TanStack/virtual · https://github.com/bvaughn/react-window |
| Licence | MIT |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent |
| Strengths | Essential for big offline datasets |
| Weaknesses | Sticky headers / dynamic rows still tricky |
| Alternatives | react-virtuoso |
| Suit. | **Application-local**; **Wrap** if multiple apps share identical list chrome |

### 41. Performance tooling

| Field | Detail |
| --- | --- |
| Capability | Runtime perf measurement |
| Recommended | Browser Performance panel; **web-vitals**; Vite bundle analysis |
| GH | https://github.com/GoogleChrome/web-vitals |
| Licence | Apache-2.0 |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Chromium-best metrics |
| Strengths | Core Web Vitals alignment |
| Weaknesses | Observability backend is separate |
| Alternatives | why-did-you-render (dev) |
| Suit. | **Application-local** / engineering practice |

### 42. Testing

| Field | Detail |
| --- | --- |
| Capability | Unit, component, e2e, a11y |
| Recommended | **Vitest**; **Testing Library**; **Playwright**; **axe** integrations |
| GH | https://github.com/vitest-dev/vitest · https://github.com/testing-library/react-testing-library · https://github.com/microsoft/playwright · axe-core above |
| Licence | MIT (Vitest, TL, Playwright) · MPL-2.0 (axe) |
| Maturity / maintenance / adoption | High / High / Very high |
| Browser support | Playwright multi-browser |
| Strengths | Matches Vite/React Songara stack |
| Weaknesses | Visual regression SaaS (Chromatic) is optional/paid |
| Alternatives | Jest; Cypress |
| Suit. | Shared configs/helpers **Wrap**; specs stay per repo |

### 43. Observability

| Field | Detail |
| --- | --- |
| Capability | Client error/trace reporting |
| Recommended | **OpenTelemetry JS**; self-hosted or vendor exporters; avoid baking Telemetry product into PWA-Base |
| GH | https://github.com/open-telemetry/opentelemetry-js |
| Licence | Apache-2.0 |
| Maturity / maintenance / adoption | High / High / High |
| Browser support | Excellent |
| Strengths | Vendor-neutral |
| Weaknesses | Collector ops; privacy |
| Alternatives | Sentry SDK (product terms) |
| Suit. | **Application-local**; foundation explicitly **not** a Telemetry host |

---

## Additional categories for premium offline-first PWAs

| Capability | Recommended | GH | Licence | Suit. | Notes |
| --- | --- | --- | --- | --- | --- |
| CRDT collaboration | Yjs + y-webrtc / y-indexeddb | https://github.com/yjs/yjs | MIT | App-local / Investigate shared provider helpers | Pairs with TipTap/Excalidraw |
| SQLite in browser | wa-sqlite / sql.js / pg-wasm experiments | https://github.com/rhashimoto/wa-sqlite | MIT-ish—verify | Investigate | OPFS + SQLite rising pattern |
| Content-addressed packs | Songara Content Packs + hash verify | PWA-Base docs | — | Wrap (already foundation) | Prefer extending packs over new OSS |
| PDF read/render | pdf.js | https://github.com/mozilla/pdf.js | Apache-2.0 | App-local | Large but standard |
| ZIP / archives | fflate | https://github.com/101arrowz/fflate | MIT | App-local / Wrap small helper | Fast, TS-friendly |
| Color / theming science | culori | https://github.com/Evercoder/culori | MIT | Investigate | Token pipelines |
| Schema / protocol | Zod already; TypeBox; protobuf-ts | various | MIT/Apache | App-local | |
| Feature flags | Unleash proxy / simple JSON flags | — | — | App-local | Keep offline-safe |
| WebXR | three.js XR / Babylon XR | engine repos | MIT | App-local | Niche until second consumer |
| MIDI / creative audio | Web MIDI + Tone.js | — | — | App-local | |
| Print / paginated docs | Paginated CSS; react-pdf | https://github.com/diegomura/react-pdf | MIT | App-local | |

---

## Cross-cutting evaluation notes

1. **Permissive licence first.** Prefer MIT / Apache-2.0 / BSD. Flag GSAP and tldraw for legal review before any shared use.
2. **MediaPipe Tasks privacy notices** and future metrics require product/legal review for household apps.
3. **Model and tile assets** are often separate from library licenses—budget for redistribution and offline hosting (Content Packs).
4. **Two-consumer rule** still gates PWA-Base wraps. Catalogue eligibility ≠ promotion approval.
5. **Refresh cadence:** re-score maintenance annually or when a PWA adopts a category.

## Follow-ups

- Architect may cite this catalogue when drafting ADRs/LDRs for shared kits; **no Executor work** is implied by this report alone.
- Optional future Discovery refresh: Serwist vs Workbox; Dexie vs RxDB for Songara sync story; MediaPipe telemetry posture.
- If a specific capability must become a scoped implementation ticket, open a discovery-ticket then—not from this catalogue by default.

_No implementation is expected from this research report._
