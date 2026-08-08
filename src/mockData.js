/**
 * Eduvia — mocked data for the whole frontend.
 *
 * Eduvia is the platform. The school is whatever the person signing in tells
 * us it is, so nothing here is tied to one named institution. All names,
 * numbers, and dates are realistic but invented.
 */

/* ------------------------------------------------------------------ *
 * BRAND
 * ------------------------------------------------------------------ */

export const brand = {
  name: 'Eduvia',
  tagline: 'Unlock the Future of Education',
  descriptor: 'Learning Platform',
  email: 'hello@eduvia.app',
  phone: '+233 30 274 8810',
}

export const navLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'How It Works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Testimonials', href: '#testimonials' },
]

/* ------------------------------------------------------------------ *
 * ONBOARDING — ROLES, DIVISIONS, PROGRAMMES
 * ------------------------------------------------------------------ */

export const roleOptions = [
  {
    id: 'student',
    label: 'Student',
    blurb: 'See your timetable, coursework, and grades.',
    accent: 'azure',
    hex: '#1E88F5',
  },
  {
    id: 'parent',
    label: 'Parent',
    blurb: "Follow your child's attendance, grades, and fees.",
    accent: 'tangerine',
    hex: '#F97316',
  },
  {
    id: 'teacher',
    label: 'Teacher',
    blurb: 'Run your classes, assignments, and marking.',
    accent: 'lime',
    hex: '#A3E635',
  },
  {
    id: 'proprietor',
    label: 'Proprietor',
    blurb: 'Oversee enrolment, staff, and school finances.',
    accent: 'aqua',
    hex: '#22D3EE',
  },
]

export const divisionOptions = [
  {
    id: 'shs',
    label: 'Senior High School',
    blurb: 'SHS 1 – 3, working towards WASSCE.',
    hex: '#1E88F5',
  },
  {
    id: 'tertiary',
    label: 'Tertiary',
    blurb: 'University, polytechnic, or college of education.',
    hex: '#22D3EE',
  },
]

/** The standard Senior High School programmes offered in Ghana. */
export const shsProgrammes = [
  {
    id: 'general-science',
    label: 'General Science',
    subjects: 'Physics · Chemistry · Biology · Elective Maths',
  },
  {
    id: 'general-arts',
    label: 'General Arts',
    subjects: 'Literature · Government · Economics · History',
  },
  {
    id: 'business',
    label: 'Business',
    subjects: 'Financial Accounting · Cost Accounting · Business Management',
  },
  {
    id: 'visual-arts',
    label: 'Visual Arts',
    subjects: 'Graphic Design · Textiles · Sculpture · Picture Making',
  },
  {
    id: 'home-economics',
    label: 'Home Economics',
    subjects: 'Food & Nutrition · Management in Living · Textiles',
  },
  {
    id: 'agricultural-science',
    label: 'Agricultural Science',
    subjects: 'Crop Husbandry · Animal Husbandry · General Agriculture',
  },
  {
    id: 'technical',
    label: 'Technical / Engineering',
    subjects: 'Technical Drawing · Applied Electricity · Building Construction',
  },
]

/** Common tertiary pathways across Ghanaian universities and polytechnics. */
export const tertiaryProgrammes = [
  { id: 'computer-science', label: 'BSc Computer Science', subjects: 'Algorithms · Databases · Networks' },
  { id: 'business-admin', label: 'BBA Business Administration', subjects: 'Accounting · Marketing · Operations' },
  { id: 'nursing', label: 'BSc Nursing', subjects: 'Anatomy · Pharmacology · Clinical Practice' },
  { id: 'economics', label: 'BA Economics', subjects: 'Micro · Macro · Econometrics' },
  { id: 'law', label: 'LLB Law', subjects: 'Constitutional · Contract · Criminal Law' },
  { id: 'education', label: 'BEd Education', subjects: 'Pedagogy · Curriculum · Assessment' },
  { id: 'engineering', label: 'BSc / HND Engineering', subjects: 'Civil · Electrical · Mechanical' },
  { id: 'agriculture', label: 'BSc Agriculture', subjects: 'Agronomy · Soil Science · Agribusiness' },
  { id: 'pharmacy', label: 'PharmD Pharmacy', subjects: 'Pharmaceutics · Therapeutics · Dispensing' },
  { id: 'accounting', label: 'BSc Accounting', subjects: 'Financial Reporting · Audit · Taxation' },
]

