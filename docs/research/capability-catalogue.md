# Songara Capability Catalogue

> **Authoritative engineering catalogue** for Songara. Capabilities first; libraries are
> evidence. This document inspires future offline-first PWAs and informs later design —
> it is **not** a dependency selection list and **not** a PWA-Base promotion plan.
>
> Prior library-oriented survey (historical companion):
> [`oss-capability-catalogue.md`](./oss-capability-catalogue.md).

| | |
| --- | --- |
| **Date** | 2026-08-07 |
| **Status** | Living SoT — update in place on every discovery pass |
| **Question** | Which mature browser-first capabilities should Songara know about so future PWAs maximise OSS leverage and minimise reinvention? |
| **Placement legend** | **Application-local** · **Potential shared infra** (only after multiple real products prove the same need) · **Never likely shared infra** |

## Philosophy

1. Research **capabilities** first (“Offline Storage”), then survey implementations.
2. Ask: *What premium offline-first PWAs become possible because this exists?*
3. Hello, Test-PWA, and demos are **examples only** — never product consumers for shared-infra justification.
4. Most capabilities stay application-local forever. Shared infrastructure is rare and must be
   proven across multiple real Songara products — do not recommend promotion from this catalogue alone.
5. Prefer MIT / Apache-2.0 / BSD; flag licence exceptions (GSAP, tldraw, MediaPipe notices).

## Evaluation framework

Score each axis **1–10** (higher is better). For **Implementation Complexity** and
**Maintenance Burden**, higher means *easier to integrate* / *lower ongoing cost*.

| Axis | Weight | Meaning |
| --- | ---: | --- |
| Product Potential | ×3 | How many compelling future Songara PWAs could this unlock? |
| User Value | ×3 | Impact / differentiation for end users |
| Reuse Potential | ×3 | Likelihood across many different PWAs |
| Strategic Differentiation | ×2 | Enables products that stand out |
| Offline Suitability | ×2 | Fit for offline-first household PWAs |
| OSS Maturity | ×2 | Battle-tested ecosystem |
| Browser Support | ×2 | Modern browser coverage |
| PWA-Base Suitability | ×2 | *If* many products needed it, fitness for shared infra |
| Longevity | ×2 | Relevance over 5–10 years |
| Implementation Complexity | ×1 | Ease of a good integration |
| Maintenance Burden | ×1 | Ongoing cost (higher = lighter) |

**Max weighted score = 230.** Scores are engineering judgment snapshots as of **2026-08**;
re-score when deep-diving a capability.

---

## Master capability catalogue

