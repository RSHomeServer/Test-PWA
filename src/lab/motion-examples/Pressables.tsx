import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from '@songara/pwa-base/preview/motion'
import {
  DemoBlock,
  ExperienceHeader,
  MotionExamplesChrome,
} from './shared'
import { MotionStage, ReduceMotionToggle } from '../../explorations/animation/Motion/_shared'
import { MOTION_SPRING, useCatalogueMotion } from '../../explorations/animation/Motion/motionKit'

/**
 * Buttons & pressables — copy confirm, morphing action, FAB.
 */
export function PressablesExperience() {
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const [fabOpen, setFabOpen] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(t)
  }, [copied])

  useEffect(() => {
    if (!busy) return
    const t = window.setTimeout(() => setBusy(false), 1400)
    return () => window.clearTimeout(t)
  }, [busy])

  return (
    <MotionExamplesChrome experienceId="Pressables">
      <ExperienceHeader
        title="Buttons & pressables"
        lead="Hover/tap micro-interactions — copy confirm, morphing action, and a floating control."
      />
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />

      <DemoBlock
        title="Copy button"
        hint="Label morphs to confirmation; snaps under reduced motion."
      >
        <MotionStage label="Copy button stage">
          <motion.button
            type="button"
            className="mex__btn mex__btn--wide"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={transition}
            onClick={() => setCopied(true)}
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'done' : 'idle'}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={transition}
              >
                {copied ? 'Copied' : 'Copy link'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </MotionStage>
      </DemoBlock>

      <DemoBlock
        title="Morphing action"
        hint="Idle → busy dots → done check; gestures disabled while busy."
      >
        <MotionStage label="Morph button stage">
          <motion.button
            type="button"
            className="mex__morph"
            disabled={busy}
            whileHover={reduce || busy ? undefined : { scale: 1.04 }}
            whileTap={reduce || busy ? undefined : { scale: 0.95 }}
            transition={transition}
            onClick={() => setBusy(true)}
            aria-busy={busy}
          >
            <AnimatePresence mode="wait" initial={false}>
                  {busy ? (
                <motion.span
                  key="dots"
                  className="mex__dots"
                  data-reduced={reduce ? 'true' : 'false'}
                  initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  aria-label="Working"
                >
                  <span />
                  <span />
                  <span />
                </motion.span>
              ) : (
                <motion.span
                  key="label"
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                >
                  Create
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </MotionStage>
      </DemoBlock>

      <DemoBlock
        title="Floating action"
        hint="FAB expands a small action stack on press."
      >
        <MotionStage className="mex__fab-stage" label="FAB stage">
          <div className="mex__fab-cluster">
            <AnimatePresence>
              {fabOpen ? (
                <motion.div
                  key="stack"
                  className="mex__fab-stack"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  transition={transition}
                >
                  {['Note', 'Photo', 'Link'].map((label, i) => (
                    <motion.button
                      key={label}
                      type="button"
                      className="mex__fab-secondary"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduce
                          ? transition
                          : { ...transition, delay: i * 0.04 }
                      }
                      onClick={() => setFabOpen(false)}
                    >
                      {label}
                    </motion.button>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
            <motion.button
              type="button"
              className="mex__fab"
              aria-expanded={fabOpen}
              aria-label={fabOpen ? 'Close actions' : 'Open actions'}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              whileTap={reduce ? undefined : { scale: 0.92 }}
              animate={reduce ? undefined : { rotate: fabOpen ? 45 : 0 }}
              transition={transition}
              onClick={() => setFabOpen((v) => !v)}
            >
              +
            </motion.button>
          </div>
        </MotionStage>
      </DemoBlock>
    </MotionExamplesChrome>
  )
}
