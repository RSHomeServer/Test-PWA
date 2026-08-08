# Top five catalogue routes — deep dive

> Scaffolding plan for the first five **capability areas** in the Engineering Capability
> Catalogue. Research scores remain in
> [`../research/capability-catalogue.md`](../research/capability-catalogue.md); this file
> defines **routes / subroutes** and Executor expectations.
>
> App architecture: [`capability-catalogue-app.md`](./capability-catalogue-app.md).

| | |
| --- | --- |
| **Date** | 2026-08-07 |
| **Top five areas** | `/animation` · `/physics` · `/camera` · `/audio` · `/offline-storage` |
| **Registry** | [`../../src/catalogue/registry.ts`](../../src/catalogue/registry.ts) |
| **Why this five** | Mix of high weighted-score platform knowledge (offline storage) and high-leverage user-facing stacks that unlock many product categories — without front-loading Payments or on-device LLM |

Later waves (not in this five): computer-vision, ocr, charts, maps, whiteboards, pwa-runtime, accessibility, content-packs.

---

## 1. `/animation`

**Question:** Which motion stacks should Songara prefer for UI, layout, and timeline animation?

| Subroute | Focus | OSS / API | Priority |
| --- | --- | --- | --- |
| `/animation/waapi` | Platform baseline | Web Animations API / CSS | **Done (scaffold)** |
| `/animation/motion` | React motion library (ex-Framer Motion) | [`motion`](https://github.com/motiondivision/motion) | P0 |
| `/animation/springs` | Spring physics UX patterns | Motion springs / WAAPI compare | P0 |
| `/animation/layout-transitions` | Shared layout / FLIP-style | Motion layout / WAAPI | P1 |
| `/animation/shared-element` | Cross-route continuity | Motion / View Transitions API | P1 |
| `/animation/particles` | Ambient particle fields | tsparticles / canvas | P2 |
| `/animation/lottie` | After Effects JSON playback | lottie-web / dotLottie | P1 |
| `/animation/rive` | Interactive state-machine graphics | `@rive-app/react-canvas` | P1 |
| `/animation/gsap` | Timeline industry tool | GSAP (**licence diligence**) | P2 |
| `/animation/reduced-motion` | A11y motion policy patterns | Platform + kit hooks | P0 |

**Executor outcome:** Fill each subroute’s artefact contract; promote status from
`Needs investigation` → `Ready` / `Experimental` / `Rejected`; keep summary table honest.

---

## 2. `/physics`

**Question:** Which 2D/3D physics engines fit Songara labs and interactive PWAs?

| Subroute | Focus | OSS | Priority |
| --- | --- | --- | --- |
| `/physics/rapier2d` | Modern WASM 2D | `@dimforge/rapier2d-compat` | P0 |
| `/physics/rapier3d` | Modern WASM 3D | `@dimforge/rapier3d-compat` | P1 |
| `/physics/matter` | Approachable 2D | Matter.js | P0 |
| `/physics/planck` | Box2D-style 2D | Planck.js | P1 |
| `/physics/cannon-es` | Classic 3D | cannon-es | P2 |
| `/physics/constraints` | Joints / motors patterns | Rapier or Matter | P1 |
| `/physics/soft-bodies` | Soft body feasibility | Engine-specific | P2 |
| `/physics/rope` | Rope / cable | Engine-specific | P2 |
| `/physics/cloth` | Cloth | Engine-specific | P2 |
| `/physics/vehicles` | Vehicle controllers | Rapier / custom | P2 |

**Notes:** Prefer one small scene per subroute (box stacks, joints). Do not build a game.

---

## 3. `/camera`

**Question:** How should Songara apps capture stills and manage devices/permissions?

| Subroute | Focus | OSS / API | Priority |
| --- | --- | --- | --- |
| `/camera/getusermedia` | Platform MediaDevices baseline | `navigator.mediaDevices` | P0 |
| `/camera/react-webcam` | React glue | react-webcam | P0 |
| `/camera/device-selection` | Multi-camera enumeration | Platform API | P0 |
| `/camera/still-capture` | Snapshot to canvas/Blob | Platform | P0 |
| `/camera/constraints` | Resolution / facingMode / torch | Platform constraints | P1 |
| `/camera/permissions-ux` | Permission denied / iOS quirks | Patterns (no OSS required) | P0 |
| `/camera/secure-context` | HTTPS / secure context requirements | Platform | P1 |

**Out of scope for this area ticket:** MediaPipe / CV (separate `/computer-vision` wave).

---

## 4. `/audio`

**Question:** Playback, SFX, and musical graphs — platform vs Tone vs Howler?

| Subroute | Focus | OSS / API | Priority |
| --- | --- | --- | --- |
| `/audio/web-audio` | Platform AudioContext graph | Web Audio API | P0 |
| `/audio/tone` | Musical timing / synthesis | Tone.js | P0 |
| `/audio/howler` | Simple multi-format SFX | Howler.js | P0 |
| `/audio/media-element` | `HTMLAudioElement` baseline | Platform | P1 |
| `/audio/worklet` | AudioWorklet processing | Platform | P1 |
| `/audio/recording-playback` | Record then play loop | MediaRecorder + Web Audio | P1 |
| `/audio/songara-audio-kit` | Compare foundation `@songara/pwa-base/audio` | PWA-Base audio kit | P0 |

**Notes:** Autoplay policies must be documented; gesture-to-start patterns required.

---

## 5. `/offline-storage`

**Question:** What is the Songara default for durable client data (no sync product yet)?

| Subroute | Focus | OSS / API | Priority |
| --- | --- | --- | --- |
| `/offline-storage/indexeddb-raw` | Raw IDB baseline | Platform IndexedDB | P0 |
| `/offline-storage/idb` | Tiny promise wrapper | `idb` | P0 |
| `/offline-storage/dexie` | Ergonomic queries / versions | `@songara/pwa-base/preview/dexie` (Dexie.js) | P0 |
| `/offline-storage/migrations` | Schema version patterns | Preview Dexie schema helpers | P0 |
| `/offline-storage/live-queries` | Reactive local reads | Dexie liveQuery / RxDB note | P1 |
| `/offline-storage/opfs` | Origin Private File System | Platform OPFS | P1 |
| `/offline-storage/localforage` | Legacy compare | localForage | P2 |
| `/offline-storage/pack-store` | Contrast foundation packStore | PWA-Base runtime storage | P1 |

**Out of scope:** RxDB sync plugins, ElectricSQL, Yjs collab (later Sync area).

---

## Scaffolding contract (this PR)

For every subroute listed above:

1. Registry row in `src/catalogue/registry.ts` (status `Needs investigation` until filled)
2. Route wired via registry → `src/site.ts`
3. Page shell: real exploration (`waapi`) or `ExplorationStubPage` placeholder
4. Area summary at `/{area}` aggregates all rows

Executors replace stubs with practical implementations and update scores/status/notes.

## Executor ticket map

| Area | Suggested branch | Subroutes in scope |
| --- | --- | --- |
| Animation | `feat/catalogue-animation` | All `/animation/*` except leave `waapi` unless improving it |
| Physics | `feat/catalogue-physics` | All `/physics/*` |
| Camera | `feat/catalogue-camera` | All `/camera/*` |
| Audio | `feat/catalogue-audio` | All `/audio/*` |
| Offline Storage | `feat/catalogue-offline-storage` | All `/offline-storage/*` |
