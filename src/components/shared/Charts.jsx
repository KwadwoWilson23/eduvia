import { motion } from 'framer-motion'

/**
 * Lightweight SVG/div charts. Everything grows from zero on mount or on
 * scroll into view; rounded caps and translucent tracks so they sit
 * comfortably on the frosted panels.
 */

const EASE = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ *
 * Vertical bars
 * ------------------------------------------------------------------ */

export function BarChart({
  data,
  height = 220,
  color = '#4F46E5',
  mutedColor = 'rgba(79,70,229,0.16)',
  highlightAbove = null,
  showValues = true,
  className = '',
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1

  return (
    <div className={`flex items-end gap-2.5 ${className}`} style={{ height }}>
      {data.map((d, i) => {
        const isHighlight = highlightAbove == null || d.value >= highlightAbove
        return (
          <div key={d.label} className="flex h-full flex-1 flex-col justify-end gap-2">
            {showValues && (
              <motion.span
                className="text-center text-[11px] font-semibold text-mute"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.07 }}
              >
                {d.value}%
              </motion.span>
            )}
            <motion.div
              className="w-full rounded-t-xl"
              style={{ backgroundColor: isHighlight ? color : mutedColor }}
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: EASE }}
            />
            <span className="text-center text-[11px] font-medium text-mute">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Line / area trend
 * ------------------------------------------------------------------ */

export function LineChart({ values, height = 180, color = '#10B981', fill = true, className = '' }) {
  const w = 300
  const h = 100
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / span) * (h - 14) - 7
    return [x, y]
  })

  // Smooth the polyline with midpoint quadratic curves.
  const path = points.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`
    const [px, py] = points[i - 1]
    const cx = (px + x) / 2
    return `${acc} Q ${px} ${py} ${cx} ${(py + y) / 2} T ${x} ${y}`
  }, '')

  const areaPath = `${path} L ${w} ${h} L 0 ${h} Z`
  const gid = `spark-${color.replace('#', '')}`

  return (
    <div className={className} style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {fill && (
          <motion.path
            d={areaPath}
            fill={`url(#${gid})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          />
        )}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Horizontal progress track
 * ------------------------------------------------------------------ */

export function ProgressBar({ value, color = '#4F46E5', thickness = 6, delay = 0, className = '' }) {
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-ink/[0.07] ${className}`}
      style={{ height: thickness }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(value, 100)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Stacked distribution (grade spread)
 * ------------------------------------------------------------------ */

export function DistributionBar({ data, className = '' }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1

  return (
    <div className={className}>
      <div className="flex h-3 w-full gap-1 overflow-hidden">
        {data.map((d, i) => (
          <motion.div
            key={d.label}
            className="rounded-full"
            style={{ backgroundColor: d.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${(d.value / total) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-1.5 text-[11px] font-medium text-mute">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
            {d.label} · {d.value}%
          </div>
        ))}
      </div>
    </div>
  )
}
