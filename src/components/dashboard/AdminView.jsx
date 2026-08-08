import { motion } from 'framer-motion'
import { Banknote, Users, UserCog, TrendingUp, Minus, Download } from 'lucide-react'
import Pill from '../shared/Pill'
import { BarChart, ProgressBar } from '../shared/Charts'
import { DoodleUnderline } from '../shared/Doodles'
import { adminView, statusTone } from '../../mockData'

const kpiIcons = { money: Banknote, users: Users, staff: UserCog }
const EASE = [0.16, 1, 0.3, 1]

export default function AdminView({ account }) {
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
          <span className="hidden sm:inline">Export report</span>
        </button>
      </header>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminView.kpis.map((kpi, i) => {
          const Icon = kpiIcons[kpi.icon]
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
              <div className="mt-5 font-heading text-4xl font-extrabold tracking-tightest lg:text-5xl">
                {kpi.value}
              </div>
              <div
                className={`mt-3.5 flex items-center gap-1.5 text-xs font-semibold ${
                  kpi.trend === 'up' ? 'text-success' : 'text-mute'
                }`}
              >
                {kpi.trend === 'up' ? (
                  <TrendingUp size={13} strokeWidth={2.5} />
                ) : (
                  <Minus size={13} strokeWidth={2.5} />
                )}
                {kpi.delta}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
          className="glass rounded-4xl p-6 lg:p-7"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-extrabold tracking-tight">{adminView.attendance.title}</h2>
            <Pill tone="neutral" className="px-3 py-0.5">
              {adminView.attendance.badge}
            </Pill>
          </div>
          <div className="mt-6 border-t border-ink/[0.07] pt-6">
            <BarChart data={adminView.attendance.data} height={230} highlightAbove={92} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
          className="glass rounded-4xl p-6 lg:p-7"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-extrabold tracking-tight">{adminView.departments.title}</h2>
            <Pill tone="neutral" className="px-3 py-0.5">
              {adminView.departments.badge}
            </Pill>
          </div>
          <div className="mt-6 space-y-5 border-t border-ink/[0.07] pt-6">
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
                  delay={i * 0.1}
                />
                <div className="mt-1.5 text-[11px] text-mute">{dept.students.toLocaleString()} enrolled</div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Ledger */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
        className="glass overflow-hidden rounded-4xl"
      >
        <div className="border-b border-ink/[0.07] px-6 py-5 lg:px-7">
          <h2 className="font-heading text-xl font-extrabold tracking-tight">Bursary Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-ink/[0.07] bg-ink/[0.02]">
                {['Item', 'Detail', 'Amount', 'Status'].map((h) => (
                  <th key={h} className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-mute lg:px-7">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminView.ledger.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-brand/[0.04]"
                >
                  <td className="px-6 py-4 text-sm font-medium lg:px-7">{row.item}</td>
                  <td className="px-6 py-4 text-sm text-mute lg:px-7">{row.detail}</td>
                  <td className="px-6 py-4 text-sm font-bold tabular-nums lg:px-7">{row.amount}</td>
                  <td className="px-6 py-4 lg:px-7">
                    <Pill tone={statusTone[row.status]}>{row.status}</Pill>
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
