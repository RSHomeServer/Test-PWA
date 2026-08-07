import type { ComponentType } from 'react'
import { defineSite, SITE_CAPABILITY } from '@songara/pwa-base'
import { catalogueSiteRoutes } from './catalogue/registry'
import { CatalogueHomePage } from './pages/CatalogueHomePage'
import { CapabilitySummaryPage } from './pages/CapabilitySummaryPage'
import { ExplorationStubPage } from './pages/ExplorationStubPage'
import { AnimationWaapiPage } from './explorations/animation/waapi'

/** Concrete exploration pages (replace stubs as Executors finish work). */
const explorationPages: Record<string, ComponentType> = {
  'animation/waapi': AnimationWaapiPage,
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
