import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import { getProjectPosts } from '@/hooks/useContent'
import styles from './Projects.module.css'

export function Projects() {
  const projects = getProjectPosts()

  return (
    <PageTransition>
    <div className={styles.page}>
      <h1>Projects</h1>
      <div className={styles.grid}>
        {projects.map(post => (
          <ProjectCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
    </PageTransition>
  )
}
