import { Facebook, Linkedin, Instagram, Youtube, Mail, Phone, ArrowUpRight } from 'lucide-react'
import Logo from '../shared/Logo'
import Blob3D, { Scribble } from '../shared/Blob3D'
import { Reveal } from '../shared/Motion'
import { brand, footerColumns } from '../../mockData'

const socials = [
  { id: 'fb', Icon: Facebook, label: 'Eduvia on Facebook' },
  { id: 'ig', Icon: Instagram, label: 'Eduvia on Instagram' },
  { id: 'in', Icon: Linkedin, label: 'Eduvia on LinkedIn' },
  { id: 'yt', Icon: Youtube, label: 'Eduvia on YouTube' },
]

export default function Footer({ onLogin }) {
  return (
    <footer className="relative overflow-hidden bg-night">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora -bottom-32 left-1/3 h-[460px] w-[460px] bg-azure/20" />
      </div>

      {/* Closing call to action */}
      <div className="relative mx-auto max-w-shell px-4 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center sm:px-12 lg:px-16 lg:py-20">
            <Blob3D shape="pebble" hex="#1E88F5" size={130} rotate={-18} float className="absolute -left-6 -top-6 hidden lg:block" />
            <Blob3D shape="gem" hex="#22D3EE" size={110} rotate={22} float delay={1.4} className="absolute -bottom-6 -right-4 hidden lg:block" />

            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold leading-[1.1] tracking-tightest sm:text-4xl lg:text-[56px]">
              <span className="word-soft">Ready when</span>{' '}
              <span className="relative inline-block">
                you are
                <Scribble color="#F472B6" width={200} className="absolute -bottom-1 left-0 w-full" delay={0.5} />
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-md text-base leading-8 text-white/50">
              Pick your role, answer three or four questions, and you are in. No password to remember.
            </p>

            <button onClick={onLogin} className="btn-light group mt-10 px-9 py-4 text-[15px]">
              Log In to Portal
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Footer proper */}
      <div className="relative mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2.7fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/45">
              {brand.tagline}. One platform for students, parents, teachers, and school proprietors.
            </p>

            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-2.5 text-xs text-white/45">
                <Mail size={13} strokeWidth={2} />
                {brand.email}
              </li>
              <li className="flex items-center gap-2.5 text-xs text-white/45">
                <Phone size={13} strokeWidth={2} />
                {brand.phone}
              </li>
            </ul>

            <div className="mt-8 flex gap-2">
              {socials.map(({ id, Icon, label }) => (
                <a
                  key={id}
                  href="#top"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
                >
                  <Icon size={16} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">{col.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#top" className="text-sm text-white/45 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {['Privacy', 'Terms', 'Accessibility', 'Support'].map((l) => (
              <a key={l} href="#top" className="text-xs text-white/35 transition-colors hover:text-white">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
