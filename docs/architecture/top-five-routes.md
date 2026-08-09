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

Nested IA: `/animation/{Stack}/{Offering}` — official OSS names (or `native`); Title-Case offerings.

| Route | Focus | Status |
| --- | --- | --- |
| `/animation/native` | Platform hub | Hub |
| `/animation/native/Web-Animations-API` | WAAPI / CSS baseline | Ready |
| `/animation/native/Reduced-Motion` | A11y motion policy | Ready |
| `/animation/native/View-Transitions` | Document View Transitions API | Experimental |
| `/animation/Motion` | Motion (motion.dev) hub | Hub |
| `/animation/Motion/Overview` | Declarative React motion (Preview) | Ready |
| `/animation/Motion/Springs` | Spring physics | Ready |
| `/animation/Motion/Layout-Transitions` | Layout / FLIP | Ready |
| `/animation/Motion/Shared-Element` | layoutId morphs | Experimental |
| `/animation/Motion/Gestures` | Hover / tap / drag | Ready |
| `/animation/Motion/Scroll` | Scroll-triggered whileInView | Ready |
| `/animation/Motion/Exit-Animations` | AnimatePresence | Ready |
| `/animation/Motion/Variants` | Variants / stagger | Ready |
| `/animation/Motion/SVG` | SVG path animation | Ready |
| `/animation/Motion/Motion-Values` | Motion values | Ready |
| `/animation/Lottie/Playback` | Lottie playback | Ready |
| `/animation/Rive/Interactive-Graphics` | Rive interactive graphics | Experimental |
| `/animation/GSAP/Timelines` | GSAP timelines (licence diligence) | Experimental |
| `/animation/tsParticles/Ambient-Field` | Ambient particles | Experimental |

Legacy flat paths (`/animation/motion`, `/animation/waapi`, …) redirect to the nested routes.

**Executor outcome:** Fill each leaf’s artefact contract; promote status from
`Needs investigation` → `Ready` / `Experimental` / `Rejected`; keep summary table honest.

---

## 2. `/physics`

**Question:** Which 2D/3D physics engines fit Songara labs and interactive PWAs?

Nested IA: `/physics/{Engine}/{Offering}`.

| Route | Focus | Status |
| --- | --- | --- |
| `/physics/Rapier` | Rapier hub | Hub |
| `/physics/Rapier/Overview-2D` | WASM 2D baseline | Needs investigation |
| `/physics/Rapier/Overview-3D` | WASM 3D baseline | Needs investigation |
| `/physics/Rapier/Joints` | Joints / motors | Needs investigation |
| `/physics/Rapier/Soft-Bodies` | Soft body feasibility | Needs investigation |
| `/physics/Rapier/Rope` | Rope / cable | Needs investigation |
| `/physics/Rapier/Cloth` | Cloth | Needs investigation |
| `/physics/Rapier/Vehicles` | Vehicle controllers | Needs investigation |
| `/physics/Matter.js/Overview` | Approachable 2D | Needs investigation |
| `/physics/Matter.js/Constraints` | Matter constraints | Needs investigation |
| `/physics/Planck.js/Overview` | Box2D-style 2D | Needs investigation |
| `/physics/cannon-es/Overview` | Classic 3D | Needs investigation |

**Notes:** Prefer one small scene per offering. Do not build a game. Legacy flat `/physics/*` paths redirect.

---

## 3. `/camera`

**Question:** How should Songara apps capture stills and manage devices/permissions?

| Route | Focus | Status |
| --- | --- | --- |
| `/camera/native` | Platform hub | Hub |
| `/camera/native/GetUserMedia` | MediaDevices baseline | Needs investigation |
| `/camera/native/Device-Selection` | Multi-camera enumeration | Needs investigation |
| `/camera/native/Still-Capture` | Snapshot to canvas/Blob | Needs investigation |
| `/camera/native/Track-Constraints` | Resolution / facingMode / torch | Needs investigation |
| `/camera/native/Permissions-UX` | Permission denied / iOS quirks | Needs investigation |
| `/camera/native/Secure-Context` | HTTPS / secure context | Needs investigation |
| `/camera/react-webcam/Overview` | React glue | Needs investigation |

**Out of scope for this area:** MediaPipe / CV (separate `/computer-vision` wave).

---

## 4. `/audio`

**Question:** Playback, SFX, and musical graphs — platform vs Tone vs Howler?

| Route | Focus | Status |
| --- | --- | --- |
| `/audio/native` | Platform hub | Hub |
| `/audio/native/Web-Audio-API` | AudioContext graph | Needs investigation |
| `/audio/native/HTMLAudioElement` | Media element baseline | Needs investigation |
| `/audio/native/AudioWorklet` | Worklet processing | Needs investigation |
| `/audio/native/MediaRecorder` | Record baseline | Needs investigation |
| `/audio/Tone.js/Overview` | Tone.js entry | Needs investigation |
| `/audio/Tone.js/Synthesis` | Synthesis | Needs investigation |
| `/audio/Tone.js/Transport` | Transport / timing | Needs investigation |
| `/audio/Howler.js/Overview` | Howler entry | Needs investigation |
| `/audio/Howler.js/Sprites` | Audio sprites | Needs investigation |
| `/audio/Songara-Audio-Kit/Overview` | Foundation kit | Needs investigation |
| `/audio/Songara-Audio-Kit/Playback-Loop` | Record/play patterns | Needs investigation |

**Notes:** Autoplay policies must be documented; gesture-to-start patterns required.

---

## 5. `/offline-storage`

**Question:** What is the Songara default for durable client data (no sync product yet)?

| Route | Focus | Status |
| --- | --- | --- |
| `/offline-storage/native/IndexedDB` | Raw IDB baseline | Needs investigation |
| `/offline-storage/native/OPFS` | Origin Private File System | Needs investigation |
| `/offline-storage/idb/Overview` | Tiny promise wrapper | Needs investigation |
| `/offline-storage/Dexie.js/Overview` | Preview Dexie CRUD | Ready |
| `/offline-storage/Dexie.js/Migrations` | Schema upgrades | Ready |
| `/offline-storage/Dexie.js/Live-Queries` | liveQuery | Needs investigation |
| `/offline-storage/localForage/Overview` | Legacy compare | Needs investigation |
| `/offline-storage/Songara-Pack-Store/Overview` | packStore contrast | Needs investigation |

**Out of scope:** RxDB sync plugins, ElectricSQL, Yjs collab (later Sync area).

---

## Scaffolding contract

For every leaf listed above:

1. Registry row in `src/catalogue/registry.ts` (status `Needs investigation` until filled)
2. Route wired via registry → `src/site.tsx`
3. Page shell: real exploration or `ExplorationStubPage` placeholder
4. Area summary at `/{area}` aggregates all rows

Executors replace stubs with practical implementations and update scores/status/notes.

## Executor ticket map

| Area | Suggested branch | Subroutes in scope |
| --- | --- | --- |
| Animation | `feat/catalogue-animation` | All `/animation/*` |
| Physics | `feat/catalogue-physics` | All `/physics/*` |
| Camera | `feat/catalogue-camera` | All `/camera/*` |
| Audio | `feat/catalogue-audio` | All `/audio/*` |
| Offline Storage | `feat/catalogue-offline-storage` | All `/offline-storage/*` |
