/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        night: '#0A0A0B', // landing hero / dark sections
        ink: '#0F172A', // portal text + structural blocks
        'ink-soft': '#1E293B',
        paper: '#F8FAFC',
        bone: '#F4F4F2', // light landing sections

        // Playful accent set — the 3D shapes and doodles draw from these
        grape: '#A855F7',
        tangerine: '#F97316',
        lime: '#A3E635',
        aqua: '#22D3EE',
        blush: '#F472B6',
        sun: '#FACC15',

        // Portal accents
        brand: '#4F46E5',
        'brand-soft': '#818CF8',
        success: '#10B981',
        amber: '#F59E0B',
        rose: '#F43F5E',
        sky: '#0EA5E9',

        // Neutrals
        hair: '#E2E8F0',
        mute: '#64748B',
        wash: '#F1F5F9',
      },
      fontFamily: {
        // Keyed `heading`, not `display` — `font-display` collides with the
        // CSS at-rule descriptor of the same name and breaks @apply.
        heading: ['"Bricolage Grotesque"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
        '6xl': '3.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px -8px rgb(15 23 42 / 0.12), 0 2px 8px -2px rgb(15 23 42 / 0.06)',
        'glass-lg': '0 24px 64px -16px rgb(15 23 42 / 0.18), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
        'glass-dark': '0 8px 32px -8px rgb(0 0 0 / 0.5)',
        lift: '0 20px 48px -12px rgb(79 70 229 / 0.28)',
        pop: '0 24px 60px -16px rgb(0 0 0 / 0.55)',
      },
      maxWidth: {
        shell: '1280px',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(24px,-32px,0) scale(1.06)' },
          '66%': { transform: 'translate3d(-20px,20px,0) scale(0.96)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        spinslow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        spinslow: 'spinslow 26s linear infinite',
      },
    },
  },
  plugins: [],
}
