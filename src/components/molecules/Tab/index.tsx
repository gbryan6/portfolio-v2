import { Text } from '@/components/atoms'
import { Container } from './styles'
import { Tab } from '@/hooks/Tabs'
import { IoIosClose } from 'react-icons/io'

export default function Tab({ title }: Tab) {
  return (
    <Container>
      <Text tag="p" font="snippet" color="fontPrimary">
        {title}
      </Text>
      <span className="tab-button_close">
        <IoIosClose />
      </span>
    </Container>
  )
}
