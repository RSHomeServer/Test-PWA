import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  type Variants,
} from '@songara/pwa-base/preview/motion'
import {
  DemoBlock,
  ExperienceHeader,
  MotionExamplesChrome,
} from './shared'
import { MotionStage, ReduceMotionToggle } from '../../explorations/animation/Motion/_shared'
import { MOTION_SPRING, useCatalogueMotion } from '../../explorations/animation/Motion/motionKit'

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04 },
  }),
  exit: { opacity: 0, y: -4 },
}

/**
 * Menus & overlays — dropdown presence, context panel, sheet modal.
 */
export function MenusOverlaysExperience() {
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ctxOpen, setCtxOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  const menuItems = ['Overview', 'Examples', 'Settings', 'Sign out']

  return (
    <MotionExamplesChrome experienceId="Menus-Overlays">
      <ExperienceHeader
        title="Menus & overlays"
        lead="Enter/exit presence for dropdowns, a context panel, and a spring sheet — via Preview Motion."
      />
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />

      <DemoBlock
        title="Dropdown menu"
        hint="Staggered item enter; instant close under reduced motion."
      >
        <div className="mex__menu-anchor">
          <button
            type="button"
            className="mex__btn"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            Open menu
          </button>
          <AnimatePresence>
            {menuOpen ? (
              <motion.ul
                key="menu"
                className="mex__menu"
                role="menu"
                initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6, scale: 0.98 }
                }
                transition={transition}
              >
                {menuItems.map((label, i) => (
                  <motion.li
                    key={label}
                    role="none"
                    custom={reduce ? 0 : i}
                    variants={reduce ? undefined : menuItemVariants}
                    initial={reduce ? false : 'hidden'}
                    animate="show"
                    exit="exit"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      className="mex__menu-item"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </div>
      </DemoBlock>

      <DemoBlock
        title="Context panel"
        hint="Click the stage to open a floating panel (inspired by context menus)."
      >
        <MotionStage label="Context panel stage">
          <button
            type="button"
            className="mex__ctx-stage"
            onClick={() => setCtxOpen(true)}
          >
            Click to open panel
          </button>
          <AnimatePresence>
            {ctxOpen ? (
              <motion.div
                key="ctx"
                className="mex__ctx-panel"
                role="dialog"
                aria-label="Context panel"
                initial={reduce ? false : { opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                transition={transition}
              >
                <p className="mex__ctx-title">Quick actions</p>
                <div className="mex__ctx-actions">
                  <button type="button" className="mex__btn mex__btn--quiet">
                    Duplicate
                  </button>
                  <button type="button" className="mex__btn mex__btn--quiet">
                    Archive
                  </button>
                  <button
                    type="button"
                    className="mex__btn"
                    onClick={() => setCtxOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </MotionStage>
      </DemoBlock>

      <DemoBlock
        title="Sheet modal"
        hint="Bottom sheet with backdrop; drag down to dismiss when motion is allowed."
      >
        <button
          type="button"
          className="mex__btn"
          onClick={() => setSheetOpen(true)}
        >
          Open sheet
        </button>
        <AnimatePresence>
          {sheetOpen ? (
            <motion.div
              key="sheet-root"
              className="mex__sheet-root"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            >
              <button
                type="button"
                className="mex__sheet-backdrop"
                aria-label="Dismiss sheet"
                onClick={() => setSheetOpen(false)}
              />
              <motion.div
                className="mex__sheet"
                role="dialog"
                aria-modal="true"
                aria-label="Example sheet"
                initial={reduce ? false : { y: '100%' }}
                animate={{ y: 0 }}
                exit={reduce ? { opacity: 0 } : { y: '100%' }}
                transition={transition}
                drag={reduce ? false : 'y'}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.4 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 80 || info.velocity.y > 400) {
                    setSheetOpen(false)
                  }
                }}
              >
                <div className="mex__sheet-handle" aria-hidden="true" />
                <h3 className="mex__sheet-title">Sheet modal</h3>
                <p className="cat__muted">
                  Spring sheet with swipe-to-dismiss — product pattern for
                  filters, confirmations, and mobile detail.
                </p>
                <button
                  type="button"
                  className="mex__btn"
                  onClick={() => setSheetOpen(false)}
                >
                  Done
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DemoBlock>
    </MotionExamplesChrome>
  )
}
