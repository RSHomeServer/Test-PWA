# Songara Capability Catalogue (Test-PWA)

This repository is Songara’s **Engineering Capability Catalogue** — a permanent
reference for mature browser capabilities and the OSS ecosystems behind them.

It is **not** a product app and **not** a collection of throwaway demos.

> If we wanted to build *X*, what is the state of the art, how capable is it, and how
> well does it integrate into the Songara ecosystem?

## Docs

| Doc | Role |
| --- | --- |
| [`docs/architecture/capability-catalogue-app.md`](docs/architecture/capability-catalogue-app.md) | App architecture, routes, ticket shape, PWA-Base relationship |
| [`docs/research/capability-catalogue.md`](docs/research/capability-catalogue.md) | Scored research SoT + enrichment roadmap |
| [`docs/research/oss-capability-catalogue.md`](docs/research/oss-capability-catalogue.md) | Historical library-oriented companion |

## App routes

| Path | Meaning |
| --- | --- |
| `/` | Catalogue home |
| `/animation` | Animation area summary table |
| `/animation/waapi` | First exploration (Web Animations API baseline) |

Further areas and explorations are added via KanDev **capability → exploration** tickets.
Each ticket leaves a route and updates `src/catalogue/registry.ts`.

## Develop

```bash
node "${SONGARA_PROJECTS_ROOT:-$HOME/projects}/PWA-Base/scripts/ensure-sibling-file-deps.mjs"
npm install
npm run dev
```

Depends on `"@songara/pwa-base": "file:../PWA-Base"` — do not rewrite that spec.
