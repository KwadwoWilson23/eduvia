import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * Formats with thousands separators; K-suffix numbers pass `compact`.
 */
export default function CountUp({
  value,
  suffix = '',
  prefix = '',
  duration = 1600,
  compact = false,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    let frame
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      // easeOutExpo — fast start, settles precisely on the target
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(value * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  const format = (n) => {
    if (compact && value >= 1000) return `${Math.round(n / 1000)}K`
    return Math.round(n).toLocaleString('en-US')
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  )
}
