import { motion } from 'framer-motion'
import { Check, PiggyBank, Wallet, Users } from 'lucide-react'

const bandCentre = { small: 200, mid: 650, large: 2000, xl: 3500 }

/**
 * Shown once, at the end of the proprietor flow. Sets out how Eduvia
 * earns and what the school will owe per term, based on the population
 * band picked earlier — no billing happens; this is a preview.
 */
export default function BillingSummary({ school, population, pricing }) {
  const students = bandCentre[population] || 500
  const termCharge = students * pricing.perStudentPerTerm
  const currency = pricing.currency || 'GHS'

  const money = (n) => `${currency} ${n.toLocaleString('en-US')}`

  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">Almost done</div>
      <h2 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">How Eduvia earns</h2>
      <p className="mt-3 text-sm leading-6 text-white/50">
        {school} will run on Eduvia at the rate below. Your first term is free — no card required to finish signing up.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { Icon: Users, tint: '#1E88F5', kicker: 'You (proprietor)', body: `${money(pricing.perStudentPerTerm)} per student, per term` },
          { Icon: Wallet, tint: '#F97316', kicker: 'Parents', body: `School fee + ${money(pricing.parentProcessingFee)} processing per payment` },
          { Icon: PiggyBank, tint: '#A3E635', kicker: 'Teachers', body: 'Free — access is via your invite code' },
        ].map((row, i) => (
          <motion.div
            key={row.kicker}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${row.tint}22`, color: row.tint }}
            >
              <row.Icon size={16} strokeWidth={2} />
            </span>
            <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-white/40">{row.kicker}</div>
            <div className="mt-1 text-sm font-semibold leading-5 text-white/85">{row.body}</div>
          </motion.div>
        ))}
      </div>

      {/* Term estimate */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">Estimated term charge</div>
            <div className="mt-1 text-xs text-white/50">Based on your school size — bills once each term</div>
          </div>
          <div className="text-right">
            <div className="font-heading text-3xl font-extrabold tracking-tightest text-white">{money(termCharge)}</div>
            <div className="mt-0.5 text-[11px] text-white/45">≈ {students.toLocaleString()} students</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-lime/10 px-3 py-2 text-xs font-semibold text-lime">
          <Check size={13} strokeWidth={2.5} />
          First term free — {pricing.freeTrialTerms > 1 ? `${pricing.freeTrialTerms} terms free` : 'no charge until next term'}
        </div>
      </div>

      <ul className="mt-6 space-y-2 text-xs leading-5 text-white/50">
        <li className="flex gap-2"><Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 text-white/40" />Teachers you invite pay nothing; parents pay per child.</li>
        <li className="flex gap-2"><Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 text-white/40" />Grades lock for students whose parents haven't paid the term fee.</li>
        <li className="flex gap-2"><Check size={13} strokeWidth={2.5} className="mt-0.5 shrink-0 text-white/40" />Cancel at any time — your data stays with the school.</li>
      </ul>
    </div>
  )
}
