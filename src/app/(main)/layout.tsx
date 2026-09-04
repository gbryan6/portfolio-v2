'use client'

import { Footer, Header} from '@/components/organisms/'
import { DotBackground } from '@/components/atoms'

import { Container, Content } from '@/styles/pages/layout'

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Content>
        <DotBackground />
        <Header />
        {children}
        <Footer />
      </Content>
    </Container>
  )
}