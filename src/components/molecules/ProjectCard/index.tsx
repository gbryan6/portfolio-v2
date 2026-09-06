'use client'

import { forwardRef } from 'react'
import Image from 'next/image'

import { Text } from '@/components/atoms'
import Button from '@/components/molecules/Button'
import { useMotionPreset, variants } from '@/components/motion'
import {
  Project,
  techById,
} from '@/app/(main)/(routes)/projects/_data'
import { Container, Heading, CardBody, Thumb, Badge, Body } from './styles'

interface IProjectCardProps {
  project: Project
}

const ProjectCard = forwardRef<HTMLElement, IProjectCardProps>(
  function ProjectCard({ project }, ref) {
    const snappy = useMotionPreset('snappy')
    const BadgeIcon = techById[project.badge].icon

    return (
      <Container
        ref={ref}
        layout="position"
        variants={variants.cardItem}
        exit="exit"
        whileHover={{ y: -4 }}
        transition={snappy}
      >
        <Heading>
          <Text tag="span" font="label" color="codeEntity" className="n">
            Project {project.index}
          </Text>
          <Text tag="span" font="label" color="fontPrimary" className="sep">
            {'//'}
          </Text>
          <Text tag="span" font="label" color="codeString" className="slug">
            _{project.slug}
          </Text>
        </Heading>

        <CardBody>
          <Thumb>
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              unoptimized
              sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
            <Badge>
              <BadgeIcon />
            </Badge>
          </Thumb>

          <Body>
            <Text tag="p" font="body" color="fontPrimary" className="desc">
              {project.description}
            </Text>
            <Button
             
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              view-project
            </Button>
          </Body>
        </CardBody>
      </Container>
    )
  }
)

export default ProjectCard
