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
| 54 | Payments | 89 | Weak offline fit; usually out of Songara household scope |

---

## Discovery roadmap — next five capability areas

Prioritised for **depth passes** (not implementation). Ordered by strategic value of further research given current gaps (`partial` / high product upside).

### 1. Offline Storage depth (ecosystem + patterns)

| | |
| --- | --- |
| **Why** | #1 score; still needs Songara-oriented patterns (schema, migrations, OPFS, when *not* to sync) |
| **Mature OSS options** | 4+ (Dexie, idb, RxDB core, localForage legacy; OPFS rising) |
| **PWAs unlocked** | Journals, inventory, offline forms, media catalogs, settings vaults |
| **Reusable infra likelihood** | Medium–High *eventually* (thin helpers) — only after multiple products |
| **Effort** | **Medium** |

### 2. Sync & Collaboration depth (CRDT vs sync engines)

| | |
| --- | --- |
| **Why** | #7 score; high differentiation; commercial-plugin traps need clarity |
| **Mature OSS options** | 4+ (Yjs + providers, RxDB, ElectricSQL, PowerSync — verify licences) |
| **PWAs unlocked** | Shared household boards, multi-device notes, collaborative planners |
| **Reusable infra likelihood** | Low–Medium (providers often product-specific) |
| **Effort** | **Large** |

### 3. On-device AI Inference + Embeddings (model hosting story)

| | |
| --- | --- |
| **Why** | #5 / #23; pairs with Content Packs; privacy-first Songara narrative |
| **Mature OSS options** | 3–5 (ORT Web, Transformers.js, TF.js; embedding models via same) |
| **PWAs unlocked** | Private classifiers, semantic offline search, home vision helpers |
| **Reusable infra likelihood** | Low for engines; Medium for pack/loader *contracts* later |
| **Effort** | **Large** |

### 4. Offline Maps & Tile Packs

| | |
| --- | --- |
| **Why** | High offline differentiation; currently `partial`; MapLibre+PMTiles is state of the art |
| **Mature OSS options** | 3+ (MapLibre, PMTiles/Protomaps, Turf) |
| **PWAs unlocked** | Trail maps, garden/site plans, offline navigation aids |
| **Reusable infra likelihood** | Medium for pack conventions; Low for map UI |
| **Effort** | **Medium** |

### 5. WebGPU + on-device LLM posture

| | |
| --- | --- |
| **Why** | Longevity + strategic differentiation; browser support still uneven; LLMs are `partial` |
| **Mature OSS options** | WebGPU helpers 2–3; LLM runtimes 2–4 (WebLLM, MLC, HF) |
| **PWAs unlocked** | Local copilots, heavy compute labs, advanced graphics |
| **Reusable infra likelihood** | Low (capability probes maybe); engines stay app-local |
| **Effort** | **Large** |

**Not in next five (already well-covered at catalogue level):** Accessibility headless families, Testing harness shape, Markdown (foundation already has a kit), Payments.

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
- [x] Ranked strategic list + next five discovery areas with effort estimates.
- [x] No implementation tickets; no dependency additions; no code changes outside docs.
- [ ] Future discovery tickets **must** update this file’s master table (do not fork stale reports).

## Follow-ups

- Execute next-five depth passes as separate Discovery tickets (docs-only), each updating this SoT.
- Architect may later cite this catalogue when designing a *specific* product — still no promote work without multi-product proof.
- Optional: migrate detailed per-OSS fields from [`oss-capability-catalogue.md`](./oss-capability-catalogue.md) into `docs/research/capabilities/*.md` during depth passes.

_No implementation is expected from this research catalogue._
