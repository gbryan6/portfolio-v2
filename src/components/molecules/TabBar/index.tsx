import { Container } from './styles'
import Tab from '../Tab'
import { Tab as TabType } from '@/hooks/Tabs'

interface ITabBar {
  tabs?: TabType[]
  children?: React.ReactNode 
}

export default function TabBar({ tabs, children }: ITabBar) {
  return (
    <Container>
      {tabs &&
        tabs.map((tab) => {
          return <Tab tabData={tab} key={tab.id} />
        })}
        {children}
    </Container>
  )
}
