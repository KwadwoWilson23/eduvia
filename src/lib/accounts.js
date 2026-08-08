/**
 * Local account store.
 *
 * There is no backend, so accounts live in localStorage. That is enough to
 * make the one flow that genuinely needs persistence work: a student creates
 * an account and receives a unique ID; a parent later types that ID in and
 * gets linked to the real child record.
 */

const STUDENTS_KEY = 'eduvia.students'
const SESSION_KEY = 'eduvia.session'

/* ------------------------------------------------------------------ *
 * Unique student IDs
 * ------------------------------------------------------------------ */

// No I, O, 0, or 1 — these get misread when a student reads the ID aloud
// to a parent over the phone.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomBlock(length) {
  const bytes =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint8Array(length))
      : Array.from({ length }, () => Math.floor(Math.random() * 256))

  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

/** Produces an ID like EDU-7K4M-QX92, unique against what is already stored. */
export function generateStudentId() {
  const existing = new Set(listStudents().map((s) => s.studentId))

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const id = `EDU-${randomBlock(4)}-${randomBlock(4)}`
    if (!existing.has(id)) return id
  }

  // Astronomically unlikely; fall back to a timestamp suffix rather than loop.
  return `EDU-${randomBlock(4)}-${Date.now().toString(36).toUpperCase().slice(-4)}`
}

/** Accepts "edu 7k4m qx92", "EDU-7K4M-QX92", etc. */
export function normaliseStudentId(raw) {
  const cleaned = String(raw || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')

  if (!cleaned.startsWith('EDU')) return cleaned
  const body = cleaned.slice(3)
  if (body.length !== 8) return cleaned
  return `EDU-${body.slice(0, 4)}-${body.slice(4)}`
}

/* ------------------------------------------------------------------ *
 * Storage
 * ------------------------------------------------------------------ */

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    // Private browsing, disabled storage, or corrupt JSON — carry on in memory.
    return fallback
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Nothing to do; the session still works for this page view.
  }
}

export function listStudents() {
  const students = read(STUDENTS_KEY, [])
  return Array.isArray(students) ? students : []
}

/** Saves a student record and returns it. */
export function saveStudent(student) {
  const students = listStudents().filter((s) => s.studentId !== student.studentId)
  students.push(student)
  write(STUDENTS_KEY, students.slice(-50)) // keep the store small
  return student
}

export function findStudentById(id) {
  const target = normaliseStudentId(id)
  return listStudents().find((s) => s.studentId === target) || null
}

/* ------------------------------------------------------------------ *
 * Session
 * ------------------------------------------------------------------ */

export function saveSession(account) {
  write(SESSION_KEY, account)
  return account
}

export function loadSession() {
  return read(SESSION_KEY, null)
}

export function clearSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY)
  } catch {
    // Ignore — the in-memory state is cleared by the caller regardless.
  }
}
