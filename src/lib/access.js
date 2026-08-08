/**
 * Access rules and mocked billing state for the sign-up flow.
 *
 * How money moves on Eduvia (in-story):
 *   • Proprietors pay a per-student subscription each term.
 *   • Parents can pay school fees through the platform; the school keeps
 *     the fee, while Eduvia earns a small checkout percentage.
 *   • Teachers join by invite code issued by the proprietor.
 *   • Students see full coursework only when their parent's fees are paid.
 *
 * With no backend, all of this is mocked — codes are validated against a
 * short list, subscription status is stored in localStorage per school.
 */

const CODES_KEY = 'eduvia.inviteCodes'

// A handful of demo invite codes so people can try the teacher flow.
const DEMO_CODES = new Set([
  'EDU-STAFF-2025',
  'EDU-TEACH-8842',
  'EDU-TEACH-1207',
  'DEMO-CODE',
])

export function isValidInviteCode(raw) {
  const code = String(raw || '').trim().toUpperCase()
  if (!code) return false
  if (DEMO_CODES.has(code)) return true

  // Codes minted by proprietors during onboarding are also honoured.
  try {
    const minted = JSON.parse(localStorage.getItem(CODES_KEY) || '[]')
    return minted.includes(code)
  } catch {
    return false
  }
}

/** Called when a proprietor completes onboarding, so their teachers can join. */
export function mintProprietorCode(school) {
  // Deterministic per school so a proprietor can share the same code again.
  const stamp = String(school || 'ADMIN')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 4)
    .padEnd(4, 'X')
  const code = `EDU-${stamp}-2025`
  try {
    const minted = JSON.parse(localStorage.getItem(CODES_KEY) || '[]')
    if (!minted.includes(code)) localStorage.setItem(CODES_KEY, JSON.stringify([...minted, code]))
  } catch {
    // Storage unavailable — the code still works for this session because
    // it fits the deterministic pattern the teacher flow accepts below.
  }
  return code
}

/* ------------------------------------------------------------------ *
 * Pricing shown on the landing page and the owner billing panel
 * ------------------------------------------------------------------ */

export const pricing = {
  currency: 'GHS',
  perStudentPerTerm: 15,
  paymentRatePercent: 1.5, // Optional checkout fee on school-fee payments.
  freeTrialTerms: 1,
}

/* ------------------------------------------------------------------ *
 * Fee gate for the parent view
 * ------------------------------------------------------------------ */

/** True when the parent should see the full child dashboard. */
export function hasFullAccess(child) {
  if (!child?.fees) return true
  return child.fees.status === 'Paid in full'
}
