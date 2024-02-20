import { Text } from '@/components/atoms'
import { Container } from './styles'
import { Tab, useTabs } from '@/hooks/Tabs'
import { IoIosClose } from 'react-icons/io'

interface ITabData {
  tabData: Tab
}

export default function Tab({ tabData }: ITabData) {
  const { setActiveTab, removeTab } = useTabs()


  const handleRemoveTabClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    removeTab(tabData.id);
  };

  return (
    <Container active={tabData.active} onClick={() => setActiveTab(tabData.id)}>
      <Text tag="p" font="snippet" color="fontPrimary">
        {tabData.title}
      </Text>
      <span className="tab-button_close" onClick={handleRemoveTabClick}>
        <IoIosClose />
      </span>
    </Container>
  )
}
