import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import Sidebar from './Sidebar'
import RoleSwitcher from './RoleSwitcher'
import AdminView from './AdminView'
import TeacherView from './TeacherView'
import StudentView from './StudentView'
import ParentView from './ParentView'
import Logo from '../shared/Logo'

const views = {
  proprietor: AdminView,
  teacher: TeacherView,
  student: StudentView,
  parent: ParentView,
}

// The sidebar's primary action reads differently depending on who is looking.
const primaryActions = {
  proprietor: 'Post a Notice',
  teacher: 'Create New Class',
  student: 'Browse Courses',
  parent: 'Message a Teacher',
}

export default function DashboardPage({ account, onExit }) {
  // Signed in as one role, but the switcher still previews the others.
  const [role, setRole] = useState(account?.role || 'student')
  const [navItem, setNavItem] = useState('dashboard')

  const ActiveView = views[role] || StudentView

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-paper text-ink">
      {/* Ambient wash behind the frosted panels */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="aurora -left-32 top-0 h-[520px] w-[520px] animate-drift bg-azure/[0.10]" />
        <div className="aurora right-[-10%] top-1/3 h-[460px] w-[460px] animate-drift-slow bg-aqua/[0.10]" />
        <div className="aurora bottom-[-10%] left-1/3 h-[420px] w-[420px] animate-drift bg-lime/[0.10]" />
      </div>

      <Sidebar
        account={account}
        active={navItem}
        onSelect={setNavItem}
        onExit={onExit}
        primaryAction={primaryActions[role]}
      />

      <div className="relative min-w-0 flex-1">
        {/* Mobile top bar — the sidebar is desktop-only */}
        <div className="flex items-center justify-between border-b border-white/60 bg-white/60 px-4 py-4 backdrop-blur-2xl lg:hidden">
          <Logo inverted />
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/70 px-3.5 py-2 text-xs font-semibold backdrop-blur-xl transition-colors hover:border-ink/40"
          >
            <LogOut size={13} strokeWidth={2.5} />
            Sign out
          </button>
        </div>

        <main className="px-4 pb-36 pt-8 sm:px-6 lg:px-10 lg:pb-40 lg:pt-12">
          <div className="mx-auto max-w-shell">
            {/* Keying on role remounts the view so it animates in from scratch.
                No exit transition — a stalled one would block the swap. */}
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ActiveView account={account} />
            </motion.div>
          </div>
        </main>
      </div>

      <RoleSwitcher active={role} onChange={setRole} />
    </div>
  )
}
