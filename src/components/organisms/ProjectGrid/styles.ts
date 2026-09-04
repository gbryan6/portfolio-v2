'use client'

import styled from 'styled-components'
import { motion } from 'motion/react'

export const Container = styled.div`
  grid-area: CT;

  height: var(--editor-content-height);
  overflow-y: auto;

  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.backgroundContent};

  &::-webkit-scrollbar {
    width: 1.2rem;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.activeBackground};
    border-left: 1px solid ${({ theme }) => theme.colors.line};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.fontPrimary};
    border-left: 1px solid ${({ theme }) => theme.colors.line};
  }
`

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

export const EmptyWrap = styled(motion.div)`
  height: 100%;
`
