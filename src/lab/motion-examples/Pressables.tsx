import { useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from '@songara/pwa-base/preview/motion'
import { MotionStage, ReduceMotionToggle } from '../../explorations/animation/Motion/_shared'
import { useCatalogueMotion } from '../../explorations/animation/Motion/motionKit'
import {
  DemoBlock,
  ExperienceHeader,
  MotionExamplesChrome,
} from './shared'
import { liftStageStyle } from './liftTheme'

/**
 * Buttons & pressables — public lifts:
 * - https://motion.dev/examples/react-gestures
 * - https://motion.dev/examples/react-layout-animation
 * - https://motion.dev/examples/react-exit-animation (whileTap button)
 *
 * Adapted: Preview Motion imports; reduced-motion disables gestures / snaps layout.
 */
export function PressablesExperience() {
  const { reduce, reduceId, setForceReduce, transition } = useCatalogueMotion({
    type: 'spring',
    stiffness: 400,
    damping: 17,
  })

  return (
    <MotionExamplesChrome experienceId="Pressables">
      <ExperienceHeader
        title="Buttons & pressables"
        lead="Public Motion tutorial ports — Gestures, Layout animation toggle, and Exit whileTap — via Preview Motion."
      />
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />

      <DemoBlock
        title="Gestures"
        hint="Port of motion.dev/examples/react-gestures — whileHover / whileTap on a motion box."
      >
        <MotionStage label="Gestures stage">
          <div style={{ display: 'grid', placeItems: 'center', minHeight: '8rem' }}>
            <motion.div
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.2,
                      rotate: 5,
                      backgroundColor: '#2BB95D',
                      transition: { duration: 0.2 },
                    }
              }
              whileTap={
                reduce
                  ? undefined
                  : {
                      scale: 0.8,
                      rotate: -5,
                      backgroundColor: '#1A7A3E',
                    }
              }
              transition={transition}
              style={gestureBox}
            />
          </div>
        </MotionStage>
      </DemoBlock>

      <DemoBlock
        title="Layout animation"
        hint="Port of motion.dev/examples/react-layout-animation — layout spring on justify-content toggle."
      >
        <div style={liftStageStyle}>
          <LayoutToggle reduce={reduce} />
        </div>
      </DemoBlock>

      <DemoBlock
        title="Pressable exit"
        hint="Exit animation + whileTap from motion.dev/examples/react-exit-animation."
      >
        <MotionStage label="Pressable exit stage">
          <PressableExit reduce={reduce} transition={transition} />
        </MotionStage>
      </DemoBlock>
    </MotionExamplesChrome>
  )
}

const gestureBox: CSSProperties = {
  width: 100,
  height: 100,
  backgroundColor: '#46CF76',
  borderRadius: 5,
}

function LayoutToggle({ reduce }: { reduce: boolean }) {
  const [isOn, setIsOn] = useState(false)

  return (
    <button
      type="button"
      className="toggle-container"
      style={{
        ...container,
        justifyContent: isOn ? 'flex-start' : 'flex-end',
      }}
      onClick={() => setIsOn((v) => !v)}
      aria-pressed={isOn}
      aria-label="Toggle layout switch"
    >
      <motion.div
        className="toggle-handle"
        style={handle}
        layout={!reduce}
        transition={
          reduce
            ? { duration: 0 }
            : { type: 'spring', visualDuration: 0.2, bounce: 0.2 }
        }
      />
    </button>
  )
}

const container: CSSProperties = {
  width: 100,
  height: 50,
  backgroundColor: 'rgba(156, 26, 255, 0.25)',
  borderRadius: 50,
  cursor: 'pointer',
  display: 'flex',
  padding: 10,
  border: 'none',
}

const handle: CSSProperties = {
  width: 50,
  height: 50,
  backgroundColor: '#9c1aff',
  borderRadius: '50%',
}

function PressableExit({
  reduce,
  transition,
}: {
  reduce: boolean
  transition: object
}) {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div style={exitContainer}>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            key="box"
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0 }}
            transition={transition}
            style={exitBox}
          />
        ) : null}
      </AnimatePresence>
      <motion.button
        type="button"
        style={exitButton}
        onClick={() => setIsVisible((v) => !v)}
        whileTap={reduce ? undefined : { y: 1, scale: 0.98 }}
        transition={transition}
      >
        {isVisible ? 'Hide' : 'Show'}
      </motion.button>
    </div>
  )
}

const exitContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: 100,
  height: 160,
  position: 'relative',
  margin: '0 auto',
}

const exitBox: CSSProperties = {
  width: 100,
  height: 100,
  backgroundColor: '#ff5449',
  borderRadius: 10,
}

const exitButton: CSSProperties = {
  backgroundColor: '#ff5449',
  borderRadius: 10,
  padding: '10px 20px',
  color: '#0f1115',
  border: 'none',
  font: 'inherit',
  fontWeight: 650,
  cursor: 'pointer',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
}
