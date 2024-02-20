'use client'

import { Container } from '@/styles/pages/aboutMe'
import { sideNavData } from './_data'
import { useTabs } from '@/hooks/Tabs'
import SideNav from '@/components/organisms/SideNav'
import TabBar from '@/components/molecules/TabBar'
import NoContentTabs from '@/components/molecules/NoContentTabs'
import TabContentEditor from '@/components/molecules/TabContentEditor'


export default function AboutMe() {
  const { activeInfo, tabs } = useTabs()

  const actualNav = sideNavData[activeInfo]

  const activeTab = tabs.find((tab) => tab.active);

  return (
    <Container>
      <SideNav sections={actualNav.sections} />
      {tabs.length > 0 && <TabBar tabs={tabs} />}
      {tabs.length > 0 && <TabContentEditor text={activeTab?.content} />}
      {tabs.length < 1 && <NoContentTabs />}
    </Container>
  )
}
