import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import {
  AnimatePresence,
  motion,
  type Variants,
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
 * Menus & overlays — public lifts:
 * - https://motion.dev/examples/react-variants (hamburger / clip-path sidebar)
 * - https://motion.dev/examples/react-exit-animation (presence exit)
 *
 * Adapted: Preview Motion imports; `staggerChildren` instead of `stagger()`;
 * reduced-motion snaps via `useCatalogueMotion`.
 */
export function MenusOverlaysExperience() {
  const { reduce, reduceId, setForceReduce, transition } = useCatalogueMotion()

  return (
    <MotionExamplesChrome experienceId="Menus-Overlays">
      <ExperienceHeader
        title="Menus & overlays"
        lead="Public Motion tutorial ports — the Variants sidebar menu and Exit animation presence — via Preview Motion."
      />
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />

      <DemoBlock
        title="Variants menu"
        hint="Port of motion.dev/examples/react-variants — clip-path reveal + staggered items."
      >
        <div style={liftStageStyle}>
          <VariantsMenu reduce={reduce} />
        </div>
      </DemoBlock>

      <DemoBlock
        title="Exit animation"
        hint="Port of motion.dev/examples/react-exit-animation — AnimatePresence enter/exit."
      >
        <MotionStage label="Exit animation stage">
          <ExitAnimationDemo reduce={reduce} transition={transition} />
        </MotionStage>
      </DemoBlock>
    </MotionExamplesChrome>
  )
}

/* ---------- Variants menu (public source, adapted) ---------- */

function VariantsMenu({ reduce }: { reduce: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { height } = useDimensions(containerRef)

  return (
    <div style={variantsOuter}>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        style={nav}
      >
        <motion.div
          style={background}
          variants={reduce ? instantSidebar : sidebarVariants}
        />
        <Navigation reduce={reduce} />
        <MenuToggle toggle={() => setIsOpen((v) => !v)} />
      </motion.nav>
    </div>
  )
}

/** Preview barrel has no `stagger()` — use classic staggerChildren. */
const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const Navigation = ({ reduce }: { reduce: boolean }) => (
  <motion.ul style={list} variants={reduce ? undefined : navVariants}>
    {[0, 1, 2, 3, 4].map((i) => (
      <MenuItem i={i} key={i} reduce={reduce} />
    ))}
  </motion.ul>
)

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
}

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

const MenuItem = ({ i, reduce }: { i: number; reduce: boolean }) => {
  const border = `2px solid ${colors[i]}`
  return (
    <motion.li
      style={listItem}
      variants={reduce ? undefined : itemVariants}
      whileHover={reduce ? undefined : { scale: 1.1 }}
      whileTap={reduce ? undefined : { scale: 0.95 }}
    >
      <div style={{ ...iconPlaceholder, border }} />
      <div style={{ ...textPlaceholder, border }} />
    </motion.li>
  )
}

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const instantSidebar: Variants = {
  open: { clipPath: 'circle(2000px at 40px 40px)', transition: { duration: 0 } },
  closed: { clipPath: 'circle(30px at 40px 40px)', transition: { duration: 0 } },
}

const Path = (props: {
  d?: string
  variants: Variants
  transition?: { duration: number }
}) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button type="button" style={toggleContainer} onClick={toggle} aria-label="Toggle menu">
    <svg width="23" height="23" viewBox="0 0 23 23" aria-hidden="true">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
)

const useDimensions = (ref: RefObject<HTMLDivElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const update = () =>
      setDimensions({ width: el.offsetWidth, height: el.offsetHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return dimensions
}

const variantsOuter: CSSProperties = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  width: 'min(500px, 100%)',
  height: 400,
  backgroundColor: 'var(--mex-accent, #ff008c)',
  borderRadius: 20,
  overflow: 'hidden',
}

const nav: CSSProperties = { width: 300, height: '100%', position: 'relative' }

const background: CSSProperties = {
  backgroundColor: '#fff',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: 300,
}

const toggleContainer: CSSProperties = {
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  top: 18,
  left: 15,
  width: 50,
  height: 50,
  borderRadius: '50%',
  background: 'transparent',
}

const list: CSSProperties = {
  listStyle: 'none',
  padding: 25,
  margin: 0,
  position: 'absolute',
  top: 80,
  width: 230,
}

const listItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: 0,
  margin: 0,
  marginBottom: 20,
  cursor: 'pointer',
}

const iconPlaceholder: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  flex: '40px 0',
  marginRight: 20,
}

const textPlaceholder: CSSProperties = {
  borderRadius: 5,
  width: 200,
  height: 20,
  flex: 1,
}

/* ---------- Exit animation (public source, adapted) ---------- */

function ExitAnimationDemo({
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
        whileTap={reduce ? undefined : { y: 1 }}
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
