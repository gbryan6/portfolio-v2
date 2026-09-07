'use client'

import { AnimatePresence } from 'motion/react'
import type { Variants } from 'motion/react'

import { Project } from '@/app/(main)/(routes)/projects/_data'
import ProjectCard from '@/components/molecules/ProjectCard'
import ProjectsEmptyState from '@/components/molecules/ProjectsEmptyState'
import { Presence, motionTokens, useMotionPreset } from '@/components/motion'
import { Container, Grid, EmptyWrap } from './styles'

interface IProjectGridProps {
  /** Already filtered — what should actually render. */
  projects: Project[]
  /** The catalogue before filtering; tells the two empty states apart. */
  total: number
  onClear: () => void
}

export default function ProjectGrid({
  projects,
  total,
  onClear,
}: IProjectGridProps) {
  const enter = useMotionPreset('base')

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: motionTokens.stagger.grid } },
  }

  return (
    <Container>
      <Presence mode="wait" initial={false}>
        {projects.length > 0 ? (
          <Grid
            key="grid"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </Grid>
        ) : (
          <EmptyWrap
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: enter }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <ProjectsEmptyState
              reason={total === 0 ? 'catalog' : 'filter'}
              onClear={onClear}
            />
          </EmptyWrap>
        )}
      </Presence>
    </Container>
  )
}
