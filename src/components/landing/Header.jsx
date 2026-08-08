import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from '../shared/Logo'
import { navLinks } from '../../mockData'

export default function Header({ onLogin }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-night/80 backdrop-blur-2xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-shell items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#top" onClick={(e) => (e.preventDefault(), handleNav('#top'))}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button onClick={onLogin} className="btn-light group px-6 py-3">
            Log In to Portal
            <ArrowUpRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-white/20 p-3 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-night/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-5 sm:px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  onClick={() => handleNav(link.href)}
                  className="rounded-2xl px-4 py-3.5 text-left text-base font-medium text-white hover:bg-white/[0.08]"
                >
                  {link.label}
                </motion.button>
              ))}
              <button onClick={onLogin} className="btn-light mt-3 w-full">
                Log In to Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