/** Subjects a teacher can be assigned to. */
export const teachingSubjects = [
  'Core Mathematics',
  'English Language',
  'Integrated Science',
  'Social Studies',
  'Elective Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Financial Accounting',
  'Government',
  'Literature in English',
  'ICT',
  'Visual Arts',
  'French',
]

export const populationBands = [
  { id: 'small', label: 'Under 300 students' },
  { id: 'mid', label: '300 – 1,000 students' },
  { id: 'large', label: '1,000 – 3,000 students' },
  { id: 'xl', label: 'Over 3,000 students' },
]

/* ------------------------------------------------------------------ *
 * LANDING — HERO & STATS
 * ------------------------------------------------------------------ */

export const stats = [
  { id: 'students', value: 15400, suffix: '+', label: 'Active Students', sub: 'Senior High & Tertiary' },
  { id: 'teachers', value: 1800, suffix: '+', label: 'Teachers', sub: 'Marking on Eduvia daily' },
  { id: 'attendance', value: 98, suffix: '%', label: 'Attendance Rate', sub: 'Average across schools' },
  { id: 'programmes', value: 17, suffix: '', label: 'Programmes', sub: 'SHS tracks & tertiary pathways' },
]

/* ------------------------------------------------------------------ *
 * LANDING — DISCOVER SECTION
 * ------------------------------------------------------------------ */

export const discoverPoints = [
  {
    id: 'dp1',
    title: 'Analytics that change teaching',
    body: 'Eduvia surfaces who is falling behind while there is still time to do something about it, so teaching plans follow the evidence instead of a hunch.',
    hex: '#A3E635',
    initials: 'AB',
    person: 'Amara Boateng',
    detail: 'SHS 3 · General Science',
  },
  {
    id: 'dp2',
    title: 'One place for the whole household',
    body: 'Parents see attendance, grades, and fees for every child on one screen, and reach teachers without waiting for a term report.',
    hex: '#22D3EE',
    initials: 'KO',
    person: 'Kwame Osei',
    detail: 'Parent of two',
  },
]

/* ------------------------------------------------------------------ *
 * LANDING — FEATURE SHOWCASE MOCKUPS
 * ------------------------------------------------------------------ */

export const analyticsPreview = {
  attendanceTrend: [
    { label: 'Wk 1', value: 91 },
    { label: 'Wk 2', value: 94 },
    { label: 'Wk 3', value: 89 },
    { label: 'Wk 4', value: 96 },
    { label: 'Wk 5', value: 93 },
    { label: 'Wk 6', value: 98 },
  ],
  gradeDistribution: [
    { label: 'A', value: 34, color: '#A3E635' },
    { label: 'B', value: 41, color: '#1E88F5' },
    { label: 'C', value: 18, color: '#22D3EE' },
    { label: 'D', value: 5, color: '#FACC15' },
    { label: 'E', value: 2, color: '#F472B6' },
  ],
  testPerformance: [
    { label: 'Unit 1 Class Test', score: 78 },
    { label: 'Mid-Term Exam', score: 86 },
    { label: 'Practical Assessment', score: 91 },
    { label: 'Unit 4 Class Test', score: 84 },
  ],
  headline: '87%',
}

export const homeworkPreview = {
  className: 'Core Mathematics — SHS 2B',
  topic: 'Quadratic Functions',
  dueLabel: 'Due Friday, 16 January',
  rows: [
    { id: 'hw-1', student: 'Emma Thompson', task: 'Completing the Square — Set A', status: 'Submitted' },
    { id: 'hw-2', student: 'Jackson Miller', task: 'Completing the Square — Set A', status: 'Needs Review' },
    { id: 'hw-3', student: 'Priya Raghavan', task: 'Graphing Parabolas Worksheet', status: 'Submitted' },
    { id: 'hw-4', student: 'Noah Okafor', task: 'Graphing Parabolas Worksheet', status: 'Pending' },
    { id: 'hw-5', student: 'Sofia Marchetti', task: 'Word Problems — Roots', status: 'Submitted' },
  ],
}

