import { Link } from 'react-router-dom'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: () => void
  className?: string
}

export function Button({ children, to, href, onClick, className }: ButtonProps) {
  const cls = `${styles.button} ${className || ''}`

  if (to) {
    return <Link to={to} className={cls}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
  }

  return <button onClick={onClick} className={cls}>{children}</button>
}
