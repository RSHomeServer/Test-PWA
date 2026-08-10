/** Named Motion Examples experiences under `/animation/Motion/Examples/…`. */

export type MotionExperienceId =
  | 'Menus-Overlays'
  | 'Transitions'
  | 'Pressables'

export type MotionExperience = {
  id: MotionExperienceId
  title: string
  blurb: string
  /** motion.dev examples adapted (MIT) */
  inspiredBy: { name: string; url: string }[]
}

export const MOTION_EXAMPLES_AREA = 'animation'
export const MOTION_EXAMPLES_GROUP = 'Motion'

export const MOTION_EXPERIENCES: readonly MotionExperience[] = [
  {
    id: 'Menus-Overlays',
    title: 'Menus & overlays',
    blurb:
      'Dropdown presence, a context panel, and a draggable sheet — product chrome that enters and exits cleanly.',
    inspiredBy: [
      {
        name: 'Mega Menu',
        url: 'https://motion.dev/examples/react-mega-menu',
      },
      {
        name: 'Context Menu',
        url: 'https://motion.dev/examples/react-context-menu',
      },
      {
        name: 'Sheet Modal',
        url: 'https://motion.dev/examples/react-sheet-modal',
      },
    ],
  },
  {
    id: 'Transitions',
    title: 'Page & section transitions',
    blurb:
      'Crossfading panels, layout morphs, and a shared-element expand — continuity between UI states.',
    inspiredBy: [
      {
        name: 'AnimateView: Toggle',
        url: 'https://motion.dev/examples/react-animate-view-toggle',
      },
      {
        name: 'App Store (simplified)',
        url: 'https://motion.dev/examples/react-app-store',
      },
    ],
  },
  {
    id: 'Pressables',
    title: 'Buttons & pressables',
    blurb:
      'Copy confirmation, a morphing action button, and a floating action control — micro-interactions that feel intentional.',
    inspiredBy: [
      {
        name: 'Copy Button',
        url: 'https://motion.dev/examples/react-copy-button',
      },
      {
        name: 'Dots Morph Button',
        url: 'https://motion.dev/examples/react-dots-morph-button',
      },
      {
        name: 'Floating Action Button',
        url: 'https://motion.dev/examples/react-floating-action-button',
      },
    ],
  },
] as const

export function getMotionExperience(
  id: string | undefined,
): MotionExperience | undefined {
  if (!id) return undefined
  return MOTION_EXPERIENCES.find((e) => e.id === id)
}

export function motionExamplesHubPath(): string {
  return `/${MOTION_EXAMPLES_AREA}/${MOTION_EXAMPLES_GROUP}/Examples`
}

export function motionExperiencePath(id: MotionExperienceId): string {
  return `${motionExamplesHubPath()}/${id}`
}
