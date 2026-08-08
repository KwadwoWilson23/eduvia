import { motion } from 'framer-motion'
import {
  BookOpen,
  ClipboardList,
  Star,
  CalendarDays,
  Filter,
  Search,
  Users,
  Wallet,
  Radio,
  MapPin,
  Clock,
  Bell,
} from 'lucide-react'
import Pill from '../shared/Pill'
import { ProgressBar } from '../shared/Charts'
import { DoodleUnderline } from '../shared/Doodles'
import { labelFor } from '../onboarding/steps'
import { adminView, parentView, studentView, teacherView, statusTone } from '../../mockData'
import { hasFullAccess } from '../../lib/access'

const EASE = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ *
 * Header — reused by every sub-page
 * ------------------------------------------------------------------ */

function PageHead({ title, subtitle, right = null }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">
          <DoodleUnderline color="#1E88F5">{title}</DoodleUnderline>
        </h1>
        {subtitle && <p className="mt-4 text-sm text-mute sm:text-base">{subtitle}</p>}
      </div>
      {right}
    </header>
  )
}

const initials = (name) =>
  String(name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || 'ED'

function childForAccount(account) {
  if (!account?.childId) return parentView.children[0]

  return {
    ...parentView.children[0],
    id: account.childId,
    name: account.childName || parentView.children[0].name,
    grade: labelFor('programme', account.childProgramme) || parentView.children[0].grade,
    initials: initials(account.childName || parentView.children[0].name),
  }
}

/* ------------------------------------------------------------------ *
 * COURSES — student sees their enrolments; teacher sees their classes
 * ------------------------------------------------------------------ */

function CoursesGrid({ courses }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c, i) => (
        <motion.article
          key={c.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          whileHover={{ y: -5 }}
          className="glass glass-hover flex min-w-0 flex-col rounded-3xl p-6 lg:p-7"
        >
          <div className="flex items-center justify-between">
            <Pill tone={c.tone || 'brand'}>{c.tag || 'Course'}</Pill>
            <span className="text-[11px] font-semibold text-mute">{c.next ? 'In progress' : 'Ready'}</span>
          </div>
          <h3 className="mt-4 font-heading text-xl font-extrabold tracking-tight">{c.title}</h3>
          <p className="mt-1 text-sm text-mute">{c.instructor}</p>
          {typeof c.progress === 'number' && (
            <>
              <div className="mt-5 mb-1.5 flex items-baseline justify-between text-sm">
                <span className="font-medium text-mute">Progress</span>
                <span className="font-bold">{c.progress}%</span>
              </div>
              <ProgressBar
                value={c.progress}
                color={c.progress >= 80 ? '#10B981' : '#1E88F5'}
                thickness={7}
                delay={i * 0.06}
              />
            </>
          )}
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/[0.08] pt-5">
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-mute">Next up</div>
              <div className="mt-1 truncate text-sm font-medium">{c.next || 'Nothing scheduled'}</div>
            </div>
            <button className="shrink-0 rounded-full bg-ink px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand">
              {c.cta || 'Open'}
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

// Fabricated teacher classes — mirrors the shape of student.courses.
const teacherClasses = [
  { id: 't1', tag: 'Physics · SHS 3', tone: 'brand', title: 'Advanced Physics', instructor: '24 students · 3 sections', progress: 68, next: 'Practical — Resonance Tube', cta: 'Open' },
  { id: 't2', tag: 'Physics · SHS 2', tone: 'sky', title: 'General Physics', instructor: '32 students · 2 sections', progress: 52, next: 'Waves · Chapter 4', cta: 'Open' },
  { id: 't3', tag: 'Elective · SHS 1', tone: 'success', title: 'Foundations of Physics', instructor: '28 students', progress: 41, next: 'Motion & Forces', cta: 'Open' },
]

export function CoursesPage({ role, account }) {
  if (role === 'teacher') {
    return (
      <div className="space-y-6">
        <PageHead
          title="My Classes"
          subtitle={`${account?.subject ? `${account.subject} · ` : ''}${teacherClasses.reduce((s, c) => s + parseInt(c.instructor), 0)} students in your care.`}
        />
        <CoursesGrid courses={teacherClasses} />
      </div>
    )
  }

  if (role === 'student') {
    return (
      <div className="space-y-6">
        <PageHead
          title="Courses"
          subtitle="Everything you're enrolled in this term."
        />
        <CoursesGrid courses={studentView.courses} />
      </div>
    )
  }

  if (role === 'parent') {
    const child = childForAccount(account)
    const children = [child, ...parentView.children.filter((c) => c.id !== child.id)]

    return (
      <div className="space-y-6">
        <PageHead title="Children" subtitle="Attendance, balances, and classes for the children linked to you." />
        <div className="grid gap-4 lg:grid-cols-2">
          {children.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              whileHover={{ y: -5 }}
              className="glass glass-hover rounded-3xl p-6 lg:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-xs font-bold text-white">
                    {c.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-heading text-xl font-extrabold tracking-tight">{c.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-mute">{c.grade}</span>
                  </span>
                </span>
                <Pill tone={c.fees.tone}>{c.fees.status}</Pill>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink/[0.07] bg-white/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mute">
                    <Users size={13} strokeWidth={2} /> Attendance
                  </div>
                  <div className="mt-3 font-heading text-3xl font-extrabold tracking-tightest">{c.attendance.rate}%</div>
                  <ProgressBar value={c.attendance.rate} color={c.attendance.rate >= 95 ? '#10B981' : '#F59E0B'} className="mt-3" />
                </div>
                <div className="rounded-2xl border border-ink/[0.07] bg-white/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mute">
                    <Wallet size={13} strokeWidth={2} /> Fee balance
                  </div>
                  <div className="mt-3 font-heading text-3xl font-extrabold tracking-tightest">{c.fees.amount}</div>
                  <div className="mt-1 text-xs text-mute">{c.fees.term}</div>
                </div>
              </div>

              <div className="mt-6 border-t border-ink/[0.08] pt-5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-mute">Today</div>
                <div className="mt-2 grid gap-2">
                  {c.today.slice(0, 2).map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between gap-3 rounded-2xl bg-ink/[0.04] px-3.5 py-3">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{slot.course}</span>
                        <span className="mt-0.5 block truncate text-[11px] text-mute">{slot.room}</span>
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-mute tabular-nums">{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    )
  }

  // Proprietor — programme catalogue
  return (
    <div className="space-y-6">
      <PageHead title="Programmes" subtitle={`${account?.school || 'Your school'} · Programmes on offer.`} />
      <CoursesGrid
        courses={[
          { id: 'p1', tag: 'SHS', tone: 'brand', title: 'General Science', instructor: '304 enrolled · 12 teachers', progress: 88, next: 'Term ends 27 March' },
          { id: 'p2', tag: 'SHS', tone: 'amber', title: 'General Arts', instructor: '241 enrolled · 9 teachers', progress: 76, next: 'Term ends 27 March' },
          { id: 'p3', tag: 'SHS', tone: 'sky', title: 'Business', instructor: '188 enrolled · 7 teachers', progress: 71, next: 'Term ends 27 March' },
          { id: 'p4', tag: 'Tertiary', tone: 'success', title: 'BSc Computer Science', instructor: '186 enrolled · 14 staff', progress: 62, next: 'Semester ends 6 May' },
          { id: 'p5', tag: 'Tertiary', tone: 'rose', title: 'BBA Business Administration', instructor: '152 enrolled · 11 staff', progress: 58, next: 'Semester ends 6 May' },
        ]}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * ASSIGNMENTS
 * ------------------------------------------------------------------ */

const studentAssignments = [
  { id: 'sa1', title: 'Wave Interference Problem Set', course: 'Physics', due: 'Today · 11:30', status: 'Pending', tone: 'amber' },
  { id: 'sa2', title: 'Vectors Class Test', course: 'Elective Mathematics', due: 'Wed · 14:00', status: 'Pending', tone: 'amber' },
  { id: 'sa3', title: 'Essay — Postcolonial Voice', course: 'Literature', due: 'Fri · 23:59', status: 'Draft', tone: 'neutral' },
  { id: 'sa4', title: 'Organic Reactions Review', course: 'Chemistry', due: 'Mon · 09:00', status: 'Submitted', tone: 'brand' },
  { id: 'sa5', title: 'Quantum Mechanics Lab Report', course: 'Physics', due: 'Oct 24', status: 'Graded · 92', tone: 'success' },
]

export function AssignmentsPage({ role, account }) {
  if (role === 'proprietor') {
    return (
      <div className="space-y-6">
        <PageHead
          title="Fee Arrears"
          subtitle={`${account?.school || 'Your school'} · Students and households that need follow-up.`}
          right={
            <button className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand">
              <Wallet size={14} strokeWidth={2.5} /> Remind all
            </button>
          }
        />

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="glass overflow-hidden rounded-4xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-ink/[0.07] bg-ink/[0.02]">
                  {['Student', 'Class', 'Parent', 'Balance', 'Overdue', 'Action'].map((h) => (
                    <th key={h} className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-mute lg:px-7">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminView.arrears.map((r) => (
                  <tr key={r.id} className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-brand/[0.04]">
                    <td className="px-6 py-4 text-sm font-medium lg:px-7">{r.student}</td>
                    <td className="px-6 py-4 text-sm text-mute lg:px-7">{r.form}</td>
                    <td className="px-6 py-4 text-sm text-mute lg:px-7">{r.parent}</td>
                    <td className="px-6 py-4 text-sm font-bold tabular-nums lg:px-7">{r.amount}</td>
                    <td className="px-6 py-4 lg:px-7">
                      <Pill tone={r.tone}>{r.days} days</Pill>
                    </td>
                    <td className="px-6 py-4 lg:px-7">
                      <button className="text-sm font-semibold text-brand underline-offset-4 hover:underline">
                        Send reminder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    )
  }

  if (role === 'parent') {
    const child = childForAccount(account)
    const children = [child, ...parentView.children.filter((c) => c.id !== child.id)]

    return (
      <div className="space-y-6">
        <PageHead title="Fees" subtitle={`Fee standing for ${account?.childName || 'your children'}.`} />

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="glass overflow-hidden rounded-4xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-ink/[0.07] bg-ink/[0.02]">
                  {['Child', 'Class', 'Term', 'Balance', 'Status', 'Action'].map((h) => (
                    <th key={h} className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-mute lg:px-7">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {children.map((c) => (
                  <tr key={c.id} className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-brand/[0.04]">
                    <td className="px-6 py-4 lg:px-7">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-[10px] font-bold text-mute">
                          {c.initials}
                        </span>
                        <span className="text-sm font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-mute lg:px-7">{c.grade}</td>
                    <td className="px-6 py-4 text-sm text-mute lg:px-7">{c.fees.term}</td>
                    <td className="px-6 py-4 text-sm font-bold tabular-nums lg:px-7">{c.fees.amount}</td>
                    <td className="px-6 py-4 lg:px-7">
                      <Pill tone={c.fees.tone}>{c.fees.status}</Pill>
                    </td>
                    <td className="px-6 py-4 lg:px-7">
                      <button
                        disabled={c.fees.amount === '$0'}
                        className="text-sm font-semibold text-brand underline-offset-4 hover:underline disabled:pointer-events-none disabled:text-mute"
                      >
                        {c.fees.amount === '$0' ? 'Cleared' : 'Pay now'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    )
  }

  const isTeacher = role === 'teacher'
  const rows = isTeacher ? teacherView.gradebook : studentAssignments

  return (
    <div className="space-y-6">
      <PageHead
        title={isTeacher ? 'Submissions' : 'Assignments'}
        subtitle={
          isTeacher
            ? 'Submissions waiting on your review.'
            : 'Everything due, in one place.'
        }
        right={
          <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-xs font-semibold text-mute">
            <Filter size={13} strokeWidth={2} /> Filter
          </div>
        }
      />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass overflow-hidden rounded-4xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-ink/[0.07] bg-ink/[0.02]">
                {(isTeacher
                  ? ['Student', 'Assignment', 'Submitted', 'Status', 'Action']
                  : ['Assignment', 'Course', 'Due', 'Status']
                ).map((h) => (
                  <th key={h} className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-mute lg:px-7">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) =>
                isTeacher ? (
                  <tr key={r.id} className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-brand/[0.04]">
                    <td className="px-6 py-4 lg:px-7">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-[10px] font-bold text-mute">
                          {r.initials}
                        </span>
                        <span className="text-sm font-medium">{r.student}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-mute lg:px-7">{r.assignment}</td>
                    <td className={`px-6 py-4 text-sm lg:px-7 ${r.status === 'Overdue' ? 'font-semibold text-rose' : 'text-mute'}`}>
                      {r.submitted}
                    </td>
                    <td className="px-6 py-4 lg:px-7">
                      <Pill tone={statusTone[r.status]}>{r.status}{r.score ? ` · ${r.score}` : ''}</Pill>
                    </td>
                    <td className="px-6 py-4 lg:px-7">
                      <button className="text-sm font-semibold text-brand underline-offset-4 hover:underline">
                        {r.action}
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={r.id} className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-brand/[0.04]">
                    <td className="px-6 py-4 text-sm font-medium lg:px-7">{r.title}</td>
                    <td className="px-6 py-4 text-sm text-mute lg:px-7">{r.course}</td>
                    <td className="px-6 py-4 text-sm text-mute lg:px-7">{r.due}</td>
                    <td className="px-6 py-4 lg:px-7">
                      <Pill tone={r.tone}>{r.status}</Pill>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * GRADES
 * ------------------------------------------------------------------ */

const studentGrades = [
  { id: 'sg1', course: 'Physics', item: 'Thermodynamics Class Test', score: '91', letter: 'A-', hex: '#10B981' },
  { id: 'sg2', course: 'Physics', item: 'Practical — Wave Interference', score: '88', letter: 'B+', hex: '#1E88F5' },
  { id: 'sg3', course: 'Chemistry', item: 'Unit 3 Class Test', score: '76', letter: 'B', hex: '#1E88F5' },
  { id: 'sg4', course: 'Elective Mathematics', item: 'Vectors Practice', score: '82', letter: 'B+', hex: '#22D3EE' },
  { id: 'sg5', course: 'Literature', item: 'Essay Draft', score: '85', letter: 'A-', hex: '#10B981' },
  { id: 'sg6', course: 'Core Mathematics', item: 'Quadratics Mid-Term', score: '79', letter: 'B', hex: '#F97316' },
]

export function GradesPage({ role, account }) {
  if (role === 'proprietor') {
    return (
      <div className="space-y-6">
        <PageHead title="Reports" subtitle={`${account?.school || 'Your school'} · Attendance, risk, and programme performance.`} />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass overflow-hidden rounded-4xl"
          >
            <div className="flex items-center gap-2.5 border-b border-ink/[0.07] px-6 py-5 lg:px-7">
              <Bell size={17} strokeWidth={2} className="text-rose" />
              <h2 className="font-heading text-lg font-extrabold tracking-tight">At-Risk Students</h2>
              <Pill tone="rose" className="ml-auto px-2.5 py-0.5 text-[11px]">
                {adminView.atRisk.length} flagged
              </Pill>
            </div>
            <ul className="divide-y divide-ink/[0.06]">
              {adminView.atRisk.map((r) => (
                <li key={r.id} className="flex items-start gap-3 px-6 py-4 lg:px-7">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${r.tone === 'rose' ? 'bg-rose' : 'bg-amber'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">{r.name}</span>
                    <span className="mt-0.5 block text-xs text-mute">{r.form} · {r.reason}</span>
                  </span>
                  <button className="text-xs font-semibold text-brand underline-offset-4 hover:underline">Open</button>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="glass rounded-4xl p-6 lg:p-7"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-extrabold tracking-tight">{adminView.departments.title}</h2>
              <Pill tone="neutral" className="px-3 py-0.5">{adminView.departments.badge}</Pill>
            </div>
            <div className="mt-6 grid gap-5 border-t border-ink/[0.07] pt-6 sm:grid-cols-2">
              {adminView.departments.data.map((dept, i) => (
                <div key={dept.label}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm font-medium">{dept.label}</span>
                    <span className={`shrink-0 text-sm font-bold ${dept.value >= 10 ? 'text-success' : 'text-mute'}`}>
                      +{dept.value}%
                    </span>
                  </div>
                  <ProgressBar
                    value={(dept.value / 24) * 100}
                    color={dept.value >= 10 ? '#10B981' : '#C7D2FE'}
                    delay={i * 0.08}
                  />
                  <div className="mt-1.5 text-[11px] text-mute">{dept.students.toLocaleString()} enrolled</div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    )
  }

  if (role === 'teacher') {
    return (
      <div className="space-y-6">
        <PageHead
          title="Gradebook"
          subtitle={`${account?.subject || 'Your classes'} · marks, late work, and students needing review.`}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass rounded-3xl p-6 lg:p-7"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-mute">Class average</div>
            <div className="mt-4 font-heading text-6xl font-extrabold tracking-tightest">{teacherView.performance.average}%</div>
            <div className="mt-3 text-sm text-mute">{teacherView.performance.atRisk} students need attention</div>
            <ProgressBar value={teacherView.performance.average} color="#10B981" thickness={8} className="mt-5" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="glass overflow-hidden rounded-3xl lg:col-span-2"
          >
            <div className="border-b border-ink/[0.07] px-6 py-4 lg:px-7">
              <h2 className="font-heading text-lg font-extrabold tracking-tight">Recent submissions</h2>
            </div>
            <ul className="divide-y divide-ink/[0.06]">
              {teacherView.gradebook.map((row) => (
                <li key={row.id} className="flex items-center gap-4 px-6 py-4 lg:px-7">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-[10px] font-bold text-mute">
                    {row.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{row.student}</span>
                    <span className="mt-0.5 block truncate text-xs text-mute">{row.assignment}</span>
                  </span>
                  <Pill tone={statusTone[row.status]}>{row.status}{row.score ? ` · ${row.score}` : ''}</Pill>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    )
  }

  if (role === 'parent') {
    const child = childForAccount(account)
    const unlocked = hasFullAccess(child)

    return (
      <div className="space-y-6">
        <PageHead title="Grades" subtitle={`${child.name}'s recent marks and teacher feedback.`} />

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="glass relative overflow-hidden rounded-4xl"
        >
          <div className={`grid gap-4 p-6 lg:grid-cols-3 lg:p-7 ${!unlocked ? 'select-none blur-sm' : ''}`}>
            {child.grades.map((g, i) => (
              <article key={g.subject} className="rounded-3xl border border-ink/[0.07] bg-white/45 p-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-mute">{g.subject}</div>
                <div className="mt-3 font-heading text-xl font-extrabold tracking-tight">{g.item}</div>
                <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  {g.grade}
                </div>
              </article>
            ))}
          </div>

          {!unlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/75 p-6 text-center backdrop-blur-md">
              <Wallet size={22} strokeWidth={2} className="text-mute" />
              <div className="text-sm font-bold">Grades unlock after fees are cleared</div>
              <p className="max-w-xs text-xs leading-5 text-mute">
                {child.name.split(' ')[0]} can still see their timetable while the parent account settles the balance.
              </p>
            </div>
          )}
        </motion.section>
      </div>
    )
  }

  const term = role === 'teacher' ? 'Your class · Term 2 average' : role === 'parent' ? `${account?.childName || 'Your child'} · Term 2 average` : 'Your Term 2 average'
  const avg = 84

  return (
    <div className="space-y-6">
      <PageHead title="Grades" subtitle="Every mark recorded this term." />

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="glass rounded-3xl p-6 lg:col-span-1 lg:p-7"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-mute">{term}</div>
          <div className="mt-4 font-heading text-6xl font-extrabold tracking-tightest">{avg}%</div>
          <div className="mt-3 text-sm text-mute">Up 4.2 points from last term</div>
          <ProgressBar value={avg} color="#10B981" thickness={8} className="mt-5" />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="glass overflow-hidden rounded-3xl lg:col-span-2"
        >
          <div className="border-b border-ink/[0.07] px-6 py-4 lg:px-7">
            <h2 className="font-heading text-lg font-extrabold tracking-tight">Recent marks</h2>
          </div>
          <ul className="divide-y divide-ink/[0.06]">
            {studentGrades.map((g) => (
              <li key={g.id} className="flex items-center gap-4 px-6 py-4 lg:px-7">
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{g.course}</span>
                  <span className="mt-0.5 block truncate text-xs text-mute">{g.item}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-mute">{g.score}</span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: g.hex }}
                >
                  {g.letter}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * SCHEDULE
 * ------------------------------------------------------------------ */

const dotColors = { brand: '#1E88F5', rose: '#F43F5E', amber: '#F97316', ink: '#0F172A' }

export function SchedulePage({ role, account }) {
  if (role === 'proprietor') {
    return (
      <div className="space-y-6">
        <PageHead
          title="Timetable"
          subtitle={`${account?.school || 'Your school'} · Classes currently running and the next periods due to start.`}
          right={
            <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-xs font-semibold text-mute">
              <Radio size={13} strokeWidth={2} /> Live now
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {adminView.liveTimetable.map((row, i) => (
            <motion.article
              key={row.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              className="glass flex items-center gap-4 rounded-3xl p-5"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${row.status === 'live' ? 'bg-brand text-white' : 'bg-ink/[0.06] text-mute'}`}>
                {row.status === 'live' ? <Radio size={16} strokeWidth={2.5} /> : <Clock size={16} strokeWidth={2.5} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-heading text-lg font-extrabold tracking-tight">{row.course}</span>
                <span className="mt-0.5 block truncate text-xs text-mute">{row.teacher} · {row.room}</span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-mute tabular-nums">{row.period}</span>
            </motion.article>
          ))}
        </div>
      </div>
    )
  }

  if (role === 'teacher') {
    return (
      <div className="space-y-6">
        <PageHead title="Timetable" subtitle="Your classes and duties today." />
        <div className="grid gap-4 lg:grid-cols-3">
          {teacherView.today.map((slot, i) => (
            <motion.article
              key={slot.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              whileHover={{ y: -5 }}
              className="glass glass-hover rounded-3xl p-6 lg:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <Pill tone={slot.status === 'live' ? 'rose' : slot.status === 'next' ? 'brand' : 'neutral'}>
                  {slot.status === 'live' ? 'Live' : slot.status === 'next' ? 'Next' : 'Later'}
                </Pill>
                <span className="text-xs font-semibold text-mute tabular-nums">{slot.time}</span>
              </div>
              <div className="mt-5 font-heading text-xl font-extrabold tracking-tight">{slot.course}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-mute">
                <MapPin size={13} strokeWidth={2} /> {slot.room}
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-ink/[0.08] pt-4 text-xs font-semibold text-mute">
                <Users size={13} strokeWidth={2} /> {slot.students} students
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    )
  }

  if (role === 'parent') {
    const child = childForAccount(account)

    return (
      <div className="space-y-6">
        <PageHead title="Timetable" subtitle={`${child.name}'s classes today.`} />
        <div className="grid gap-4 lg:grid-cols-3">
          {child.today.map((slot, i) => (
            <motion.article
              key={slot.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              whileHover={{ y: -5 }}
              className="glass glass-hover rounded-3xl p-6 lg:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <Pill tone={slot.status === 'live' ? 'rose' : slot.status === 'next' ? 'brand' : 'neutral'}>
                  {slot.status === 'live' ? 'Live' : slot.status === 'next' ? 'Next' : 'Later'}
                </Pill>
                <span className="text-xs font-semibold text-mute tabular-nums">{slot.time}</span>
              </div>
              <div className="mt-5 font-heading text-xl font-extrabold tracking-tight">{slot.course}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-mute">
                <MapPin size={13} strokeWidth={2} /> {slot.room}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    )
  }

  const days = [
    { day: 'Mon', date: '3', items: studentView.schedule.slice(0, 2) },
    { day: 'Tue', date: '4', items: studentView.schedule.slice(2, 4) },
    { day: 'Wed', date: '5', items: studentView.schedule.slice(0, 3) },
    { day: 'Thu', date: '6', items: studentView.schedule.slice(1, 3) },
    { day: 'Fri', date: '7', items: studentView.schedule.slice(0, 2) },
  ]

  const subtitleFor = {
    student: 'Your week ahead.',
    teacher: 'Your classes and duties this week.',
    parent: `${account?.childName || 'Your child'}'s week.`,
    proprietor: 'Campus timetable at a glance.',
  }

  return (
    <div className="space-y-6">
      <PageHead
        title="Schedule"
        subtitle={subtitleFor[role]}
        right={
          <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-xs font-semibold text-mute">
            <CalendarDays size={13} strokeWidth={2} /> This week
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {days.map((d, i) => (
          <motion.section
            key={d.day}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            className="glass rounded-3xl p-5"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-heading text-lg font-extrabold">{d.day}</span>
              <span className="text-xs font-medium text-mute">Feb {d.date}</span>
            </div>
            <ol className="mt-4 space-y-3">
              {d.items.map((it) => (
                <li key={`${d.day}-${it.id}`} className="rounded-2xl border border-ink/[0.06] bg-white/40 p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dotColors[it.tone] }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-mute">
                      {it.time} · {it.kind}
                    </span>
                  </div>
                  <div className="mt-1.5 text-sm font-semibold leading-snug">{it.title}</div>
                </li>
              ))}
            </ol>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Router — pick a sub-page by nav item
 * ------------------------------------------------------------------ */

export function SubViewFor({ navItem, role, account }) {
  if (navItem === 'courses') return <CoursesPage role={role} account={account} />
  if (navItem === 'assignments') return <AssignmentsPage role={role} account={account} />
  if (navItem === 'grades') return <GradesPage role={role} account={account} />
  if (navItem === 'schedule') return <SchedulePage role={role} account={account} />
  return null
}
