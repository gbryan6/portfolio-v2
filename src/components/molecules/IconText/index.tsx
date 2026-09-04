import { IconType } from 'react-icons'
import { Container } from './styles'
import { Text } from '@/components/atoms'

interface IIconTextProps extends React.HTMLProps<HTMLDivElement> {
  text: string
  icon: IconType
  active?: boolean
}

export default function IconText({
  text,
  icon: Icon,
  active,
  ...rest
}: IIconTextProps) {
  return (
    <Container {...rest} $active={active}>
      <Icon />
      <Text font="label" color="fontPrimary" tag="span">
        {text}
      </Text>
    </Container>
  )
}
