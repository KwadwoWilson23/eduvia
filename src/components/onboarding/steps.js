import {
  divisionOptions,
  shsProgrammes,
  tertiaryProgrammes,
  teachingSubjects,
  populationBands,
} from '../../mockData'

/**
 * Each role walks a different path. A step is either a `choice` (pick one of
 * a list), a `text` (type an answer), or one of two bespoke screens.
 *
 * `when` lets a step drop out of the flow — the programme step, for instance,
 * depends on which division was picked.
 */

const schoolStep = (label, hint) => ({
  id: 'school',
  type: 'text',
  title: label,
  hint,
  placeholder: 'e.g. Sunrise Senior High School',
  minLength: 2,
})

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

export const flows = {
  student: [
    schoolStep('Which school do you attend?', 'Type it exactly as your parent would know it.'),
    divisionStep,
    programmeStep('shs', shsProgrammes),
    programmeStep('tertiary', tertiaryProgrammes),
    nameStep('What is your full name?', 'e.g. Amara Boateng'),
    { id: 'issued', type: 'issued', title: 'Your Eduvia ID' },
  ],

  teacher: [
    schoolStep('Which school do you teach at?'),
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
    schoolStep('Which school do you own or run?'),
    {
      id: 'division',
      type: 'choice',
      title: 'What does the school offer?',
      options: [
        ...divisionOptions.map((d) => ({ value: d.id, label: d.label, detail: d.blurb, hex: d.hex })),
        { value: 'both', label: 'Both', detail: 'Senior High and Tertiary on one campus.', hex: '#A3E635' },
      ],
    },
    {
      id: 'population',
      type: 'choice',
      title: 'Roughly how many students?',
      columns: 2,
      options: populationBands.map((b) => ({ value: b.id, label: b.label })),
    },
    nameStep('What is your full name?', 'e.g. Emily Turner'),
  ],

  parent: [
    schoolStep("Which school does your child attend?"),
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
  if (stepId === 'division') {
    if (value === 'both') return 'Senior High & Tertiary'
    return divisionOptions.find((d) => d.id === value)?.label || value
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
