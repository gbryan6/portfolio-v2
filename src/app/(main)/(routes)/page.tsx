'use client'

import styled from 'styled-components'
import { useContext } from 'react'
import { useTheme } from '@/hooks/Theme' 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transition: all 0.5s ease-in-out;
  
  background-color: ${({theme}) => theme.colors.background };

  h1 {
    font-size: 100px;
    color: ${({theme}) => theme.colors.fontPrimary };
  }
`

export default function Home() {
  const { toggleTheme } = useTheme()
  return (
    <Container>
      <h1>Olá mundo dos temas</h1>
      <button onClick={toggleTheme}> Mudar tema</button>
    </Container>
  )
}
