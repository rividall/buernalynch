import { useParams, Link } from 'react-router-dom'
import { OptimizedImage } from '@/components/OptimizedImage/OptimizedImage'
import { useCategoryBySlug } from '@/hooks/useContent'
import { posts } from '@/content/generated/posts'
import { NotFound } from './NotFound'
import styles from './CategoryPage.module.css'

export function CategoryPage() {
  const { slug } = useParams()
  const category = useCategoryBySlug(slug)

  if (!category) return <NotFound />

  const filtered = posts.filter(p => p.categories.includes(category.name))

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>{category.name}</h1>
      {category.description && (
        <p className={styles.description}>{category.description}</p>
      )}
      <div className={styles.list}>
        {filtered.map(post => (
          <Link key={post.slug} to={`/projects/${post.slug}`} className={styles.item}>
            {post.featuredImage && (
              <OptimizedImage image={post.featuredImage} className={styles.image} />
            )}
            <div className={styles.info}>
              <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title }} />
              <p className={styles.excerpt}>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
