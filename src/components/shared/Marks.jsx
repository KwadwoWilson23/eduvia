import { motion } from 'framer-motion'

/**
 * Hand-drawn accent marks — the only decorative shapes in the system.
 * Each one strokes itself on with `pathLength` when it scrolls into view.
 */

const DRAW = [0.65, 0, 0.35, 1]

/** Loose pen underline. */
export function Scribble({ color = '#FFFFFF', className = '', delay = 0.6, width = 260 }) {
  return (
    <svg
      className={className}
      width={width}
      height="22"
      viewBox="0 0 260 22"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M4 14C52 5 104 3 152 6c34 2 68 7 104 4"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: DRAW }}
      />
    </svg>
  )
}

/** Springy coil, used under an emphasised word. */
export function Squiggle({ color = '#22D3EE', className = '', delay = 0.9, width = 150 }) {
  return (
    <svg className={className} width={width} height="26" viewBox="0 0 150 26" fill="none" aria-hidden="true">
      <motion.path
        d="M3 18c8-14 18-14 26 0s18 14 26 0 18-14 26 0 18 14 26 0 18-14 26 0"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: DRAW }}
      />
    </svg>
  )
}

/** Five-point star drawn in one continuous stroke. */
export function StarScribble({ color = '#FACC15', size = 120, className = '', delay = 0.5 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <motion.path
        d="M60 8 96 112 8 46h104L24 112Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay, ease: DRAW }}
      />
    </svg>
  )
}

/** Small arcing arrow. */
export function ArrowMark({ color = '#FFFFFF', className = '', flip = false }) {
  return (
    <svg
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      width="72"
      height="44"
      viewBox="0 0 72 44"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M4 6c18 2 34 12 44 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: DRAW }}
      />
      <motion.path
        d="M38 33l11 2 1-11"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.5, ease: DRAW }}
      />
    </svg>
  )
}
