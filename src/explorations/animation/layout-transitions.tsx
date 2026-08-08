import { useId, useState } from 'react'
import {
  LayoutGroup,
  motion,
  resolveTransition,
  useSongaraMotion,
} from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../catalogue/registry'
import { ExplorationShell } from '../ExplorationShell'

const ITEMS = ['A', 'B', 'C', 'D'] as const
const SPRING = { type: 'spring', stiffness: 320, damping: 28 } as const

/**
 * Exploration: shared layout / FLIP-style transitions via Preview Motion layout.
 */
export function AnimationLayoutTransitionsPage() {
  const record = getExploration('animation', 'layout-transitions')
  const { reducedMotion: systemReduce } = useSongaraMotion(SPRING)
  const reduceId = useId()
  const [forceReduce, setForceReduce] = useState(false)
  const [expanded, setExpanded] = useState<string | null>('A')
  const reduce = forceReduce || systemReduce
  const transition = resolveTransition(reduce, SPRING)

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      explorationId="layout-transitions"
      record={record}
      lead="Layout transitions (FLIP-style) when boxes resize or reorder — via `@songara/pwa-base/preview/motion` layout props vs manual WAAPI FLIP."
      visualNote="Visual validation: click tiles — expanded tile should morph size/position when motion is allowed."
      performance={
        <p>
          Measures layout and animates transforms — watch large lists. Score{' '}
          {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Motion JS + modern layout APIs. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Declarative layoutId / layout props</li>
          <li>Better DX than hand-rolled FLIP</li>
          <li>Pairs with spring transitions</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Can fight CSS grid/flex edge cases</li>
          <li>Costly if many siblings animate</li>
          <li>Debugging jumps needs care</li>
        </ul>
      }
      developerExperience={
        <p>
          High for common expand/collapse patterns. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Expandable cards, filter chip reflow, responsive toolbars that morph
          between compact and expanded states.
        </p>
      }
      reusableIdeas={
        <p>
          Scope layout animations to small groups; disable under reduced motion
          via Preview helpers; prefer opacity+transform for decorative-only cases.
        </p>
      }
    >
      <div className="cat__controls">
        <label htmlFor={reduceId}>
          <input
            id={reduceId}
            type="checkbox"
            checked={reduce}
            onChange={(e) => setForceReduce(e.target.checked)}
          />{' '}
          Simulate reduced motion
        </label>
      </div>
      <LayoutGroup>
        <div className="cat__layout-grid" role="list">
          {ITEMS.map((id) => {
            const isExpanded = expanded === id
            return (
              <motion.button
                key={id}
                type="button"
                role="listitem"
                className="cat__layout-item"
                data-expanded={isExpanded ? 'true' : 'false'}
                layout={!reduce}
                transition={transition}
                onClick={() => setExpanded(isExpanded ? null : id)}
              >
                {id}
              </motion.button>
            )
          })}
        </div>
      </LayoutGroup>
    </ExplorationShell>
  )
}
