/**
 * Ghana schools directory used by the sign-up flow.
 *
 * Not exhaustive — a representative slice of real Senior High Schools
 * and tertiary institutions across the country, enough that the picker
 * feels like it covers the space rather than looking hand-picked. The
 * onboarding step is a searchable list; a "not listed" entry lets a
 * proprietor add their own school if it isn't here yet.
 */

export const schools = [
  /* ---------- Senior High Schools ---------- */
  { id: 'shs-achimota', name: 'Achimota School', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-preskop', name: 'Presbyterian Boys’ Senior High School (Presec-Legon)', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-wesley-girls', name: 'Wesley Girls’ High School', kind: 'shs', region: 'Central' },
  { id: 'shs-mfantsipim', name: 'Mfantsipim School', kind: 'shs', region: 'Central' },
  { id: 'shs-adisadel', name: 'Adisadel College', kind: 'shs', region: 'Central' },
  { id: 'shs-augusco', name: 'St. Augustine’s College', kind: 'shs', region: 'Central' },
  { id: 'shs-holy-child', name: 'Holy Child School', kind: 'shs', region: 'Central' },
  { id: 'shs-prempeh', name: 'Prempeh College', kind: 'shs', region: 'Ashanti' },
  { id: 'shs-opoku-ware', name: 'Opoku Ware School', kind: 'shs', region: 'Ashanti' },
  { id: 'shs-kumasi-high', name: 'Kumasi High School', kind: 'shs', region: 'Ashanti' },
  { id: 'shs-yaa-asantewaa', name: 'Yaa Asantewaa Girls’ Senior High School', kind: 'shs', region: 'Ashanti' },
  { id: 'shs-armed-forces', name: 'Ghana Armed Forces Senior High Technical School', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-accra-academy', name: 'Accra Academy', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-accra-girls', name: 'Accra Girls’ Senior High School', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-labone', name: 'Labone Senior High School', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-odorgonno', name: 'Odorgonno Senior High School', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-tema', name: 'Tema Senior High School', kind: 'shs', region: 'Greater Accra' },
  { id: 'shs-mawuli', name: 'Mawuli School', kind: 'shs', region: 'Volta' },
  { id: 'shs-mawuko', name: 'Mawuko Girls’ Senior High School', kind: 'shs', region: 'Volta' },
  { id: 'shs-keta', name: 'Keta Senior High Technical School', kind: 'shs', region: 'Volta' },
  { id: 'shs-tamasco', name: 'Tamale Senior High School (Tamasco)', kind: 'shs', region: 'Northern' },
  { id: 'shs-ghanasco', name: 'Ghana Senior High School (Ghanasco)', kind: 'shs', region: 'Northern' },
  { id: 'shs-notre-dame', name: 'Notre Dame Seminary/Senior High School', kind: 'shs', region: 'Upper East' },
  { id: 'shs-fijai', name: 'Fijai Senior High School', kind: 'shs', region: 'Western' },
  { id: 'shs-takoradi', name: 'Takoradi Senior High School', kind: 'shs', region: 'Western' },
  { id: 'shs-pope-john', name: 'Pope John Senior High School', kind: 'shs', region: 'Eastern' },
  { id: 'shs-abetifi', name: 'Abetifi Presbyterian Senior High School', kind: 'shs', region: 'Eastern' },
  { id: 'shs-krobo-girls', name: 'Krobo Girls’ Senior High School', kind: 'shs', region: 'Eastern' },
  { id: 'shs-koforidua', name: 'Koforidua Senior High Technical School', kind: 'shs', region: 'Eastern' },
  { id: 'shs-swesco', name: 'St. Rose’s Senior High School', kind: 'shs', region: 'Eastern' },

  /* ---------- Tertiary ---------- */
  { id: 'ter-ug', name: 'University of Ghana, Legon', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-knust', name: 'Kwame Nkrumah University of Science and Technology (KNUST)', kind: 'tertiary', region: 'Ashanti' },
  { id: 'ter-ucc', name: 'University of Cape Coast (UCC)', kind: 'tertiary', region: 'Central' },
  { id: 'ter-uew', name: 'University of Education, Winneba (UEW)', kind: 'tertiary', region: 'Central' },
  { id: 'ter-uds', name: 'University for Development Studies (UDS)', kind: 'tertiary', region: 'Northern' },
  { id: 'ter-umat', name: 'University of Mines and Technology (UMaT)', kind: 'tertiary', region: 'Western' },
  { id: 'ter-uhas', name: 'University of Health and Allied Sciences (UHAS)', kind: 'tertiary', region: 'Volta' },
  { id: 'ter-upsa', name: 'University of Professional Studies, Accra (UPSA)', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-gimpa', name: 'Ghana Institute of Management and Public Administration (GIMPA)', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-ashesi', name: 'Ashesi University', kind: 'tertiary', region: 'Eastern' },
  { id: 'ter-central', name: 'Central University', kind: 'tertiary', region: 'Central' },
  { id: 'ter-valley-view', name: 'Valley View University', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-legon-methodist', name: 'Methodist University Ghana', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-pentecost', name: 'Pentecost University', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-ttu', name: 'Takoradi Technical University', kind: 'tertiary', region: 'Western' },
  { id: 'ter-atu', name: 'Accra Technical University', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-ktu', name: 'Kumasi Technical University', kind: 'tertiary', region: 'Ashanti' },
  { id: 'ter-htu', name: 'Ho Technical University', kind: 'tertiary', region: 'Volta' },
  { id: 'ter-ktu-koforidua', name: 'Koforidua Technical University', kind: 'tertiary', region: 'Eastern' },
  { id: 'ter-cctu', name: 'Cape Coast Technical University', kind: 'tertiary', region: 'Central' },
  { id: 'ter-ncc', name: 'National Film and Television Institute (NAFTI)', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-radford', name: 'Radford University College', kind: 'tertiary', region: 'Greater Accra' },
  { id: 'ter-webster', name: 'Webster University Ghana', kind: 'tertiary', region: 'Greater Accra' },
]

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/**
 * Simple fuzzy filter — matches on name or region, tolerant of missing
 * spaces and punctuation ("preslegon" still finds Presec-Legon).
 */
export function searchSchools(query, { kind = null } = {}) {
  const q = norm(query)
  // `both` (or a null kind) means the caller doesn't want to narrow —
  // otherwise, keep only schools of the exact kind.
  const pool = kind && kind !== 'both' ? schools.filter((s) => s.kind === kind) : schools

  if (!q) return pool.slice(0, 40)

  return pool
    .map((s) => {
      const haystack = `${norm(s.name)} ${norm(s.region)}`
      // Score: exact substring hit ranks above per-word matches.
      let score = 0
      if (haystack.includes(q)) score += 100
      for (const term of q.split(' ')) {
        if (haystack.includes(term)) score += 8
      }
      return { s, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.s)
    .slice(0, 40)
}

export function findSchoolById(id) {
  return schools.find((s) => s.id === id) || null
}
