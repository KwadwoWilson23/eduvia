import { motion } from 'framer-motion'
import { LayoutGrid, GraduationCap, ClipboardList, Star, Calendar, Plus, LogOut } from 'lucide-react'
import Logo from '../shared/Logo'
import { sidebarNav, roleOptions } from '../../mockData'
import { labelFor } from '../onboarding/steps'

const icons = {
  grid: LayoutGrid,
  cap: GraduationCap,
  clipboard: ClipboardList,
  star: Star,
  calendar: Calendar,
}

export default function Sidebar({ account, active, onSelect, onExit, primaryAction }) {
  const role = roleOptions.find((r) => r.id === account?.role)

  // The most useful second line varies by role: a programme for a student,
  // a subject for a teacher, the division otherwise.
  const detail =
    labelFor('programme', account?.programme) || account?.subject || labelFor('division', account?.division) || ''

  return (
    <aside className="hidden w-[268px] shrink-0 flex-col border-r border-white/60 bg-white/55 backdrop-blur-2xl lg:flex">
      <div className="border-b border-ink/[0.07] px-6 py-6">
        <Logo inverted />
      </div>

      {/* Signed-in identity */}
      <div className="border-b border-ink/[0.07] px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-bold text-white"
            style={{ backgroundColor: role?.hex || '#4F46E5' }}
          >
            {account?.initials || 'ED'}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{account?.fullName}</div>
            <div className="truncate text-[11px] text-mute">{role?.label}</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-ink/[0.04] px-3.5 py-3">
          <div className="truncate text-[11px] font-bold uppercase tracking-wider text-mute">School</div>
          <div className="mt-1 truncate text-sm font-semibold">{account?.school}</div>
          {detail && <div className="mt-1 truncate text-[11px] text-mute">{detail}</div>}
        </div>

        {account?.studentId && (
          <div className="mt-2 rounded-2xl bg-ink/[0.04] px-3.5 py-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-mute">Your Eduvia ID</div>
            <div className="mt-1 font-mono text-[13px] font-bold tracking-wider">{account.studentId}</div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-5">
        {sidebarNav.map((navItem) => {
          const Icon = icons[navItem.icon]
          const isActive = navItem.id === active
          return (
            <button
              key={navItem.id}
              onClick={() => onSelect(navItem.id)}
              className="relative mb-1 flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-2xl bg-brand shadow-lift"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <Icon size={19} strokeWidth={2} className={`relative z-10 ${isActive ? 'text-white' : 'text-mute'}`} />
              <span className={`relative z-10 ${isActive ? 'font-semibold text-white' : 'text-ink'}`}>
                {navItem.label}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-ink/[0.07] p-5">
        <button className="btn-primary w-full py-3.5">
          <Plus size={16} strokeWidth={2.5} />
          {primaryAction}
        </button>
        <button
          onClick={onExit}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-mute transition-colors hover:bg-ink/[0.05] hover:text-ink"
        >
          <LogOut size={14} strokeWidth={2} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
