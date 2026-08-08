import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Check, Plus, MapPin } from 'lucide-react'
import { searchSchools, findSchoolById } from '../../lib/schools'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Searchable school step. `kind` narrows the list (shs / tertiary / both).
 * Value is stored either as a directory id (e.g. "shs-achimota") or as a
 * "custom:Whatever the user typed" string when the school isn't listed.
 */
export default function SchoolPicker({ title, hint, kind, value, onChange }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchSchools(query, { kind }), [query, kind])

  const selected =
    value && !String(value).startsWith('custom:') ? findSchoolById(value) : null
  const customName = value && String(value).startsWith('custom:') ? value.slice(7) : ''

  // Show "Add my school" whenever the query looks like a name (>2 chars)
  // and doesn't exactly match a listed one.
  const canAddCustom =
    query.trim().length >= 3 &&
    !results.some((s) => s.name.toLowerCase() === query.trim().toLowerCase())

  return (
    <div>
      <h2 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">{title}</h2>
      {hint && <p className="mt-3 text-sm text-white/50">{hint}</p>}

      {/* Search field */}
      <div className="relative mt-6">
        <Search size={17} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your school's name…"
          className="w-full rounded-2xl border border-white/15 bg-white/[0.05] py-3.5 pl-11 pr-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/60 focus:bg-white/[0.09]"
        />
      </div>

      {/* Currently selected — shown above the list */}
      {(selected || customName) && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-lime/40 bg-lime/10 p-3"
        >
          <Check size={16} strokeWidth={2.5} className="shrink-0 text-lime" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{selected ? selected.name : customName}</div>
            <div className="mt-0.5 truncate text-xs text-white/50">
              {selected ? `${selected.region} · ${selected.kind === 'shs' ? 'Senior High' : 'Tertiary'}` : 'Added by you'}
            </div>
          </div>
          <button
            onClick={() => onChange(null)}
            className="shrink-0 text-[11px] font-semibold text-white/50 underline-offset-2 hover:text-white hover:underline"
          >
            Change
          </button>
        </motion.div>
      )}

      {/* Result list */}
      <div className="mt-4 max-h-[280px] space-y-1.5 overflow-y-auto pr-1">
        {results.map((s, i) => {
          const isSelected = value === s.id
          return (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.25), ease: EASE }}
              onClick={() => onChange(s.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors ${
                isSelected
                  ? 'border-white bg-white text-night'
                  : 'border-white/10 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.07]'
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{s.name}</span>
                <span className={`mt-0.5 flex items-center gap-1 text-[11px] ${isSelected ? 'text-night/55' : 'text-white/40'}`}>
                  <MapPin size={10} strokeWidth={2} />
                  {s.region} · {s.kind === 'shs' ? 'Senior High' : 'Tertiary'}
                </span>
              </span>
              {isSelected && <Check size={14} strokeWidth={3} className="shrink-0" />}
            </motion.button>
          )
        })}

        {results.length === 0 && !canAddCustom && (
          <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-xs text-white/40">
            No matches. Try a shorter search, or add your school below.
          </p>
        )}

        {canAddCustom && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => onChange(`custom:${query.trim()}`)}
            className="flex w-full items-center gap-3 rounded-xl border border-dashed border-white/25 bg-white/[0.02] p-3 text-left transition-colors hover:border-white/50 hover:bg-white/[0.06]"
          >
            <Plus size={16} strokeWidth={2.5} className="shrink-0 text-white/60" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-white">
                Add “{query.trim()}”
              </span>
              <span className="mt-0.5 block text-[11px] text-white/40">
                Not listed? Register your school on Eduvia.
              </span>
            </span>
          </motion.button>
        )}
      </div>
    </div>
  )
}
