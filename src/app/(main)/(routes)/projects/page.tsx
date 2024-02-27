'use client'

import { useState } from 'react'
import Tab from '@/components/molecules/Tab'
import Accordion from '@/components/molecules/Accordion'
import TabBar from '@/components/molecules/TabBar'
import TechCheckbox from '@/components/molecules/TechCheckbox'
import SideNav from '@/components/organisms/SideNav'
import { Container } from '@/styles/pages/projects'
import { IconType } from 'react-icons'
import { FaCss3, FaHtml5, FaJs, FaReact } from 'react-icons/fa6'

interface Tech {
  icon: IconType
  selected: boolean
  techName: string
  id: string
}

function Page() {
  const [techs] = useState<Tech[]>([
    { icon: FaHtml5, selected: false, techName: 'HTML', id: 'html-tech' },
    { icon: FaCss3, selected: false, techName: 'CSS', id: 'css-tech' },
    {
      icon: FaReact,
      selected: false,
      techName: 'styled-components',
      id: 'styled-components-tech',
    },
    {
      icon: FaReact,
      selected: false,
      techName: 'Tailwind',
      id: 'tailwind-tech',
    },
    {
      icon: FaJs,
      selected: false,
      techName: 'JavaScript',
      id: 'javascript-tech',
    },
    {
      icon: FaReact,
      selected: false,
      techName: 'Typescript',
      id: 'typescript-tech',
    },
    { icon: FaReact, selected: false, techName: 'React', id: 'react-tech' },
  ])

  return (
    <Container>
      <SideNav>
        <Accordion title="projetos">
          {techs.map((tech) => {
            return <TechCheckbox key={tech.id} techCheckboxData={tech} />
          })}
        </Accordion>
      </SideNav>
      <TabBar>
        <Tab
          tabData={{
            active: false,
            content: '',
            title: 'react;',
            id: 'default-tab',
          }}
          noAction={true}
        />
      </TabBar>
    </Container>
  )
}

export default Page
