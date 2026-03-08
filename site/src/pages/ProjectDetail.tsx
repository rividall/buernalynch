import { useParams, Link, useLocation } from 'react-router-dom'
import { OptimizedImage } from '@/components/OptimizedImage/OptimizedImage'
import { usePost } from '@/hooks/useContent'
import { NotFound } from './NotFound'
import styles from './ProjectDetail.module.css'

export function ProjectDetail() {
  const { slug } = useParams()
  const location = useLocation()
  const post = usePost(slug)

  if (!post) return <NotFound />

  const isBlog = location.pathname.startsWith('/blog')
  const backPath = isBlog ? '/blog' : '/projects'
  const backLabel = isBlog ? '← Blog' : '← Projects'

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Strip the first h1 from content if it matches the post title (avoids duplicate)
  const cleanedHtml = post.contentHtml.replace(
    /^\s*<h1[^>]*>.*?<\/h1>\s*/i,
    ''
  )

  return (
    <article>
      <div className={styles.content}>
        <Link to={backPath} className={styles.backLink}>{backLabel}</Link>
        {post.featuredImage && (
          <OptimizedImage
            image={post.featuredImage}
            priority
            className={styles.hero}
            sizes="(max-width: 800px) 100vw, 800px"
          />
        )}
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <p className={styles.meta}>{date} · {post.categories.join(', ')}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: cleanedHtml }}
        />
      </div>
    </article>
  )
}
