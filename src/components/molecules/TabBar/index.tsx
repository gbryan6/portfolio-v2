import { Container } from './styles'
import Tab from '../Tab'
import { Tab as TabType } from '@/hooks/Tabs'
import { Presence } from '@/components/motion'

interface ITabBarProps {
  tabs?: TabType[]
  children?: React.ReactNode
}

export default function TabBar({ tabs, children }: ITabBarProps) {
  return (
    <Container>
      <Presence initial={false}>
        {tabs?.map((tab) => (
          <Tab key={tab.id} tabData={tab} />
        ))}
      </Presence>
      {children}
    </Container>
  )
}
