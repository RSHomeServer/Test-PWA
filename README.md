# Songara Capability Lab (Test-PWA)

This repository is Songara’s **Engineering Capability Lab** — a permanent
reference for mature browser capabilities and the OSS ecosystems behind them.

It is **not** a product app, **not** a collection of throwaway demos, and **not**
an MDN/Storybook-style API facet catalogue.

> If we wanted to build *X*, what is the state of the art, how capable is it, and how
> well does it integrate into the Songara ecosystem?

## Docs

| Doc | Role |
| --- | --- |
| [`docs/architecture/capability-catalogue-app.md`](docs/architecture/capability-catalogue-app.md) | Lab architecture, four-section IA, PWA-Base relationship |
| [`docs/research/capability-catalogue.md`](docs/research/capability-catalogue.md) | Scored research SoT + enrichment roadmap |
| [`docs/research/oss-capability-catalogue.md`](docs/research/oss-capability-catalogue.md) | Historical library-oriented companion |

## App routes

| Path | Meaning |
| --- | --- |
| `/` | Lab home |
| `/animation`, `/physics`, `/camera`, `/audio`, `/offline-storage` | Area summaries (stacks) |
| `/{area}/{stack}` | Slim stack hub |
| `/{area}/{stack}/Overview` | Stack overview |
| `/{area}/{stack}/Preview-Validation` | Preview diagnostics (or honest not-backed) |
| `/{area}/{stack}/Examples` | Examples placeholder (Wave B later) |

Deep dive: [`docs/architecture/capability-catalogue-app.md`](docs/architecture/capability-catalogue-app.md).

## Develop

```bash
node "${SONGARA_PROJECTS_ROOT:-$HOME/projects}/PWA-Base/scripts/ensure-sibling-file-deps.mjs"
npm install
npm run dev
```

Depends on `"@songara/pwa-base": "file:../PWA-Base"` — do not rewrite that spec.
