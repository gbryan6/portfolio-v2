'use client'

import { useMemo, useState } from 'react'

import { Container } from '@/styles/pages/projects'
import SideNav from '@/components/organisms/SideNav'
import ProjectGrid from '@/components/organisms/ProjectGrid'
import TabBar from '@/components/molecules/TabBar'
import Tab from '@/components/molecules/Tab'
import Accordion from '@/components/molecules/Accordion'
import TechCheckbox from '@/components/molecules/TechCheckbox'
import { Presence } from '@/components/motion'
import { techFilters, projects, type TechId } from './_data'

export default function Projects() {
  const [selected, setSelected] = useState<TechId[]>([])

  const toggle = (id: TechId) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )

  // ANY-match: a project shows if it has at least one selected tech.
  const visible = useMemo(
    () =>
      selected.length === 0
        ? projects
        : projects.filter((p) => p.techs.some((t) => selected.includes(t))),
    [selected]
  )

  // stable filter order (not click order) -> always "React; CSS; Vue"
  const summaryLabel = techFilters
    .filter((f) => selected.includes(f.id))
    .map((f) => f.label)
    .join('; ')

  return (
    <Container>
      <SideNav>
        <Accordion title="projetos">
          {techFilters.map((filter) => (
            <TechCheckbox
              key={filter.id}
              techCheckboxData={{
                id: filter.id,
                icon: filter.icon,
                techName: filter.label,
                selected: selected.includes(filter.id),
              }}
              onChangeValue={(row) => toggle(row.id as TechId)}
            />
          ))}
        </Accordion>
      </SideNav>

      <TabBar>
        <Presence mode="wait" initial={false}>
          {selected.length > 0 && (
            <Tab
              key={summaryLabel}
              onClose={() => setSelected([])}
              tabData={{
                id: 'filter-tab',
                title: summaryLabel,
                content: '',
                active: true,
              }}
            />
          )}
        </Presence>
      </TabBar>

      <ProjectGrid
        projects={visible}
        total={projects.length}
        onClear={() => setSelected([])}
      />
    </Container>
  )
}
