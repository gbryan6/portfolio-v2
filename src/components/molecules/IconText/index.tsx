import { IconType } from 'react-icons';
import { Container } from './styles'
import { Text } from '@/components/atoms';

interface IIconText extends React.HTMLProps<HTMLDivElement> {
  text: string,
  icon: IconType
}

export default function IconText({ text, icon: Icon, ...rest }: IIconText) {
  return (
    <Container {...rest}>
      <Icon />
      <Text font='label' color='fontPrimary' tag='span'>{text}</Text>
    </Container>
  );
}

