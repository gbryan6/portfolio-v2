'use client'

import { Text } from '@/components/atoms'
import { Container, Content } from '@/styles/pages/home'

export default function Home() {
  return (
    <Container>
      <Content className='slide-in'>
        <Text tag='span' font='body' color='fontSecondary'>
          Olá 👋. Eu sou
        </Text>
        <Text tag='span' font='head' color='fontSecondary' className='dev-name'>
          Gabriel Bryan
        </Text>
        <Text tag='span' font='subHead' color='fontPrimary' className='snippet-purple'>
          {'>'} Front-end developer
        </Text>
      </Content>
      
    </Container>
  )
}
