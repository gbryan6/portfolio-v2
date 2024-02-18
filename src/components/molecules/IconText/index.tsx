import { IconType } from 'react-icons';
import { Container } from './styles'
import { Text } from '@/components/atoms';
interface IIconText {
  text: string,
  icon: IconType
}


export default function IconText({ text, icon: Icon }: IIconText) {
  return (
    <Container>
      <Icon />
      <Text font='label' color='fontPrimary' tag='span'>{text}</Text>
    </Container>
  );
}

