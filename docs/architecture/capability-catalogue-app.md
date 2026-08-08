# Engineering Capability Catalogue (Test-PWA)

> **Identity:** This repository is Songara’s **Engineering Capability Catalogue** —
> a permanent, browsable reference for mature browser capabilities and the OSS behind
> them. It is **not** a product app, **not** a toy-demo farm, and **not** a speculative
> PWA-Base extraction programme.

| | |
| --- | --- |
| **Date** | 2026-08-08 |
| **Consumes** | `@songara/pwa-base` via `file:../PWA-Base` (SoloSiteApp shell) **and** `@songara/pwa-base/preview/*` wherever a Preview package exists |
| **Lifecycle SoT** | [ADR-008](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/008-preview-stable-capability-lifecycle.md) · [capability-lifecycle](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/capability-lifecycle.md) · [preview-packages](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/preview-packages.md) |
| **Research SoT** | [`../research/capability-catalogue.md`](../research/capability-catalogue.md) |
| **App entry** | [`../../src/site.ts`](../../src/site.ts), [`../../src/catalogue/`](../../src/catalogue/) |

## Purpose

Answer, for any capability *X*:

> If we wanted to build *X*, what is the state of the art, how capable is it, and how
> well does it integrate into the Songara ecosystem?

Outputs are **engineering knowledge**: evaluations, benchmarks, integration notes, and
reusable ideas. Implementations exist only to **exercise and validate** a library or
platform API — they are catalogue artefacts, not products.

## Non-goals

- Building customer-facing products in this repo
- Throwaway demos that are deleted after a spike
- Implementing Preview wrappers here — wrappers live in PWA-Base `packages/preview-*`
- Graduating Preview → Stable from catalogue evidence alone (products never depend on
  Test-PWA)
- Re-implementing libraries that already exist (understand → evaluate → integrate →
  benchmark → document)

## Information architecture

```text
/                          Catalogue home (all capability areas)
/{area}                    Capability summary (comparison table of subroutes)
/{area}/{exploration}      One capability facet OR one OSS implementation
```

Examples:

```text
/animation
  /waapi
  /motion
  /springs
  /layout-transitions
  /lottie
  /rive
  /gsap
/physics
  /rapier
  /matter
  /planck
  /constraints
/camera
/computer-vision
/audio
/charts
/maps
/whiteboards
/ocr
/offline-storage
/pwa-runtime
```

Each **top-level route** is a capability area. Each **subroute** explores **one** facet
or **one** OSS implementation. Nothing is throwaway: every sub-ticket leaves a route
and updates the area summary.

## Artefact contract (every exploration subroute)

| Section | Required |
| --- | --- |
| Concise explanation | Yes |
| OSS project(s) under evaluation | Yes (or “platform API”) |
| Practical implementation using that stack | Yes — minimal but real |
| Visual validation (where appropriate) | Yes when the capability is visual |
| Performance observations | Yes |
| Browser compatibility | Yes |
| Strengths / weaknesses | Yes |
| Developer experience | Yes |
| Product ideas unlocked | Yes (ideation — not builds in this repo) |
| Reusable implementation ideas | Yes |
| Status | `Ready` · `Experimental` · `Rejected` · `Needs investigation` |

## Capability summary page

`/{area}` aggregates all registered explorations into a comparison table:

| Column |
| --- |
| Capability |
| Implementation |
| Status |
| OSS |
| Maturity |
| Performance |
| Browser Support |
| Offline |
| Developer Experience |
| Visual Quality |
| Accessibility |
| Complexity |
| Recommended |
| Overall Score |
| Notes |

Registry data lives in [`src/catalogue/`](../../src/catalogue/) so the summary stays the
permanent engineering table for that area (not a hand-maintained markdown fork).

## KanDev ticket structure

Organise work as **capability exploration**, not product features:

```text
Capability area (parent ticket)
  └── Exploration sub-ticket (one subroute)
```

Example:

```text
Physics
  ├── Rapier
  ├── Matter.js
  ├── Planck
  ├── Soft bodies
  ├── Constraints
  └── …
```

