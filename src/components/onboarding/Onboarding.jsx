import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Copy, X, ShieldCheck, Search } from 'lucide-react'
import { LogoMark } from '../shared/Logo'
import { roleIcons } from '../landing/RolePicker'
import { roleOptions } from '../../mockData'
import { activeSteps, labelFor } from './steps'
import { generateStudentId, saveStudent, findStudentById, normaliseStudentId } from '../../lib/accounts'

const EASE = [0.16, 1, 0.3, 1]

const slide = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
}

/* ------------------------------------------------------------------ *
 * Step 0 — role picker
 * ------------------------------------------------------------------ */

function RoleStep({ onPick }) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">Who are you?</h2>
      <p className="mt-3 text-sm text-white/50">Your dashboard is built around the answer.</p>

      <div className="mt-9 grid gap-3 sm:grid-cols-2">
        {roleOptions.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            whileHover={{ y: -4 }}
            onClick={() => onPick(role.id)}
            className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-6 text-left transition-colors hover:border-white/40 hover:bg-white/[0.09]"
          >
            <span
              aria-hidden="true"
              className="aurora -right-10 -top-10 h-32 w-32 opacity-40 transition-opacity duration-500 group-hover:opacity-90"
              style={{ backgroundColor: role.hex }}
            />
            <span className="relative block">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                style={{ borderColor: `${role.hex}55`, backgroundColor: `${role.hex}1F`, color: role.hex }}
              >
                {(() => {
                  const Icon = roleIcons[role.id]
                  return <Icon size={21} strokeWidth={2} />
                })()}
              </span>
              <span className="mt-4 block font-heading text-xl font-extrabold">{role.label}</span>
              <span className="mt-1.5 block text-[13px] leading-6 text-white/50">{role.blurb}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Choice step
 * ------------------------------------------------------------------ */

function ChoiceStep({ step, value, onChange }) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">{step.title}</h2>
      {step.hint && <p className="mt-3 text-sm text-white/50">{step.hint}</p>}

      <div className={`mt-8 grid gap-2.5 ${step.columns === 2 ? 'sm:grid-cols-2' : ''}`}>
        {step.options.map((opt, i) => {
          const selected = value === opt.value
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.035, 0.3), ease: EASE }}
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                selected
                  ? 'border-white bg-white text-night'
                  : 'border-white/12 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]'
              }`}
            >
              <span className="min-w-0">
                <span className="block text-[15px] font-bold">{opt.label}</span>
                {opt.detail && (
                  <span className={`mt-0.5 block text-xs ${selected ? 'text-night/55' : 'text-white/40'}`}>
                    {opt.detail}
                  </span>
                )}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  selected ? 'border-night bg-night text-white' : 'border-white/25'
                }`}
                style={!selected && opt.hex ? { borderColor: `${opt.hex}66` } : undefined}
              >
                {selected && <Check size={13} strokeWidth={3} />}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Text step
 * ------------------------------------------------------------------ */

function TextStep({ step, value, onChange, onEnter }) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">{step.title}</h2>
      {step.hint && <p className="mt-3 text-sm text-white/50">{step.hint}</p>}

      <input
        autoFocus
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter()}
        placeholder={step.placeholder}
        className="mt-8 w-full rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-4 text-lg font-medium text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/60 focus:bg-white/[0.09]"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Parent step — look up the child's ID
 * ------------------------------------------------------------------ */

