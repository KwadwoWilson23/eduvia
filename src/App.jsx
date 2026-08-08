import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// First-paint work — kept in the main bundle so the top of the page
// paints without waiting on a chunk.
import Header from './components/landing/Header'
import Hero from './components/landing/Hero'
import RolePicker from './components/landing/RolePicker'
import StatsRow from './components/landing/StatsRow'
import Discover from './components/landing/Discover'

// Below-the-fold sections and the two big secondary surfaces (portal +
// onboarding) get their own chunks so the initial JS payload is smaller.
// Vite will emit these as separate assets and the browser fetches them
// only when React actually renders them.
const HowItWorks = lazy(() => import('./components/landing/HowItWorks'))
const FeatureShowcase = lazy(() => import('./components/landing/FeatureShowcase'))
const BenefitsSection = lazy(() => import('./components/landing/BenefitsSection'))
const Testimonials = lazy(() => import('./components/landing/Testimonials'))
const HowItEarns = lazy(() => import('./components/landing/HowItEarns'))
const Footer = lazy(() => import('./components/landing/Footer'))
const Onboarding = lazy(() => import('./components/onboarding/Onboarding'))
const DashboardPage = lazy(() => import('./components/dashboard/DashboardPage'))

import { saveSession, loadSession, clearSession } from './lib/accounts'

// Placeholder while a lazy chunk loads. Deliberately unstyled — most
// chunks resolve within a frame or two on a warm cache, and a spinner
// would flash.
const FallbackBlock = () => <div style={{ minHeight: '40vh' }} aria-hidden="true" />

/**
 * Two surfaces — the public page and the portal — with the sign-up flow
 * bridging them. There is no backend: completing onboarding logs you
 * straight in, and the session is remembered in localStorage.
 */
export default function App() {
  const [account, setAccount] = useState(() => loadSession())
  const [view, setView] = useState(() => (loadSession() ? 'portal' : 'landing'))
  const [onboarding, setOnboarding] = useState({ open: false, role: null })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [view])

  const startOnboarding = (role = null) => {
    // Warm the onboarding chunk the moment there's intent to open it, so
    // the click-to-visible latency is dominated by React work rather than
    // a network round-trip.
    import('./components/onboarding/Onboarding')
    setOnboarding({ open: true, role })
  }
  const closeOnboarding = () => setOnboarding({ open: false, role: null })

  const completeOnboarding = (newAccount) => {
    saveSession(newAccount)
    setAccount(newAccount)
    closeOnboarding()
    setView('portal')
  }

  const signOut = () => {
    clearSession()
    setAccount(null)
    setView('landing')
  }

  const scrollToFeatures = () => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })

  // A plain conditional swap rather than an exit-animated one: an exit
  // transition that never resolves would strand the user on the old surface.
  if (view === 'portal' && account) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F8FAFC' }} />}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <DashboardPage account={account} onExit={signOut} />
        </motion.div>
      </Suspense>
    )
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Header onLogin={() => startOnboarding()} />
        <main>
          <Hero onLogin={() => startOnboarding()} onExplore={scrollToFeatures} />
          <RolePicker onPick={(role) => startOnboarding(role)} />
          <StatsRow />
          <Discover />
          <Suspense fallback={<FallbackBlock />}>
            <HowItWorks />
            <FeatureShowcase />
            <BenefitsSection />
            <Testimonials />
            <HowItEarns />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer onLogin={() => startOnboarding()} />
        </Suspense>
      </motion.div>

      {/* Only mount Onboarding after it's asked for — it pulls in the
          schools directory and a handful of step components. */}
      {onboarding.open && (
        <Suspense fallback={null}>
          <Onboarding
            open={onboarding.open}
            initialRole={onboarding.role}
            onClose={closeOnboarding}
            onComplete={completeOnboarding}
          />
        </Suspense>
      )}
    </>
  )
}
