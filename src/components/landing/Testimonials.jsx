import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Blob3D, { Scribble, StarScribble } from '../shared/Blob3D'
import { Reveal, EASE } from '../shared/Motion'
import { testimonials } from '../../mockData'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-bone text-night">
      <Blob3D shape="pebble" hex="#F472B6" size={150} rotate={-20} float className="absolute -left-8 top-20 hidden lg:block" />
      <Blob3D shape="gem" hex="#A3E635" size={120} rotate={18} float delay={1.3} className="absolute -right-4 bottom-28 hidden lg:block" />
      <StarScribble color="#FACC15" size={80} className="absolute left-[12%] bottom-16 hidden opacity-80 xl:block" />

      <div className="relative mx-auto max-w-shell px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow text-night/40">Testimonials</div>
          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.1] tracking-tightest sm:text-5xl lg:text-6xl">
            <span className="word-soft-dark">Four roles,</span>{' '}
            <span className="relative inline-block">
              one platform
              <Scribble color="#A855F7" width={250} className="absolute -bottom-1 left-0 w-full" delay={0.4} />
            </span>
          </h2>
          <p className="mt-9 text-base leading-8 text-night/50">
            A proprietor who runs the numbers, a teacher who marks on it, a student who plans her week with it, and a
            parent checking in from two hours away.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -6 }}
              /* min-w-0: the truncated subtitle is nowrap, which would otherwise
                 push the grid track past the viewport on narrow screens. */
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-5xl border border-night/[0.07] bg-white p-8 shadow-glass transition-shadow duration-300 hover:shadow-glass-lg sm:p-9"
            >
              <div
                aria-hidden="true"
                className="aurora -right-14 -top-14 h-48 w-48 opacity-25 transition-opacity duration-500 group-hover:opacity-70"
                style={{ backgroundColor: t.accent }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <span
                  className="rounded-full px-4 py-1.5 text-[11px] font-bold"
                  style={{ color: t.accent, backgroundColor: `${t.accent}1A` }}
                >
                  {t.role}
                </span>
                <Blob3D shape={i % 2 === 0 ? 'droplet' : 'torus'} hex={t.accent} size={46} rotate={-10} />
              </div>

              <Quote size={24} strokeWidth={2} className="relative mt-7 text-night/15" />

              <blockquote className="relative mt-4 flex-1 text-[15px] leading-8 sm:text-base">{t.quote}</blockquote>

              <figcaption className="relative mt-8 flex items-center gap-4 border-t border-night/[0.08] pt-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
                  style={{ backgroundColor: t.accent }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="mt-0.5 truncate text-xs text-night/50">{t.title}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
