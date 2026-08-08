import { motion } from 'framer-motion'
import { Clock, TrendingUp, AlertCircle, MoreVertical } from 'lucide-react'
import Pill from '../shared/Pill'
import { ProgressBar } from '../shared/Charts'
import { DoodleUnderline, DoodleStar } from '../shared/Doodles'
import { labelFor } from '../onboarding/steps'
import { studentView } from '../../mockData'

const dotColors = { brand: '#4F46E5', rose: '#F43F5E', amber: '#F59E0B', ink: '#0F172A' }
const kindText = { brand: 'text-brand', rose: 'text-rose', amber: 'text-amber', ink: 'text-ink' }
const EASE = [0.16, 1, 0.3, 1]

export default function StudentView({ account }) {
  const firstName = (account?.fullName || 'Student').split(' ')[0]
  const programme = labelFor('programme', account?.programme)

  return (
    <div className="space-y-6">
      <header className="relative">
        <h1 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl lg:text-[44px]">
          Welcome back, <DoodleUnderline color="#4F46E5">{firstName}</DoodleUnderline>
        </h1>
        <p className="mt-5 text-sm text-mute sm:text-base">
          {programme ? `${programme} · ` : ''}
          {studentView.subtitle}
        </p>
        <DoodleStar color="#F59E0B" size={20} spin className="absolute -top-2 left-[320px] hidden lg:block" />
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {/* Summary strip */}
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              whileHover={{ y: -6 }}
              className="glass glass-hover rounded-3xl p-6 lg:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-mute">Overall progress</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <TrendingUp size={16} strokeWidth={2} />
                </span>
              </div>
              <div className="mt-5 font-heading text-4xl font-extrabold tracking-tightest">
                {studentView.overallProgress}%
              </div>
              <ProgressBar value={studentView.overallProgress} className="mt-5" thickness={8} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              whileHover={{ y: -6 }}
              className="glass glass-hover rounded-3xl p-6 lg:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-mute">Tasks due today</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose/10 text-rose">
                  <AlertCircle size={16} strokeWidth={2} />
                </span>
              </div>
              <div className="mt-5 font-heading text-4xl font-extrabold tracking-tightest">
                {studentView.tasksDueToday}
              </div>
              <Pill tone="rose" className="mt-5">
                {studentView.highPriority} high priority
              </Pill>
            </motion.div>
          </div>

          {/* Courses */}
          <div>
            <h2 className="mb-3 font-heading text-xl font-extrabold tracking-tight">Current Courses</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {studentView.courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.14 + i * 0.07, ease: EASE }}
                  whileHover={{ y: -6 }}
                  className="glass glass-hover flex min-w-0 flex-col rounded-3xl p-6 lg:p-7"
                >
                  <div className="flex items-start justify-between">
                    <Pill tone={course.tone}>{course.tag}</Pill>
                    <button className="text-mute transition-colors hover:text-ink" aria-label="Course options">
                      <MoreVertical size={16} strokeWidth={2} />
                    </button>
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-extrabold tracking-tight">{course.title}</h3>
                  <p className="mt-1 text-sm text-mute">{course.instructor}</p>

                  <div className="mt-6">
                    <div className="mb-2 flex items-baseline justify-between text-sm">
                      <span className="font-medium text-mute">Progress</span>
                      <span className="font-bold">{course.progress}%</span>
                    </div>
                    <ProgressBar
                      value={course.progress}
                      color={course.progress >= 80 ? '#10B981' : '#4F46E5'}
                      delay={i * 0.08}
                      thickness={7}
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/[0.08] pt-5">
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-mute">Next up</div>
                      <div className="mt-1 truncate text-sm font-medium">{course.next}</div>
                    </div>
                    <button className="shrink-0 rounded-full bg-ink px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand">
                      {course.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Focus schedule */}
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          className="glass h-fit rounded-4xl p-6 lg:p-7"
        >
          <div className="flex items-center gap-2.5">
            <Clock size={18} strokeWidth={2} className="text-brand" />
            <h2 className="font-heading text-lg font-extrabold tracking-tight">Focus Schedule</h2>
          </div>

          <ol className="mt-6 space-y-1">
            {studentView.schedule.map((slot, i) => (
              <motion.li
                key={slot.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.24 + i * 0.09 }}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {i < studentView.schedule.length - 1 && (
                  <span className="absolute left-[5px] top-4 h-full w-px bg-ink/10" aria-hidden="true" />
                )}
                <span
                  className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: dotColors[slot.tone] }}
                />
                <div className="min-w-0">
                  <div className={`text-xs font-bold ${kindText[slot.tone]}`}>
                    {slot.time} · {slot.kind}
                  </div>
                  <div className="mt-1 text-sm font-semibold leading-snug">{slot.title}</div>
                  <div className="mt-1 text-xs text-mute">{slot.detail}</div>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="mt-6 border-t border-ink/[0.08] pt-5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-mute">Recent activity</h3>
            <ul className="mt-3.5 space-y-3">
              {studentView.activity.map((a) => (
                <li key={a.id} className="text-xs leading-5">
                  <span className="font-medium text-ink">{a.text}</span>
                  <span className="ml-1.5 text-mute">· {a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </div>
  )
}
