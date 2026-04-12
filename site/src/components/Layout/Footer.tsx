import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Link to="/" className={styles.logoLink}>
            <Logo className={styles.logoIcon} />
            <span>Ricardo Vidal Lynch</span>
          </Link>
          <p className={styles.tagline}>Let's work together!</p>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Find me on the wwweb!</h3>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/ricardo-vidal-lynch-318b4621a/" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/buena_lynch/" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.youtube.com/@buenalynch" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <a href="mailto:rvlynch9@gmail.com" className={styles.socialLink}>
              Email
            </a>
          </div>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Sitemap</h3>
          <div className={styles.sitemapLinks}>
            <Link to="/" className={styles.sitemapLink}>Home</Link>
            <Link to="/projects" className={styles.sitemapLink}>Projects</Link>
            <Link to="/about" className={styles.sitemapLink}>About me</Link>
            <Link to="/blog" className={styles.sitemapLink}>Blog</Link>
            <Link to="/contact" className={styles.sitemapLink}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
