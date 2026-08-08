import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Scribble } from '../shared/Marks'
import { EASE } from '../shared/Motion'
import { benefitPills } from '../../mockData'

const toneClass = {
  azure: 'bg-azure text-white',
  lime: 'bg-lime text-night',
  tangerine: 'bg-tangerine text-white',
  aqua: 'bg-aqua text-night',
  blush: 'bg-blush text-white',
  sun: 'bg-sun text-night',
  white: 'bg-white text-night',
}

/** Each pill drifts on its own loop so the cluster never moves in lockstep. */
const drift = (i) => ({
  y: [0, -14, 0, 11, 0],
  x: [0, 7, 0, -7, 0],
  transition: { duration: 9 + (i % 4) * 2.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
})

// Hand-placed offsets keep the cluster scattered but still legible.
const offsets = [
  'lg:translate-y-0',
  'lg:translate-y-12',
  'lg:-translate-y-7',
  'lg:translate-y-9',
  'lg:-translate-y-3',
  'lg:translate-y-14',
  'lg:-translate-y-10',
  'lg:translate-y-5',
]

export default function BenefitsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const shapesY = useTransform(scrollYProgress, [0, 1], [70, -70])

  return (
    <section id="benefits" ref={ref} className="relative overflow-hidden bg-night">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora left-[-10%] top-[10%] h-[500px] w-[500px] animate-drift bg-azure/25" />
        <div className="aurora bottom-[-10%] right-[-6%] h-[440px] w-[440px] animate-drift-slow bg-lime/15" />
      </div>

      <motion.div style={{ y: shapesY }} aria-hidden="true" className="pointer-events-none absolute inset-0">
      </motion.div>

      <div className="relative mx-auto max-w-shell px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="eyebrow text-white/35">Benefits</div>
          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.1] tracking-tightest sm:text-5xl lg:text-6xl">
            <span className="word-soft">What changes,</span>{' '}
            <span className="relative inline-block">
              day to day
              <Scribble color="#A3E635" width={230} className="absolute -bottom-1 left-0 w-full" delay={0.5} />
            </span>
          </h2>
          <p className="mt-9 text-base leading-8 text-white/50">
            Proprietors see the campus. Teachers see their classes. Students see what is due next. Parents see their
            own child. Same register, four points of view.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-24 lg:gap-6">
          {benefitPills.map((pill, i) => (
            <motion.div
              key={pill.id}
              initial={{ opacity: 0, scale: 0.86, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className={offsets[i % offsets.length]}
            >
              <motion.div animate={drift(i)} whileHover={{ scale: 1.07 }}>
                <span
                  className={`inline-flex whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold shadow-pop sm:px-7 sm:py-3.5 sm:text-base ${
                    toneClass[pill.tone] || toneClass.white
                  }`}
                >
                  {pill.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