function ChildIdStep({ value, onChange, match, onUseDemo, usingDemo }) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">
        Your child&apos;s Eduvia ID
      </h2>
      <p className="mt-3 text-sm leading-6 text-white/50">
        Eduvia issues every student a unique ID when they create their account. Ask your child for theirs — it looks
        like <span className="font-mono font-semibold text-white/80">EDU-7K4M-QX92</span>.
      </p>

      <div className="relative mt-8">
        <Search size={18} strokeWidth={2} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          autoFocus
          value={value || ''}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="EDU-XXXX-XXXX"
          className="w-full rounded-2xl border border-white/15 bg-white/[0.05] py-4 pl-14 pr-5 font-mono text-lg tracking-widest text-white outline-none transition-colors placeholder:tracking-normal placeholder:text-white/25 focus:border-white/60 focus:bg-white/[0.09]"
        />
      </div>

      <AnimatePresence mode="wait">
        {match ? (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-3 rounded-2xl border border-lime/40 bg-lime/10 p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-bold text-night">
              {match.initials}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{match.fullName}</span>
              <span className="block truncate text-xs text-white/50">
                {match.school} · {labelFor('programme', match.programme)}
              </span>
            </span>
            <Check size={18} strokeWidth={2.5} className="ml-auto shrink-0 text-lime" />
          </motion.div>
        ) : (
          value &&
          value.length > 6 && (
            <motion.div
              key="none"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-2xl border border-white/12 bg-white/[0.04] p-4"
            >
              <p className="text-sm text-white/60">
                No account found for that ID on this device. IDs are stored locally in this demo, so only students who
                signed up in this browser will match.
              </p>
              <button
                onClick={onUseDemo}
                className={`mt-3 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  usingDemo ? 'bg-lime text-night' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {usingDemo ? 'Using sample child ✓' : 'Continue with a sample child'}
              </button>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Student step — the ID we just issued
 * ------------------------------------------------------------------ */

function IssuedStep({ studentId }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(studentId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked — the ID is on screen to be typed out anyway.
    }
  }

  return (
    <div className="text-center">
      <LogoMark size={64} bg="#121214" animate className="mx-auto" />

      <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tightest sm:text-4xl">
        You&apos;re all set
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/50">
        This is your unique Eduvia ID. Give it to your parent or guardian so they can link their account to yours.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        className="mx-auto mt-8 max-w-sm rounded-3xl border border-white/15 bg-white/[0.06] p-7"
      >
        <div className="eyebrow text-white/35">Student ID</div>
        <div className="mt-3 font-mono text-2xl font-bold tracking-[0.15em] text-white sm:text-3xl">{studentId}</div>

        <button
          onClick={copy}
          className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-colors ${
            copied ? 'bg-lime text-night' : 'bg-white text-night hover:bg-white/85'
          }`}
        >
          {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
          {copied ? 'Copied' : 'Copy ID'}
        </button>
      </motion.div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-white/30">
        <ShieldCheck size={13} strokeWidth={2} />
        Saved to this browser only — no account data leaves your device.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Container
 * ------------------------------------------------------------------ */

const initials = (name) =>
  String(name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'ED'

export default function Onboarding({ open, initialRole = null, onClose, onComplete }) {
  const [role, setRole] = useState(initialRole)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [studentId, setStudentId] = useState(null)
  const [usingDemo, setUsingDemo] = useState(false)

  // Reset whenever the sheet is reopened.
  useEffect(() => {
    if (!open) return
    setRole(initialRole)
    setIndex(0)
    setAnswers({})
    setStudentId(null)
    setUsingDemo(false)
  }, [open, initialRole])

  // Escape closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const steps = useMemo(() => (role ? activeSteps(role, answers) : []), [role, answers])
  const step = steps[index]

  const childMatch = useMemo(
    () => (role === 'parent' && answers.childId ? findStudentById(answers.childId) : null),
    [role, answers.childId]
  )

  if (!open) return null

  const setAnswer = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))

  const canAdvance = () => {
    if (!step) return false
    if (step.type === 'issued') return true
    if (step.type === 'childId') return Boolean(childMatch) || usingDemo
    const value = answers[step.id]
    if (step.type === 'text') return String(value || '').trim().length >= (step.minLength || 1)
    return Boolean(value)
  }

  const finish = () => {
    const account = {
      role,
      fullName: answers.fullName?.trim() || 'Eduvia User',
      school: answers.school?.trim() || 'Your school',
      division: answers.division || null,
      programme: answers.programme || null,
      subject: answers.subject || null,
      population: answers.population || null,
      studentId: studentId || null,
      childId: childMatch?.studentId || null,
      childName: childMatch?.fullName || null,
      childProgramme: childMatch?.programme || null,
      initials: initials(answers.fullName),
    }
    onComplete(account)
  }

  const next = () => {
    if (!canAdvance()) return

    // The student's ID is minted on the way into the final screen, so the
    // record exists before a parent could possibly look it up.
    const nextStep = steps[index + 1]
    if (nextStep?.type === 'issued' && !studentId) {
      const id = generateStudentId()
      setStudentId(id)
      saveStudent({
        studentId: id,
        fullName: answers.fullName?.trim() || 'Student',
        school: answers.school?.trim() || 'Your school',
        division: answers.division,
        programme: answers.programme,
        initials: initials(answers.fullName),
        createdAt: new Date().toISOString(),
      })
    }

    if (index < steps.length - 1) setIndex((i) => i + 1)
    else finish()
  }

  const back = () => {
    if (index > 0) setIndex((i) => i - 1)
    else setRole(null)
  }

  const progress = role ? ((index + 1) / steps.length) * 100 : 0
  const isLast = role && index === steps.length - 1

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-night/85 backdrop-blur-md"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Create your Eduvia account"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-4xl border border-white/12 bg-[#121214] sm:rounded-4xl"
      >
        {/* Ambient colour */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="aurora -left-16 -top-16 h-64 w-64 bg-azure/25" />
          <div className="aurora -bottom-20 -right-10 h-56 w-56 bg-aqua/20" />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            {role && (
              <button
                onClick={back}
                aria-label="Back"
                className="rounded-full border border-white/15 p-2 text-white/60 transition-colors hover:border-white/50 hover:text-white"
              >
                <ArrowLeft size={16} strokeWidth={2} />
              </button>
            )}
            <span className="text-xs font-semibold text-white/40">
              {role ? `Step ${index + 1} of ${steps.length}` : 'Get started'}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-white/15 p-2 text-white/60 transition-colors hover:border-white/50 hover:text-white"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Progress */}
        <div className="relative h-0.5 w-full bg-white/10">
          <motion.div
            className="h-full bg-white"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={role ? `${role}-${step?.id}` : 'role'}
              variants={slide}
              initial="enter"
              animate="center"
              transition={{ duration: 0.35, ease: EASE }}
            >
              {!role && <RoleStep onPick={(r) => (setRole(r), setIndex(0))} />}

              {role && step?.type === 'choice' && (
                <ChoiceStep step={step} value={answers[step.id]} onChange={(v) => setAnswer(step.id, v)} />
              )}

              {role && step?.type === 'text' && (
                <TextStep step={step} value={answers[step.id]} onChange={(v) => setAnswer(step.id, v)} onEnter={next} />
              )}

              {role && step?.type === 'childId' && (
                <ChildIdStep
                  value={answers.childId}
                  onChange={(v) => (setAnswer('childId', normaliseStudentId(v)), setUsingDemo(false))}
                  match={childMatch}
                  usingDemo={usingDemo}
                  onUseDemo={() => setUsingDemo(true)}
                />
              )}

              {role && step?.type === 'issued' && <IssuedStep studentId={studentId} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {role && (
          <div className="relative border-t border-white/10 px-6 py-5 sm:px-8">
            <button
              onClick={next}
              disabled={!canAdvance()}
              className="btn-light w-full py-4 text-[15px] disabled:pointer-events-none disabled:bg-white/15 disabled:text-white/35"
            >
              {isLast ? 'Enter the portal' : 'Continue'}
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
