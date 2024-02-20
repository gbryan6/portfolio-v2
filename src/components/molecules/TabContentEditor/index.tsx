import { Text } from '@/components/atoms';
import { Container, LineNumbers, TextContent} from './styles'


interface ITabContentEditor {
  text: string | undefined;
}

export default function TabContentEditor({ text }: ITabContentEditor) {
      if(!text){
        return <></>
      }

      const lines = text.split('\n');

      return (
        <Container>
          <LineNumbers>
            {lines.map((_, index) => (
              <Text tag='span' font='label' color='fontPrimary' key={index + 1}>{index + 1}</Text>
            ))}
          </LineNumbers>
          <TextContent>
          {lines.map((line, index) => (
              <Text tag='pre' font='label' color='fontPrimary' key={index}>{line}</Text>
            ))}
          </TextContent>
          
        </Container>
      )
  
}
