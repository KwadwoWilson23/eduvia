import { motion } from 'framer-motion'

/**
 * Glossy pseudo-3D shapes. Everything is inline SVG — a deep-to-light body
 * gradient, a soft specular highlight, and a rim light — so the landing page
 * carries no external image dependencies.
 */

let uid = 0
const nextId = () => `blob${(uid += 1)}`

function Gradients({ id, hex, light, dark }) {
  return (
    <defs>
      <linearGradient id={`${id}-body`} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor={light} />
        <stop offset="45%" stopColor={hex} />
        <stop offset="100%" stopColor={dark} />
      </linearGradient>
      <radialGradient id={`${id}-spec`} cx="0.3" cy="0.25" r="0.5">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-rim`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
  )
}

/** Lightens/darkens a hex by mixing toward white or black. */
function mix(hex, target, amount) {
  const h = hex.replace('#', '')
  const n = parseInt(h, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const t = target === 'white' ? 255 : 0
  const out = [r, g, b].map((c) => Math.round(c + (t - c) * amount))
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

const shapes = {
  // Soft folded pebble — the purple form in the reference
  pebble:
    'M96 18c38 0 78 22 88 58 10 36-14 68-46 84-32 16-74 18-100 0C12 142 2 108 12 74 22 40 58 18 96 18Z',
  // Twisted ribbon / torus
  torus:
    'M100 22c44 0 78 34 78 78s-34 78-78 78S22 144 22 100 56 22 100 22Zm0 44c-19 0-34 15-34 34s15 34 34 34 34-15 34-34-15-34-34-34Z',
  // Faceted gem — the teal form in the reference
  gem: 'M62 24h76l40 52-78 100L22 76Z',
  // Blobby droplet
  droplet:
    'M100 16c34 26 62 56 62 92 0 40-30 68-62 68s-62-28-62-68c0-36 28-66 62-92Z',
}

export default function Blob3D({
  shape = 'pebble',
  hex = '#A855F7',
  size = 220,
  className = '',
  rotate = 0,
  spin = false,
  float = false,
  delay = 0,
}) {
  const id = nextId()
  const light = mix(hex, 'white', 0.55)
  const dark = mix(hex, 'black', 0.45)
  const d = shapes[shape] ?? shapes.pebble

  const animate = {}
  if (float) {
    animate.y = [0, -18, 0, 12, 0]
    animate.rotate = [rotate, rotate + 6, rotate - 4, rotate]
  } else if (spin) {
    animate.rotate = [rotate, rotate + 360]
  }

  const transition = spin
    ? { duration: 40, repeat: Infinity, ease: 'linear' }
    : { duration: 14, repeat: Infinity, ease: 'easeInOut', delay }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ rotate: float || spin ? undefined : rotate }}
      animate={float || spin ? animate : undefined}
      transition={float || spin ? transition : undefined}
    >
      <Gradients id={id} hex={hex} light={light} dark={dark} />

      {/* Body */}
      <path d={d} fill={`url(#${id}-body)`} />
      {/* Rim light along the lower-right edge */}
      <path d={d} fill={`url(#${id}-rim)`} style={{ mixBlendMode: 'screen' }} />
      {/* Specular bloom */}
      <ellipse cx="72" cy="62" rx="40" ry="28" fill={`url(#${id}-spec)`} transform="rotate(-24 72 62)" />
      {/* Tight hotspot */}
      <ellipse cx="66" cy="54" rx="11" ry="7" fill="#FFFFFF" opacity="0.75" transform="rotate(-24 66 54)" />
    </motion.svg>
  )
}

/* ------------------------------------------------------------------ *
 * Hand-drawn marks from the reference art
 * ------------------------------------------------------------------ */

/** Loose pen underline that draws itself in. */
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
        transition={{ duration: 1, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}

/** Springy squiggle — the pink coil under "education" in the reference. */
export function Squiggle({ color = '#F472B6', className = '', delay = 0.9, width = 150 }) {
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
        transition={{ duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }}
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
        transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}
