import { Reorder } from 'motion/react'
import { Container } from './styles'
import Tab from '../Tab'
import { Tab as TabType, useTabs } from '@/hooks/Tabs'
import { Presence } from '@/components/motion'

interface ITabBarProps {
  tabs?: TabType[]
  children?: React.ReactNode
}

export default function TabBar({ tabs, children }: ITabBarProps) {
  const { reorderTabs, isDraggingFile } = useTabs()

  // Only the caller that hands us a `tabs` list (about-me) gets drag-to-reorder —
  // projects' standalone summary tab has nothing to reorder against.
  const reorderProps = tabs
    ? {
        as: Reorder.Group as React.ElementType,
        axis: 'x' as const,
        values: tabs.map((tab) => tab.id),
        onReorder: reorderTabs,
      }
    : {}

  return (
    <Container
      {...reorderProps}
      $isDropTarget={isDraggingFile}
      data-drop-zone="tab-area"
    >
      {tabs && (
        <Presence initial={false}>
          {tabs.map((tab) => (
            <Tab key={tab.id} tabData={tab} reorderable />
          ))}
        </Presence>
      )}
      {children}
    </Container>
  )
}
