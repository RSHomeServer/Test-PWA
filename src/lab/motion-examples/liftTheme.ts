/**
 * Lifted Motion Examples — public tutorial sources only (no Motion+).
 * Imports: `@songara/pwa-base/preview/motion` exclusively.
 *
 * `stagger()` is not on the Preview barrel; variants use `staggerChildren`.
 */

import type { CSSProperties } from 'react'

/** Shared stage tokens approximating Motion example CSS variables. */
export const liftVars = {
  '--mex-accent': '#ff008c',
  '--mex-hue-1': '#ff008c',
  '--mex-hue-2': '#d309e1',
  '--mex-hue-3': '#9c1aff',
  '--mex-hue-4': '#7700ff',
  '--mex-hue-5': '#ff5449',
  '--mex-white': '#ffffff',
  '--mex-black': '#0f1115',
  '--mex-border': 'rgba(0,0,0,0.12)',
} as CSSProperties

export const liftStageStyle: CSSProperties = {
  ...liftVars,
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  minHeight: '22rem',
  padding: '1.25rem',
  borderRadius: '0.75rem',
  border: '1px solid color-mix(in srgb, currentColor 16%, transparent)',
  background: 'color-mix(in srgb, currentColor 4%, transparent)',
  overflow: 'hidden',
}
