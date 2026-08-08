import { useState } from 'react'
import { motion } from 'framer-motion'
import { FilePlus2, Video, CheckSquare, SlidersHorizontal, ArrowRight } from 'lucide-react'
import Pill from '../shared/Pill'
import { LineChart } from '../shared/Charts'
import { DoodleUnderline } from '../shared/Doodles'
import { teacherView, statusTone } from '../../mockData'

const actionIcons = { filePlus: FilePlus2, video: Video, checkSquare: CheckSquare }
const filters = ['All', 'Submitted', 'Graded', 'Overdue']
const EASE = [0.16, 1, 0.3, 1]

export default function TeacherView({ account }) {
  const [filter, setFilter] = useState('All')
  const [activeAction, setActiveAction] = useState(null)

  const rows = filter === 'All' ? teacherView.gradebook : teacherView.gradebook.filter((r) => r.status === filter)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl lg:text-[44px]">
            <DoodleUnderline color="#4F46E5">{teacherView.title}</DoodleUnderline>
          </h1>
          <p className="mt-5 text-sm text-mute sm:text-base">
            Welcome back, {account?.fullName || 'Teacher'}
            {account?.subject ? ` · ${account.subject}` : ''}. You have 3 urgent items to review.
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sm font-bold text-white">
          {account?.initials || 'ED'}
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        {/* Quick actions */}
        <div className="space-y-4">
          {teacherView.quickActions.map((action, i) => {
            const Icon = actionIcons[action.icon]
            const isActive = activeAction === action.id
            return (
              <motion.button
                key={action.id}
                onClick={() => setActiveAction(isActive ? null : action.id)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                whileHover={{ y: -5 }}
                className={`block w-full rounded-3xl p-6 text-left transition-colors duration-300 ${
                  isActive
                    ? 'border border-ink/80 bg-ink text-white shadow-glass-lg'
                    : 'glass glass-hover'
                }`}
              >
                <span
                  className={`inline-flex rounded-2xl p-3 ${
                    isActive ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand'
                  }`}
                >
                  <Icon size={19} strokeWidth={2} />
                </span>
                <div className="mt-5 flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight">
                  {action.label}
                  <ArrowRight
                    size={17}
                    strokeWidth={2.5}
                    className={`transition-all duration-300 ${isActive ? 'translate-x-0 opacity-90' : '-translate-x-2 opacity-0'}`}
                  />
                </div>
                <p className={`mt-2.5 text-sm leading-6 ${isActive ? 'text-white/60' : 'text-mute'}`}>
                  {action.description}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Class performance */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
          className="glass flex flex-col rounded-4xl p-6 sm:p-8"
        >
          <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight">
            Class Performance Overview
          </h2>

          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-5">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-5xl font-extrabold tracking-tightest lg:text-6xl">
                {teacherView.performance.average}%
              </span>
              <span className="text-sm font-medium text-mute">Avg grade</span>
            </div>
            <div className="flex gap-6">
              <div className="border-l-2 border-ink pl-3.5">
                <div className="font-heading text-2xl font-extrabold">{teacherView.performance.activeStudents}</div>
                <div className="mt-0.5 text-xs text-mute">Active students</div>
              </div>
              <div className="border-l-2 border-rose pl-3.5">
                <div className="font-heading text-2xl font-extrabold text-rose">{teacherView.performance.atRisk}</div>
                <div className="mt-0.5 text-xs text-mute">At risk</div>
              </div>
            </div>
          </div>

          <div className="glass-solid mt-8 flex-1 rounded-3xl p-5">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-mute">
              Rolling average · last 9 assessments
            </div>
            <LineChart values={teacherView.performance.trend} height={170} color="#10B981" />
          </div>
        </motion.section>
      </div>

      {/* Gradebook */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
        className="glass overflow-hidden rounded-4xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/[0.07] px-6 py-5 lg:px-7">
          <h2 className="font-heading text-xl font-extrabold tracking-tight">Recent Submissions</h2>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <SlidersHorizontal size={15} strokeWidth={2} className="shrink-0 text-mute" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
              >
                {filter === f && (
                  <motion.span
                    layoutId="gradebook-filter"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${filter === f ? 'text-white' : 'text-mute'}`}>{f}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-ink/[0.07] bg-ink/[0.02]">
                {['Student', 'Assignment', 'Submitted', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-mute lg:px-7">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <motion.tr
                  key={row.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-brand/[0.04]"
                >
                  <td className="px-6 py-4 lg:px-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-[10px] font-bold text-mute">
                        {row.initials}
                      </span>
                      <span className="text-sm font-medium">{row.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-mute lg:px-7">{row.assignment}</td>
                  <td
                    className={`px-6 py-4 text-sm lg:px-7 ${
                      row.status === 'Overdue' ? 'font-semibold text-rose' : 'text-mute'
                    }`}
                  >
                    {row.submitted}
                  </td>
                  <td className="px-6 py-4 lg:px-7">
                    <Pill tone={statusTone[row.status]}>
                      {row.status}
                      {row.score ? ` · ${row.score}` : ''}
                    </Pill>
                  </td>
                  <td className="px-6 py-4 lg:px-7">
                    <button className="text-sm font-semibold text-brand underline-offset-4 hover:underline">
                      {row.action}
                    </button>
                  </td>
                </motion.tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-mute">
                    No submissions match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  )
}