export const videoPreview = {
  title: 'Thermodynamics — Entropy in Closed Systems',
  instructor: 'Dr. Selina Owusu · SHS 3 Physics',
  elapsed: '18:24',
  duration: '46:10',
  progress: 40,
  viewers: 42,
  chat: [
    { id: 'c1', initials: 'LD', name: 'Liam Davis', message: 'Is entropy always increasing in a closed system?', time: '18:02' },
    { id: 'c2', initials: 'SO', name: 'Dr. Owusu', message: 'Never decreasing — it can hold steady at equilibrium.', time: '18:09', isHost: true },
    { id: 'c3', initials: 'SC', name: 'Sophia Chen', message: 'So the equality case is reversible processes?', time: '18:15' },
    { id: 'c4', initials: 'JM', name: 'Jackson Miller', message: 'Sharing my notes from slide 12 in the class folder.', time: '18:21' },
  ],
}

/* ------------------------------------------------------------------ *
 * LANDING — BENEFITS & TESTIMONIALS
 * ------------------------------------------------------------------ */

export const benefitPills = [
  { id: 'b1', label: 'One Timetable', tone: 'azure' },
  { id: 'b2', label: 'Live Attendance', tone: 'lime' },
  { id: 'b3', label: 'Parent Connect', tone: 'tangerine' },
  { id: 'b4', label: 'Faster Marking', tone: 'aqua' },
  { id: 'b5', label: 'Termly Reports', tone: 'blush' },
  { id: 'b6', label: 'Fee Statements', tone: 'white' },
  { id: 'b7', label: 'Lesson Recordings', tone: 'sun' },
  { id: 'b8', label: 'Staff Briefings', tone: 'azure' },
]

export const testimonials = [
  {
    id: 't1',
    role: 'Proprietor',
    name: 'Dr. Emily Turner',
    title: 'Proprietor · Senior High & Tertiary campus',
    initials: 'ET',
    accent: '#22D3EE',
    quote:
      'I was running the school off four disconnected registers. Now I open one screen and see attendance, fees, and staff workload before the morning assembly.',
  },
  {
    id: 't2',
    role: 'Teacher',
    name: 'Mr. James Rodriguez',
    title: 'Physics Teacher · SHS 3',
    initials: 'JR',
    accent: '#A3E635',
    quote:
      'Marking used to eat my weekends. Eduvia handles the objective sections and flags who is falling behind, so my Saturday goes to the six students who actually need me.',
  },
  {
    id: 't3',
    role: 'Student',
    name: 'Amara Boateng',
    title: 'SHS Year 3 · General Science',
    initials: 'AB',
    accent: '#1E88F5',
    quote:
      'Before, I found out about a class test from a friend the night before. Now my focus schedule shows every lecture, deadline, and exam the moment a teacher posts it.',
  },
  {
    id: 't4',
    role: 'Parent',
    name: 'Rachel Kimura',
    title: 'Parent of two · SHS 1 and SHS 2',
    initials: 'RK',
    accent: '#F97316',
    quote:
      'I live two hours from campus. Eduvia is how I know both my children were in class today, what the fee balance is, and what their teachers think — without waiting for a report.',
  },
]

export const footerColumns = [
  { title: 'Platform', links: ['Timetable', 'Assignments', 'Gradebook', 'Attendance', 'Fee Statements'] },
  { title: 'Senior High', links: ['General Science', 'General Arts', 'Business', 'Visual Arts', 'Technical'] },
  { title: 'Tertiary', links: ['Computer Science', 'Business Admin', 'Nursing', 'Engineering', 'Education'] },
  { title: 'Company', links: ['About', 'Careers', 'Support', 'Privacy', 'Contact'] },
]

/* ------------------------------------------------------------------ *
 * PORTAL — SHARED
 * ------------------------------------------------------------------ */

export const roles = [
  { id: 'proprietor', label: 'Proprietor' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'student', label: 'Student' },
  { id: 'parent', label: 'Parent' },
]

export const sidebarNav = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'courses', label: 'Courses', icon: 'cap' },
  { id: 'assignments', label: 'Assignments', icon: 'clipboard' },
  { id: 'grades', label: 'Grades', icon: 'star' },
  { id: 'schedule', label: 'Schedule', icon: 'calendar' },
]

/* ------------------------------------------------------------------ *
 * PORTAL — PROPRIETOR
 * ------------------------------------------------------------------ */

