import { motion } from 'framer-motion'
import { Building2, Wallet, KeyRound, Lock, Check } from 'lucide-react'
import { Reveal, EASE } from '../shared/Motion'
import { Scribble } from '../shared/Marks'
import { pricing } from '../../lib/access'

const money = (n) => `${pricing.currency} ${n}`

const streams = [
  {
    id: 'prop',
    Icon: Building2,
    tint: '#1E88F5',
    role: 'Proprietors',
    price: `${money(pricing.perStudentPerTerm)} / student / term`,
    body: 'Run your school on Eduvia and pay a small charge per enrolled student each term. First term is free.',
  },
  {
    id: 'parent',
    Icon: Wallet,
    tint: '#F97316',
    role: 'Parents',
    price: `School fee + ${money(pricing.parentProcessingFee)} processing`,
    body: 'Pay term fees straight through the platform. The school keeps its fee, Eduvia takes the processing.',
  },
  {
    id: 'teacher',
    Icon: KeyRound,
    tint: '#A3E635',
    role: 'Teachers',
    price: 'Free · invite only',
    body: 'Join with an invite code from your proprietor. No password to remember and nothing to pay.',
  },
]

export default function HowItEarns() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-night py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora left-1/3 top-0 h-[440px] w-[440px] animate-drift-slow bg-azure/12" />
        <div className="aurora bottom-0 right-1/4 h-[380px] w-[380px] animate-drift bg-lime/10" />
      </div>

      <div className="relative mx-auto max-w-shell px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow text-white/35">Pricing &amp; access</div>
          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.1] tracking-tightest sm:text-5xl lg:text-6xl">
            <span className="word-soft">How Eduvia</span>{' '}
            <span className="relative inline-block">
              earns
              <Scribble color="#22D3EE" width={130} className="absolute -bottom-1 left-0 w-full" delay={0.4} />
            </span>
          </h2>
          <p className="mt-9 text-base leading-8 text-white/50">
            Three simple streams. Proprietors subscribe, parents pay fees, teachers join by invite. No card is asked
            for during sign-up.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {streams.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/[0.04] p-7 lg:p-8"
            >
              <div
                aria-hidden="true"
                className="aurora -right-12 -top-12 h-40 w-40 opacity-30 transition-opacity duration-500 group-hover:opacity-70"
                style={{ backgroundColor: s.tint }}
              />

              <div className="relative">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${s.tint}22`, color: s.tint }}
                >
                  <s.Icon size={19} strokeWidth={2} />
                </span>

                <div className="mt-6 text-[11px] font-bold uppercase tracking-wider text-white/40">{s.role}</div>
                <div className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-white">{s.price}</div>
                <p className="mt-4 text-sm leading-6 text-white/55">{s.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Access rules — the "what happens if you don't pay" bit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-10 grid gap-3 rounded-4xl border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[auto_1fr] lg:gap-6 lg:p-8"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose/15 text-rose">
              <Lock size={17} strokeWidth={2} />
            </span>
            <div className="lg:hidden">
              <div className="text-sm font-bold text-white">What locks when fees aren't paid</div>
            </div>
          </div>
          <ul className="grid gap-3 text-sm text-white/65 sm:grid-cols-2">
            <li className="flex gap-2"><Check size={14} strokeWidth={2.5} className="mt-1 shrink-0 text-lime" />Grades hide from the parent view until paid.</li>
            <li className="flex gap-2"><Check size={14} strokeWidth={2.5} className="mt-1 shrink-0 text-lime" />Direct messages to teachers are held.</li>
            <li className="flex gap-2"><Check size={14} strokeWidth={2.5} className="mt-1 shrink-0 text-lime" />Attendance and the timetable stay visible.</li>
            <li className="flex gap-2"><Check size={14} strokeWidth={2.5} className="mt-1 shrink-0 text-lime" />The student can still see their next lesson.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
