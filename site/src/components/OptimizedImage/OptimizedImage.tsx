import type { ImageAsset } from '@/types/content'
import styles from './OptimizedImage.module.css'

interface Props {
  image: ImageAsset
  priority?: boolean
  className?: string
  sizes?: string
}

export function OptimizedImage({ image, priority = false, className, sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw' }: Props) {
  return (
    <picture>
      {image.srcSet && (
        <source srcSet={image.srcSet} sizes={sizes} type="image/webp" />
      )}
      <img
        src={image.fallback}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        className={`${styles.image} ${className || ''}`}
      />
    </picture>
  )
}
