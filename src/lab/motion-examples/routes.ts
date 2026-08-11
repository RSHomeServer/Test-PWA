import {
  MOTION_EXPERIENCES,
} from './catalog'

/** Extra site routes for named experiences (exact paths). */
export function motionExampleSiteRoutes(): { path: string }[] {
  return MOTION_EXPERIENCES.map((e) => ({
    path: `animation/Motion/Examples/${e.id}`,
  }))
}
