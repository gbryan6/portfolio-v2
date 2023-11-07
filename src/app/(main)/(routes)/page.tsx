'use client'

import { Text } from '@/components/atoms'
import { Container, Content } from '@/styles/pages/home'

export default function Home() {
  return (
    <Container>
      <Content>
        <Text tag='span' font='body' color='fontPrimary'>
          Olá 👋. Eu sou
        </Text>
        <Text tag='span' font='head' color='fontPrimary'>
          Gabriel Bryan
        </Text>
        <Text tag='span' font='subHead' color='fontPrimary' className='snippet-purple'>
          {'>'} Desenvolvedor Full-Stack
        </Text>
      </Content>
      
    </Container>
  )
}
