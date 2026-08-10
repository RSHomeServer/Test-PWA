import { useState } from 'react'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
} from '@songara/pwa-base/preview/motion'
import {
  DemoBlock,
  ExperienceHeader,
  MotionExamplesChrome,
} from './shared'
import { MotionStage, ReduceMotionToggle } from '../../explorations/animation/Motion/_shared'
import { MOTION_SPRING, useCatalogueMotion } from '../../explorations/animation/Motion/motionKit'

type PanelId = 'home' | 'detail' | 'settings'
type CardId = 'aurora' | 'ember' | 'tide'

const PANELS: { id: PanelId; title: string; body: string }[] = [
  {
    id: 'home',
    title: 'Home',
    body: 'Landing panel — crossfade / slide between sections.',
  },
  {
    id: 'detail',
    title: 'Detail',
    body: 'Detail panel — keep motion short so navigation stays readable.',
  },
  {
    id: 'settings',
    title: 'Settings',
    body: 'Settings panel — reduced motion snaps instantly.',
  },
]

const CARDS: { id: CardId; title: string; blurb: string }[] = [
  { id: 'aurora', title: 'Aurora', blurb: 'Cool blues and soft glow.' },
  { id: 'ember', title: 'Ember', blurb: 'Warm accents for alerts.' },
  { id: 'tide', title: 'Tide', blurb: 'Steady neutrals for chrome.' },
]

/**
 * Page & section transitions — panel switch, layout morph, shared expand.
 */
export function TransitionsExperience() {
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)
  const [panel, setPanel] = useState<PanelId>('home')
  const [expanded, setExpanded] = useState(false)
  const [activeCard, setActiveCard] = useState<CardId | null>(null)

  const activeMeta = CARDS.find((c) => c.id === activeCard)

  return (
    <MotionExamplesChrome experienceId="Transitions">
      <ExperienceHeader
        title="Page & section transitions"
        lead="Panel presence, layout resize, and shared-element expand — continuity without a new route tree."
      />
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />

      <DemoBlock
        title="Section panels"
        hint="AnimatePresence swaps the active panel (slide when motion is allowed)."
      >
        <div className="mex__tabs" role="tablist" aria-label="Section panels">
          {PANELS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={panel === p.id}
              className={`mex__tab${panel === p.id ? ' mex__tab--current' : ''}`}
              onClick={() => setPanel(p.id)}
            >
              {p.title}
            </button>
          ))}
        </div>
        <MotionStage label="Panel stage">
          <div className="mex__panel-frame">
            <AnimatePresence mode="wait" initial={false}>
              {PANELS.filter((p) => p.id === panel).map((p) => (
                <motion.div
                  key={p.id}
                  className="mex__panel"
                  role="tabpanel"
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  transition={transition}
                >
                  <h3 className="mex__panel-title">{p.title}</h3>
                  <p>{p.body}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </MotionStage>
      </DemoBlock>

      <DemoBlock
        title="Layout morph"
        hint="Toggle expands a tile with layout animation (FLIP-style)."
      >
        <button
          type="button"
          className="mex__btn"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Collapse' : 'Expand'} layout
        </button>
        <MotionStage label="Layout morph stage">
          <LayoutGroup>
            <motion.div
              layout={!reduce}
              className={`mex__layout-tile${expanded ? ' mex__layout-tile--wide' : ''}`}
              transition={transition}
            >
              <motion.strong layout={!reduce ? 'position' : false}>
                Layout tile
              </motion.strong>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.p
                    key="extra"
                    className="cat__muted"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                  >
                    Extra copy appears as the tile grows — useful for
                    expand/collapse cards and filter drawers.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </MotionStage>
      </DemoBlock>

      <DemoBlock
        title="Shared-element expand"
        hint="Tap a card to expand it with layoutId continuity."
      >
        <MotionStage label="Shared element stage">
          <LayoutGroup>
            <div className="mex__card-grid">
              {CARDS.map((card) => (
                <motion.button
                  key={card.id}
                  type="button"
                  className="mex__share-card"
                  layout={!reduce}
                  onClick={() => setActiveCard(card.id)}
                  transition={transition}
                >
                  {!activeCard || activeCard !== card.id ? (
                    <motion.span
                      layoutId={reduce ? undefined : `card-title-${card.id}`}
                      className="mex__share-title"
                    >
                      {card.title}
                    </motion.span>
                  ) : (
                    <span className="mex__share-title mex__share-title--ghost">
                      {card.title}
                    </span>
                  )}
                  <span className="cat__muted">{card.blurb}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {activeCard && activeMeta ? (
                <motion.div
                  key="overlay"
                  className="mex__share-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.18 }}
                >
                  <button
                    type="button"
                    className="mex__sheet-backdrop"
                    aria-label="Close card"
                    onClick={() => setActiveCard(null)}
                  />
                  <motion.div
                    className="mex__share-detail"
                    layoutId={reduce ? undefined : `card-shell-${activeCard}`}
                    transition={transition}
                    role="dialog"
                    aria-modal="true"
                    aria-label={activeMeta.title}
                  >
                    <motion.h3
                      layoutId={
                        reduce ? undefined : `card-title-${activeCard}`
                      }
                      className="mex__share-title"
                    >
                      {activeMeta.title}
                    </motion.h3>
                    <p>{activeMeta.blurb}</p>
                    <p className="cat__muted">
                      Simplified App Store–style expand — same-tree layoutId,
                      not document View Transitions.
                    </p>
                    <button
                      type="button"
                      className="mex__btn"
                      onClick={() => setActiveCard(null)}
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </LayoutGroup>
        </MotionStage>
      </DemoBlock>
    </MotionExamplesChrome>
  )
}
