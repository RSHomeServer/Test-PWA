# OSS adoption plan for Songara PWA-Base

> **Status (2026-08-08):** Superseded for Preview entry by
> [ADR-008](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/008-preview-stable-capability-lifecycle.md).
> PWA-Base owns Preview packages (`@songara/pwa-base/preview/*`); the Engineering
> Capability Catalogue **consumes** those exports to validate the same implementation
> products will use. Prior “hold all wraps until two product consumers” language in
> this plan no longer blocks **Preview**. ADR-003’s two-consumer rule remains a
> **Stable** confidence signal — catalogue-alone evidence never graduates Preview →
> Stable. Living guides:
> [capability-lifecycle](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/capability-lifecycle.md) ·
> [preview-packages](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/preview-packages.md).
>
> Architect decision shape for Discovery’s OSS catalogue. **Docs only** — no wrappers
> implemented here. Stable extraction still uses the
> [promote-to-pwa-base](https://github.com/RSHomeServer/PWA-Base/blob/main/.kandev/workflows/promote-to-pwa-base.md)
> workflow after product confidence.

| | |
| --- | --- |
| **Date** | 2026-08-06 (status note 2026-08-08) |
| **Author** | Architect (Test-PWA lane) |
| **Discovery SoT** | [`../research/oss-capability-catalogue.md`](../research/oss-capability-catalogue.md), [`../research/README.md`](../research/README.md) |
| **Foundation SoT** | [ADR-008](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/008-preview-stable-capability-lifecycle.md), [ADR-007](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/007-pwa-base-reusable-foundation.md), [ADR-003](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/003-phase2-shared-packages.md), [capability-lifecycle](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/capability-lifecycle.md), [preview-packages](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/preview-packages.md), [consuming-pwa-base](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/consuming-pwa-base.md), [architecture.md](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/architecture.md) |
| **Consumers today** | `hello-web` (in-repo reference) · Test-PWA (catalogue + SoloSiteApp; Preview consumer when packages exist) |
| **Preview horizon** | Open when ADR-008 Preview entry criteria are met (engineering confidence + standardisation intent). Catalogue eligibility ≠ Preview approval. |
| **Stable horizon** | Requires at least one **product** consuming the Preview API unchanged. Test-PWA / Hello alone do **not** unlock Stable. |

---

## 1. Problem restatement

Songara PWAs need mature browser-first OSS for media, offline data, PWA tooling, a11y,
i18n, and engineering practice — without reinventing infrastructure or bloating
`@songara/pwa-base`. Discovery produced a living catalogue with suitability labels
(**Application-local** / **Wrap in PWA-Base** / **Investigate further**).

Architect’s job is to turn that catalogue into:

1. Explicit **shared vs app-local** decisions under ADR-003 / ADR-007 / **ADR-008**.
2. Named **package / export touchpoints** — including Preview
   (`@songara/pwa-base/preview/<name>`) when curation is approved, or “none yet —
   app-local”.
3. **Executor-ready sequencing** that opens Preview when criteria pass, without
   treating Test-PWA as a Stable product consumer.

### Acceptance criteria

- [x] Plan cites Discovery files and foundation ADRs/guides (no archive SoT).
- [x] Every promote candidate records a **two-consumer / Stable check** (named product
  consumers or **held for Stable**); Preview entry follows ADR-008 separately.
- [x] Summary table uses columns: `name | description | purpose | value | what it can be used for`.
- [x] Dependency rules respected: sibling apps import only documented `@songara/pwa-base`
  entry points (including `/preview/*`); never rewrite `file:../PWA-Base`.
- [x] Non-goals stated: no catalogue host, no Telemetry product in PWA-Base, no
  Stable graduation from catalogue-alone evidence.
- [x] Phased next tickets distinguish Preview Executors (ADR-008) from Stable promote
  (product confidence + ADR-003 signal).

---

## 2. Decision principles

```mermaid
flowchart TD
  need[App needs capability]
  cat[Start from Discovery recommended OSS]
  verify[Re-verify licence maintenance SPDX]
  local[Ship app-local or catalogue exploration]
  previewGate[ADR-008 Preview entry criteria met?]
  preview[PWA-Base Preview package]
  product[Product consumes Preview API]
  stable[Architect ADR or LDR then Stable graduate]
  hold[Stay app-local or investigate only]
  need --> cat --> verify --> local --> previewGate
  previewGate -->|yes| preview --> product --> stable
  previewGate -->|no| hold
```

1. **Platform APIs first** — MediaStream, Web Audio, Web Crypto, IndexedDB, Cache, Push.
   OSS is for ergonomics, codecs, models, and cross-browser gaps.
2. **Preview vs Stable** — Enter **Preview** under ADR-008 when Songara intends to
   standardise and the thin integration is production-worthy. Enter **Stable** after
   real product usage + engineering confidence. ADR-003’s two-consumer rule is the
   preferred **Stable** confidence signal when a second product exists — not a blanket
   hold on all wraps.
3. **Eligibility ≠ approval** — “Wrap in PWA-Base” in the catalogue means *credible later*,
   not approved Preview or Stable work.
4. **Vertical stacks stay app-owned** — Three.js scenes, MediaPipe pipelines, map styles,
   rich-text schemas, game engines.
5. **Prefer extending existing kits** over new packages when a wrap eventually lands
   (runtime PWA helpers, markdown, animation, browser probes, Content Packs). Preview
   packages are the deliberate home for new curated OSS until Stable graduation.

### How Test-PWA fits

Test-PWA mounts via `SoloSiteApp` + `defineSite` / `SITE_CAPABILITY.offline`
([`src/App.tsx`](../../src/App.tsx), [`src/site.ts`](../../src/site.ts)). It is the
Engineering Capability Catalogue: demos, comparisons, benchmarks, scoring, and docs.
When a Preview package exists, catalogue routes **import**
`@songara/pwa-base/preview/<name>` — they do not implement a parallel wrapper.
Test-PWA is **not** a product consumer for Stable graduation.

---

## 3. Already in the foundation (do not re-promote)

These catalogue clusters already have a home. Future work is **hardening or docs**, not
new speculative packages. New curated OSS integrations use **Preview**
(`packages/preview-*`) per ADR-008 rather than inventing parallel kits.

| Cluster | Where today | Notes |
| --- | --- | --- |
| Service worker update UX | `@songara/pwa-base` runtime (`workbox-window`, `createServiceWorkerUpdateController`, UpdateControl) | Strongest shared infrastructure already; Serwist is a migration *investigate*, not a second kit |
| Markdown render | `@songara/pwa-base/markdown` (`react-markdown`, `remark-gfm`, highlight) | Aligns with catalogue §19; consider `rehype-sanitize` when hardening — not a new package |
| Reduced-motion / motion hooks | `@songara/pwa-base/animation` | Catalogue §13 wrap hint already partially met; Motion OSS Preview is separate (`/preview/motion`) |
| Canvas / RAF helpers | `@songara/pwa-base/render` | Low-level only; Pixi/Three stay app-local |
| Browser capability probes | `@songara/pwa-base/browser` | WebGPU probe ergonomics stay here if shared |
| Content Packs + hash verify | runtime packs (ADR-005) | Prefer packs for models/tiles over inventing asset OSS |
| Vitest in packages | per-package `vitest.config` in PWA-Base | Shared *exportable* harness still held for Stable |
| Numeric / export / UI tokens | math, export, ui, controls | Charts remain app-local per ADR-003 precedent |

---

## 4. Review by value, need, and use case

Scoring below is Architect judgment for **Songara offline-first household PWAs** (React +
Vite), not a global OSS ranking. **Action** is what Orchestrator may schedule next.
Wave 1 Preview sequencing lives in
[preview-packages](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/preview-packages.md)
(Motion → Dexie → Lottie; Howler deferred; Rapier2D held for Wave 1b + product commit).

### 4.1 High value for foundation *later* (Preview- or Stable-eligible)

| Area | Recommended OSS | Need | Value if shared | Gate | Likely touchpoint |
| --- | --- | --- | --- | --- | --- |
| UI motion (Motion) | Motion (peer) | Premium UI motion across PWAs | One reduced-motion-aware integration | **Preview** when ADR-008 criteria pass (Wave 1) | `@songara/pwa-base/preview/motion` |
| IndexedDB ergonomics | Dexie.js (core) | Offline durable state is core to Songara PWAs | Stable store helpers / schema conventions | **Preview** (Wave 1); Stable after product use | `@songara/pwa-base/preview/dexie` → runtime helpers |
| Lottie playback | Chosen Lottie / dotLottie player | Motion graphics with freeze-on-reduced-motion | Narrow shared player | **Preview** (Wave 1, after Motion policy) | `@songara/pwa-base/preview/lottie` |
| PWA tooling presets | `vite-plugin-pwa` + Workbox; watch Serwist | Every solo PWA needs precache + update UX | Consistency across apps; less copy-paste Vite config | Runtime already covers update UX; full Vite preset needs product sharing for **Stable** | Extend `packages/runtime` + documented Vite recipe; optional `@songara/pwa-base/config` helper |
| Headless a11y primitives | React Aria **or** Radix **or** Base UI (pick one) | Overlays/menus must be accessible | One family → token-styled overlays without hand-rolled focus traps | No shared overlay API yet; picking a family is a product decision | `@songara/pwa-base/ui` wrappers when overlays promote |
| Shared Intl helpers | FormatJS or i18next + `Intl` / Temporal polyfill | Locale formatting repeats | Small pure helpers | Message catalogs stay per app | Small kit or `/browser` helpers — catalogs remain app-local |
| Test harness configs | Vitest + Testing Library + Playwright + axe | Engineering consistency | Faster sibling app bootstrap | Specs stay per repo; exportable config needs adopters for Stable | `@songara/pwa-base/config` or documented templates |

**Reasoning:** These clusters are the ones Discovery correctly flagged as wrap-eligible
*and* that match foundation identity (contracts/kits, not product verticals). Preview
may open under ADR-008 without waiting for two product consumers; Stable still waits
for product confidence.

### 4.2 Investigate further (diligence before any adopt/promote)

| Topic | Why it matters | Risk if skipped | Recommended next ticket |
| --- | --- | --- | --- |
| Serwist vs Workbox | Workbox velocity risk; Serwist is active fork | Stuck on stale SW stack | Discovery: Songara Vite PWA posture |
| Dexie vs RxDB (+ Electric / PowerSync) | Sync story shapes offline apps | Accidental commercial plugin lock-in | Discovery: offline sync shortlist (core OSS only) |
| MediaPipe Tasks privacy / metrics | Vision apps may need consent | Household privacy surprise | Discovery: privacy + model hosting via Content Packs |
| Offline map tiles (PMTiles / Protomaps) | Offline maps need pack conventions | Tile licensing / hosting muddle | Investigate when a map product exists |
| WebLLM / large on-device LLMs | Privacy-preserving assistants | Bundle/memory cliffs | App-local until a product commits |
| GSAP / tldraw licences | Non-MIT redistribution | Legal block mid-feature | Diligence **only if** an app commits |

### 4.3 Stay application-local (do not pull into base)

| Category | Recommended OSS (from catalogue) | Why not foundation |
| --- | --- | --- |
| Camera / record / mic | MediaDevices, MediaRecorder, react-webcam, RecordRTC, extendable-media-recorder | Platform API + thin app glue; permission UX is product-specific |
| Speech / neural TTS | Web Speech, Transformers.js Whisper, speak-tts | Model size and UX are app-owned; offline STT hosting via packs if needed |
| ML inference | ONNX Runtime Web, Transformers.js, TF.js | Model packs + loaders may wrap *later*; engines stay app-local |
| 3D / 2D / physics / particles | Three/R3F, Pixi, Rapier, Matter, tsparticles | Scene code is product; foundation already has render/physics *helpers*; Rapier Preview only after Wave 1b + product commit |
| Charts / graphs / timelines | ECharts, Visx, Cytoscape, XYFlow, vis-timeline | ADR-003 already kept charting app-local |
| Maps | MapLibre, Turf, PMTiles | Style + tile hosting are vertical |
| Rich text / whiteboards | TipTap, Lexical, Plate, Excalidraw, tldraw | Schema lock-in; licence diligence for tldraw |
| OCR / QR / CV effects | Tesseract.js, html5-qrcode, MediaPipe pipelines | Task pipelines are product-specific |
| Forms engine | React Hook Form + Zod | Token fields may be shared; form engine stays app-local |
| Auth / crypto / payments | oidc-client-ts, jose, Payment Request | Architecture-sensitive; never invent crypto in foundation |
| Push / notifications | web-push + SW | App-local; SW patterns wrap-adjacent with runtime only when needed |
| Game engines | Phaser, PlayCanvas, Babylon | Wrong abstraction for utility PWAs |
| Observability SDKs | OpenTelemetry JS, vendor SDKs | **Application-local**; PWA-Base is **not** a Telemetry host |

**Reasoning:** Pulling these into the base would violate ADR-007 (product verticals out)
and ADR-008’s “thin multi-app” Preview bar. Apps should start from the catalogue’s
**Recommended** row, re-verify SPDX, and keep code in the sibling repo until Preview
criteria pass.

---

## 5. Package / export touchpoints

| Candidate | Action now | Future export | Consumers / gate |
| --- | --- | --- | --- |
| Motion Preview | **Wave 1 Preview** (PWA-Base Executor) | `@songara/pwa-base/preview/motion` | Catalogue + products consume Preview; Stable after product use |
| Dexie Preview | **Wave 1 Preview** | `@songara/pwa-base/preview/dexie` | Same |
| Lottie Preview | **Wave 1 Preview** (after Motion policy) | `@songara/pwa-base/preview/lottie` | Same |
| PWA Vite preset / SW recipe | **None — held for Stable-shaped promote** | Documented recipe; possibly config helper + runtime (already has update UX) | Product PWAs sharing one preset |
| Headless a11y wrappers | **None — held** | `@songara/pwa-base/ui` | Product apps sharing overlay API |
| Intl helpers | **None — held** | Small kit or browser helpers | Product apps sharing helper API (not catalogs) |
| Shared Vitest/axe/Playwright config | **None — held** | `@songara/pwa-base/config` templates | Repos adopting unchanged config |
| Markdown sanitize hardening | **None — optional later LDR** | Same `@songara/pwa-base/markdown` | Existing consumers of Markdown |
| Everything in §4.3 | **App-local** | none yet — app-local (Rapier may enter Preview in Wave 1b) | N/A until Preview gate |

When a Preview or Stable export lands, Executor must update `consuming-pwa-base.md` and
the dependency-rules table in `architecture.md` in the same PR.

**ADR stubs:** none in this PR. Boundary / public-API changes will get drafts under
`docs/architecture/adr-drafts/` (Test-PWA) or PWA-Base `docs/adr/` at promote time.
ADR-008 is the authoritative Preview/Stable lifecycle record on PWA-Base `main`.

---

## 6. Phased tickets (Orchestrator dispatch)

Ordered for Executor / Discovery. Preview Executors follow ADR-008 / preview-packages.
**No Stable promote** until product confidence (P5).

| Phase | Role | Ticket intent | Validation |
| --- | --- | --- | --- |
| **P0** | Architect (this plan + status note) | Ship this plan + ADR-008 alignment | Docs cite catalogue + ADR-008; table columns exact |
| **P1** | Discovery | Serwist vs Workbox for Songara Vite PWAs | Written recommendation; no code migrate |
| **P2** | Discovery | Dexie vs RxDB (+ Electric/PowerSync); core OSS vs commercial plugins | Sync shortlist + licence notes |
| **P3** | Discovery | MediaPipe Tasks privacy/metrics + Content Pack model hosting | Consent/hosting guidance |
| **P4** | Discovery (on demand) | GSAP / tldraw licence diligence | Only if an app commits to those stacks |
| **P5** | Architect → Maintainer | Stable graduation when a **named product** consumes Preview unchanged; ADR/LDR + promote workflow | Product confidence (+ preferred second product / ADR-003 signal) |

Sibling apps may **adopt catalogue OSS app-locally at any time**. Catalogue routes should
**switch to Preview imports** once the corresponding `@songara/pwa-base/preview/<name>`
export exists. App-local adoption alone does not trigger Stable graduation.

---

## 7. Non-goals

- Reintroducing a **catalogue host** or multi-app platform monorepo (ADR-007).
- Baking **Telemetry** / product observability backends into PWA-Base.
- Graduating Preview → Stable from **catalogue-only** evidence (including Test-PWA-only).
- Implementing wrappers, Vite preset packages, or Test-PWA runtime features in this ticket.
- Selecting stacks Discovery already marked application-local without new evidence.
- Merging PRs or dispatching Executors from this document alone.

---

## 8. Summary table (decision-ready)

| name | description | purpose | value | what it can be used for |
| --- | --- | --- | --- | --- |
| vite-plugin-pwa + workbox-window | De-facto Vite PWA precache + update client; foundation already uses workbox-window for update UX | Shared PWA runtime consistency | High for every solo Songara PWA | Precaching, offline shells, deferred SW update prompts; full Vite preset **held** for Stable-shaped promote |
| Serwist (`@serwist/vite`) | Actively maintained Workbox fork path | Hedge Workbox upstream risk | Medium until diligence completes | Future SW stack if Workbox stagnates; **investigate** (P1) — do not dual-ship |
| Motion (Preview) | UI animation library; thin Songara reduced-motion-aware integration | Curated motion standardisation | High for polished PWAs | `@songara/pwa-base/preview/motion` — Wave 1 Preview; Stable after product use |
| Dexie.js (core) | IndexedDB ergonomics without sync product lock-in | Durable offline client data | High for offline-first PWAs | `@songara/pwa-base/preview/dexie` — Wave 1 Preview; thin helpers only; no Dexie Cloud |
| Lottie player (Preview) | Narrow motion-graphics player + reduced-motion freeze | Shared Lottie playback defaults | Medium–high after Motion policy | `@songara/pwa-base/preview/lottie` — Wave 1 Preview |
| RxDB / Yjs / ElectricSQL | Reactive DB, CRDTs, Postgres-shaped sync | Product sync / collab | High in apps that need sync; **low as foundation** | App-local or **investigate** (P2); keep commercial plugins out of base |
| React Aria or Radix or Base UI | Headless accessible primitives | Shared overlay/menu behaviour | High once one family is chosen | Token-styled dialogs/menus; **held** — pick family at promote time |
| FormatJS / i18next + Intl helpers | Message libraries + locale formatting | i18n without inventing formatters | Medium (catalogs stay app-local) | Shared `Intl`/Temporal helpers later; catalogs stay per app |
| Vitest + Testing Library + Playwright + axe | Unit/component/e2e/a11y stack matching Vite/React | Engineering bootstrap | High for repo consistency | Shared configs/helpers **held** for Stable; specs remain per repository |
| ONNX Runtime Web / Transformers.js / TF.js | On-device ML runtimes | Client inference | High in ML apps; **not foundation engines** | App-local pipelines; optional later loader/pack contracts |
| MediaPipe Tasks | Vision landmarks / pose / hands | On-device CV | High for vision products | App-local; **investigate** privacy/metrics (P3) before any shared bootstrap |
| MapLibre GL + Turf + PMTiles | Maps, geo algorithms, offline tiles | Geospatial PWAs | High in map apps | App-local maps; tile pack conventions **investigate** when needed |
| TipTap / Lexical / Plate | Structured rich text | Editors | High in editor apps | App-local schemas; no foundation editor |
| OpenTelemetry JS | Vendor-neutral client telemetry | App observability | Medium for products | **Application-local only** — not a PWA-Base Telemetry host |
| Content Packs (existing) | Versioned hash-verified asset packs (ADR-005) | Offline models/tiles/assets | High — already foundation | Host ML models, tile packs, large static assets without new OSS kits |
| Three.js / R3F / Pixi / Rapier | 3D/2D/physics engines | Immersive / lab UIs | High in those apps | **App-local** in Wave 1; Rapier Preview only after Wave 1b + product commit |
| react-markdown stack (existing kit) | GFM markdown render in UI | Shared docs/help surfaces | High — already wrapped | Continue via `@songara/pwa-base/markdown`; sanitize hardening later |

---

## 9. Validation checklist (this docs PR)

- [x] Cites [`oss-capability-catalogue.md`](../research/oss-capability-catalogue.md) and diligence companion.
- [x] Status note links ADR-008, capability-lifecycle, and preview-packages.
- [x] Preview vs Stable gates explicit; Stable requires product consumer(s).
- [x] Summary table columns exact.
- [x] Dependency / consume model respects SoloSiteApp + `file:../PWA-Base` + Preview subpaths.
- [x] No Telemetry / catalogue-host assumptions.
- [x] No PWA-Base or Test-PWA runtime code changes.

---

## 10. Recommended next step for Orchestrator

1. Human reviews/merges this docs PR into Test-PWA `main`.
2. Idle on catalogue consume tickets (**T1b** etc.) until the corresponding Preview
   package lands on PWA-Base `main` and a human starts that work.
3. Open **P1–P3 Discovery** tickets (Serwist, offline sync shortlist, MediaPipe privacy)
   as needed — independent of Preview Wave 1.
4. Do **not** open Stable promote Executors until a named product consumes Preview (P5).
5. Sibling apps may consume catalogue OSS **app-locally** anytime; catalogue routes
   switch to `@songara/pwa-base/preview/<name>` when that export exists.