Each sub-ticket **must**:

1. Add or enrich `/{area}/{exploration}`
2. Register metadata in `src/catalogue/`
3. Update the area summary (automatic from registry)
4. Optionally deepen [`docs/research/capability-catalogue.md`](../research/capability-catalogue.md)
5. Leave nothing throwaway

### Ticket brief expectations

- Role: Executor (implementation) or Discovery (research-only depth notes)
- Out of scope: product polish, implementing Preview packages in this repo, unrelated
  refactors
- When Preview exists for the capability: import `@songara/pwa-base/preview/<name>` —
  do not duplicate the wrapper locally
- Validation: exploration checklist above + visual check when relevant
- Wrap-up: feature branch → PR → never merge from agents

## Evaluation philosophy

| Do | Don’t |
| --- | --- |
| Understand mature OSS | Rebuild the library |
| Integrate enough to judge fit | Ship a mini-product |
| Benchmark and document | Optimise for App Store narratives |
| Consume Preview when it exists | Maintain a parallel local wrapper |
| Mark Rejected honestly | Keep weak stacks as “Ready” |

## Relationship with PWA-Base

Lifecycle ([ADR-008](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/008-preview-stable-capability-lifecycle.md)):

```text
Research → Catalogue (Test-PWA) → Engineering evaluation
  → Preview integration (PWA-Base) → Product consumption → Stable API (PWA-Base)
```

| Concern | Owner |
| --- | --- |
| Research, demos, comparisons, benchmarks, scoring, docs | **This catalogue** |
| Thin Preview wrappers (`packages/preview-*`) | **PWA-Base** |
| Runtime, theme, Stable kits | **PWA-Base** |
| Real product usage | **Sibling product repos** (never depend on Test-PWA) |

This catalogue **consumes** `@songara/pwa-base` for chrome/runtime/tokens and
**consumes** `@songara/pwa-base/preview/*` to validate the same integration products
will use. It does **not** own wrapper implementations.

**Preview entry** is gated by engineering confidence and standardisation intent
([capability-lifecycle](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/capability-lifecycle.md)) —
not by “catalogue Ready alone,” and not by holding every wrap until two products exist.

**Stable graduation** still requires real **product** usage of the Preview API
unchanged. Hello and this catalogue are **not** product consumers for Stable.
ADR-003’s two-consumer check remains a preferred Stable confidence signal when a
second product exists; it is no longer the primary gate for entering Preview.

## Delivery roadmap (catalogue enrichment)

| Wave | Focus | Intent |
| ---: | --- | --- |
| 0 | Scaffold | Home + registry-driven routes |
| 1 | **Top five areas** | `/animation` · `/physics` · `/camera` · `/audio` · `/offline-storage` — see [`top-five-routes.md`](./top-five-routes.md) |
| 2 | Computer vision · OCR | After camera baseline |
| 3 | Charts · Maps · Whiteboards | Visual data & spatial stacks |
| 4 | PWA runtime · Accessibility · Content packs | Platform pages with same artefact contract |

**Parked:** Payments; on-device LLM.

Within an area, prefer **several thin OSS comparisons** over one deep product-like build.

## App module layout

```text
src/
  catalogue/           # Registry + types + stubs (SoT for summary tables)
  explorations/        # Concrete exploration implementations (e.g. animation/waapi)
  pages/               # Home, summary shell, ExplorationStubPage
  site.ts              # defineSite routes generated from registry
```

Deep dive for the first five areas: [`top-five-routes.md`](./top-five-routes.md).

## Validation

- Catalogue home lists registered areas
- Area summary table matches registry entries
- Exploration page fills the artefact contract
- `pnpm build` (or npm) succeeds with sibling `file:../PWA-Base` linker
- Docs architecture matches runtime routes

## Follow-ups

- Executor: Wave 1 animation explorations as separate sub-tickets
- Keep research master scores in sync when an exploration changes Recommended/Status
- Never delete an exploration without marking `Rejected` and leaving the record
