import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play, TrendingUp, CalendarCheck, Wallet } from 'lucide-react'
import { Scribble, Squiggle } from '../shared/Marks'
import { SplitWords, RotatingWord, EASE } from '../shared/Motion'
import { LineChart, BarChart, ProgressBar } from '../shared/Charts'
import { roleOptions, analyticsPreview } from '../../mockData'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: d, ease: EASE } }),
}

/* ------------------------------------------------------------------ *
 * Product preview — a slice of the real portal, tilted under the copy
 * ------------------------------------------------------------------ */

function AppPreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/12 bg-[#101014] shadow-pop">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="flex gap-1.5">
          {['#F97316', '#FACC15', '#A3E635'].map((hex) => (
            <span key={hex} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: hex }} />
          ))}
        </span>
        <span className="ml-3 rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-medium text-white/40">
          eduvia.app / dashboard
        </span>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
        {/* KPI column */}
        <div className="space-y-3">
          {[
            { label: 'Attendance', value: '96%', hex: '#A3E635', Icon: CalendarCheck },
            { label: 'Avg grade', value: '87%', hex: '#1E88F5', Icon: TrendingUp },
            { label: 'Fees cleared', value: '92%', hex: '#F97316', Icon: Wallet },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.15 + i * 0.12, ease: EASE }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">{kpi.label}</span>
                <kpi.Icon size={13} strokeWidth={2} style={{ color: kpi.hex }} />
              </div>
              <div className="mt-2 font-heading text-2xl font-extrabold tracking-tightest">{kpi.value}</div>
              <ProgressBar
                value={parseInt(kpi.value, 10)}
                color={kpi.hex}
                thickness={4}
                delay={1.3 + i * 0.12}
                className="mt-2.5 bg-white/10"
              />
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
          className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 sm:col-span-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
              Cohort performance
            </span>
            <span className="rounded-full bg-lime/15 px-2.5 py-0.5 text-[10px] font-bold text-lime">+4.2</span>
          </div>

          <LineChart values={[62, 71, 68, 79, 74, 83, 87, 84, 91]} height={104} color="#22D3EE" />

          <div className="mt-3 border-t border-white/8 pt-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
              Attendance · 6 weeks
            </span>
            <BarChart
              data={analyticsPreview.attendanceTrend}
              height={72}
              showValues={false}
              highlightAbove={94}
              color="#1E88F5"
              mutedColor="rgba(255,255,255,0.12)"
            />
          </div>
        </motion.div>
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
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-night pb-24 lg:pb-32">
      {/* Colour wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora left-1/2 top-[-18%] h-[620px] w-[820px] -translate-x-1/2 bg-azure/20" />
        <div className="aurora -left-24 top-1/3 h-[420px] w-[420px] animate-drift-slow bg-aqua/12" />
        <div className="aurora -right-20 top-1/4 h-[400px] w-[400px] animate-drift bg-tangerine/10" />
      </div>

      {/* Fine grid, fading out downwards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 78%)',
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

        <h1 className="mx-auto max-w-5xl font-heading text-[46px] font-extrabold leading-[1.0] tracking-tightest sm:text-7xl lg:text-[96px]">
          <SplitWords text="Unlock the" delay={0.15} />{' '}
          <span className="relative inline-block">
            <SplitWords text="future" delay={0.35} />
            <Scribble color="#1E88F5" width={210} className="absolute -bottom-2 left-0 w-full" delay={0.95} />
          </span>
          <br />
          <SplitWords text="of" delay={0.5} />{' '}
          <span className="relative inline-block">
            <SplitWords text="education" delay={0.58} />
            <Squiggle
              color="#22D3EE"
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
            colors={['#1E88F5', '#F97316', '#A3E635', '#22D3EE']}
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

        {/* Who it's for */}
        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.8}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          {roleOptions.map((role) => (
            <span key={role.id} className="flex items-center gap-2 text-xs font-semibold text-white/35">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: role.hex }} />
              {role.label}s
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Product preview */}
      <motion.div
        initial={{ opacity: 0, y: 70, rotateX: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
        style={{ perspective: 1400 }}
        className="relative mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:mt-24 lg:px-10"
      >
        {/* Glow pooled beneath the panel */}
        <div
          aria-hidden="true"
          className="aurora left-1/2 top-10 h-[320px] w-[80%] -translate-x-1/2 bg-azure/25"
        />
        <div className="relative">
          <AppPreview />
        </div>
      </motion.div>
    </section>
  )
}
