import { motion } from '@songara/pwa-base/preview/motion'
import { getExploration } from '../../../catalogue/registry'
import { ExplorationShell } from '../../ExplorationShell'
import {
  MOTION_SPRING,
  MotionStage,
  ReduceMotionToggle,
  useCatalogueMotion,
} from './_shared'

const CARDS = [
  { id: 'reveal', title: 'Scroll reveal', body: 'Animates once when entering the viewport.' },
  { id: 'stagger', title: 'Section cue', body: 'Use for feature blocks and catalogue hubs.' },
  { id: 'soft', title: 'Soft entrance', body: 'Prefer opacity + translateY over large moves.' },
] as const

/**
 * Scroll — whileInView scroll-triggered motion (Preview Motion).
 * Scroll-linked useScroll is not yet re-exported by Preview; whileInView covers the common case.
 */
export function AnimationScrollPage() {
  const record = getExploration('animation', 'Motion/Scroll')
  const { reduce, reduceId, setForceReduce, transition } =
    useCatalogueMotion(MOTION_SPRING)

  if (!record) return null

  return (
    <ExplorationShell
      areaId="animation"
      relativePath="Motion/Scroll"
      record={record}
      lead="Scroll-triggered reveals with `whileInView` via `@songara/pwa-base/preview/motion`. (Scroll-linked `useScroll` is not on the Preview barrel yet — use whileInView for product defaults.)"
      visualNote="Visual validation: scroll the stage — cards fade/slide in when they enter view; appear instantly under reduced motion."
      performance={
        <p>
          Intersection observers are cheap; avoid heavy layout work in
          on-viewport callbacks. Score {record.performance}/5.
        </p>
      }
      browserCompatibility={
        <p>Motion + IntersectionObserver. Score {record.browserSupport}/5.</p>
      }
      strengths={
        <ul>
          <li>Declarative viewport triggers</li>
          <li>viewport.once avoids re-play noise</li>
          <li>Pairs with reduced-motion snaps</li>
        </ul>
      }
      weaknesses={
        <ul>
          <li>Scroll-linked parallax needs useScroll (not Preview yet)</li>
          <li>Overuse creates motion sickness risk</li>
          <li>SSR / hydration need care for initial=false</li>
        </ul>
      }
      developerExperience={
        <p>
          <code>whileInView</code> is the right default for section reveals. Score{' '}
          {record.developerExperience}/5.
        </p>
      }
      productIdeas={
        <p>
          Feature section reveals, catalogue area intros, soft onboarding
          scrolls.
        </p>
      }
      reusableIdeas={
        <p>
          Prefer <code>viewport=&#123;&#123; once: true, amount: 0.4 &#125;&#125;</code>; skip
          animation when reduced.
        </p>
      }
    >
      <ReduceMotionToggle
        id={reduceId}
        checked={reduce}
        onChange={setForceReduce}
      />
      <MotionStage className="cat__scroll-stage" label="Scroll reveal stage">
        <p className="cat__muted cat__scroll-hint">Scroll inside this panel ↓</p>
        <div className="cat__scroll-rail">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.id}
              className="cat__scroll-card"
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                ...transition,
                delay: reduce ? 0 : i * 0.05,
              }}
            >
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </motion.article>
          ))}
        </div>
      </MotionStage>
    </ExplorationShell>
  )
}
