import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import { getAllPosts } from '@/hooks/useContent'
import styles from './Blog.module.css'

const Dither = lazy(() =>
  import('@/components/Dither/Dither').then(m => ({ default: m.Dither }))
)

export function Blog() {
  const posts = getAllPosts()
  const ditherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ditherRef.current) {
        ditherRef.current.style.transform = `translateY(${-window.scrollY * 0.15}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
    <div className={styles.page}>
      <Suspense fallback={null}>
        <div ref={ditherRef} style={{ position: 'fixed', inset: 0, top: '-10%', height: '120%', zIndex: -1, willChange: 'transform' }}>
          <Dither
            waveColor={[0.2, 0, 0.3]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.1}
            colorNum={9.7}
            waveAmplitude={0.44}
            waveFrequency={2.3}
            waveSpeed={0.01}
          />
        </div>
      </Suspense>
      <h1>Blog</h1>
      <div className={styles.list}>
        <a href="/cowork-guide" className={styles.item}>
          <span className={styles.date}>Feb 2026</span>
          <span className={styles.title}>Give Claude a Memory — A Guide to CLAUDE.md in Cowork</span>
        </a>
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
    </PageTransition>
  )
}
