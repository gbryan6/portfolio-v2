import { Container } from "./styles"
import Tab from '../Tab'
import { Tab as TabType } from '@/hooks/Tabs'

interface ITabBar {
  tabs: TabType[]
}

export default function TabBar({
  tabs
}: ITabBar) {
  return (
    <Container>
      {
        tabs.map((tab) => {
          return (
            <Tab tabData={tab} key={tab.id} />
          )
        })
      }
    </Container>
  )
}