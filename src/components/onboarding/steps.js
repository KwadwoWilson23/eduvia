import {
  divisionOptions,
  shsProgrammes,
  tertiaryProgrammes,
  teachingSubjects,
  populationBands,
} from '../../mockData'
import { findSchoolById } from '../../lib/schools'

/**
 * Each role walks a different path. A step is either a `choice` (pick one
 * of a list), a `text` (type an answer), `school` (searchable directory),
 * `inviteCode`, `childId`, or `issued`.
 *
 * `when` lets a step drop out of the flow — the SHS programme step only
 * shows if the person picked "Senior High School" first, and so on.
 */

const nameStep = (title, placeholder) => ({
  id: 'fullName',
  type: 'text',
  title,
  placeholder,
  minLength: 2,
})

const divisionStep = {
  id: 'division',
  type: 'choice',
  title: 'Which are you in?',
  hint: 'This decides which programmes you can pick from.',
  options: divisionOptions.map((d) => ({ value: d.id, label: d.label, detail: d.blurb, hex: d.hex })),
}

const programmeStep = (division, list) => ({
  id: 'programme',
  type: 'choice',
  title: division === 'shs' ? 'Pick your SHS programme' : 'Pick your programme',
  hint: division === 'shs' ? 'The seven programmes offered at Senior High School.' : 'Common tertiary pathways.',
  columns: 2,
  when: (answers) => answers.division === division,
  options: list.map((p) => ({ value: p.id, label: p.label, detail: p.subjects })),
})

/** The proprietor picks kind first; the school list is filtered to match. */
const proprietorSchoolKindStep = {
  id: 'schoolKind',
  type: 'choice',
  title: 'What does your school offer?',
  hint: 'This filters the list of schools we show next.',
  options: [
    { value: 'shs', label: 'Senior High School', detail: 'SHS 1 – 3, working towards WASSCE.', hex: '#1E88F5' },
    { value: 'tertiary', label: 'Tertiary', detail: 'University, polytechnic, or college.', hex: '#22D3EE' },
    { value: 'both', label: 'Both', detail: 'Senior High and Tertiary on one campus.', hex: '#A3E635' },
  ],
}

export const flows = {
  student: [
    { id: 'school', type: 'school', title: 'Which school do you attend?', hint: 'Search for your school by name.', kind: null },
    divisionStep,
    programmeStep('shs', shsProgrammes),
    programmeStep('tertiary', tertiaryProgrammes),
    nameStep('What is your full name?', 'e.g. Amara Boateng'),
    { id: 'issued', type: 'issued', title: 'Your Eduvia ID' },
  ],

  teacher: [
    { id: 'inviteCode', type: 'inviteCode', title: 'Your invite code' },
    { id: 'school', type: 'school', title: 'Which school do you teach at?', hint: 'Confirm the school that issued your code.', kind: null },
    {
      id: 'division',
      type: 'choice',
      title: 'Which division do you teach?',
      options: divisionOptions.map((d) => ({ value: d.id, label: d.label, detail: d.blurb, hex: d.hex })),
    },
    {
      id: 'subject',
      type: 'choice',
      title: 'What is your main subject?',
      columns: 2,
      options: teachingSubjects.map((s) => ({ value: s, label: s })),
    },
    nameStep('What is your full name?', 'e.g. James Rodriguez'),
  ],

  proprietor: [
    proprietorSchoolKindStep,
    // The school list respects what they picked above.
    {
      id: 'school',
      type: 'school',
      title: 'Which school do you own or run?',
      hint: 'Pick from the list — or add yours if it isn’t there yet.',
      kindFrom: 'schoolKind',
    },
    {
      id: 'population',
      type: 'choice',
      title: 'Roughly how many students?',
      columns: 2,
      options: populationBands.map((b) => ({ value: b.id, label: b.label })),
    },
    nameStep('What is your full name?', 'e.g. Emily Turner'),
    { id: 'billing', type: 'billing', title: 'How Eduvia earns' },
  ],

  parent: [
    { id: 'school', type: 'school', title: "Which school does your child attend?", kind: null },
    { id: 'childId', type: 'childId', title: "Your child's Eduvia ID" },
    nameStep('What is your full name?', 'e.g. Rachel Kimura'),
  ],
}

/** Resolves a role's flow against the answers so far, dropping skipped steps. */
export function activeSteps(role, answers) {
  return (flows[role] || []).filter((step) => !step.when || step.when(answers))
}

/** Human-readable label for a stored answer value. */
export function labelFor(stepId, value) {
  if (!value) return ''
  if (stepId === 'school') {
    if (String(value).startsWith('custom:')) return value.slice(7)
    return findSchoolById(value)?.name || value
  }
  if (stepId === 'division') {
    if (value === 'both') return 'Senior High & Tertiary'
    return divisionOptions.find((d) => d.id === value)?.label || value
  }
  if (stepId === 'schoolKind') {
    return { shs: 'Senior High', tertiary: 'Tertiary', both: 'SHS & Tertiary' }[value] || value
  }
  if (stepId === 'programme') {
    const all = [...shsProgrammes, ...tertiaryProgrammes]
    return all.find((p) => p.id === value)?.label || value
  }
  if (stepId === 'population') {
    return populationBands.find((b) => b.id === value)?.label || value
  }
  return value
}
