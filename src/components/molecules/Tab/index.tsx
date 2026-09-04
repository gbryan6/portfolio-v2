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
}

export default function Tab({ tabData, noAction, onClose }: ITabProps) {
  const { setActiveTab, removeTab } = useTabs()
  const transition = useMotionPreset('layout')

  const handleClose = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation()
    if (onClose) onClose()
    else removeTab(tabData.id)
  }

  return (
    <Container
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
