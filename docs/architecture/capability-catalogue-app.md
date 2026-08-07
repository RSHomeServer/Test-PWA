# Engineering Capability Catalogue (Test-PWA)

> **Identity:** This repository is Songara’s **Engineering Capability Catalogue** —
> a permanent, browsable reference for mature browser capabilities and the OSS behind
> them. It is **not** a product app, **not** a toy-demo farm, and **not** a speculative
> PWA-Base extraction programme.

| | |
| --- | --- |
| **Date** | 2026-08-07 |
| **Consumes** | `@songara/pwa-base` via `file:../PWA-Base` (SoloSiteApp shell only) |
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
- Promoting code into PWA-Base because a single exploration was useful
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
- Out of scope: product polish, PWA-Base promotion, unrelated refactors
- Validation: exploration checklist above + visual check when relevant
- Wrap-up: feature branch → PR → never merge from agents

## Evaluation philosophy

| Do | Don’t |
| --- | --- |
| Understand mature OSS | Rebuild the library |
| Integrate enough to judge fit | Ship a mini-product |
| Benchmark and document | Optimise for App Store narratives |
| Capture reusable *ideas* | Speculatively extract packages |
| Mark Rejected honestly | Keep weak stacks as “Ready” |

## Relationship with PWA-Base

This catalogue **consumes** `@songara/pwa-base` for chrome/runtime/tokens. It does not
exist to feed PWA-Base.

Ask only after **repeated evidence across multiple future products**:

> What reusable abstractions naturally emerged?

Promotion still follows ADR-003 / promote-to-pwa-base. Hello and this catalogue app are
**not** product consumers for that gate.

## Delivery roadmap (catalogue enrichment)

Order work to **expand the catalogue**, alternating *kinds of evidence* without treating
slices as product demos:

| Wave | Focus | Intent |
| ---: | --- | --- |
| 0 | Scaffold (this PR) | Home index + one area (`/animation`) + one exploration |
| 1 | Animation area | Add Motion, springs, Lottie/Rive/GSAP explorations as sub-tickets |
| 2 | Physics area | Rapier, Matter, constraints, … |
| 3 | Camera → CV → OCR | Capture and vision stack comparisons |
| 4 | Audio | Web Audio, Tone, Howler |
| 5 | Charts / Maps / Whiteboards | Visual data & spatial stacks |
| 6 | Offline storage / PWA runtime | Platform capability pages (same contract; less “visual wow”) |

**Parked:** Payments; on-device LLM (may revisit after smaller on-device AI explorations).

Within an area, prefer **several thin OSS comparisons** over one deep product-like build.

## App module layout

```text
src/
  catalogue/           # Registry + types (SoT for summary tables)
  explorations/        # One folder per area / exploration implementation
  pages/               # Home, summary shell, shared exploration chrome
  site.ts              # defineSite routes (generated from registry or listed)
```

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
