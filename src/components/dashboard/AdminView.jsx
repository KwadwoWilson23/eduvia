import { motion } from 'framer-motion'
import {
  Banknote,
  Users,
  UserCog,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Check,
  Clock,
  X as XIcon,
  MapPin,
  Radio,
  Bell,
} from 'lucide-react'
import Pill from '../shared/Pill'
import { BarChart, ProgressBar } from '../shared/Charts'
import { DoodleUnderline } from '../shared/Doodles'
import { adminView } from '../../mockData'

const EASE = [0.16, 1, 0.3, 1]
const kpiIcons = { staff: UserCog, users: Users, money: Banknote, alert: AlertTriangle }
const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus }
const staffStatusStyle = {
  present: { Icon: Check, cls: 'bg-success/15 text-success', label: 'In' },
  late: { Icon: Clock, cls: 'bg-amber/15 text-amber', label: 'Late' },
  absent: { Icon: XIcon, cls: 'bg-rose/15 text-rose', label: 'Out' },
}

export default function AdminView({ account }) {
  const s = adminView.staffToday
  const staffRate = Math.round((s.present / s.total) * 100)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl lg:text-[44px]">
            <DoodleUnderline color="#1E88F5">{adminView.title}</DoodleUnderline>
          </h1>
          <p className="mt-5 text-sm text-mute sm:text-base">
            {account?.school ? `${account.school} · ` : ''}
            {adminView.subtitle}
          </p>
        </div>
        <button className="btn-outline py-3">
          <Download size={16} strokeWidth={2} />
          <span className="hidden sm:inline">Morning report</span>
        </button>
      </header>

      {/* KPI row — today-focused */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminView.kpis.map((kpi, i) => {
          const Icon = kpiIcons[kpi.icon]
          const Trend = trendIcons[kpi.trend]
          const trendColor =
            kpi.trend === 'up' ? 'text-success' : kpi.trend === 'down' ? 'text-rose' : 'text-mute'
          return (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -6 }}
              className="glass glass-hover rounded-3xl p-6 lg:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-mute">{kpi.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon size={17} strokeWidth={2} />
                </span>
              </div>
              <div className="mt-5 font-heading text-4xl font-extrabold tracking-tightest lg:text-[42px]">
                {kpi.value}
              </div>
              <div className={`mt-3.5 flex items-center gap-1.5 text-xs font-semibold ${trendColor}`}>
                <Trend size={13} strokeWidth={2.5} />
                {kpi.delta}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Staff attendance + Live timetable */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
          className="glass overflow-hidden rounded-4xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-ink/[0.07] px-6 py-5 lg:px-7">
            <div>
              <h2 className="font-heading text-xl font-extrabold tracking-tight">Staff Today</h2>
              <p className="mt-1 text-xs text-mute">
                {s.present}/{s.total} present · {s.late} late · {s.absent} absent
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-heading text-3xl font-extrabold tracking-tightest">{staffRate}%</div>
              <ProgressBar value={staffRate} color="#10B981" thickness={5} className="mt-2 w-24" />
            </div>
          </div>
          <ul className="divide-y divide-ink/[0.06]">
            {s.list.map((t) => {
              const st = staffStatusStyle[t.status]
              return (
                <li key={t.id} className="flex items-center gap-4 px-6 py-3.5 lg:px-7">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{t.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-mute">{t.subject}</span>
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-mute">
                    {t.arrivedAt || '—'}
                  </span>
                  <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${st.cls}`}>
                    <st.Icon size={11} strokeWidth={3} />
                    {st.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
          className="glass overflow-hidden rounded-4xl"
        >
          <div className="flex items-center justify-between border-b border-ink/[0.07] px-6 py-5 lg:px-7">
            <div>
              <h2 className="font-heading text-xl font-extrabold tracking-tight">Live Timetable</h2>
              <p className="mt-1 text-xs text-mute">What's happening on campus right now</p>
            </div>
            <Pill tone="rose" className="px-2.5 py-0.5 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              LIVE
            </Pill>
          </div>
          <ul className="divide-y divide-ink/[0.06]">
            {adminView.liveTimetable.map((row) => (
              <li key={row.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3.5 lg:px-7">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
                    row.status === 'live' ? 'bg-brand/15 text-brand' : 'bg-ink/[0.05] text-mute'
                  }`}
                >
                  {row.status === 'live' ? <Radio size={13} strokeWidth={2.5} /> : row.period.slice(0, 5)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{row.course}</span>
                  <span className="mt-0.5 block truncate text-xs text-mute">
                    {row.teacher} · <MapPin size={10} strokeWidth={2} className="inline align-[-1px]" /> {row.room}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] font-medium text-mute tabular-nums">{row.period}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Fee arrears */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.34, ease: EASE }}
        className="glass overflow-hidden rounded-4xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.07] px-6 py-5 lg:px-7">
          <div>
            <h2 className="font-heading text-xl font-extrabold tracking-tight">Fee Arrears</h2>
            <p className="mt-1 text-xs text-mute">Households currently in arrears — send reminders in one click</p>
          </div>
          <button className="rounded-full bg-ink px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand">
            Remind all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-ink/[0.07] bg-ink/[0.02]">
                {['Student', 'Form', 'Parent', 'Amount', 'Overdue', ''].map((h) => (
                  <th key={h} className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-mute lg:px-7">
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
                    <button className="text-xs font-semibold text-brand underline-offset-4 hover:underline">
                      Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Attendance bars + At risk */}
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
          className="glass rounded-4xl p-6 lg:p-7"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-extrabold tracking-tight">{adminView.attendance.title}</h2>
            <Pill tone="neutral" className="px-3 py-0.5">{adminView.attendance.badge}</Pill>
          </div>
          <div className="mt-6 border-t border-ink/[0.07] pt-6">
            <BarChart data={adminView.attendance.data} height={200} highlightAbove={92} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46, ease: EASE }}
          className="glass overflow-hidden rounded-4xl"
        >
          <div className="flex items-center gap-2.5 border-b border-ink/[0.07] px-6 py-5 lg:px-7">
            <Bell size={17} strokeWidth={2} className="text-rose" />
            <h2 className="font-heading text-xl font-extrabold tracking-tight">At Risk</h2>
            <Pill tone="rose" className="ml-auto px-2.5 py-0.5 text-[11px]">
              {adminView.atRisk.length} flagged
            </Pill>
          </div>
          <ul className="divide-y divide-ink/[0.06]">
            {adminView.atRisk.map((r) => (
              <li key={r.id} className="flex items-start gap-3 px-6 py-4 lg:px-7">
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    r.tone === 'rose' ? 'bg-rose' : 'bg-amber'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="mt-0.5 text-xs text-mute">{r.form} · {r.reason}</div>
                </div>
                <button className="shrink-0 text-xs font-semibold text-brand underline-offset-4 hover:underline">
                  View
                </button>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Programme enrolment */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.52, ease: EASE }}
        className="glass rounded-4xl p-6 lg:p-7"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold tracking-tight">{adminView.departments.title}</h2>
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
  )
}
