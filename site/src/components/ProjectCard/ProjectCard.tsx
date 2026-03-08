import { Link } from 'react-router-dom'
import { OptimizedImage } from '@/components/OptimizedImage/OptimizedImage'
import type { Post } from '@/types/content'
import styles from './ProjectCard.module.css'

interface Props {
  post: Post
  priority?: boolean
}

export function ProjectCard({ post, priority = false }: Props) {
  return (
    <Link to={`/projects/${post.slug}`} className={styles.card}>
      {post.featuredImage && (
        <OptimizedImage
          image={post.featuredImage}
          priority={priority}
          className={styles.image}
        />
      )}
      <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title }} />
      <p className={styles.excerpt}>{post.excerpt}</p>
      <p className={styles.categories}>{post.categories.join(' · ')}</p>
    </Link>
  )
}
