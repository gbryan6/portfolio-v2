'use client'

import { Container } from '@/styles/pages/aboutMe'
import { sideNavData } from './_data'
import SideNav from '@/components/organisms/SideNav';
import { useTabs } from '@/hooks/Tabs';
import TabBar from '@/components/molecules/TabBar';

export default function AboutMe() {
  const { activeInfo } = useTabs()

  const actualNav = sideNavData[activeInfo];

  return (
    <Container>
      <SideNav sections={actualNav.sections} />
      <TabBar tabs='' />
    </Container>
  );
}

