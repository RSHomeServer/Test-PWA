import { defineSite, SITE_CAPABILITY } from '@songara/pwa-base'
import { CatalogueHomePage } from './pages/CatalogueHomePage'
import { CapabilitySummaryPage } from './pages/CapabilitySummaryPage'
import { AnimationWaapiPage } from './explorations/animation/waapi'

/**
 * Test PWA — Engineering Capability Catalogue.
 * Routes mirror capability areas; see docs/architecture/capability-catalogue-app.md.
 */
export const testSite = defineSite({
  id: 'test-pwa',
  basePath: '/',
  title: 'Songara Capability Catalogue',
  capabilities: [SITE_CAPABILITY.offline],
  routes: [
    { path: '', component: CatalogueHomePage },
    // More specific exploration paths before area summaries
    { path: 'animation/waapi', component: AnimationWaapiPage },
    { path: 'animation', component: CapabilitySummaryPage },
  ],
})
