'use client'

import { Footer, Header} from '@/components/organisms/'

import { Container, Content } from '@/styles/pages/layout'

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Content>
        <Header />
        {children}
        <Footer />
      </Content>
    </Container>
  )
}