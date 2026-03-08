import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import styles from './Layout.module.css'

export function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
