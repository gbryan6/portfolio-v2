import { Reorder } from 'motion/react'
import { Text } from '@/components/atoms'
import { Container, ActiveMarker } from './styles'
import { Tab as TabType, useTabs } from '@/hooks/Tabs'
import { IoIosClose } from 'react-icons/io'
import { useMotionPreset, variants } from '@/components/motion'

interface ITabProps {
  tabData: TabType
  noAction?: boolean
  /** when provided, the close 'x' calls this instead of the global removeTab */
  onClose?: () => void
  /** renders as a Reorder.Item so it can be drag-reordered inside a Reorder.Group (TabBar) */
  reorderable?: boolean
}

export default function Tab({ tabData, noAction, onClose, reorderable }: ITabProps) {
  const { setActiveTab, removeTab } = useTabs()
  const transition = useMotionPreset('layout')

  const handleClose = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation()
    if (onClose) onClose()
    else removeTab(tabData.id)
  }

  // styled-components' `as` swap lets the same Tab styling render either as a
  // plain motion.li (projects page's standalone summary tab) or a Reorder.Item
  // (TabBar) without duplicating the component.
  const reorderProps = reorderable
    ? { as: Reorder.Item as React.ElementType, value: tabData.id }
    : {}

  return (
    <Container
      {...reorderProps}
      $active={tabData.active}
      $noAction={noAction}
      onClick={() => setActiveTab(tabData.id)}
      layout
      variants={variants.tabItem}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={transition}
      style={{ transformOrigin: 'left' }}
    >
      <Text tag="p" font="snippet" color="fontPrimary">
        {tabData.title}
      </Text>
      <span className="tab-button_close" onClick={handleClose}>
        <IoIosClose />
      </span>
      {tabData.active && (
        <ActiveMarker layoutId="tab-active" transition={transition} />
      )}
    </Container>
  )
}