export const adminView = {
  title: 'Campus Overview',
  subtitle: 'Key indicators for the current term.',
  kpis: [
    { id: 'fees', label: 'Term Fees Collected', value: '$1.86M', delta: '92% of expected', trend: 'up', icon: 'money' },
    { id: 'enrollment', label: 'Active Enrolment', value: '1,240', delta: '+84 since last term', trend: 'up', icon: 'users' },
    { id: 'staff', label: 'Staff Performance Index', value: '84%', delta: 'Stable retention', trend: 'flat', icon: 'staff' },
  ],
  attendance: {
    title: 'Campus Attendance',
    badge: 'This week',
    data: [
      { label: 'Mon', value: 88 },
      { label: 'Tue', value: 94 },
      { label: 'Wed', value: 97 },
      { label: 'Thu', value: 91 },
      { label: 'Fri', value: 95 },
    ],
  },
  departments: {
    title: 'Programme Enrolment',
    badge: 'Since last term',
    data: [
      { label: 'Computer Science · Tertiary', value: 24, students: 186 },
      { label: 'Business Admin · Tertiary', value: 18, students: 152 },
      { label: 'General Science · SHS', value: 11, students: 304 },
      { label: 'General Arts · SHS', value: 2, students: 241 },
    ],
  },
  ledger: [
    { id: 'l1', item: 'Term fee invoices issued', detail: '1,240 students', amount: '$2.02M', status: 'Processed' },
    { id: 'l2', item: 'Staff salaries — January', detail: '68 teaching, 24 non-teaching', amount: '$412K', status: 'Scheduled' },
    { id: 'l3', item: 'Science laboratory refit', detail: 'Board-approved capital works', amount: '$96K', status: 'Received' },
  ],
}

/* ------------------------------------------------------------------ *
 * PORTAL — TEACHER
 * ------------------------------------------------------------------ */

export const teacherView = {
  title: 'Classroom Command Center',
  quickActions: [
    { id: 'qa1', label: 'Create Assignment', description: 'Draft new coursework for your class.', icon: 'filePlus' },
    { id: 'qa2', label: 'Start Live Session', description: 'Launch the virtual classroom for SHS 2B.', icon: 'video' },
    { id: 'qa3', label: 'Grade Submissions', description: '11 submissions are waiting on your review.', icon: 'checkSquare' },
  ],
  performance: { average: 87, activeStudents: 24, atRisk: 3, trend: [62, 71, 68, 79, 74, 83, 87, 84, 91] },
  gradebook: [
    { id: 'g1', student: 'Emma Thompson', initials: 'ET', assignment: 'Practical — Resonance Tube', submitted: '24 Jan, 10:30', status: 'Submitted', action: 'Grade' },
    { id: 'g2', student: 'Liam Davis', initials: 'LD', assignment: 'Mid-Term Essay Draft', submitted: '23 Jan, 23:45', status: 'Graded', action: 'View', score: '92' },
    { id: 'g3', student: 'Sophia Chen', initials: 'SC', assignment: 'Thermodynamics Class Test', submitted: '22 Jan (late)', status: 'Overdue', action: 'Remind' },
    { id: 'g4', student: 'Jackson Miller', initials: 'JM', assignment: 'Practical — Resonance Tube', submitted: '24 Jan, 09:15', status: 'Submitted', action: 'Grade' },
    { id: 'g5', student: 'Priya Raghavan', initials: 'PR', assignment: 'Wave Interference Problem Set', submitted: '24 Jan, 08:02', status: 'Graded', action: 'View', score: '88' },
    { id: 'g6', student: 'Noah Okafor', initials: 'NO', assignment: 'Wave Interference Problem Set', submitted: 'Not submitted', status: 'Overdue', action: 'Remind' },
  ],
}

/* ------------------------------------------------------------------ *
 * PORTAL — STUDENT
 * ------------------------------------------------------------------ */

