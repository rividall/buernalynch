import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import { getAllPosts } from '@/hooks/useContent'
import styles from './Blog.module.css'

export function Blog() {
  const posts = getAllPosts()

  return (
    <PageTransition>
    <div className={styles.page}>
      <h1>Blog</h1>
      <div className={styles.list}>
        {posts.map(post => {
          const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          const isExternalHttp = post.externalUrl?.startsWith('http')

          const inner = (
            <>
              <span className={styles.date}>{date}</span>
              <span className={styles.titleGroup}>
                <span className={styles.title} dangerouslySetInnerHTML={{ __html: post.title }} />
                {post.excerpt && <span className={styles.excerpt}>{post.excerpt}</span>}
              </span>
            </>
          )

          if (isExternalHttp) {
            return (
              <a key={post.slug} href={post.externalUrl} className={styles.item} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            )
          }

          return (
            <Link key={post.slug} to={post.externalUrl ?? `/blog/${post.slug}`} className={styles.item}>
              {inner}
            </Link>
          )
        })}
      </div>
    </div>
    </PageTransition>
  )
}
