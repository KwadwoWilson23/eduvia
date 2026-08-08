import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Blob3D, { Scribble } from '../shared/Blob3D'
import { Reveal, EASE } from '../shared/Motion'
import { roleOptions } from '../../mockData'

/** What each role is asked for — set out plainly before anyone commits. */
const asks = {
  student: ['Your school', 'SHS or Tertiary', 'Your programme'],
  parent: ["Child's school", "Child's Eduvia ID"],
  teacher: ['Your school', 'Division taught', 'Your subject'],
  proprietor: ['Your school', 'What it offers', 'Student numbers'],
}

export default function RolePicker({ onPick }) {
  return (
    <section id="about" className="relative overflow-hidden bg-night py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora left-1/4 top-0 h-[420px] w-[420px] animate-drift-slow bg-grape/15" />
      </div>

      <div className="relative mx-auto max-w-shell px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow text-white/35">Get started</div>
          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.08] tracking-tightest sm:text-5xl lg:text-6xl">
            Pick the one that&apos;s{' '}
            <span className="relative inline-block">
              you
              <Scribble color="#A3E635" width={90} className="absolute -bottom-2 left-0 w-full" delay={0.5} />
            </span>
          </h2>
          <p className="mt-8 text-base leading-8 text-white/50">
            Four doors into the same platform. We ask a few questions so your dashboard opens on the right thing.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roleOptions.map((role, i) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: EASE }}
              whileHover={{ y: -8 }}
              onClick={() => onPick(role.id)}
              className="group relative flex flex-col overflow-hidden rounded-4xl border border-white/12 bg-white/[0.04] p-7 text-left transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.08]"
            >
              <span
                aria-hidden="true"
                className="aurora -right-12 -top-12 h-40 w-40 opacity-35 transition-opacity duration-500 group-hover:opacity-90"
                style={{ backgroundColor: role.hex }}
              />

              <span className="relative">
                <Blob3D shape={['pebble', 'droplet', 'torus', 'gem'][i % 4]} hex={role.hex} size={76} rotate={-14} />

                <span className="mt-6 block font-heading text-2xl font-extrabold tracking-tight">{role.label}</span>
                <span className="mt-2 block text-sm leading-6 text-white/50">{role.blurb}</span>

                <span className="mt-7 block border-t border-white/10 pt-5">
                  <span className="eyebrow text-white/30">We&apos;ll ask for</span>
                  <span className="mt-3 block space-y-1.5">
                    {asks[role.id].map((ask) => (
                      <span key={ask} className="flex items-center gap-2 text-xs text-white/55">
                        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: role.hex }} />
                        {ask}
                      </span>
                    ))}
                  </span>
                </span>

                <span className="mt-7 flex items-center gap-1.5 text-sm font-bold text-white">
                  Continue
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-xs text-white/30">
            No password, no email. This is a demo — your details stay in this browser.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
