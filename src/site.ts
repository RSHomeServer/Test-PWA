import { defineSite, SITE_CAPABILITY } from '@songara/pwa-base'
import { HomePage } from './pages/HomePage'

/** Test PWA — minimal consumer of `@songara/pwa-base` for foundation validation. */
export const testSite = defineSite({
  id: 'test-pwa',
  basePath: '/',
  title: 'Test PWA',
  capabilities: [SITE_CAPABILITY.offline],
  routes: [{ path: '', component: HomePage }],
})
