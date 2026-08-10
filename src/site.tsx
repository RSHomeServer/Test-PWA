import type { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { defineSite, SITE_CAPABILITY } from '@songara/pwa-base'
import {
  catalogueLegacyRedirects,
  catalogueSiteRoutes,
} from './catalogue/registry'
import { CatalogueHomePage } from './pages/CatalogueHomePage'
import { CapabilitySummaryPage } from './pages/CapabilitySummaryPage'
import {
  ExamplesPlaceholderPage,
  StackHubPage,
  StackOverviewPage,
} from './lab/LabPages'
import { PreviewValidationPage } from './lab/PreviewValidationPage'

function redirectPage(to: string): ComponentType {
  return function RedirectBound() {
    return <Navigate to={`/${to}`} replace />
  }
}

function labSectionPage(sectionId: string): ComponentType {
  switch (sectionId) {
    case 'Overview':
      return StackOverviewPage
    case 'Preview-Validation':
      return PreviewValidationPage
    case 'Examples':
      return ExamplesPlaceholderPage
    default:
      return StackHubPage
  }
}

/**
 * Test PWA — Engineering Capability Lab.
 * Routes are generated from src/catalogue/registry.ts (four-section model).
 */
export const testSite = defineSite({
  id: 'test-pwa',
  basePath: '/',
  title: 'Songara Capability Lab',
  capabilities: [SITE_CAPABILITY.offline],
  routes: [
    { path: '', component: CatalogueHomePage },
    // Lab routes before legacy redirects so Title-Case hubs are not
    // shadowed by lowercase flat redirects under case-insensitive matching.
    ...catalogueSiteRoutes().map((r) => {
      if (r.kind === 'area') {
        return { path: r.path, component: CapabilitySummaryPage }
      }
      if (r.kind === 'group') {
        return { path: r.path, component: StackHubPage }
      }
      return {
        path: r.path,
        component: labSectionPage(r.sectionId ?? 'Overview'),
      }
    }),
    ...Object.entries(catalogueLegacyRedirects).map(([from, to]) => ({
      path: from,
      component: redirectPage(to),
    })),
  ],
})
