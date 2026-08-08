import { brand } from '../../mockData'

/** Wordmark with a small glossy dot mark. */
export default function Logo({ inverted = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="logo-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="55%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path
          d="M13 1c7 0 12 5 12 12s-5 12-12 12S1 20 1 13 6 1 13 1Zm0 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
          fill="url(#logo-mark)"
        />
        <ellipse cx="9" cy="7" rx="3.4" ry="2.2" fill="#fff" opacity="0.75" transform="rotate(-25 9 7)" />
      </svg>

      <span
        className={`font-heading text-[19px] font-extrabold tracking-tight ${
          inverted ? 'text-night' : 'text-white'
        }`}
      >
        {brand.name}
      </span>
    </div>
  )
}
