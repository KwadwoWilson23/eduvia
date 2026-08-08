import { motion } from 'framer-motion'
import { StarScribble } from '../shared/Marks'
import { Reveal, Parallax, EASE } from '../shared/Motion'
import { discoverPoints } from '../../mockData'

/**
 * Light counterpart to the dark hero — mixed-weight headline where the
 * supporting words recede and the important ones land in full weight.
 */
export default function Discover() {
  return (
    <section className="relative overflow-hidden bg-bone py-24 text-night lg:py-36">
      <StarScribble color="#FACC15" size={130} className="absolute left-[6%] top-[42%] hidden opacity-90 lg:block" />

      <div className="relative mx-auto max-w-shell px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <h2 className="font-heading text-[38px] font-extrabold leading-[1.08] tracking-tightest sm:text-6xl lg:text-[68px]">
            <span className="word-soft-dark">Discover</span> firsthand
            <br />
            <span className="word-soft-dark">the transformative</span>
            <br />
            <span className="word-soft-dark">impact of</span> Eduvia
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2">
          {discoverPoints.map((point, i) => (
            <Parallax key={point.id} distance={i === 0 ? 26 : -26}>
              <motion.article
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: EASE }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-5xl border border-night/[0.07] bg-white p-3 shadow-glass transition-shadow duration-300 hover:shadow-glass-lg"
              >
                {/* Portrait stand-in — a solid colour field rather than a stock photo */}
                <div
                  className="relative flex h-56 items-end justify-center overflow-hidden rounded-4xl sm:h-64"
                  style={{ backgroundColor: `${point.hex}26` }}
                >
                  <div
                    className="absolute left-1/2 top-10 h-20 w-20 -translate-x-1/2 rounded-full"
                    style={{ backgroundColor: point.hex }}
                  />
                  <div className="h-28 w-44 rounded-t-[5rem]" style={{ backgroundColor: point.hex, opacity: 0.9 }} />

                  <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-bold backdrop-blur-sm">
                    {point.person}
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-night/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {point.detail}
                  </div>
                </div>

                <div className="px-5 pb-6 pt-7 sm:px-7">
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight">{point.title}</h3>
                  <p className="mt-3.5 text-[15px] leading-8 text-night/55">{point.body}</p>
                </div>
              </motion.article>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}
