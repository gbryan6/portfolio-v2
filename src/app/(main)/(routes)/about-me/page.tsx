'use client'

import { useEffect } from 'react'
import type { Variants } from 'motion/react'

import { Container, ContentPane } from '@/styles/pages/aboutMe'
import { sideNavData, defaultTabs } from './_data'
import { useTabs } from '@/hooks/Tabs'
import SideNav from '@/components/organisms/SideNav'
import TabBar from '@/components/molecules/TabBar'
import NoContentTabs from '@/components/molecules/NoContentTabs'
import TabContentEditor from '@/components/molecules/TabContentEditor'
import { Presence, useMotionPreset } from '@/components/motion'

export default function AboutMe() {
  const { activeInfo, activeTab, tabs, isDraggingFile, seedTabs } = useTabs()
  const actualNav = sideNavData[activeInfo]

  // Arrive with the bio already open. seedTabs is a no-op after the first call,
  // so coming back here later never reopens a tab the visitor closed.
  useEffect(() => {
    seedTabs(defaultTabs)
  }, [seedTabs])

  const enter = useMotionPreset('enter')
  const exit = useMotionPreset('fast')

  const hasTabs = tabs.length > 0
  const paneKey = hasTabs ? activeTab?.id ?? 'content' : 'empty'

  const pane: Variants = {
    hidden: { opacity: 0, x: 8 },
    show: { opacity: 1, x: 0, transition: enter },
    exit: { opacity: 0, x: -8, transition: exit },
  }

  return (
    <Container>
      <SideNav sections={actualNav.sections} hasLeft />
      {hasTabs && <TabBar tabs={tabs} />}

      <Presence mode="wait" initial={false}>
        <ContentPane
          key={paneKey}
          data-drop-zone="tab-area"
          $dropTarget={isDraggingFile}
          variants={pane}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {hasTabs ? (
            <TabContentEditor text={activeTab?.content} />
          ) : (
            <NoContentTabs />
          )}
        </ContentPane>
      </Presence>
    </Container>
  )
}
