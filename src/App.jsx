import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Header from './components/landing/Header'
import Hero from './components/landing/Hero'
import RolePicker from './components/landing/RolePicker'
import StatsRow from './components/landing/StatsRow'
import Discover from './components/landing/Discover'
import HowItWorks from './components/landing/HowItWorks'
import FeatureShowcase from './components/landing/FeatureShowcase'
import BenefitsSection from './components/landing/BenefitsSection'
import Testimonials from './components/landing/Testimonials'
import HowItEarns from './components/landing/HowItEarns'
import Footer from './components/landing/Footer'

import Onboarding from './components/onboarding/Onboarding'
import DashboardPage from './components/dashboard/DashboardPage'

import { saveSession, loadSession, clearSession } from './lib/accounts'

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

  const startOnboarding = (role = null) => setOnboarding({ open: true, role })
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <DashboardPage account={account} onExit={signOut} />
      </motion.div>
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
          <HowItWorks />
          <FeatureShowcase />
          <BenefitsSection />
          <Testimonials />
          <HowItEarns />
        </main>
        <Footer onLogin={() => startOnboarding()} />
      </motion.div>

      <Onboarding
        open={onboarding.open}
        initialRole={onboarding.role}
        onClose={closeOnboarding}
        onComplete={completeOnboarding}
      />
    </>
  )
}
