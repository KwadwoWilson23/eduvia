import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Send, Users, TrendingUp, Maximize2 } from 'lucide-react'
import Pill from '../shared/Pill'
import { BarChart, DistributionBar, ProgressBar } from '../shared/Charts'
import { Scribble, StarScribble } from '../shared/Marks'
import { Reveal, EASE } from '../shared/Motion'
import { analyticsPreview, homeworkPreview, videoPreview, statusTone } from '../../mockData'

/* ------------------------------------------------------------------ *
 * Card shell
 * ------------------------------------------------------------------ */

function FeatureCard({ index, eyebrow, title, description, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -6 }}
      className="flex flex-col overflow-hidden rounded-4xl border border-night/[0.07] bg-white shadow-glass transition-shadow duration-300 hover:shadow-glass-lg"
    >
      <div className="px-7 py-8 sm:px-8">
        <div className="eyebrow">{eyebrow}</div>
        <h3 className="mt-4 font-heading text-2xl font-extrabold tracking-tight">{title}</h3>
        <p className="mt-3.5 text-sm leading-7 text-night/50">{description}</p>
      </div>
      <div className="flex-1 border-t border-night/[0.06] bg-bone/60 p-4 sm:p-5">{children}</div>
    </motion.article>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup 1 — Analytics & Performance
 * ------------------------------------------------------------------ */

