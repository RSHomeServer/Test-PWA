# Top five lab areas — route map (Wave A)

> Route map for the first five **capability areas** in the Engineering Capability
> Lab. Research scores remain in
> [`../research/capability-catalogue.md`](../research/capability-catalogue.md).
>
> App architecture: [`capability-catalogue-app.md`](./capability-catalogue-app.md).

| | |
| --- | --- |
| **Date** | 2026-08-10 (Wave A lab IA) |
| **Top five areas** | `/animation` · `/physics` · `/camera` · `/audio` · `/offline-storage` |
| **Registry** | [`../../src/catalogue/registry.ts`](../../src/catalogue/registry.ts) |

**Hard rule:** do not add new facet leaves to primary nav. Every stack exposes
Overview · Preview-Validation · Examples (placeholder) · slim hub.

---

## Shared shape (every stack)

```text
/{area}/{Stack}
/{area}/{Stack}/Overview
/{area}/{Stack}/Preview-Validation
/{area}/{Stack}/Examples
```

Former facet URLs (e.g. `/animation/Motion/Springs`, `/offline-storage/Dexie.js/Migrations`)
redirect to Overview.

---

## 1. `/animation`

| Stack | Preview | Status |
| --- | --- | --- |
| `native` | — | Ready |
| `Motion` | `@songara/pwa-base/preview/motion` | Ready |
| `Lottie` | `@songara/pwa-base/preview/lottie` | Ready |
| `Rive` | — | Experimental |
| `GSAP` | — | Experimental |
| `tsParticles` | — | Experimental |

## 2. `/physics`

| Stack | Preview | Status |
| --- | --- | --- |
| `Rapier` | — (held) | Needs investigation |
| `Matter.js` | — | Needs investigation |
| `Planck.js` | — | Needs investigation |
| `cannon-es` | — | Needs investigation |

## 3. `/camera`

| Stack | Preview | Status |
| --- | --- | --- |
| `native` | — | Needs investigation |
| `react-webcam` | — | Needs investigation |

## 4. `/audio`

| Stack | Preview | Status |
| --- | --- | --- |
| `native` | — | Needs investigation |
| `Tone.js` | — | Needs investigation |
| `Howler.js` | — | Needs investigation |
| `Songara-Audio-Kit` | Stable kit (not Preview) | Needs investigation |

## 5. `/offline-storage`

| Stack | Preview | Status |
| --- | --- | --- |
| `native` | — | Needs investigation |
| `idb` | — | Needs investigation |
| `Dexie.js` | `@songara/pwa-base/preview/dexie` | Ready |
| `localForage` | — | Needs investigation |
| `Songara-Pack-Store` | runtime contrast | Needs investigation |

---

## Wave B

Fold retained demos under `src/explorations/**` into `/{stack}/Examples/...`
experience children. Do not resurrect facet peers of Overview in primary nav.
