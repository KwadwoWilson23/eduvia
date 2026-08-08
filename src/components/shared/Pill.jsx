/**
 * Status pill. Solid accent fills for high-priority labels, translucent
 * frosted fills for neutral ones so they settle into the glass surfaces.
 */

const tones = {
  brand: 'bg-brand text-white border-brand/40 shadow-[0_4px_14px_-4px_rgb(79_70_229/0.5)]',
  success: 'bg-success text-white border-success/40 shadow-[0_4px_14px_-4px_rgb(16_185_129/0.5)]',
  amber: 'bg-amber text-ink border-amber/40 shadow-[0_4px_14px_-4px_rgb(245_158_11/0.5)]',
  rose: 'bg-rose text-white border-rose/40 shadow-[0_4px_14px_-4px_rgb(244_63_94/0.5)]',
  sky: 'bg-sky text-white border-sky/40 shadow-[0_4px_14px_-4px_rgb(14_165_233/0.5)]',
  ink: 'bg-ink text-white border-ink/40',
  white: 'bg-white/85 text-ink border-white backdrop-blur-xl',
  neutral: 'bg-ink/[0.04] text-mute border-ink/10 backdrop-blur-xl',
  outline: 'bg-white/5 text-white/80 border-white/20 backdrop-blur-xl',
}

export default function Pill({ tone = 'neutral', children, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1
                  text-xs font-semibold leading-5 ${tones[tone] ?? tones.neutral} ${className}`}
    >
      {children}
    </Tag>
  )
}

export { tones as pillTones }
