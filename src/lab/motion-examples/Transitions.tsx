import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  type Transition,
} from '@songara/pwa-base/preview/motion'
import { MotionStage, ReduceMotionToggle } from '../../explorations/animation/Motion/_shared'
import { useCatalogueMotion } from '../../explorations/animation/Motion/motionKit'
import {
  DemoBlock,
  ExperienceHeader,
  MotionExamplesChrome,
} from './shared'
import { liftStageStyle } from './liftTheme'

/**
 * Page & section transitions — public lifts:
 * - https://motion.dev/examples/react-shared-layout-animation
 * - https://motion.dev/examples/react-animate-presence-modes
 * - https://motion.dev/examples/react-reorder-items
 *
 * Adapted: Preview Motion imports; reduced-motion snaps.
 */
export function TransitionsExperience() {
  const { reduce, reduceId, setForceReduce } = useCatalogueMotion()

  return (
    <MotionExamplesChrome experienceId="Transitions">
      <ExperienceHeader
        title="Page & section transitions"
        lead="Public Motion tutorial ports — shared-layout tabs, AnimatePresence modes, and layout reorder — via Preview Motion."
      />
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />

      <DemoBlock
        title="Shared layout tabs"
        hint="Port of motion.dev/examples/react-shared-layout-animation — layoutId underline + wait-mode panel."
      >
        <div style={liftStageStyle}>
          <SharedLayoutTabs reduce={reduce} />
        </div>
      </DemoBlock>

      <DemoBlock
        title="AnimatePresence modes"
        hint="Port of motion.dev/examples/react-animate-presence-modes — sync / wait / popLayout side by side."
      >
        <div
          style={{
            ...liftStageStyle,
            background:
              'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            color: '#fff',
            minHeight: '18rem',
          }}
        >
          <AnimatePresenceModes reduce={reduce} />
        </div>
      </DemoBlock>

      <DemoBlock
        title="Reorder items"
        hint="Port of motion.dev/examples/react-reorder-items — layout springs as tiles shuffle."
      >
        <MotionStage label="Reorder stage">
          <ReorderDemo reduce={reduce} />
        </MotionStage>
      </DemoBlock>
    </MotionExamplesChrome>
  )
}

/* ---------- Shared layout tabs ---------- */

type Tab = { icon: string; label: string }

const allIngredients: Tab[] = [
  { icon: 'Tomato', label: 'Tomato' },
  { icon: 'Lettuce', label: 'Lettuce' },
  { icon: 'Cheese', label: 'Cheese' },
  { icon: 'Carrot', label: 'Carrot' },
]
const tabs = allIngredients.slice(0, 3)

function SharedLayoutTabs({ reduce }: { reduce: boolean }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]!)

  return (
    <div style={sharedContainer}>
      <nav style={sharedNav}>
        <ul style={tabsContainer}>
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? '#eee' : '#eee0',
              }}
              style={tabStyle}
              onClick={() => setSelectedTab(item)}
            >
              {item.label}
              {item === selectedTab ? (
                <motion.div
                  style={underline}
                  layoutId={reduce ? undefined : 'underline'}
                  id="underline"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 30 }
                  }
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main style={iconContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab.label}
            initial={reduce ? false : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -10, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            style={icon}
          >
            {selectedTab.label}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

const sharedContainer: CSSProperties = {
  width: 480,
  height: 360,
  maxWidth: '100%',
  borderRadius: 10,
  background: '#fff',
  color: '#0f1115',
  overflow: 'hidden',
  boxShadow:
    '0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)',
  display: 'flex',
  flexDirection: 'column',
}

const sharedNav: CSSProperties = {
  background: '#fdfdfd',
  padding: '5px 5px 0',
  borderBottom: '1px solid #eeeeee',
  height: 44,
}

const tabsContainer: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontWeight: 500,
  fontSize: 14,
  display: 'flex',
  width: '100%',
}

const tabStyle: CSSProperties = {
  listStyle: 'none',
  borderRadius: 5,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  width: '100%',
  padding: '10px 15px',
  position: 'relative',
  background: 'white',
  cursor: 'pointer',
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  userSelect: 'none',
  color: '#0f1115',
}

const underline: CSSProperties = {
  position: 'absolute',
  bottom: -2,
  left: 0,
  right: 0,
  height: 2,
  background: '#ff008c',
}

const iconContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}

const icon: CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
}

/* ---------- AnimatePresence modes ---------- */

function ModeExample({
  mode,
  iconNode,
  state,
  reduce,
}: {
  mode: 'sync' | 'wait' | 'popLayout'
  iconNode: ReactNode
  state: boolean
  reduce: boolean
}) {
  const defaultEase = [0.26, 0.02, 0.23, 0.94] as const
  const motionProps = {
    style: {
      ...baseCircleStyle,
      backgroundColor: state ? '#fff' : 'transparent',
      color: state ? '#0f1115' : '#fff',
      border: state ? '2px solid rgba(0,0,0,0.12)' : '2px solid #fff',
    },
    initial: reduce ? false : { opacity: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: reduce
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.8,
        },
    transition: reduce
      ? { duration: 0 }
      : {
          duration: 0.3,
          ease:
            mode === 'wait'
              ? ([0.02, 0.35, 0.25, 0.99] as const)
              : defaultEase,
        },
  }

  return (
    <div style={modeSection}>
      <div style={modeIconContainer}>
        <AnimatePresence mode={mode}>
          <motion.div key={String(state)} {...motionProps}>
            {iconNode}
          </motion.div>
        </AnimatePresence>
      </div>
      <code style={modeTitle}>{mode}</code>
    </div>
  )
}

function AnimatePresenceModes({ reduce }: { reduce: boolean }) {
  const [state, setState] = useState(true)

  return (
    <div style={modesRoot}>
      <div style={modesContainer}>
        <ModeExample mode="sync" iconNode={<SyncIcon />} state={state} reduce={reduce} />
        <ModeExample mode="wait" iconNode={<WaitIcon />} state={state} reduce={reduce} />
        <ModeExample
          mode="popLayout"
          iconNode={<PopLayoutIcon />}
          state={state}
          reduce={reduce}
        />
      </div>
      <motion.button
        type="button"
        style={modesButton}
        onClick={() => setState((v) => !v)}
        whileTap={reduce ? undefined : { scale: 0.95 }}
      >
        Switch
      </motion.button>
    </div>
  )
}

function SyncIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  )
}

function WaitIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  )
}

function PopLayoutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="m21 3-9 9" />
      <path d="M15 3h6v6" />
    </svg>
  )
}

const modesRoot: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 40,
  width: '100%',
}

const modesContainer: CSSProperties = {
  display: 'flex',
  gap: 40,
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
}

const modeSection: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
}

const modeIconContainer: CSSProperties = {
  width: 80,
  height: 80,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const modeTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  opacity: 0.9,
}

const modesButton: CSSProperties = {
  backgroundColor: '#fff',
  color: '#0f1115',
  border: 'none',
  borderRadius: 8,
  padding: '12px 32px',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
}

const baseCircleStyle: CSSProperties = {
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  flexShrink: 0,
  position: 'absolute',
}

/* ---------- Reorder items ---------- */

const initialOrder = ['#ff008c', '#d309e1', '#9c1aff', '#7700ff']

function shuffle([...array]: string[]) {
  return array.sort(() => Math.random() - 0.5)
}

function ReorderDemo({ reduce }: { reduce: boolean }) {
  const [order, setOrder] = useState(initialOrder)

  useEffect(() => {
    if (reduce) return
    const timeout = window.setTimeout(() => setOrder(shuffle(order)), 1200)
    return () => window.clearTimeout(timeout)
  }, [order, reduce])

  const spring: Transition = reduce
    ? { duration: 0 }
    : { type: 'spring', damping: 20, stiffness: 300 }

  return (
    <div>
      <ul style={reorderContainer}>
        {order.map((backgroundColor) => (
          <motion.li
            key={backgroundColor}
            layout={!reduce}
            transition={spring}
            style={{ ...reorderItem, backgroundColor }}
          />
        ))}
      </ul>
      <button
        type="button"
        className="mex__btn"
        style={{ marginTop: '0.75rem' }}
        onClick={() => setOrder(shuffle(order))}
      >
        Shuffle
      </button>
    </div>
  )
}

const reorderContainer: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  width: 300,
  maxWidth: '100%',
  justifyContent: 'center',
}

const reorderItem: CSSProperties = {
  width: 100,
  height: 100,
  borderRadius: 10,
}
