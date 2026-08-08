# Research notes — Songara capability catalogue

## Source of truth

| Doc | Role |
| --- | --- |
| [`../architecture/capability-catalogue-app.md`](../architecture/capability-catalogue-app.md) | **App architecture** — routes, exploration contract, KanDev ticket shape, Preview consume model |
| [`../architecture/oss-adoption-plan.md`](../architecture/oss-adoption-plan.md) | Adoption plan + **ADR-008 status note** (Preview vs Stable) |
| [`capability-catalogue.md`](./capability-catalogue.md) | **Living research catalogue** — capabilities, scores, ranking, enrichment roadmap |
| [`capabilities/`](./capabilities/) | Optional depth-pass markdown notes |
| [`oss-capability-catalogue.md`](./oss-capability-catalogue.md) | Historical library-oriented survey (evidence companion; two-consumer wording is historical — see ADR-008) |

## Philosophy

Capabilities first. Libraries are evidence. Test-PWA is the browsable Engineering
Capability Catalogue. PWA-Base owns Preview wrappers (`@songara/pwa-base/preview/*`);
the catalogue validates by consuming those exports. Catalogue demos alone do **not**
graduate Preview → Stable (products never depend on Test-PWA). See
[ADR-008](https://github.com/RSHomeServer/PWA-Base/blob/main/docs/adr/008-preview-stable-capability-lifecycle.md).

## Diligence reminders

| Topic | Action |
| --- | --- |
| GSAP | Confirm standard license before use |
| tldraw | Confirm redistribution terms |
| MediaPipe Tasks | Privacy/metrics notices + model asset terms |
| Model & map tile assets | Separate from library SPDX; prefer Content Packs |
| RxDB / Dexie Cloud plugins | Distinguish Apache core from commercial add-ons |

## Snapshot date

Master catalogue weighted scores: **2026-08-07**. Re-score axes when a depth pass lands.