| Capability | Description | Example Product Ideas | Leading OSS | Product Potential | User Value | OSS Maturity | Browser Support | Offline Suitability | Implementation Complexity | Maintenance Burden | Reuse Potential | PWA-Base Suitability | Strategic Differentiation | Longevity | Weighted Score | Research Status | Notes |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| Offline Storage | Durable client-side data (IndexedDB and related) | Household journals; inventory; offline forms | Dexie.js; RxDB; idb | 10 | 9 | 9 | 10 | 10 | 7 | 7 | 10 | 8 | 8 | 10 | **211** | researched | Potential shared infra (after multi-product proof) |
| Offline-first PWA Runtime | Service workers, precache, update UX, manifests | Any installable Songara PWA | vite-plugin-pwa; Workbox; Serwist | 10 | 9 | 9 | 10 | 10 | 6 | 6 | 10 | 9 | 7 | 10 | **209** | researched | Potential shared infra (after multi-product proof) |
| Accessibility Primitives | Headless accessible UI building blocks and a11y testing | All consumer-facing PWAs | React Aria; Radix; Base UI; axe-core | 9 | 9 | 10 | 10 | 10 | 6 | 6 | 9 | 8 | 6 | 10 | **201** | researched | Potential shared infra (after multi-product proof) |
| Content Packs & Asset Verification | Versioned offline asset packs with integrity checks | Model packs; media kits; offline curricula | Songara Content Packs (ADR-005) | 9 | 8 | 8 | 10 | 10 | 6 | 6 | 9 | 9 | 8 | 10 | **200** | researched | Potential shared infra (after multi-product proof) |
| On-device AI Inference | Run ML models fully in the browser | Private classifiers; home vision; voice assistants | ONNX Runtime Web; Transformers.js; TF.js | 10 | 9 | 9 | 8 | 9 | 4 | 4 | 8 | 4 | 10 | 9 | **187** | researched | Application-local |
| Icons & UI Primitives | Design-system primitives and icon sets | Consistent Songara app chrome | Lucide; Phosphor; React Aria/Radix | 8 | 7 | 10 | 10 | 10 | 7 | 7 | 9 | 7 | 3 | 10 | **186** | researched | Potential shared infra (after multi-product proof) |
| Sync & Collaboration | Multi-device sync and CRDT collaboration | Shared household boards; multi-device notes | Yjs; RxDB; ElectricSQL; PowerSync | 9 | 9 | 8 | 9 | 9 | 4 | 4 | 8 | 5 | 9 | 9 | **184** | researched | Application-local |
| Animation & Motion | Timeline, spring, and reduced-motion aware animation | Premium feel across product UIs | Motion; WAAPI; Theatre.js | 8 | 8 | 10 | 10 | 9 | 7 | 7 | 8 | 6 | 5 | 9 | **184** | researched | Potential shared infra (after multi-product proof) |
| Forms & Validation | Form state and schema validation | Settings; wizards; data entry apps | React Hook Form; Zod | 8 | 7 | 10 | 10 | 10 | 8 | 8 | 9 | 5 | 3 | 10 | **184** | researched | Application-local |
| Internationalisation | Message catalogs and locale formatting | Multi-locale household apps | FormatJS; i18next; Temporal polyfill | 8 | 8 | 10 | 10 | 10 | 6 | 6 | 8 | 6 | 4 | 10 | **184** | researched | Potential shared infra (after multi-product proof) |
| Markdown Rendering | Safe GFM Markdown rendering | Help; docs; content viewers | react-markdown; remark-gfm; rehype-sanitize | 7 | 6 | 10 | 10 | 10 | 8 | 8 | 8 | 8 | 3 | 10 | **181** | researched | Potential shared infra (after multi-product proof) |
| Audio Playback & Music | Playback, scheduling, synthesis graphs | Practice tools; ambient rooms; SFX | Web Audio; Tone.js; Howler.js | 8 | 8 | 9 | 10 | 9 | 6 | 7 | 7 | 5 | 7 | 9 | **180** | researched | Potential shared infra (after multi-product proof) |
| List/Grid Virtualisation | Efficient large lists and grids | Large offline libraries and logs | TanStack Virtual; react-window | 7 | 7 | 9 | 10 | 10 | 7 | 8 | 8 | 5 | 4 | 10 | **177** | researched | Potential shared infra (after multi-product proof) |
| Testing Harness | Unit, component, e2e, a11y test tooling | All Songara engineering repos | Vitest; Testing Library; Playwright; axe | 7 | 5 | 10 | 10 | 10 | 7 | 7 | 9 | 8 | 2 | 10 | **177** | researched | Potential shared infra (after multi-product proof) |
| File System Access & DnD | Pickers, drag-drop, directory access | Media importers; lab tools | browser-fs-access; react-dropzone | 8 | 8 | 9 | 7 | 8 | 7 | 8 | 8 | 5 | 6 | 9 | **175** | researched | Application-local |
| Camera & Image Capture | Camera access and still capture | Photo logs; document capture | MediaDevices; react-webcam | 8 | 8 | 9 | 8 | 9 | 7 | 8 | 7 | 3 | 7 | 9 | **174** | researched | Application-local |
| Audio Capture (Microphone) | Mic capture to files/PCM | Voice notes; music practice | MediaRecorder; extendable-media-recorder | 8 | 8 | 9 | 8 | 9 | 6 | 7 | 7 | 4 | 7 | 9 | **174** | researched | Application-local |
| Speech Synthesis | Text-to-speech | Read-aloud; accessibility aids | speechSynthesis; speak-tts | 8 | 8 | 8 | 9 | 9 | 7 | 7 | 7 | 3 | 7 | 9 | **173** | researched | Application-local |
| Canvas & SVG Foundations | Low-level 2D drawing loops and SVG | Custom visualisations; labs | Canvas 2D; SVG; Songara render kit | 7 | 6 | 9 | 10 | 10 | 7 | 8 | 7 | 6 | 4 | 10 | **173** | researched | Potential shared infra (after multi-product proof) |
| Speech Recognition | Speech-to-text in browser | Hands-free control; dictation | Web Speech; Transformers.js Whisper | 9 | 9 | 8 | 6 | 8 | 5 | 5 | 7 | 3 | 9 | 9 | **171** | researched | Application-local |
| Client Encryption & Crypto | Hashing, encryption, JWT helpers client-side | Private vaults; sealed notes | Web Crypto; jose; libsodium-wrappers | 7 | 8 | 9 | 10 | 9 | 4 | 5 | 6 | 3 | 8 | 10 | **170** | researched | Never likely shared infra |
| Computer Vision (pose/hands/face/gesture) | Landmarks, pose, hands, face, gesture | Fitness; gesture control; mirrors | MediaPipe Tasks | 9 | 9 | 9 | 8 | 8 | 4 | 4 | 6 | 2 | 10 | 8 | **170** | researched | Application-local |
| Embeddings & Semantic Search | Local embeddings for search/similarity | Offline knowledge bases | Transformers.js; ORT embedding models | 8 | 8 | 8 | 8 | 9 | 5 | 5 | 7 | 3 | 8 | 9 | **169** | partial | Application-local |
| WebGPU Compute & Render | Modern GPU compute and render | Fast ML; advanced graphics | WebGPU; TypeGPU; webgpu-utils | 9 | 8 | 7 | 7 | 9 | 3 | 4 | 7 | 3 | 9 | 10 | **169** | partial | Application-local |
| Offline Maps & Tile Packs | Offline vector/raster tile packaging | Trail maps; site plans without network | PMTiles; Protomaps; MapLibre | 8 | 8 | 8 | 8 | 10 | 4 | 4 | 5 | 4 | 9 | 9 | **167** | partial | Potential shared infra (after multi-product proof) |
| Touch & Gesture UX | Touch targets, gestures, mobile interaction | Tablet-first household apps | Pointer Events; Hammer-like libs sparingly | 7 | 8 | 8 | 9 | 10 | 5 | 6 | 7 | 4 | 5 | 9 | **167** | researched | Application-local |
| WebGL Rendering | Cross-browser GPU rendering fallback | Fallback GPU visuals | Three.js; regl; raw WebGL2 | 8 | 7 | 10 | 10 | 9 | 5 | 6 | 6 | 2 | 6 | 8 | **164** | researched | Application-local |
| Authentication (OIDC/SPA) | OIDC/OAuth SPA login patterns | Self-hosted account gates | oidc-client-ts | 8 | 8 | 9 | 10 | 5 | 5 | 5 | 7 | 4 | 5 | 9 | **163** | researched | Application-local |
| 3D Scenes (Three.js ecosystem) | Declarative/imperative 3D scenes | Spatial demos; product visualisers | three; R3F; drei | 8 | 8 | 10 | 10 | 8 | 4 | 4 | 5 | 1 | 8 | 9 | **163** | researched | Never likely shared infra |
| Barcode & QR Scanning | Generate and scan 1D/2D codes | Inventory; pairing; tickets | html5-qrcode; ZXing; qrcode | 7 | 7 | 9 | 9 | 9 | 8 | 8 | 6 | 2 | 5 | 9 | **162** | researched | Application-local |
| On-device LLM Inference | Local large language models in browser | Private chat; local copilots | WebLLM; MLC; Transformers.js | 9 | 9 | 7 | 7 | 8 | 2 | 3 | 6 | 2 | 10 | 8 | **161** | partial | Application-local |
| OCR | Optical character recognition in browser | Scan-to-text household docs | Tesseract.js | 7 | 8 | 8 | 9 | 9 | 6 | 6 | 6 | 2 | 7 | 8 | **161** | researched | Application-local |
| Keyboard Shortcuts | App hotkeys and sequences | Power-user desktop PWAs | react-hotkeys-hook; hotkeys-js | 6 | 6 | 9 | 10 | 10 | 8 | 8 | 7 | 3 | 3 | 9 | **161** | researched | Application-local |
| Rich Text Editing | Structured collaborative rich text | Notes; manuals; blogs | TipTap; Lexical; Plate | 8 | 8 | 9 | 10 | 8 | 3 | 3 | 6 | 2 | 6 | 9 | **160** | researched | Application-local |
| Color & Theming Science | Color spaces and token pipelines | Brand token tooling | culori | 6 | 6 | 8 | 10 | 10 | 7 | 7 | 6 | 5 | 4 | 9 | **160** | partial | Potential shared infra (after multi-product proof) |
| Charts & Data Viz | Statistical and dashboard charts | Home analytics dashboards | ECharts; Visx; Chart.js | 7 | 7 | 10 | 10 | 9 | 6 | 5 | 6 | 2 | 4 | 9 | **159** | researched | Application-local |
| Maps & Geospatial | Interactive maps and geo algorithms | Local maps; garden/site tools | MapLibre GL; Turf.js | 8 | 8 | 9 | 9 | 7 | 4 | 4 | 5 | 2 | 8 | 9 | **159** | researched | Application-local |
| ZIP / Archive Handling | Client-side archive read/write | Backup import/export | fflate | 6 | 5 | 9 | 10 | 10 | 8 | 9 | 6 | 4 | 3 | 9 | **158** | researched | Application-local |
| 2D Scene Graphs & Sprites | Fast 2D sprites and stages | Casual games; editors | PixiJS; Konva | 7 | 7 | 9 | 10 | 9 | 5 | 5 | 5 | 2 | 6 | 9 | **157** | researched | Application-local |
| Notifications & Background Sync | Web Push and background sync APIs | Reminders; offline catch-up | Push API; web-push; Background Sync | 7 | 8 | 8 | 6 | 7 | 5 | 6 | 7 | 4 | 6 | 8 | **155** | researched | Application-local |
| Image Editing & Drawing | Photo edit and freehand drawing | Photo touch-up; sketch pads | Fabric.js; Perfect Freehand; Konva | 7 | 8 | 8 | 9 | 9 | 4 | 4 | 5 | 2 | 7 | 8 | **154** | researched | Application-local |
| Whiteboards & Diagramming | Infinite canvas whiteboards | Family planning boards | Excalidraw; tldraw (licence diligence) | 8 | 8 | 8 | 9 | 8 | 3 | 3 | 5 | 1 | 8 | 8 | **153** | researched | Never likely shared infra |
| Performance Measurement | Runtime perf and Web Vitals | Perf budgets for PWAs | web-vitals; browser Performance | 6 | 5 | 9 | 9 | 8 | 8 | 8 | 7 | 3 | 3 | 9 | **152** | researched | Application-local |
| Video Recording | Camera/screen recording to Blob | How-to clips; security cams UI | MediaRecorder; RecordRTC | 7 | 7 | 8 | 7 | 8 | 5 | 6 | 5 | 2 | 6 | 8 | **146** | researched | Application-local |
| MIDI & Creative Audio | Web MIDI and creative instruments | Browser instruments | Web MIDI; Tone.js | 6 | 7 | 8 | 7 | 9 | 5 | 6 | 4 | 2 | 8 | 8 | **146** | researched | Application-local |
| Physics Simulation | 2D/3D rigid-body physics | Labs; toys; games | Rapier; Matter.js; cannon-es | 6 | 6 | 9 | 9 | 9 | 5 | 5 | 4 | 2 | 6 | 8 | **144** | researched | Application-local |
| Graph Visualisation | Node-link diagrams | Relationship explorers | Cytoscape.js; XYFlow | 6 | 6 | 9 | 10 | 9 | 5 | 5 | 4 | 1 | 5 | 8 | **142** | researched | Application-local |
| Timelines | Editorial and media timelines | Family history; media editors | vis-timeline; Theatre.js | 6 | 6 | 7 | 10 | 9 | 6 | 6 | 4 | 1 | 5 | 8 | **140** | researched | Application-local |
| Particle Systems | GPU/CPU particle ambience | Ambient premium visuals | tsparticles; custom shaders | 5 | 6 | 8 | 10 | 9 | 6 | 6 | 4 | 2 | 5 | 7 | **139** | researched | Application-local |
| Client Observability | Error/trace reporting from the client | Product error triage | OpenTelemetry JS | 6 | 5 | 9 | 10 | 7 | 5 | 5 | 6 | 1 | 3 | 9 | **139** | researched | Never likely shared infra |
| Game Engines | Full browser game loops | Full games as PWAs | Phaser; PlayCanvas; Babylon.js | 5 | 7 | 9 | 10 | 8 | 3 | 3 | 2 | 1 | 7 | 8 | **134** | researched | Never likely shared infra |
| Print & Paginated Documents | Print CSS and PDF generation | Labels; reports; PDFs | CSS print; react-pdf; pdf.js | 5 | 6 | 8 | 9 | 9 | 5 | 5 | 4 | 1 | 4 | 8 | **133** | stub | Application-local |
| WebXR | Immersive AR/VR in browser | Immersive home demos | three.js XR; Babylon XR | 5 | 7 | 7 | 5 | 6 | 3 | 3 | 2 | 1 | 8 | 7 | **116** | stub | Application-local |
| Payments | Checkout and Payment Request | Commerce (usually out of scope) | Payment Request; vendor SDKs | 3 | 5 | 8 | 6 | 2 | 4 | 3 | 2 | 1 | 2 | 7 | **89** | researched | Never likely shared infra |

