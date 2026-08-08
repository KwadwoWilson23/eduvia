import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play, CalendarCheck, GraduationCap, Wallet, MessageSquare, TrendingUp } from 'lucide-react'
import { Scribble, Squiggle } from '../shared/Marks'
import { SplitWords, RotatingWord, EASE } from '../shared/Motion'
import { roleOptions } from '../../mockData'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: d, ease: EASE } }),
}

/* ------------------------------------------------------------------ *
 * Live activity ticker — small, dense, lots of motion
 * ------------------------------------------------------------------ */

const activityFeed = [
  { Icon: CalendarCheck, tint: '#A3E635', text: 'Dr. Owusu marked attendance', meta: 'SHS 3 · 09:04' },
  { Icon: GraduationCap, tint: '#1E88F5', text: 'Amara submitted "Wave Interference"', meta: '2 min ago' },
  { Icon: MessageSquare, tint: '#F97316', text: 'Mr. Roberts messaged 3 parents', meta: 'Just now' },
  { Icon: Wallet, tint: '#22D3EE', text: '84 fee statements issued', meta: 'This morning' },
  { Icon: TrendingUp, tint: '#A3E635', text: 'Class average up 4.2%', meta: 'Term 2' },
  { Icon: GraduationCap, tint: '#F472B6', text: 'Kwame joined Study Group B', meta: '5 min ago' },
]

function ActivityTicker() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % activityFeed.length), 2200)
    return () => clearInterval(id)
  }, [])

  // Render three in-flight rows so old ones slide up as new ones arrive.
  const rows = [0, 1, 2].map((offset) => activityFeed[(i + offset) % activityFeed.length])

  return (
    <div className="relative h-[132px] overflow-hidden">
      {rows.map((row, k) => {
        const Icon = row.Icon
        return (
          <motion.div
            key={`${i}-${k}`}
            initial={{ y: k === 0 ? -44 : 44 * k, opacity: k === 0 ? 0 : 0.55 - k * 0.18 }}
            animate={{ y: 44 * (k - 1), opacity: k === 1 ? 1 : 0.5 - Math.abs(k - 1) * 0.25 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute inset-x-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-xl"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${row.tint}22`, color: row.tint }}
            >
              <Icon size={16} strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold text-white">{row.text}</span>
              <span className="mt-0.5 block truncate text-[10px] text-white/45">{row.meta}</span>
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Marquee row — logos and programme names drifting across
 * ------------------------------------------------------------------ */

const marqueeItems = [
  'General Science',
  'Business',
  'General Arts',
  'Visual Arts',
  'BSc Computer Science',
  'Nursing',
  'Engineering',
  'BEd Education',
  'Home Economics',
  'Agricultural Science',
]

function ProgrammeMarquee() {
  return (
    <div className="relative overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-night to-transparent" />
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((label, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-semibold text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-azure" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */

export default function Hero({ onLogin, onExplore }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-night pb-6">
      {/* Colour wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora left-1/2 top-[-20%] h-[620px] w-[860px] -translate-x-1/2 bg-azure/25" />
        <div className="aurora -left-24 top-1/3 h-[420px] w-[420px] animate-drift-slow bg-aqua/15" />
        <div className="aurora -right-20 top-1/4 h-[400px] w-[400px] animate-drift bg-tangerine/12" />
      </div>

      {/* Fine grid, fading downwards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 85%)',
        }}
      />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative mx-auto max-w-shell px-4 pt-20 text-center sm:px-6 lg:px-10 lg:pt-28"
      >
        <motion.div variants={rise} initial="hidden" animate="show" custom={0} className="mb-9 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-white/65 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Senior High &amp; Tertiary · Built for Ghana
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl font-heading text-[46px] font-extrabold leading-[1.0] tracking-tightest text-white sm:text-7xl lg:text-[96px]">
          <SplitWords text="Unlock the" delay={0.15} />{' '}
          <span className="relative inline-block">
            <SplitWords text="future" delay={0.35} />
            <Scribble color="#22D3EE" width={210} className="absolute -bottom-2 left-0 w-full" delay={0.95} />
          </span>
          <br />
          <SplitWords text="of" delay={0.5} />{' '}
          <span className="relative inline-block">
            <SplitWords text="education" delay={0.58} />
            <Squiggle
              color="#F472B6"
              width={200}
              className="absolute -bottom-5 left-1/2 w-[78%] -translate-x-1/2"
              delay={1.2}
            />
          </span>
        </h1>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.55}
          className="mx-auto mt-14 max-w-xl text-base leading-8 text-white/50 sm:text-lg"
        >
          One platform for{' '}
          <RotatingWord
            words={['students', 'parents', 'teachers', 'proprietors']}
            colors={['#7CC4FF', '#FDBA74', '#BEF264', '#5EEAD4']}
            className="font-bold"
          />{' '}
          — from SHS 1 through your final year at university.
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.68}
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button onClick={onLogin} className="btn-light group w-full px-8 py-4 text-[15px] sm:w-auto">
            Get Started
            <ArrowUpRight
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
          <button onClick={onExplore} className="btn-ghost group w-full px-8 py-4 text-[15px] sm:w-auto">
            <Play size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:scale-110" />
            See how it works
          </button>
        </motion.div>
      </motion.div>

      {/* Ambient row: live activity feed, role dots, live student count */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        className="relative mx-auto mt-24 grid max-w-4xl gap-3 px-4 sm:px-6 lg:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        {/* Role legend card */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Built for</div>
          <ul className="mt-4 space-y-2.5">
            {roleOptions.map((role) => (
              <li key={role.id} className="flex items-center gap-2.5 text-sm font-semibold text-white/70">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: role.hex }} />
                {role.label}s
              </li>
            ))}
          </ul>
        </div>

        {/* Live feed */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Live on Eduvia</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-lime">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              LIVE
            </span>
          </div>
          <div className="mt-4">
            <ActivityTicker />
          </div>
        </div>

        {/* Count card */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Right now</div>
          <div className="mt-4">
            <div className="font-heading text-4xl font-extrabold tracking-tightest text-white">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                4,218
              </motion.span>
            </div>
            <div className="mt-1 text-xs text-white/50">students in class</div>
          </div>
          <div className="mt-5 flex -space-x-2">
            {['#1E88F5', '#F97316', '#A3E635', '#22D3EE', '#F472B6'].map((hex, i) => (
              <span
                key={hex}
                className="h-7 w-7 rounded-full border-2 border-night"
                style={{ backgroundColor: hex, zIndex: 5 - i }}
              />
            ))}
            <span className="flex h-7 items-center rounded-full border-2 border-night bg-white/10 px-2 text-[9px] font-bold text-white">
              +4.2K
            </span>
          </div>
        </div>
      </motion.div>

      {/* Programme marquee — the last thing in the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="relative mt-10 border-y border-white/8"
      >
        <ProgrammeMarquee />
      </motion.div>
    </section>
  )
}
