import { motion } from 'framer-motion'
import { Check, KeyRound } from 'lucide-react'
import { isValidInviteCode } from '../../lib/access'

/**
 * Teachers can't join a school without an invite code from the
 * proprietor. This is how Eduvia keeps random accounts out of a school's
 * classrooms — and, upstream, how the proprietor stays in control of
 * their staff roster.
 */
export default function InviteCodeStep({ value, onChange }) {
  const trimmed = String(value || '').trim().toUpperCase()
  const valid = isValidInviteCode(trimmed)

  return (
    <div>
      <h2 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">
        Your invite code
      </h2>
      <p className="mt-3 text-sm leading-6 text-white/50">
        Your school's proprietor sends this when they add you to the staff roster. It looks like{' '}
        <span className="font-mono font-semibold text-white/80">EDU-STAFF-2025</span>.
      </p>

      <div className="relative mt-8">
        <KeyRound size={18} strokeWidth={2} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          autoFocus
          value={value || ''}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="EDU-XXXX-XXXX"
          className="w-full rounded-2xl border border-white/15 bg-white/[0.05] py-4 pl-14 pr-5 font-mono text-lg tracking-widest text-white outline-none transition-colors placeholder:tracking-normal placeholder:text-white/25 focus:border-white/60 focus:bg-white/[0.09]"
        />
      </div>

      {trimmed && valid && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-lime/40 bg-lime/10 p-4"
        >
          <Check size={16} strokeWidth={2.5} className="shrink-0 text-lime" />
          <span className="text-sm text-white/85">Code accepted — you'll join as teaching staff.</span>
        </motion.div>
      )}

      {trimmed && !valid && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-rose/30 bg-rose/[0.08] p-4"
        >
          <p className="text-sm text-white/70">
            That code isn't recognised. Ask your school office to send a fresh one — or, for this demo, try{' '}
            <button
              onClick={() => onChange('EDU-STAFF-2025')}
              className="font-mono font-semibold text-white underline-offset-2 hover:underline"
            >
              EDU-STAFF-2025
            </button>
            .
          </p>
        </motion.div>
      )}
    </div>
  )
}
