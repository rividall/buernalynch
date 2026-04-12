import React from 'react'
import { useOutlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { Nav } from './Nav'
import { Footer } from './Footer'
import styles from './Layout.module.css'

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className={styles.main}>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          {outlet && React.cloneElement(outlet, { key: location.pathname })}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
