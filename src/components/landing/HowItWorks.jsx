import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, ClipboardCheck, PlayCircle, MessageSquareHeart, ChevronLeft, ChevronRight } from 'lucide-react'
import { BarChart, LineChart, DistributionBar, ProgressBar } from '../shared/Charts'
import { Scribble } from '../shared/Blob3D'
import { Reveal, EASE } from '../shared/Motion'
import { analyticsPreview, homeworkPreview, statusTone } from '../../mockData'
import Pill from '../shared/Pill'

/* ------------------------------------------------------------------ *
 * The four panels shown inside the laptop
 * ------------------------------------------------------------------ */

function AnalyticsPanel() {
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      <div className="rounded-2xl border border-night/[0.07] bg-white p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-mute">Attendance</div>
        <LineChart values={[62, 78, 66, 84, 72, 90, 86]} height={92} color="#22D3EE" />
      </div>

      <div className="rounded-2xl border border-night/[0.07] bg-white p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-mute">Normalised grade</div>
        <LineChart values={[10, 26, 58, 88, 96, 70, 34, 14]} height={92} color="#F97316" />
      </div>

      <div className="col-span-2 rounded-2xl border border-night/[0.07] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-mute">Test performance</span>
          <span className="flex gap-3 text-[9px] font-semibold text-mute">
            {[
              ['Pass', '#1E88F5'],
              ['Fail', '#F97316'],
              ['Absent', '#22D3EE'],
            ].map(([label, hex]) => (
              <span key={label} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: hex }} />
                {label}
              </span>
            ))}
          </span>
        </div>
        <BarChart data={analyticsPreview.attendanceTrend} height={84} showValues={false} highlightAbove={94} />
      </div>
    </div>
  )
}

function HomeworkPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between rounded-2xl border border-night/[0.07] bg-white p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-extrabold">6.01</span>
            <Pill tone="neutral" className="px-2 py-0 text-[10px]">
              Maths
            </Pill>
          </div>
          <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-mute">Last topic</div>
          <div className="text-sm font-bold">Fractions</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex -space-x-2">
            {['#1E88F5', '#A3E635', '#F97316'].map((hex, i) => (
              <span
                key={hex}
                className="h-7 w-7 rounded-full border-2 border-white"
                style={{ backgroundColor: hex, zIndex: 3 - i }}
              />
            ))}
            <span className="flex h-7 items-center rounded-full border-2 border-white bg-night px-2 text-[9px] font-bold text-white">
              +22
            </span>
          </div>
          <Pill tone="brand" className="px-2.5 py-0.5 text-[10px]">
            +5 to check
          </Pill>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-night/[0.07] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold">{homeworkPreview.className}</span>
          <span className="text-[10px] font-semibold text-mute">Deadline · 16 Jan</span>
        </div>
        <ul className="space-y-2">
          {homeworkPreview.rows.slice(0, 4).map((row, i) => (
            <motion.li
              key={row.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="flex items-center justify-between gap-3 rounded-xl bg-bone/70 px-3 py-2"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-6 w-6 shrink-0 rounded-full bg-night/10" />
                <span className="truncate text-[11px] font-semibold">{row.student}</span>
              </span>
              <Pill tone={statusTone[row.status]} className="shrink-0 px-2 py-0 text-[10px]">
                {row.status}
              </Pill>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function VideoPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative flex-1 overflow-hidden rounded-2xl bg-night">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="aurora -left-8 top-0 h-40 w-40 animate-drift bg-azure/50" />
          <div className="aurora -right-6 bottom-0 h-36 w-36 animate-drift-slow bg-aqua/40" />
        </div>
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
          <Pill tone="rose" className="px-2 py-0 text-[9px]">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            LIVE
          </Pill>
          <Pill tone="outline" className="px-2 py-0 text-[9px]">
            42 watching
          </Pill>
        </div>
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-xl"
        >
          <PlayCircle size={26} strokeWidth={1.8} />
        </motion.span>
      </div>

      <div className="rounded-2xl border border-night/[0.07] bg-white p-4">
        <div className="text-sm font-bold">Thermodynamics — Entropy</div>
        <div className="mt-0.5 text-[10px] text-mute">Dr. Selina Owusu · SHS 3 Physics</div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-[10px] font-semibold tabular-nums text-mute">18:24</span>
          <ProgressBar value={40} thickness={4} className="flex-1" />
          <span className="text-[10px] font-semibold tabular-nums text-mute">46:10</span>
        </div>
      </div>
    </div>
  )
}

function ParentPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Attendance', value: '96%', hex: '#A3E635' },
          { label: 'Fees due', value: '$450', hex: '#F97316' },
          { label: 'Avg grade', value: 'A-', hex: '#1E88F5' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-2xl border border-night/[0.07] bg-white p-3.5"
          >
            <div className="h-1 w-6 rounded-full" style={{ backgroundColor: kpi.hex }} />
            <div className="mt-3 font-heading text-2xl font-extrabold tracking-tightest">{kpi.value}</div>
            <div className="mt-1 text-[10px] text-mute">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 rounded-2xl border border-night/[0.07] bg-white p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-mute">Teacher messages</div>
        <div className="mt-3 space-y-2.5">
          {[
            ['DR', 'Mr. Roberts', 'Emma is doing exceptionally well with quadratics.', '#1E88F5'],
            ['HL', 'Ms. Lee', 'Science fair proposals close on the 24th.', '#A3E635'],
          ].map(([initials, name, body, hex], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex gap-2.5 rounded-xl bg-bone/70 p-3"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ backgroundColor: hex }}
              >
                {initials}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold">{name}</span>
                <span className="block text-[10px] leading-4 text-mute">{body}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Steps
 * ------------------------------------------------------------------ */

const steps = [
  {
    id: 'analytics',
    label: 'Dashboard with all analytical information',
    body: 'Attendance, grade spread, and test performance in one view. Leverage data-driven insights to enhance decision-making.',
    Icon: BarChart3,
    hex: '#1E88F5',
    Panel: AnalyticsPanel,
  },
  {
    id: 'homework',
    label: 'Simplify the homework workflow',
    body: 'Create assignments, share them with students, and streamline the submission and grading process.',
    Icon: ClipboardCheck,
    hex: '#A3E635',
    Panel: HomeworkPanel,
  },
  {
    id: 'video',
    label: 'Integrated video lessons',
    body: 'Stream lessons in-platform with the class discussion beside them, and keep the recording for revision week.',
    Icon: PlayCircle,
    hex: '#22D3EE',
    Panel: VideoPanel,
  },
  {
    id: 'parents',
    label: 'Parents in the loop, automatically',
    body: 'Attendance, fees, and grades reach the household the moment they are recorded — no waiting for a term report.',
    Icon: MessageSquareHeart,
    hex: '#F97316',
    Panel: ParentPanel,
  },
]

/* ------------------------------------------------------------------ *
 * Laptop frame
 * ------------------------------------------------------------------ */

function Laptop({ index, direction }) {
  const { Panel } = steps[index]

  return (
    <div className="relative">
      {/* Screen */}
      <div className="relative overflow-hidden rounded-t-2xl border-[10px] border-b-0 border-night bg-night shadow-pop">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-bone">
          <span className="absolute left-1/2 top-1.5 z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/25" />

          {/* Keyed remount rather than an AnimatePresence exit: a stalled exit
              transition would hold the outgoing panel and block the swap. */}
          <motion.div
            key={steps[index].id}
            initial={{ opacity: 0, x: direction > 0 ? 70 : -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-0 p-4 sm:p-5"
          >
            <Panel />
          </motion.div>
        </div>
      </div>

      {/* Base */}
      <div className="relative mx-auto h-3.5 w-[112%] -translate-x-[5.3%] rounded-b-2xl bg-night">
        <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-lg bg-white/15" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */

export default function HowItWorks() {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  // Mirrors `index` so the scroll handler can compare without the state
  // updater doing side effects — updater functions must stay pure.
  const indexRef = useRef(0)

  const show = (next, dir) => {
    if (next === indexRef.current) return
    indexRef.current = next
    setDirection(dir)
    setIndex(next)
  }

  // Scrolling through the tall section walks the panels forward. This reads
  // layout directly rather than going through a scroll-progress motion value,
  // so it stays correct even when animation frames are throttled.
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return

      const { top, height } = el.getBoundingClientRect()
      // Distance travelled through the section's scrollable run.
      const travel = height - window.innerHeight
      if (travel <= 0) return

      const progress = Math.min(1, Math.max(0, -top / travel))
      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length))
      show(next, next > indexRef.current ? 1 : -1)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const go = (next) => {
    const clamped = (next + steps.length) % steps.length
    show(clamped, clamped > indexRef.current ? 1 : -1)
  }

  // Swipe support on touch devices, since the sticky panel eats vertical drags.
  const touchX = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = (e) => (touchX.current = e.touches[0].clientX)
    const end = (e) => {
      if (touchX.current == null) return
      const dx = e.changedTouches[0].clientX - touchX.current
      if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1))
      touchX.current = null
    }
    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchend', end, { passive: true })
    return () => {
      el.removeEventListener('touchstart', start)
      el.removeEventListener('touchend', end)
    }
  }, [index])

  return (
    <section id="how" ref={ref} className="relative bg-bone text-night" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-tightest sm:text-5xl">
              <span className="word-soft-dark">Classroom</span>{' '}
              <span className="relative inline-block">
                Exploring
                <Scribble color="#1E88F5" width={180} className="absolute -bottom-1 left-0 w-full" delay={0.4} />
              </span>
              <br />
              Eduvia Features
            </h2>
          </Reveal>

          <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* Device */}
            <div className="order-2 lg:order-1">
              <Laptop index={index} direction={direction} />

              {/* Manual controls */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => go(index - 1)}
                  aria-label="Previous feature"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-night/15 bg-white transition-colors hover:border-night/50"
                >
                  <ChevronLeft size={17} strokeWidth={2.2} />
                </button>

                <div className="flex items-center gap-2">
                  {steps.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => go(i)}
                      aria-label={s.label}
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: i === index ? 28 : 8,
                        backgroundColor: i === index ? s.hex : 'rgba(10,10,11,0.15)',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => go(index + 1)}
                  aria-label="Next feature"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-night/15 bg-white transition-colors hover:border-night/50"
                >
                  <ChevronRight size={17} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Step list */}
            <ol className="order-1 space-y-3 lg:order-2">
              {steps.map((step, i) => {
                const isActive = i === index
                return (
                  <li key={step.id}>
                    <button
                      onClick={() => go(i)}
                      className={`relative flex w-full gap-4 overflow-hidden rounded-3xl border p-5 text-left transition-all duration-400 sm:p-6 ${
                        isActive
                          ? 'border-night/10 bg-white shadow-glass'
                          : 'border-transparent bg-transparent hover:bg-white/60'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="how-active"
                          className="absolute left-0 top-0 h-full w-1"
                          style={{ backgroundColor: step.hex }}
                          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                        />
                      )}

                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300"
                        style={{
                          backgroundColor: isActive ? step.hex : 'rgba(10,10,11,0.05)',
                          color: isActive ? '#fff' : 'rgba(10,10,11,0.4)',
                        }}
                      >
                        <step.Icon size={20} strokeWidth={2} />
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block font-heading text-lg font-extrabold leading-snug tracking-tight transition-colors sm:text-xl ${
                            isActive ? 'text-night' : 'text-night/40'
                          }`}
                        >
                          {step.label}
                        </span>

                        <motion.span
                          initial={false}
                          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-2 block text-sm leading-7 text-night/55">{step.body}</span>
                        </motion.span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <p className="mt-10 text-center text-xs text-night/30 lg:hidden">Swipe, or tap a feature above.</p>
        </div>
      </div>
    </section>
  )
}
