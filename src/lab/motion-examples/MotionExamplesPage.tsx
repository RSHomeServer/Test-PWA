import type { ComponentType } from 'react'
import { useLocation } from 'react-router-dom'
import { getMotionExperience, type MotionExperienceId } from './catalog'
import { MotionExamplesHub } from './Hub'
import { MenusOverlaysExperience } from './MenusOverlays'
import { PressablesExperience } from './Pressables'
import { TransitionsExperience } from './Transitions'

function experienceFromPath(pathname: string): MotionExperienceId | undefined {
  const parts = pathname.replace(/^\//, '').split('/').filter(Boolean)
  // animation / Motion / Examples / :id
  const id = parts[3]
  const found = getMotionExperience(id)
  return found?.id
}

const EXPERIENCE_PAGES: Record<MotionExperienceId, ComponentType> = {
  'Menus-Overlays': MenusOverlaysExperience,
  Transitions: TransitionsExperience,
  Pressables: PressablesExperience,
}

/** Hub or named experience for Motion Examples. */
export function MotionExamplesPage() {
  const { pathname } = useLocation()
  const experienceId = experienceFromPath(pathname)
  if (experienceId) {
    const Page = EXPERIENCE_PAGES[experienceId]
    return <Page />
  }
  return <MotionExamplesHub />
}
