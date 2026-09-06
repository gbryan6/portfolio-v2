'use client'

import styled from 'styled-components'
import { motion } from 'motion/react'
import { media } from '@/styles/breakpoints'

export const Container = styled.div`
  grid-area: CT;

  height: var(--editor-content-height);
  overflow-y: auto;

  padding: 6.4rem;

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

  /* Stacked: the page scrolls, so the grid grows instead of scrolling itself. */
  ${media.tablet} {
    height: auto;
    overflow-y: visible;
    padding: 3.2rem;
  }

  ${media.mobile} {
    padding: 2rem 1.6rem;
  }
`

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 2.4rem;
  }
`

export const EmptyWrap = styled(motion.div)`
  height: 100%;
`
