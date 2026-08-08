import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Motion primitives shared across the landing page — scroll reveals,
 * parallax, staggered groups, and the marquee band.
 */

export const EASE = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ *
 * Reveal — fade + rise as the element scrolls into view
 * ------------------------------------------------------------------ */

export function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Stagger — parent/child variant pair
 * ------------------------------------------------------------------ */

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export function Stagger({ children, className = '', once = true, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Parallax — vertical drift tied to scroll position
 * ------------------------------------------------------------------ */

export function Parallax({ children, distance = 60, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Word-by-word headline reveal
 * ------------------------------------------------------------------ */

export function SplitWords({ text, className = '', delay = 0, wordClass = '' }) {
  const words = text.split(' ')

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClass}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ *
 * RotatingWord — cycles through words in place
 * ------------------------------------------------------------------ */

export function RotatingWord({ words, interval = 2200, className = '', colors = [] }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  // Reserve the width of the longest word so surrounding text never reflows.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap"
          style={colors.length ? { color: colors[i % colors.length] } : undefined}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Marquee — continuously scrolling band
 * ------------------------------------------------------------------ */

export function Marquee({ items, className = '', renderItem }) {
  // The list is duplicated so the -50% translate loops seamlessly.
  const doubled = [...items, ...items]

  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  )
}
