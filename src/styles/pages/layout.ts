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
  transition: background-color var(--motion-base) ease;
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

  background-image: url(${backgroundImage.src});
  background-repeat: no-repeat;
  background-position: 90% 50%;
  position: relative;
  animation: pulse 3s infinite alternate;
  transition: background-color var(--motion-base) ease,
    border-color var(--motion-base) ease, color var(--motion-base) ease;

  @keyframes pulse {
    0% {
      background-size: 52%;
    }
    100% {
      background-size: 56%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
