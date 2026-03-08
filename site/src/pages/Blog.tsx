import { Link } from 'react-router-dom'
import { getAllPosts } from '@/hooks/useContent'
import styles from './Blog.module.css'

export function Blog() {
  const posts = getAllPosts()

  return (
    <div className={styles.page}>
      <h1>Blog</h1>
      <div className={styles.list}>
        {posts.map(post => {
          const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
          return (
            <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.item}>
              <span className={styles.date}>{date}</span>
              <span className={styles.title} dangerouslySetInnerHTML={{ __html: post.title }} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
