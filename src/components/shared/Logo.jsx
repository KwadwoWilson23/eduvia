import { motion } from 'framer-motion'
import { brand } from '../../mockData'

/**
 * Graduation cap over a globe, drawn from the supplied vector mark and
 * recoloured to the platform blue. The negative space between cap and globe
 * is cut with the surrounding surface colour, so `bg` must match whatever
 * the mark sits on.
 */
export function LogoMark({ size = 30, color = '#1E88F5', bg = '#0A0A0B', animate = false, className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      initial={animate ? { rotate: -8, scale: 0.9, opacity: 0 } : false}
      animate={animate ? { rotate: 0, scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Globe */}
      <circle cx="30" cy="38" r="21" fill={color} />

      {/* Meridians cut out of the globe */}
      <path
        d="M30 17c-6 6-9 13-9 21s3 15 9 21c6-6 9-13 9-21s-3-15-9-21Z"
        stroke={bg}
        strokeWidth="3"
        fill="none"
      />
      <path d="M10 33c6 3 13 4 20 4s14-1 20-4" stroke={bg} strokeWidth="3" fill="none" />

      {/* Mortarboard, with the surface colour separating it from the globe */}
      <path d="M32 4 62 17 32 30 2 17 32 4Z" fill={color} stroke={bg} strokeWidth="3" strokeLinejoin="round" />

      {/* Tassel cord and bead */}
      <path
        d="M32 12h18v18"
        stroke={bg}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="50" cy="34" r="4.6" fill={color} stroke={bg} strokeWidth="2.4" />
    </motion.svg>
  )
}

/** Mark plus wordmark. */
export default function Logo({ inverted = false, animate = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark
        size={30}
        color="#1E88F5"
        bg={inverted ? '#FFFFFF' : '#0A0A0B'}
        animate={animate}
      />
      <span
        className={`font-heading text-[20px] font-extrabold tracking-tight ${
          inverted ? 'text-ink' : 'text-white'
        }`}
      >
        {brand.name}
      </span>
    </div>
  )
}
