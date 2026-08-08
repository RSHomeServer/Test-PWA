import { lazy, type ComponentType } from 'react'
import { defineSite, SITE_CAPABILITY } from '@songara/pwa-base'
import { catalogueSiteRoutes } from './catalogue/registry'
import { CatalogueHomePage } from './pages/CatalogueHomePage'
import { CapabilitySummaryPage } from './pages/CapabilitySummaryPage'
import { ExplorationStubPage } from './pages/ExplorationStubPage'
import { LazyExploration } from './explorations/LazyExploration'

function lazyPage(loader: () => Promise<{ default: ComponentType }>): ComponentType {
  const Page = lazy(loader)
  return function LazyBound() {
    return <LazyExploration Page={Page} />
  }
}

/** Concrete exploration pages (replace stubs as Executors finish work). */
const explorationPages: Record<string, ComponentType> = {
  'animation/waapi': lazyPage(() =>
    import('./explorations/animation/waapi').then((m) => ({
      default: m.AnimationWaapiPage,
    })),
  ),
  'animation/motion': lazyPage(() =>
    import('./explorations/animation/motion').then((m) => ({
      default: m.AnimationMotionPage,
    })),
  ),
  'animation/springs': lazyPage(() =>
    import('./explorations/animation/springs').then((m) => ({
      default: m.AnimationSpringsPage,
    })),
  ),
  'animation/layout-transitions': lazyPage(() =>
    import('./explorations/animation/layout-transitions').then((m) => ({
      default: m.AnimationLayoutTransitionsPage,
    })),
  ),
  'animation/shared-element': lazyPage(() =>
    import('./explorations/animation/shared-element').then((m) => ({
      default: m.AnimationSharedElementPage,
    })),
  ),
  'animation/particles': lazyPage(() =>
    import('./explorations/animation/particles').then((m) => ({
      default: m.AnimationParticlesPage,
    })),
  ),
  'animation/lottie': lazyPage(() =>
    import('./explorations/animation/lottie').then((m) => ({
      default: m.AnimationLottiePage,
    })),
  ),
  'animation/rive': lazyPage(() =>
    import('./explorations/animation/rive').then((m) => ({
      default: m.AnimationRivePage,
    })),
  ),
  'animation/gsap': lazyPage(() =>
    import('./explorations/animation/gsap').then((m) => ({
      default: m.AnimationGsapPage,
    })),
  ),
  'animation/reduced-motion': lazyPage(() =>
    import('./explorations/animation/reduced-motion').then((m) => ({
      default: m.AnimationReducedMotionPage,
    })),
  ),
  'offline-storage/dexie': lazyPage(() =>
    import('./explorations/offline-storage/dexie').then((m) => ({
      default: m.OfflineStorageDexiePage,
    })),
  ),
  'offline-storage/migrations': lazyPage(() =>
    import('./explorations/offline-storage/migrations').then((m) => ({
      default: m.OfflineStorageMigrationsPage,
    })),
  ),
}

/**
 * Test PWA — Engineering Capability Catalogue.
 * Routes are generated from src/catalogue/registry.ts.
 */
export const testSite = defineSite({
  id: 'test-pwa',
  basePath: '/',
  title: 'Songara Capability Catalogue',
  capabilities: [SITE_CAPABILITY.offline],
  routes: [
    { path: '', component: CatalogueHomePage },
    ...catalogueSiteRoutes().map((r) => {
      if (r.kind === 'area') {
        return { path: r.path, component: CapabilitySummaryPage }
      }
      const key = r.path
      const Comp = explorationPages[key] ?? ExplorationStubPage
      return { path: r.path, component: Comp }
    }),
  ],
})
