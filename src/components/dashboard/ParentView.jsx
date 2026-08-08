import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Wallet, Star, MessageSquare, ChevronDown, CornerUpLeft, Check } from 'lucide-react'
import Pill from '../shared/Pill'
import { ProgressBar } from '../shared/Charts'
import { DoodleUnderline } from '../shared/Doodles'
import { labelFor } from '../onboarding/steps'
import { parentView } from '../../mockData'

const EASE = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ *
 * Child switcher
 * ------------------------------------------------------------------ */

function ChildSwitcher({ options, activeId, onSelect }) {
  const [open, setOpen] = useState(false)
  const active = options.find((c) => c.id === activeId)

  return (
    <div className="relative w-full sm:w-[320px]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="glass glass-hover flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-left"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-[10px] font-bold text-white">
            {active.initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{active.name}</span>
            <span className="block truncate text-xs text-mute">{active.grade}</span>
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={17} strokeWidth={2} className="shrink-0 text-mute" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-glass-lg backdrop-blur-2xl"
          >
            {options.map((child) => (
              <li key={child.id}>
                <button
                  role="option"
                  aria-selected={child.id === activeId}
                  onClick={() => {
                    onSelect(child.id)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between gap-3 border-b border-ink/[0.06] px-4 py-3.5 text-left transition-colors last:border-0 hover:bg-brand/[0.06]"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/[0.06] text-[10px] font-bold text-mute">
                      {child.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{child.name}</span>
                      <span className="block truncate text-xs text-mute">{child.grade}</span>
                    </span>
                  </span>
                  {child.id === activeId && <Check size={15} strokeWidth={2.5} className="shrink-0 text-brand" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * View
 * ------------------------------------------------------------------ */

export default function ParentView({ account }) {
  // A parent who linked a real Eduvia ID sees that child first, carrying the
  // name and programme they typed in; the sample children follow behind.
  const children = useMemo(() => {
    if (!account?.childId) return parentView.children

    const linked = {
      ...parentView.children[0],
      id: account.childId,
      name: account.childName || 'Your child',
      grade: labelFor('programme', account.childProgramme) || parentView.children[0].grade,
      initials: (account.childName || 'Your child')
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase(),
    }
    return [linked, ...parentView.children.slice(1)]
  }, [account])

  const [activeId, setActiveId] = useState(children[0].id)
  const child = children.find((c) => c.id === activeId) || children[0]

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl lg:text-[44px]">
            <DoodleUnderline color="#4F46E5">{parentView.title}</DoodleUnderline>
          </h1>
          <p className="mt-5 text-sm text-mute sm:text-base">
            {account?.school ? `${account.school} · ` : ''}
            {parentView.subtitle}
          </p>
        </div>
        <ChildSwitcher options={children} activeId={activeId} onSelect={setActiveId} />
      </header>

      {/* Keyed remount on child switch; no exit transition to stall on. */}
      <motion.div
        key={child.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="space-y-6"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Attendance */}
          <motion.div whileHover={{ y: -6 }} className="glass glass-hover rounded-3xl p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 text-sm font-bold">
                <CalendarCheck size={17} strokeWidth={2} className="text-brand" />
                Attendance
              </span>
              <Pill tone="neutral" className="px-3 py-0.5">
                This month
              </Pill>
            </div>
            <div className="mt-8 font-heading text-5xl font-extrabold tracking-tightest">
              {child.attendance.rate}%
            </div>
            <div className="mt-3 text-sm text-mute">
              Present {child.attendance.present} of {child.attendance.total} days
            </div>
            <ProgressBar
              value={child.attendance.rate}
              color={child.attendance.rate >= 95 ? '#10B981' : '#F59E0B'}
              className="mt-5"
              thickness={7}
            />
          </motion.div>

          {/* Fees */}
          <motion.div whileHover={{ y: -6 }} className="glass glass-hover rounded-3xl p-6 lg:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 text-sm font-bold">
                <Wallet size={17} strokeWidth={2} className="text-brand" />
                Fee Balance
              </span>
              <Pill tone={child.fees.tone}>{child.fees.status}</Pill>
            </div>
            <div className="mt-8 font-heading text-5xl font-extrabold tracking-tightest">{child.fees.amount}</div>
            <div className="mt-3 text-sm text-mute">{child.fees.term}</div>
            <button
              disabled={child.fees.amount === '$0'}
              className="btn-primary mt-5 w-full py-3.5 disabled:pointer-events-none disabled:bg-ink/[0.06] disabled:text-mute disabled:shadow-none"
            >
              {child.fees.amount === '$0' ? 'Nothing due' : 'Pay Now'}
            </button>
          </motion.div>

          {/* Grades */}
          <motion.div whileHover={{ y: -6 }} className="glass glass-hover rounded-3xl p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 text-sm font-bold">
                <Star size={17} strokeWidth={2} className="text-brand" />
                Recent Grades
              </span>
              <button className="text-xs font-semibold text-brand underline-offset-4 hover:underline">
                View all
              </button>
            </div>
            <ul className="mt-5 divide-y divide-ink/[0.07]">
              {child.grades.map((g) => (
                <li key={g.subject} className="flex items-center justify-between gap-3 py-3.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold">{g.subject}</div>
                    <div className="mt-0.5 truncate text-xs text-mute">{g.item}</div>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] text-xs font-bold">
                    {g.grade}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Teacher messages */}
        <section className="glass overflow-hidden rounded-4xl">
          <div className="flex items-center gap-2.5 border-b border-ink/[0.07] px-6 py-5 lg:px-7">
            <MessageSquare size={17} strokeWidth={2} className="text-brand" />
            <h2 className="font-heading text-lg font-extrabold tracking-tight">Teacher Messages</h2>
            <Pill tone="brand" className="ml-1 px-2.5 py-0.5 text-[11px]">
              {child.messages.length} new
            </Pill>
          </div>

          <div className="divide-y divide-ink/[0.06]">
            {child.messages.map((m, i) => (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.09 }}
                className="flex gap-4 px-6 py-6 lg:px-7"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-xs font-bold text-white">
                  {m.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-bold">
                      {m.from} <span className="font-medium text-mute">({m.subject})</span>
                    </div>
                    <span className="text-xs text-mute">{m.time}</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-7 text-ink/80">{m.body}</p>
                  <button className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand underline-offset-4 hover:underline">
                    <CornerUpLeft size={13} strokeWidth={2.5} />
                    Reply
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}
