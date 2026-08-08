import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Video, Mic } from 'lucide-react'
import Blob3D, { Scribble, Squiggle } from '../shared/Blob3D'
import { SplitWords, EASE } from '../shared/Motion'
import { navLinks, heroCards } from '../../mockData'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: d, ease: EASE } }),
}

/** Small floating "someone is on the call" card. */
function CallCard({ card, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0, 9, 0] }}
        transition={{ duration: 11 + delay * 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[136px] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-1.5 backdrop-blur-xl"
      >
        <div
          className="relative flex h-20 items-end justify-center overflow-hidden rounded-xl"
          style={{ backgroundColor: `${card.hex}22` }}
        >
          {/* Abstract stand-in for a webcam feed */}
          <div className="absolute left-1/2 top-3 h-7 w-7 -translate-x-1/2 rounded-full" style={{ backgroundColor: card.hex }} />
          <div className="h-9 w-16 rounded-t-full" style={{ backgroundColor: card.hex, opacity: 0.85 }} />
          <div className="absolute right-1.5 top-1.5 flex gap-1">
            <Mic size={9} strokeWidth={2.5} className="text-white/70" />
            <Video size={9} strokeWidth={2.5} className="text-white/70" />
          </div>
        </div>
        <div className="px-1.5 pb-1 pt-2">
          <div className="text-[10px] font-bold leading-tight">{card.name}</div>
          <div className="mt-0.5 text-[9px] leading-tight text-white/45">{card.caption}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero({ onLogin, onExplore }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const shapesY = useTransform(scrollYProgress, [0, 1], [0, -70])

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-night pb-32 pt-10 lg:pb-40">
      {/* Colour wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora -left-32 top-10 h-[520px] w-[520px] animate-drift bg-grape/25" />
        <div className="aurora -right-24 top-1/4 h-[460px] w-[460px] animate-drift-slow bg-aqua/20" />
        <div className="aurora bottom-0 left-1/3 h-[420px] w-[420px] animate-drift bg-tangerine/15" />
      </div>

      {/* Glossy 3D shapes */}
      <motion.div style={{ y: shapesY }} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Blob3D shape="pebble" hex="#A855F7" size={210} rotate={-18} float className="absolute right-[3%] top-[9%] hidden lg:block" />
        <Blob3D shape="torus" hex="#F97316" size={150} rotate={12} float delay={1.2} className="absolute left-[2%] top-[48%] hidden lg:block" />
        <Blob3D shape="droplet" hex="#A3E635" size={120} rotate={-8} float delay={2.1} className="absolute bottom-[10%] right-[9%] hidden xl:block" />
        <Blob3D shape="gem" hex="#22D3EE" size={104} rotate={20} float delay={0.6} className="absolute left-[8%] top-[16%] hidden xl:block" />
        <Blob3D shape="pebble" hex="#F472B6" size={78} rotate={30} float delay={1.7} className="absolute bottom-[20%] left-[20%] hidden 2xl:block" />
      </motion.div>

      {/* Floating call cards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <CallCard card={heroCards[0]} className="left-[13%] top-[30%]" delay={0.9} />
        <CallCard card={heroCards[1]} className="right-[14%] bottom-[22%]" delay={1.2} />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-shell px-4 pt-16 text-center sm:px-6 lg:px-10 lg:pt-24"
      >
        <motion.div variants={rise} initial="hidden" animate="show" custom={0} className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-white/70 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Senior High &amp; Tertiary · Built for Ghana
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-4xl font-heading text-[44px] font-extrabold leading-[1.02] tracking-tightest sm:text-7xl lg:text-[92px]">
          <span className="relative inline-block">
            <SplitWords text="Unlock" delay={0.15} />
            <Scribble color="#FFFFFF" width={230} className="absolute -bottom-1 left-0 w-full" delay={0.9} />
          </span>{' '}
          <SplitWords text="the future" delay={0.3} />
          <br />
          <SplitWords text="of" delay={0.5} />{' '}
          <span className="relative inline-block">
            <SplitWords text="education" delay={0.6} />
            <Squiggle color="#F472B6" width={190} className="absolute -bottom-4 left-1/2 w-[80%] -translate-x-1/2" delay={1.15} />
          </span>
        </h1>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.55}
          className="mx-auto mt-12 max-w-xl text-base leading-8 text-white/50 sm:text-lg"
        >
          One platform for students, parents, teachers, and school proprietors — from SHS 1 through your final year
          at university.
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0.7}
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
          <button onClick={onExplore} className="btn-ghost w-full px-8 py-4 text-[15px] sm:w-auto">
            See how it works
          </button>
        </motion.div>
      </motion.div>

      {/* Anchored nav pill, as in the reference */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
        className="relative mt-20 flex justify-center px-4 lg:mt-28"
      >
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/12 bg-white/[0.07] p-1.5 backdrop-blur-2xl no-scrollbar">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
