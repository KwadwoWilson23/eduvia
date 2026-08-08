import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { Scribble, Squiggle } from '../shared/Marks'
import { SplitWords, RotatingWord, EASE } from '../shared/Motion'
import { roleOptions } from '../../mockData'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: d, ease: EASE } }),
}

export default function Hero({ onLogin, onExplore }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-bone pb-28 text-night lg:pb-40">
      {/* Colour wash, kept faint so the off-white stays off-white */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora left-1/2 top-[-20%] h-[620px] w-[860px] -translate-x-1/2 bg-azure/[0.12]" />
        <div className="aurora -left-24 top-1/3 h-[420px] w-[420px] animate-drift-slow bg-aqua/[0.10]" />
        <div className="aurora -right-20 top-1/4 h-[400px] w-[400px] animate-drift bg-tangerine/[0.08]" />
      </div>

      {/* Fine grid, fading out downwards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A0A0B 1px, transparent 1px), linear-gradient(to bottom, #0A0A0B 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 80%)',
        }}
      />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative mx-auto max-w-shell px-4 pt-24 text-center sm:px-6 lg:px-10 lg:pt-32"
      >
        <motion.div variants={rise} initial="hidden" animate="show" custom={0} className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-night/10 bg-white/80 px-4 py-2 text-[13px] font-medium text-night/60 backdrop-blur-xl">
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
              color="#F97316"
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
          className="mx-auto mt-14 max-w-xl text-base leading-8 text-night/55 sm:text-lg"
        >
          One platform for{' '}
          <RotatingWord
            words={['students', 'parents', 'teachers', 'proprietors']}
            colors={['#0B63C5', '#C2410C', '#4D7C0F', '#0E7490']}
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
          <button onClick={onLogin} className="btn-dark group w-full px-8 py-4 text-[15px] sm:w-auto">
            Get Started
            <ArrowUpRight
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
          <button onClick={onExplore} className="btn-outline group w-full px-8 py-4 text-[15px] sm:w-auto">
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
          className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          {roleOptions.map((role) => (
            <span key={role.id} className="flex items-center gap-2 text-xs font-semibold text-night/40">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: role.hex }} />
              {role.label}s
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
