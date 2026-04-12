import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/PageTransition/PageTransition'

export function NotFound() {
  return (
    <PageTransition>
    <div style={{ padding: '96px 64px', textAlign: 'center' }}>
      <h1>404</h1>
      <p style={{ marginTop: 16, color: 'var(--color-text-muted)' }}>
        Page not found.
      </p>
      <Link
        to="/"
        style={{ display: 'inline-block', marginTop: 24, color: 'var(--color-text)' }}
      >
        ← Back to home
      </Link>
    </div>
    </PageTransition>
  )
}
