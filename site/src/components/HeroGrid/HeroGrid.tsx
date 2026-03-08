import { Link } from 'react-router-dom'
import { OptimizedImage } from '@/components/OptimizedImage/OptimizedImage'
import { imageManifest } from '@/content/generated/image-manifest'
import type { ImageAsset } from '@/types/content'
import styles from './HeroGrid.module.css'

function heroImage(manifestKey: string, alt: string): ImageAsset {
  const info = imageManifest[manifestKey]
  return {
    fallback: info.fallback,
    srcSet: info.srcSet,
    alt,
    width: info.width,
    height: info.height,
  }
}

const HERO_CATEGORIES = [
  { slug: 'projects', name: 'Projects', image: heroImage('futbowl/02-buenalynch.jpeg', 'Projects') },
  { slug: 'academy', name: 'Academy', image: heroImage('robotina-no-code-textile-electronics/00-cover.png', 'Academy') },
  { slug: 'visual-design', name: 'Visual Design', image: heroImage('fim/14-part2.png', 'Visual Design') },
]

export function HeroGrid() {
  return (
    <div className={styles.grid}>
      {HERO_CATEGORIES.map((cat, i) => (
        <Link
          key={cat.slug}
          to={`/category/${cat.slug}`}
          className={styles.cell}
        >
          <OptimizedImage
            image={cat.image}
            priority={i === 0}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className={styles.label}>{cat.name}</span>
        </Link>
      ))}
    </div>
  )
}