export const studentView = {
  subtitle: 'Here is your focus schedule and progress for today.',
  overallProgress: 68,
  tasksDueToday: 4,
  highPriority: 2,
  schedule: [
    { id: 's1', time: '09:00', kind: 'Live Lecture', tone: 'brand', title: 'Physics — Thermodynamics', detail: 'Join link active in 10 minutes' },
    { id: 's2', time: '11:30', kind: 'Deadline', tone: 'rose', title: 'Elective Maths — Problem Set 4', detail: 'Submit through the portal' },
    { id: 's3', time: '14:00', kind: 'Group Work', tone: 'ink', title: 'Literature Review Session', detail: 'Room 304 / Virtual Room B' },
    { id: 's4', time: '16:30', kind: 'Class Test', tone: 'amber', title: 'Chemistry Mid-Term', detail: 'Assembly Hall B — bring student ID' },
  ],
  courses: [
    { id: 'c1', tag: 'Science', tone: 'brand', title: 'Physics', instructor: 'Dr. S. Owusu', progress: 82, next: 'Practical — Resonance Tube', cta: 'Resume' },
    { id: 'c2', tag: 'Mathematics', tone: 'sky', title: 'Elective Mathematics', instructor: 'Mr. T. Antwi', progress: 45, next: 'Vectors Class Test', cta: 'Start' },
    { id: 'c3', tag: 'Core', tone: 'amber', title: 'Literature in English', instructor: 'Ms. C. Adjei', progress: 71, next: 'Essay: Postcolonial Voice', cta: 'Resume' },
    { id: 'c4', tag: 'Science', tone: 'success', title: 'Chemistry', instructor: 'Dr. R. Patel', progress: 58, next: 'Organic Reactions Review', cta: 'Resume' },
  ],
  activity: [
    { id: 'a1', text: 'Submitted "Wave Interference Problem Set"', time: '2 hours ago' },
    { id: 'a2', text: 'Scored 91% on Thermodynamics Class Test', time: 'Yesterday' },
    { id: 'a3', text: 'Joined study group "Elective Maths — SHS 3B"', time: '22 Jan' },
  ],
}

/* ------------------------------------------------------------------ *
 * PORTAL — PARENT
 * ------------------------------------------------------------------ */

export const parentView = {
  title: 'Parent Dashboard',
  subtitle: "Progress and standing for your children.",
  children: [
    {
      id: 'ch1',
      name: 'Emma Thompson',
      grade: 'SHS Year 2 · General Science',
      initials: 'ET',
      attendance: { rate: 96, present: 21, total: 22 },
      fees: { amount: '$450', term: 'Term 2 fees', status: 'Due in 5 days', tone: 'rose' },
      grades: [
        { subject: 'Core Mathematics', item: 'Quadratics Class Test', grade: 'A-' },
        { subject: 'Physics', item: 'Practical Report', grade: 'B+' },
        { subject: 'History', item: 'Essay Draft', grade: 'A' },
      ],
      messages: [
        {
          id: 'm1',
          from: 'Mr. Daniel Roberts',
          subject: 'Core Mathematics',
          initials: 'DR',
          time: '2 hours ago',
          body: 'Emma has been doing exceptionally well with quadratic functions. She helped several classmates during group work today. Keep encouraging her problem-solving at home.',
        },
        {
          id: 'm2',
          from: 'Ms. Hana Lee',
          subject: 'Physics',
          initials: 'HL',
          time: 'Yesterday',
          body: 'A reminder that Science Fair project proposals close on the 24th. Please review Emma’s ideas and sign the consent form sent home yesterday.',
        },
      ],
    },
    {
      id: 'ch2',
      name: 'Jonah Thompson',
      grade: 'SHS Year 1 · Business',
      initials: 'JT',
      attendance: { rate: 89, present: 19, total: 22 },
      fees: { amount: '$0', term: 'Term 2 fees', status: 'Paid in full', tone: 'success' },
      grades: [
        { subject: 'Business Management', item: 'Unit 4 Test', grade: 'B' },
        { subject: 'Core Mathematics', item: 'Indices Worksheet', grade: 'B-' },
        { subject: 'Visual Arts', item: 'Portfolio Review', grade: 'A' },
      ],
      messages: [
        {
          id: 'm3',
          from: 'Mrs. Ada Nwosu',
          subject: 'Form Tutor',
          initials: 'AN',
          time: '4 hours ago',
          body: 'Jonah missed three days this month due to illness. I have shared the catch-up packet through the portal — no rush, but let me know if he needs extra time.',
        },
        {
          id: 'm4',
          from: 'Mr. Victor Silva',
          subject: 'Physical Education',
          initials: 'VS',
          time: '21 Jan',
          body: 'Jonah made the inter-house football roster. First practice is Thursday at 15:30; the kit list is on the class page.',
        },
      ],
    },
  ],
}

/* ------------------------------------------------------------------ *
 * STATUS PILL TONES
 * ------------------------------------------------------------------ */

export const statusTone = {
  Submitted: 'brand',
  Graded: 'success',
  Overdue: 'rose',
  Pending: 'neutral',
  'Needs Review': 'amber',
  Processed: 'success',
  Scheduled: 'sky',
  Received: 'success',
}
