'use client'

import styled from 'styled-components'
import backgroundImage from '/public/background_blurs.png'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2.8rem;
  
`
export const Content = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background-color: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 0.8rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5.6rem 1fr 5.2rem;

  width: 100%;
  height: 100%;

  max-width: 2400px;
  max-height: 1200px;

  background-image: url(${backgroundImage.src});
  background-repeat: no-repeat; /* Impede a repetição da imagem */
  background-position: 90% 50%;
  position: relative;
`
