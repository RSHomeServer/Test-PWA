/** Named Motion Examples experiences under `/animation/Motion/Examples/…`. */

export type MotionExperienceId =
  | 'Menus-Overlays'
  | 'Transitions'
  | 'Pressables'

export type MotionExperience = {
  id: MotionExperienceId
  title: string
  blurb: string
  /** Public (non-Motion+) motion.dev tutorials lifted into the lab */
  inspiredBy: { name: string; url: string }[]
}

export const MOTION_EXAMPLES_AREA = 'animation'
export const MOTION_EXAMPLES_GROUP = 'Motion'

export const MOTION_EXPERIENCES: readonly MotionExperience[] = [
  {
    id: 'Menus-Overlays',
    title: 'Menus & overlays',
    blurb:
      'Public ports of the Variants sidebar menu and Exit animation tutorials — clip-path reveal, stagger, and presence.',
    inspiredBy: [
      {
        name: 'Variants',
        url: 'https://motion.dev/examples/react-variants',
      },
      {
        name: 'Exit animation',
        url: 'https://motion.dev/examples/react-exit-animation',
      },
    ],
  },
  {
    id: 'Transitions',
    title: 'Page & section transitions',
    blurb:
      'Public ports of Shared layout tabs, AnimatePresence modes (sync/wait/popLayout), and layout reorder.',
    inspiredBy: [
      {
        name: 'Shared layout animation',
        url: 'https://motion.dev/examples/react-shared-layout-animation',
      },
      {
        name: 'AnimatePresence modes',
        url: 'https://motion.dev/examples/react-animate-presence-modes',
      },
      {
        name: 'Reorder items',
        url: 'https://motion.dev/examples/react-reorder-items',
      },
    ],
  },
  {
    id: 'Pressables',
    title: 'Buttons & pressables',
    blurb:
      'Public ports of Gestures (hover/tap), Layout animation toggle, and Exit whileTap.',
    inspiredBy: [
      {
        name: 'Gestures',
        url: 'https://motion.dev/examples/react-gestures',
      },
      {
        name: 'Layout animation',
        url: 'https://motion.dev/examples/react-layout-animation',
      },
      {
        name: 'Exit animation',
        url: 'https://motion.dev/examples/react-exit-animation',
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
