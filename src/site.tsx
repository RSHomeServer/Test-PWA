import { lazy, type ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { defineSite, SITE_CAPABILITY } from '@songara/pwa-base'
import {
  catalogueLegacyRedirects,
  catalogueSiteRoutes,
} from './catalogue/registry'
import { CatalogueHomePage } from './pages/CatalogueHomePage'
import { CatalogueGroupHubPage } from './pages/CatalogueGroupHubPage'
import { CapabilitySummaryPage } from './pages/CapabilitySummaryPage'
import { ExplorationStubPage } from './pages/ExplorationStubPage'
import { LazyExploration } from './explorations/LazyExploration'

function lazyPage(loader: () => Promise<{ default: ComponentType }>): ComponentType {
  const Page = lazy(loader)
  return function LazyBound() {
    return <LazyExploration Page={Page} />
  }
}

function redirectPage(to: string): ComponentType {
  return function RedirectBound() {
    return <Navigate to={`/${to}`} replace />
  }
}

/** Concrete exploration pages (replace stubs as Executors finish work). */
const explorationPages: Record<string, ComponentType> = {
  'animation/native/Web-Animations-API': lazyPage(() =>
    import('./explorations/animation/native/Web-Animations-API').then((m) => ({
      default: m.AnimationWaapiPage,
    })),
  ),
  'animation/native/Reduced-Motion': lazyPage(() =>
    import('./explorations/animation/native/Reduced-Motion').then((m) => ({
      default: m.AnimationReducedMotionPage,
    })),
  ),
  'animation/native/View-Transitions': lazyPage(() =>
    import('./explorations/animation/native/View-Transitions').then((m) => ({
      default: m.AnimationViewTransitionsPage,
    })),
  ),
  'animation/Motion/Overview': lazyPage(() =>
    import('./explorations/animation/Motion/Overview').then((m) => ({
      default: m.AnimationMotionPage,
    })),
  ),
  'animation/Motion/Springs': lazyPage(() =>
    import('./explorations/animation/Motion/Springs').then((m) => ({
      default: m.AnimationSpringsPage,
    })),
  ),
  'animation/Motion/Layout-Transitions': lazyPage(() =>
    import('./explorations/animation/Motion/Layout-Transitions').then((m) => ({
      default: m.AnimationLayoutTransitionsPage,
    })),
  ),
  'animation/Motion/Shared-Element': lazyPage(() =>
    import('./explorations/animation/Motion/Shared-Element').then((m) => ({
      default: m.AnimationSharedElementPage,
    })),
  ),
  'animation/Motion/Gestures': lazyPage(() =>
    import('./explorations/animation/Motion/Gestures').then((m) => ({
      default: m.AnimationGesturesPage,
    })),
  ),
  'animation/Motion/Scroll': lazyPage(() =>
    import('./explorations/animation/Motion/Scroll').then((m) => ({
      default: m.AnimationScrollPage,
    })),
  ),
  'animation/Motion/Exit-Animations': lazyPage(() =>
    import('./explorations/animation/Motion/Exit-Animations').then((m) => ({
      default: m.AnimationExitAnimationsPage,
    })),
  ),
  'animation/Motion/Variants': lazyPage(() =>
    import('./explorations/animation/Motion/Variants').then((m) => ({
      default: m.AnimationVariantsPage,
    })),
  ),
  'animation/Motion/SVG': lazyPage(() =>
    import('./explorations/animation/Motion/SVG').then((m) => ({
      default: m.AnimationSvgPage,
    })),
  ),
  'animation/Motion/Motion-Values': lazyPage(() =>
    import('./explorations/animation/Motion/Motion-Values').then((m) => ({
      default: m.AnimationMotionValuesPage,
    })),
  ),
  'animation/Lottie/Overview': lazyPage(() =>
    import('./explorations/animation/Lottie/Overview').then((m) => ({
      default: m.AnimationLottieOverviewPage,
    })),
  ),
  'animation/Lottie/Playback': lazyPage(() =>
    import('./explorations/animation/Lottie/Playback').then((m) => ({
      default: m.AnimationLottiePlaybackPage,
    })),
  ),
  'animation/Lottie/Controls': lazyPage(() =>
    import('./explorations/animation/Lottie/Controls').then((m) => ({
      default: m.AnimationLottieControlsPage,
    })),
  ),
  'animation/Lottie/Segments': lazyPage(() =>
    import('./explorations/animation/Lottie/Segments').then((m) => ({
      default: m.AnimationLottieSegmentsPage,
    })),
  ),
  'animation/Lottie/Interactivity': lazyPage(() =>
    import('./explorations/animation/Lottie/Interactivity').then((m) => ({
      default: m.AnimationLottieInteractivityPage,
    })),
  ),
  'animation/Rive/Interactive-Graphics': lazyPage(() =>
    import('./explorations/animation/Rive/Interactive-Graphics').then((m) => ({
      default: m.AnimationRivePage,
    })),
  ),
  'animation/GSAP/Timelines': lazyPage(() =>
    import('./explorations/animation/GSAP/Timelines').then((m) => ({
      default: m.AnimationGsapPage,
    })),
  ),
  'animation/tsParticles/Ambient-Field': lazyPage(() =>
    import('./explorations/animation/tsParticles/Ambient-Field').then((m) => ({
      default: m.AnimationParticlesPage,
    })),
  ),
  'offline-storage/Dexie.js/Overview': lazyPage(() =>
    import('./explorations/offline-storage/Dexie.js/Overview').then((m) => ({
      default: m.OfflineStorageDexiePage,
    })),
  ),
  'offline-storage/Dexie.js/Migrations': lazyPage(() =>
    import('./explorations/offline-storage/Dexie.js/Migrations').then((m) => ({
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
    ...Object.entries(catalogueLegacyRedirects).map(([from, to]) => ({
      path: from,
      component: redirectPage(to),
    })),
    ...catalogueSiteRoutes().map((r) => {
      if (r.kind === 'area') {
        return { path: r.path, component: CapabilitySummaryPage }
      }
      if (r.kind === 'group') {
        return { path: r.path, component: CatalogueGroupHubPage }
      }
      const Comp = explorationPages[r.path] ?? ExplorationStubPage
      return { path: r.path, component: Comp }
    }),
  ],
})
