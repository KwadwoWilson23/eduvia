# Eduvia

**Unlock the future of education.** One platform for students, parents, teachers, and school proprietors — Senior High through tertiary, built around how schooling actually works in Ghana.

Frontend only. There is no backend: every name, number, and date comes from `src/mockData.js`, and accounts live in `localStorage`.

## Run

```bash
npm install
```

```bash
npm run dev
```

Open the URL Vite prints. `npm run build` emits a production bundle to `dist/`.

## Signing up

There is no password and no email. Pick a role and answer a few questions; the last step logs you straight into the portal.

| Role | What it asks |
| --- | --- |
| **Student** | School → Senior High or Tertiary → programme → name → **your Eduvia ID is issued** |
| **Parent** | Child's school → child's Eduvia ID → name |
| **Teacher** | School → division taught → subject → name |
| **Proprietor** | School → what it offers → student numbers → name |

Students pick from the seven Senior High programmes offered in Ghana (General Science, General Arts, Business, Visual Arts, Home Economics, Agricultural Science, Technical) or ten tertiary pathways.

### The student ID actually works

When a student finishes signing up, Eduvia mints an ID like `EDU-7K4M-QX92` and writes it to `localStorage`. A parent who types that ID gets **linked to the real record** — the child's name and programme carry into the parent dashboard. Try it: create a student, sign out, then sign up as a parent with the ID you were given.

The alphabet omits `I`, `O`, `0`, and `1`, since these IDs get read aloud over the phone. A parent whose ID doesn't match (IDs are per-browser in this demo) is offered a sample child rather than a dead end.

## Layout

`src/`
- `lib/accounts.js` — ID generation, student store, session
- `components/onboarding/` — the sign-up flow; `steps.js` declares each role's path
- `components/landing/` — Hero, RolePicker, StatsRow, Discover, FeatureShowcase, Benefits, Testimonials, Footer
- `components/dashboard/` — the four role dashboards behind a floating role switcher
- `components/shared/` — `Blob3D` (glossy shapes and scribbles), `Motion`, `Charts`, `Doodles`, `Pill`

## Design

Dark playful landing (`night`) alternating with light `bone` sections; the portal stays on frosted glass.

- **Type** — Bricolage Grotesque for headings (`font-heading`), Plus Jakarta Sans for body, Instrument Serif for accents. *The heading family is keyed `heading`, not `display` — `font-display` collides with the CSS at-rule descriptor and breaks `@apply`.*
- **Shapes** — every glossy 3D form is inline SVG (`Blob3D`): a body gradient, a rim light, and two specular highlights. No external images, so nothing depends on a CDN.
- **Marks** — `Scribble`, `Squiggle`, and `StarScribble` stroke themselves on with `pathLength`.
- **Motion** — headlines rise word by word, the hero parallaxes as it leaves, cards drift on scroll, and charts grow from zero. `prefers-reduced-motion` collapses all of it.

## Notes

Role and child swaps use a **keyed remount** rather than `AnimatePresence` exit transitions. An exit animation that never resolves — throttled `requestAnimationFrame` in a backgrounded tab — blocks `mode="wait"` from mounting the incoming view, stranding the user on the old one. Entry animations carry the transition instead.

Checked at 375px, 768px, and desktop with no horizontal page overflow.
