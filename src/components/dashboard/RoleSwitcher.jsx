import { motion } from 'framer-motion'
import { ShieldCheck, Presentation, GraduationCap, Users } from 'lucide-react'
import { roles } from '../../mockData'

const roleIcons = {
  proprietor: ShieldCheck,
  teacher: Presentation,
  student: GraduationCap,
  parent: Users,
}

/**
 * Floating frosted bar anchored bottom-center. A solid ink pill slides
 * behind the active role via layoutId.
 */
export default function RoleSwitcher({ active, onChange }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5 sm:pb-7">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-full border border-white/70 bg-white/75 p-1.5 pl-4 shadow-glass-lg backdrop-blur-2xl no-scrollbar sm:gap-3 sm:pl-5"
      >
        <span className="shrink-0 pr-1 text-xs font-semibold text-mute sm:text-sm">View as:</span>

        <div className="flex items-center gap-1">
          {roles.map((role) => {
            const Icon = roleIcons[role.id]
            const isActive = role.id === active
            return (
              <button
                key={role.id}
                onClick={() => onChange(role.id)}
                aria-pressed={isActive}
                className="relative shrink-0 rounded-full px-3.5 py-2.5 transition-colors sm:px-5"
              >
                {isActive && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-full bg-ink shadow-glass"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 text-xs font-semibold sm:text-sm ${
                    isActive ? 'text-white' : 'text-mute hover:text-ink'
                  }`}
                >
                  <Icon size={15} strokeWidth={2} />
                  {role.label}
                </span>
              </button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