---

## Strategic ranking (by weighted score)

Weighted scores remain the long-term value ranking. **Delivery order is not score order** —
see [Alternating delivery philosophy](#alternating-delivery-philosophy).

| Rank | Capability | Score | Why it ranks highly |
| ---: | --- | ---: | --- |
| 1 | Offline Storage | 211 | Unlocks almost every offline-first product; mature IDB ecosystem |
| 2 | Offline-first PWA Runtime | 209 | Installability + cache + update UX is table stakes for Songara PWAs |
| 3 | Accessibility Primitives | 201 | Quality bar for every consumer UI; excellent OSS headless families |
| 4 | Content Packs & Asset Verification | 200 | Offline models/media without reinventing distribution |
| 5 | On-device AI Inference | 187 | Differentiating private intelligence; engines stay app-owned |
| 6 | Icons & UI Primitives | 186 | Cross-app visual coherence |
| 7 | Sync & Collaboration | 184 | Multi-device household products; high complexity |
| 8 | Animation & Motion | 184 | Premium feel; reduced-motion patterns reusable |
| 9 | Forms & Validation | 184 | Ubiquitous; engines usually stay app-local |
| 10 | Internationalisation | 184 | Locale reach without re-solving formatting |
| 11–20 | Markdown, Audio, Virtualisation, Testing, Files, Camera, Mic, TTS, Canvas, STT | 181–171 | Strong product enablers with clear OSS leaders |
| … | See master table | | |
| — | **Payments** / **On-device LLM Inference** | — | **Parked** — out of near-term strategy (see below) |

### Parked for now

| Capability | Reason |
| --- | --- |
| Payments | Weak offline/household fit; not a Songara near-term differentiator |
| On-device LLM Inference | High cost/complexity; defer until smaller on-device AI and Content Packs are proven in products |

---

## Alternating delivery philosophy

Foundational PWA infrastructure has high long-term value, but **weeks of invisible plumbing
before products that exercise it** is the wrong default. Songara should **alternate**:

1. **Infrastructure** — offline runtime, storage, packaging, accessibility, …
2. **Visually demonstrable capability** — animation, physics, camera, audio, whiteboards, CV, charts, …

Goals:

- Regular visible progress
- Continuous validation that the platform is worthwhile
- Discover what infrastructure is *genuinely* needed from real demos/products — not speculative design

The shared platform should **emerge** from product development, not be built in isolation.
Hello / Test-PWA remain smoke examples only — not justification for promotion.

### Role of each top capability

| Capability | Enables | Why valuable | Products unlocked | Primarily | Visually demonstrable? | Likely to reveal reusable infra? |
| --- | --- | --- | --- | --- | --- | --- |
| Offline Storage | Durable client state | Core of offline-first | Journals, inventory, drafts, catalogs | **Platform** | No (indirect) | **Yes** — schema/helpers after 2+ apps |
| Offline-first PWA Runtime | Install, cache, update UX | Table stakes for Songara PWAs | Every installable app | **Platform** | Weak (install/update chrome) | **Yes** — presets/update patterns |
| Accessibility Primitives | Correct focus, dialogs, menus | Quality + inclusion bar | All consumer UIs | **Both** | Partial (correct UI behaviour) | **Yes** — one headless family wrappers |
| Content Packs | Hash-verified offline assets | Large models/media without ad-hoc fetch | CV packs, map tiles, curricula | **Platform** | No (enables demos) | **Yes** — already foundation-shaped |
| On-device AI Inference (non-LLM) | Private classifiers / embeddings | Differentiates privacy story | Home vision helpers, semantic search | **User-facing** | Sometimes (overlays/results) | Maybe pack/loader contracts later |
| Icons & UI Primitives | Coherent chrome | Brand consistency | All apps | **Both** | Yes (look & feel) | Token/primitive sharing |
| Sync & Collaboration | Multi-device / multi-user | Household reality | Shared boards, notes | **Both** | Weak | Low–medium; keep app-local first |
| Animation & Motion | Premium motion, reduced-motion | Felt quality | Any polished PWA / motion lab | **User-facing** | **Yes** | Reduced-motion hooks (partially exists) |
| Forms & Validation | Reliable data entry | Every settings/wizard flow | Config apps, surveys | **Both** | Weak | Fields/tokens more than engines |
| Internationalisation | Locale formatting / catalogs | Reach beyond one language | Multi-locale household apps | **Platform** | Weak | Small `Intl` helpers |
| Audio Playback & Music | Playback, SFX, musical timing | Rich sensory products | Practice tools, ambient rooms | **User-facing** | **Yes** (hear/see meters) | Audio graph patterns (kit exists) |
| Camera & Image Capture | Stills from device camera | Input for many verticals | Photo logs, document capture | **User-facing** | **Yes** | Thin permission UX only |
| Computer Vision | Pose/hands/face/gesture | High-wow on-device demos | Fitness, gesture control, mirrors | **User-facing** | **Yes** | Unlikely engines; maybe bootstrap later |
| Physics Simulation | Believable motion | Labs and toys | Physics playgrounds, simple games | **User-facing** | **Yes** | Numeric helpers only |
| Charts & Data Viz | Readable quantitative UI | Decision/insight products | Home analytics | **User-facing** | **Yes** | Unlikely shared chart API early |
| Whiteboards & Diagramming | Infinite canvas | Planning & creative | Family boards, sketch plans | **User-facing** | **Yes** | Never full product in foundation |
| Maps / Offline Maps | Geo context offline | Place-based products | Trail/garden/site tools | **User-facing** | **Yes** | Tile pack conventions maybe |
| Canvas & SVG Foundations | Custom drawing loops | Building block for labs | Custom visualisations | **Both** | **Yes** | Render kit (partially exists) |
| Testing Harness | Fast trustworthy CI | Engineering leverage | All repos | **Platform** | No | Shared configs later |
| Markdown Rendering | Safe rich content | Help/docs surfaces | Content viewers | **Both** | Mild | Kit already exists |

---

## Alternating implementation roadmap

Intentionally **infra ↔ visual**. Each visual slice should be a small demo/product that
*stresses* the previous infra slice. Extract shared code only when a second real product
needs the same API unchanged.

| Phase | Lane | Capability focus | What to ship (shape) | Validates / surfaces |
| ---: | --- | --- | --- | --- |
| **A1** | Visual | Animation & Motion | Motion lab PWA (springs, scroll, reduced-motion) | Felt quality; existing animation kit gaps |
| **A2** | Infra | Offline Storage (minimal) | Persist lab prefs/scenes in IDB (Dexie/idb in the app) | Real schema/migration needs |
| **B1** | Visual | Physics Simulation | Physics playground (Rapier/Matter) | Canvas/render loop needs |
| **B2** | Infra | Offline-first PWA Runtime | Install + update UX on the playground | Precache/update pain points |
| **C1** | Visual | Charts & Data Viz | Small offline analytics demo with sample data | Export/download + list virtualisation pressure |
| **C2** | Infra | Accessibility Primitives | One headless overlay family on an existing demo | Focus trap / dialog patterns worth sharing |
| **D1** | Visual | Camera & Image Capture | Photo-log demo | Permission UX; file/DnD adjacent |
| **D2** | Infra | Content Packs (light) | Ship sample assets (images/models) as a pack into a demo | Pack client gaps without speculative redesign |
| **E1** | Visual | Computer Vision | Pose/hands overlay on camera demo (MediaPipe; privacy check) | Model size → pack story becomes real |
| **E2** | Infra | Harden packs + storage from E1 | Only the helpers E1 actually needed | Genuine infra, not speculative |
| **F1** | Visual | Audio Playback & Music | Practice/ambient audio demo | Audio kit + offline asset needs |
| **F2** | Infra | Icons & UI / theming pass | Token + icon consistency across demos | What chrome is truly shared |
| **G1** | Visual | Whiteboards *or* Offline Maps | One canvas or one map demo (pick by appetite) | Large offline assets; collaboration later |
| **G2** | Infra | Virtualisation / Markdown / i18n (pick from pain) | Only what G1 or prior demos blocked on | Catalogue expands via evidence |

### Explicitly defer in this cadence

- **Payments** — parked
- **On-device LLM** — parked (non-LLM on-device AI may appear in E1 as CV/classifiers only)
- **Sync & Collaboration** — after at least two single-device products exist
- **WebGPU deep dive** — when a visual demo hits WebGL limits
- **Multi-week infra-only programmes** — replace with one infra phase at a time, driven by the last visual slice

### Discovery depth passes (docs) aligned to this cadence

Still research-only tickets that **update this catalogue** before/during each pair:

1. **Animation & Motion** patterns for Songara demos — **Small**
2. **Offline Storage** minimal patterns (Dexie/idb; no sync yet) — **Medium**
3. **Physics + Canvas** demo shape — **Small**
4. **PWA Runtime** update/precache checklist for demos — **Small**
5. **Camera → CV → Content Packs** chain (privacy + model hosting) — **Large**

(Replaces the prior “next five” that front-loaded Serwist/sync/LLM plumbing.)

---

## Capability briefs (selected)

Library URLs and licence snapshots lean on the historical companion
[`oss-capability-catalogue.md`](./oss-capability-catalogue.md). Re-verify SPDX and GitHub
activity before any product adoption.

### Offline Storage

- **Overview:** Persist structured data in the browser beyond `localStorage`.
- **Why it matters:** Offline-first products are impossible without durable client state.
- **Typical use-cases:** Journals, inventories, queued form drafts, media indexes.
- **Leading OSS:** Dexie.js (Apache-2.0), idb (ISC/MIT family), RxDB (Apache-2.0 core).
- **Alternatives:** raw IndexedDB, OPFS + SQLite (wa-sqlite — investigate).
- **Patterns worth borrowing:** Versioned schemas, migration functions, live queries.
- **UX ideas:** Sync status only when sync exists; never block first paint on remote.
- **Placement:** Potential shared infra (thin helpers) after multi-product proof — **not** a promote ticket from this report.

### Offline-first PWA Runtime

- **Overview:** Service workers, precaching, installability, update prompts.
- **Why it matters:** Defines the installable, resilient Songara app shape.
- **Typical use-cases:** Every solo PWA shell.
- **Leading OSS:** vite-plugin-pwa (MIT), Workbox (MIT), Serwist (MIT — active fork path).
- **Patterns:** Deferred update apply; skipWaiting with user consent; asset hashing.
- **Placement:** Potential shared infra (presets/update UX) after multi-product proof.

### Accessibility Primitives

- **Overview:** Focus management, dialogs, menus, disclosure — without hand-rolled a11y bugs.
- **Why it matters:** Household apps must work with AT; legal and quality bar.
- **Leading OSS:** React Aria (Apache-2.0), Radix (MIT), Base UI (MIT), axe-core (MPL-2.0 tooling).
- **Patterns:** Pick **one** headless family before wrapping; compose with design tokens.
- **Placement:** Potential shared infra for overlays once multiple products share an API.

### Content Packs & Asset Verification

- **Overview:** Versioned, hash-verified offline assets (models, tiles, media).
- **Why it matters:** Large binaries should not be ad-hoc fetches; integrity matters offline.
- **Leading approach:** Songara Content Packs (ADR-005) — prefer extending this over new OSS.
- **Placement:** Potential shared infra (already foundation-shaped).

### On-device AI Inference

- **Overview:** Run classifiers, ASR, vision, NLP models in WASM/WebGPU.
- **Why it matters:** Privacy-preserving intelligence without cloud round-trips.
- **Leading OSS:** ONNX Runtime Web (MIT), Transformers.js (Apache-2.0), TensorFlow.js (Apache-2.0).
- **Weaknesses:** Bundle/model size; memory on mobile; EP differences.
- **Placement:** Application-local engines; pack/loader contracts only after multi-product proof.

### Sync & Collaboration

- **Overview:** Multi-device consistency and multi-user CRDTs.
- **Why it matters:** Households share devices and people.
- **Leading OSS:** Yjs (MIT), RxDB, ElectricSQL / PowerSync (verify terms).
- **Weaknesses:** Sync product licensing tiers; conflict UX is the hard part.
- **Placement:** Application-local / investigate — unlikely as a monolithic foundation sync layer.

### Computer Vision (pose / hands / face / gesture)

- **Overview:** Landmark and gesture tasks on-device.
- **Leading OSS:** MediaPipe Tasks (Apache-2.0 code; check model terms + privacy notices).
- **Placement:** Application-local; privacy diligence before any shared bootstrap.

### Maps & Geospatial / Offline Maps

- **Overview:** Interactive maps; offline tiles via PMTiles/Protomaps.
- **Leading OSS:** MapLibre GL JS (BSD-3), Turf.js (MIT), PMTiles (MIT).
- **Placement:** Map UI app-local; tile pack conventions potentially shared later.

### Speech Recognition & Synthesis

- **Overview:** STT/TTS via platform APIs or local models.
- **Leading OSS:** Web Speech; Transformers.js Whisper; speechSynthesis.
- **Placement:** Application-local; offline STT pairs with Content Packs.

### 3D / 2D / Physics / Games

- **Overview:** Immersive and game-like experiences.
- **Leading OSS:** Three/R3F, PixiJS, Rapier, Phaser/Babylon.
- **Placement:** Application-local; full engines **never** likely shared infra. Low-level canvas helpers may already live in foundation render kits.

### Rich Text / Whiteboards / Markdown

- **Markdown:** react-markdown ecosystem — potential shared render kit (already aligned with foundation).
- **Rich text / whiteboards:** TipTap, Lexical, Excalidraw, tldraw — schemas and licences keep these app-local / never shared as full products.

### Testing / Observability / Performance

- **Testing:** Vitest + Testing Library + Playwright + axe — potential shared *configs* later.
- **Observability:** OpenTelemetry JS — application-local; Songara foundation is **not** a Telemetry host.
- **Performance:** web-vitals — engineering practice, app-local.

### Payments

- **Placement:** Never likely shared infra for Songara household offline PWAs; weak offline fit.

---

## Score justification notes (axes)

Scores favour capabilities that (a) unlock many product categories, (b) fit offline-first
household use, and (c) have mature permissive OSS. Strategic Differentiation boosts on-device
AI, CV, speech, WebGPU, and offline maps. PWA-Base Suitability is high only for horizontal
infrastructure (storage helpers, PWA runtime, a11y, packs, test configs) — **not** a
recommendation to promote today.

Implementation Complexity and Maintenance Burden are inverted-friendly (10 = easy/light).
Heavy engines (LLMs, full game engines, whiteboards) score lower there, pulling weighted
totals down despite high user wow-factor.

---

## Acceptance / maintenance

- [x] Organised by capability, not by “what to add to PWA-Base”.
- [x] Master table with required scoring columns and weighted scores.
- [x] Ranked strategic list + alternating infra↔visual delivery roadmap.
- [x] Payments and on-device LLM parked for near-term strategy.
- [x] No implementation tickets in this docs PR; no speculative multi-week infra programmes.
- [ ] Future discovery / demo tickets **must** update this file’s master table (do not fork stale reports).

## Follow-ups

- Start **A1** (Animation & Motion lab) as the first visual product slice; then **A2** storage only as needed.
- Depth Discovery passes should follow the alternating cadence table, not infra-first score order.
- Extract to PWA-Base only when a second real product needs the same API unchanged.
- Optional: migrate detailed per-OSS fields from [`oss-capability-catalogue.md`](./oss-capability-catalogue.md) into `docs/research/capabilities/*.md` during depth passes.

_No implementation is expected from this research catalogue alone; the alternating roadmap is the delivery strategy for subsequent tickets._
