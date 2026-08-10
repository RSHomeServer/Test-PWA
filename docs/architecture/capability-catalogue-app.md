# Engineering Capability Lab (Test-PWA)

> **Identity:** This repository is Songara’s **Engineering Capability Lab** —
> a permanent, browsable lab for mature browser capabilities and the OSS behind
> them. It is **not** a product app, **not** a toy-demo farm, **not** an
> MDN/Storybook API reference of facet leaves, and **not** a speculative
> PWA-Base extraction programme.

| | |
| --- | --- |
| **Date** | 2026-08-10 |
| **Consumes** | `@songara/pwa-base` via `file:../PWA-Base` (SoloSiteApp shell) **and** `@songara/pwa-base/preview/*` wherever a Preview package exists |
| **Lifecycle SoT** | [ADR-008](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/008-preview-stable-capability-lifecycle.md) · [capability-lifecycle](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/capability-lifecycle.md) · [preview-packages](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/guides/preview-packages.md) |
| **Research SoT** | [`../research/capability-catalogue.md`](../research/capability-catalogue.md) |
| **App entry** | [`../../src/site.tsx`](../../src/site.tsx), [`../../src/catalogue/`](../../src/catalogue/) |

## Purpose

Answer, for any capability *X*:

> If we wanted to build *X*, what is the state of the art, how capable is it, and how
> well does it integrate into the Songara ecosystem?

Outputs are **engineering knowledge**: evaluations, Preview diagnostics, and
reusable ideas. Rich Examples experiences land in a later wave — Wave A focuses
on orientation and Preview validation.

## Non-goals

- Building customer-facing products in this repo
- Throwaway demos that are deleted after a spike
- Implementing Preview wrappers here — wrappers live in PWA-Base `packages/preview-*`
- Graduating Preview → Stable from lab evidence alone (products never depend on
  Test-PWA)
- Re-implementing libraries that already exist (understand → evaluate → integrate →
  validate → document)
- Growing an MDN-style **facet leaf** tree as primary navigation

## Information architecture (Wave A)

```text
/                          Capability Lab home (all areas)
/{area}                    Area summary — stacks + light status
/{area}/{stack}            Slim stack hub (links to lab sections)
/{area}/{stack}/Overview
/{area}/{stack}/Preview-Validation
/{area}/{stack}/Examples   Placeholder only in Wave A
```

### Four-section model (uniform for every stack)

| # | Section | Route | Wave A deliverable |
| ---: | --- | --- | --- |
| 1 | Overview | `/{area}/{Tech}/Overview` | What it does; why Songara; status; Preview package; Songara behaviour; brief a11y/perf/alts |
| 2 | Preview Validation | `/{area}/{Tech}/Preview-Validation` | Diagnostics (import/peer/helpers/policies) or honest “not Preview-backed yet” |
| 3 | Stack brief | `/{area}/{Tech}` | Slim hub linking the three sections — **not** a facet index |
| 4 | Examples | `/{area}/{Tech}/Examples` | Placeholder (“Examples wave later”) |

Examples:

```text
/animation
  /Motion
    /Overview
    /Preview-Validation
    /Examples
  /Lottie
  /native
/physics/Rapier
/offline-storage/Dexie.js
```

### Hard rule — freeze new facet leaves

Do **not** add new primary-nav facet leaves (e.g. `/Motion/Springs` as a peer of
Overview). Former facet URLs **redirect** into Overview or the stack hub.
Working demo modules may remain under `src/explorations/**` for Wave B folding —
they are not primary navigation.

## Artefact contract (Wave A pages)

| Page type | Required |
| --- | --- |
| Overview | Concise what/why/status/Preview/Songara notes; brief a11y/perf/alts |
| Preview Validation | Green-check diagnostics **or** honest not-backed message |
| Stack hub | Orientation + links to Overview / Preview Validation / Examples |
| Examples | Placeholder only in Wave A |

The legacy ten-section exploration shell is **not** mandatory for these lab page
types. It may still wrap retained Wave B demo modules.

## Capability area summary

`/{area}` lists registered **stacks** with status and Preview presence. It is
not a facet score-grid as the main purpose.

Registry data lives in [`src/catalogue/`](../../src/catalogue/).

## KanDev ticket structure

Organise work as **stack lab enrichment**, not product features:

```text
Capability area (parent)
  └── Stack ticket (Overview + Validation + hub; Examples later)
```

Each stack ticket **must**:

1. Keep the four lab sections for that stack
2. Register metadata in `src/catalogue/`
3. Update area summary (automatic from registry)
4. Optionally deepen research docs
5. **Not** introduce new facet leaves into primary nav

## Evaluation philosophy

| Do | Don’t |
| --- | --- |
| Understand mature OSS | Rebuild the library |
| Validate Preview when it exists | Fake a green Validation without Preview |
| Document Rejected honestly | Keep weak stacks as “Ready” |
| Consume Preview when it exists | Maintain a parallel local wrapper |
| Fold demos into Examples later | Grow facet primary nav |

## Relationship with PWA-Base

Lifecycle ([ADR-008](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/008-preview-stable-capability-lifecycle.md)):

```text
Research → Capability Lab (Test-PWA) → Engineering evaluation
  → Preview integration (PWA-Base) → Product consumption → Stable API (PWA-Base)
```

| Concern | Owner |
| --- | --- |
| Research, Overviews, Preview Validation, Examples | **This lab** |
| Thin Preview wrappers (`packages/preview-*`) | **PWA-Base** |
| Runtime, theme, Stable kits | **PWA-Base** |
| Real product usage | **Sibling product repos** (never depend on Test-PWA) |

## Delivery roadmap

| Wave | Focus | Intent |
| ---: | --- | --- |
| A | Lab IA | Four sections for every current stack; facet nav retired |
| B | Examples | Rich experiences under `/{stack}/Examples/...` |
| Later | New areas | Computer vision, charts, maps, … |

## App module layout

```text
src/
  catalogue/           # Registry + types (SoT for lab stacks)
  lab/                 # Overview / Validation / Examples / hub pages
  explorations/        # Retained Wave B demo modules (not primary nav)
  pages/               # Home, area summary, browse chrome
  site.tsx             # defineSite routes generated from registry
```

## Validation

- Lab home lists registered areas
- Every stack exposes Overview + Preview-Validation + hub + Examples placeholder
- Old facet URLs redirect
- Preview Validation is honest when no Preview exists
- `npm run build` succeeds with sibling `file:../PWA-Base` linker
- Docs architecture matches runtime routes