function AnalyticsMockup() {
  return (
    <div className="space-y-3">
      <div className="glass-solid rounded-2xl p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-mute">Cohort average</div>
            <div className="mt-1 font-heading text-3xl font-extrabold tracking-tightest">
              {analyticsPreview.headline}
            </div>
          </div>
          <Pill tone="success" className="px-2.5 py-0.5 text-[11px]">
            <TrendingUp size={11} strokeWidth={2.5} />
            +4.2
          </Pill>
        </div>
        <div className="mt-4">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-mute">Attendance · 6 weeks</div>
          <BarChart data={analyticsPreview.attendanceTrend} height={92} showValues={false} highlightAbove={94} />
        </div>
      </div>

      <div className="glass-solid rounded-2xl p-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-mute">Grade distribution</div>
        <DistributionBar data={analyticsPreview.gradeDistribution} />
      </div>

      <div className="glass-solid rounded-2xl p-4">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-mute">Assessment performance</div>
        <div className="space-y-2.5">
          {analyticsPreview.testPerformance.map((t, i) => (
            <div key={t.label}>
              <div className="mb-1.5 flex items-baseline justify-between text-xs">
                <span className="font-medium text-ink">{t.label}</span>
                <span className="font-semibold text-mute">{t.score}%</span>
              </div>
              <ProgressBar value={t.score} thickness={5} delay={i * 0.1} color={t.score >= 85 ? '#10B981' : '#1E88F5'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup 2 — Homework workflow (interactive)
 * ------------------------------------------------------------------ */

const cycle = { Pending: 'Submitted', Submitted: 'Needs Review', 'Needs Review': 'Pending' }

function HomeworkMockup() {
  const [rows, setRows] = useState(homeworkPreview.rows)

  const advance = (id) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: cycle[r.status] } : r)))

  const submitted = rows.filter((r) => r.status === 'Submitted').length

  return (
    <div className="glass-solid overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-ink/[0.07] px-4 py-3.5">
        <div className="min-w-0">
          <div className="truncate text-sm font-bold">{homeworkPreview.className}</div>
          <div className="mt-0.5 truncate text-[11px] font-medium text-mute">
            {homeworkPreview.topic} · {homeworkPreview.dueLabel}
          </div>
        </div>
        <Pill tone="ink" className="shrink-0 px-2.5 py-0.5 text-[11px]">
          {submitted}/{rows.length} in
        </Pill>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-ink/[0.07] bg-ink/[0.02]">
            <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-mute">Student</th>
            <th className="hidden px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-mute sm:table-cell">
              Task
            </th>
            <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-wider text-mute">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-brand/[0.04]"
            >
              <td className="px-4 py-3 text-xs font-medium">{row.student}</td>
              <td className="hidden px-4 py-3 text-xs text-mute sm:table-cell">{row.task}</td>
              <td className="px-4 py-3 text-right">
                <motion.button whileTap={{ scale: 0.94 }} onClick={() => advance(row.id)} title="Click to cycle status">
                  <Pill tone={statusTone[row.status]} className="px-2.5 py-0.5 text-[11px]">
                    {row.status}
                  </Pill>
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-ink/[0.07] px-4 py-2.5 text-[11px] font-medium text-mute">
        Tap a status pill to move a submission through the workflow.
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mockup 3 — Video + community
 * ------------------------------------------------------------------ */

function VideoMockup() {
  const [playing, setPlaying] = useState(true)
  const [messages, setMessages] = useState(videoPreview.chat)
  const [draft, setDraft] = useState('')

  const send = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length}`, initials: 'YOU', name: 'You', message: text, time: '18:26' },
    ])
    setDraft('')
  }

  return (
    <div className="space-y-3">
      {/* Player */}
      <div className="glass-solid overflow-hidden rounded-2xl">
        <div className="relative aspect-video overflow-hidden bg-ink">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="aurora -left-10 top-0 h-48 w-48 animate-drift bg-brand/40" />
            <div className="aurora -right-8 bottom-0 h-40 w-40 animate-drift-slow bg-sky/30" />
          </div>

          <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
            <Pill tone="rose" className="px-2 py-0.5 text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              LIVE
            </Pill>
            <Pill tone="outline" className="px-2 py-0.5 text-[10px]">
              <Users size={10} strokeWidth={2.5} />
              {videoPreview.viewers}
            </Pill>
          </div>

          <button
            onClick={() => setPlaying((p) => !p)}
            className="absolute inset-0 z-10 flex items-center justify-center"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            <motion.span
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-xl"
            >
              {playing ? <Pause size={22} strokeWidth={2.5} /> : <Play size={22} strokeWidth={2.5} />}
            </motion.span>
          </button>

          <Maximize2 size={14} strokeWidth={2} className="absolute bottom-3 right-3 z-10 text-white/60" />
        </div>

        <div className="px-4 py-3.5">
          <div className="text-sm font-bold leading-snug">{videoPreview.title}</div>
          <div className="mt-0.5 text-[11px] font-medium text-mute">{videoPreview.instructor}</div>
          <div className="mt-3.5 flex items-center gap-3">
            <span className="text-[11px] font-semibold tabular-nums text-mute">{videoPreview.elapsed}</span>
            <ProgressBar value={videoPreview.progress} thickness={4} className="flex-1" />
            <span className="text-[11px] font-semibold tabular-nums text-mute">{videoPreview.duration}</span>
          </div>
        </div>
      </div>

      {/* Class discussion */}
      <div className="glass-solid overflow-hidden rounded-2xl">
        <div className="border-b border-ink/[0.07] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-mute">
          Class discussion
        </div>
        <div className="max-h-52 space-y-3.5 overflow-y-auto px-4 py-3.5">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-2.5"
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                  m.isHost ? 'bg-brand text-white' : 'bg-ink/[0.06] text-mute'
                }`}
              >
                {m.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-bold">{m.name}</span>
                  <span className="text-[10px] text-mute">{m.time}</span>
                </div>
                <p className="mt-0.5 break-words text-xs leading-5 text-mute">{m.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <form onSubmit={send} className="flex border-t border-ink/[0.07]">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask the class a question…"
            className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-xs outline-none placeholder:text-mute"
          />
          <button
            type="submit"
            className="px-4 text-mute transition-colors hover:text-brand"
            aria-label="Send message"
          >
            <Send size={15} strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */

export default function FeatureShowcase() {
  return (
    <section id="features" className="relative overflow-hidden bg-bone text-night">
      <StarScribble color="#1E88F5" size={90} className="absolute right-[8%] top-16 hidden opacity-80 xl:block" />

      <div className="relative mx-auto max-w-shell px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <div className="eyebrow text-night/40">Inside the platform</div>
          <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.1] tracking-tightest sm:text-5xl lg:text-6xl">
            <span className="word-soft-dark">Built around</span> how a{' '}
            <span className="relative inline-block">
              school runs
              <Scribble color="#1E88F5" width={220} className="absolute -bottom-1 left-0 w-full" delay={0.5} />
            </span>
          </h2>
          <p className="mt-9 text-base leading-8 text-night/50">
            Attendance, coursework, and live lessons all draw from the same register — so what a teacher marks on
            Monday is what a parent sees on Monday.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <FeatureCard
            index={0}
            eyebrow="01 · Insight"
            title="Performance at a glance"
            description="Attendance trends, grade spread, and per-assessment results for every class in both divisions, updated as work is marked."
          >
            <AnalyticsMockup />
          </FeatureCard>

          <FeatureCard
            index={1}
            eyebrow="02 · Coursework"
            title="Assignments end to end"
            description="Set work, collect it, and triage what needs attention from one table. Status follows the work instead of a paper register."
          >
            <HomeworkMockup />
          </FeatureCard>

          <FeatureCard
            index={2}
            eyebrow="03 · Live lessons"
            title="Class, wherever you are"
            description="Lessons stream in-platform with the class discussion beside them, so questions stay attached to the lesson that prompted them."
          >
            <VideoMockup />
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}
