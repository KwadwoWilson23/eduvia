import { motion } from 'framer-motion'

/**
 * Hand-drawn accent marks. These are the only organic shapes in the system —
 * solid-stroke SVG overlays, never filled with gradients, never blurred.
 */

const drawTransition = { duration: 1.1, ease: [0.65, 0, 0.35, 1] }

/** Wraps a word and draws a lopsided oval around it. */
export function DoodleOval({ children, color = '#4F46E5', className = '', delay = 0.6 }) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute -inset-x-[10%] -inset-y-[28%] h-[156%] w-[120%]"
        viewBox="0 0 200 80"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M104 6C58 2 16 16 8 36c-8 22 30 40 88 40 48 0 96-14 98-36C196 18 156 6 108 4"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...drawTransition, delay }}
        />
      </svg>
    </span>
  )
}

/** Rough underline stroke, sits on the baseline of a headline. */
export function DoodleUnderline({ children, color = '#4F46E5', className = '', delay = 0.4 }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full"
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M2 8C40 3 78 2 116 4c28 1 56 4 82 2"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...drawTransition, delay }}
        />
      </svg>
    </span>
  )
}

/** Four-point sparkle. */
export function DoodleStar({ color = '#F59E0B', size = 24, className = '', spin = false }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      animate={spin ? { rotate: [0, 12, -8, 0], scale: [1, 1.12, 0.96, 1] } : undefined}
      transition={spin ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <path
        d="M12 1.5c1.1 5.6 3.8 8.5 9.4 9.6-5.6 1.1-8.3 3.9-9.4 9.4-1.1-5.5-3.9-8.3-9.4-9.4 5.5-1.1 8.3-4 9.4-9.6Z"
        fill={color}
      />
    </motion.svg>
  )
}

/** Small arcing arrow used to point at a stat or CTA. */
export function DoodleArrow({ color = '#0F172A', className = '', flip = false }) {
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
        transition={drawTransition}
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
        transition={{ ...drawTransition, delay: 0.5 }}
      />
    </svg>
  )
}

/** Three short "energy" ticks, used beside testimonial cards. */
export function DoodleTicks({ color = '#0F172A', className = '' }) {
  return (
    <svg className={className} width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
      <path d="M3 20L9 4M15 22L21 2M27 19L32 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
