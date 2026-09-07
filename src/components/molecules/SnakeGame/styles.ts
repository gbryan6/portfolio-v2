'use client'

import styled, { css } from 'styled-components'
import { motion } from 'motion/react'
import { media } from '@/styles/breakpoints'

/* board = 13 colunas x 25 linhas @ 1.6rem por célula */

/* "vidro" do painel externo. As caixas internas (board, instruções, pad)
   usam o dark sólido `backgroundContent`, como no editor. */
const surface = css`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.8rem;
  background: ${({ theme }) =>
    theme.title === 'dark'
      ? 'linear-gradient(180deg, rgba(35, 123, 109, 0.35), rgba(67, 217, 173, 0.06))'
      : 'linear-gradient(180deg, rgba(67, 217, 173, 0.18), rgba(67, 217, 173, 0.04))'};
  box-shadow: inset 0 2px 0 0
    ${({ theme }) =>
      theme.title === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.55)'};
`

export const Container = styled.div`
  ${surface};

  position: relative;
  display: flex;
  gap: 2.4rem;
  flex-shrink: 0;

  width: 51rem;
  height: 47rem;
  padding: 2.4rem;

  backdrop-filter: blur(64px);
  overflow: hidden;

  .bolt {
    position: absolute;
    width: 2rem;
    height: 2rem;
  }
  .bolt--tl {
    top: 1.1rem;
    left: 1.1rem;
  }
  .bolt--tr {
    top: 1.1rem;
    right: 1.1rem;
  }
  .bolt--bl {
    bottom: 1.1rem;
    left: 1.1rem;
  }
  .bolt--br {
    bottom: 1.1rem;
    right: 1.1rem;
  }

  /*
   * 51rem of fixed width cannot survive a phone. The board keeps its 13-column
   * grid (20.8rem fits even a 320px screen) and the side panel drops beneath it
   * instead of beside it, so the on-screen d-pad stays reachable with a thumb.
   */
  ${media.mobile} {
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: auto;
    padding: 2rem 1.6rem;
    gap: 2rem;
  }
`

export const Board = styled.div`
  position: relative;
  flex-shrink: 0;
  align-self: center;

  width: 20.8rem;
  height: 40rem;

  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.backgroundContent};

  overflow: hidden;
`

export const Cell = styled.div<{ $head?: boolean }>`
  position: absolute;

  border: 1px solid ${({ theme }) => theme.colors.backgroundContent};
  border-radius: ${({ $head }) => ($head ? '0.35rem' : '0.15rem')};

  background-color: ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ $head }) => ($head ? '0 0 8px rgba(67, 217, 173, 0.6)' : 'none')};
`

export const FoodBit = styled(motion.div)`
  position: absolute;

  &::after {
    content: '';
    position: absolute;
    inset: 22%;

    border-radius: 50%;

    background-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 8px rgba(67, 217, 173, 0.9);
  }
`

export const Overlay = styled(motion.div)<{ $center?: boolean }>`
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ $center }) => ($center ? 'center' : 'flex-end')};
  gap: 1.2rem;

  padding-bottom: 3.2rem;

  background-color: ${({ $center, theme }) => {
    if (!$center) return 'transparent'
    return theme.title === 'dark' ? 'rgba(1, 12, 21, 0.72)' : 'rgba(255, 255, 255, 0.75)'
  }};
`

export const StartButton = styled.button`
  border: 0;
  border-radius: 0.8rem;

  padding: 1.1rem 2.4rem;

  background-color: ${({ theme }) => theme.colors.highlight};
  box-shadow: 0 0 24px rgba(254, 165, 95, 0.35);

  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 32px rgba(254, 165, 95, 0.5);
  }
`

export const Side = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  flex: 1;

  /* alinha o conteúdo da coluna à direita com o board:
     o board fica centrado nos 40rem, sobrando 1.1rem em cima/embaixo */
  padding-block: 1.1rem;

  .food-left {
    display: flex;
    flex-direction: column;
  }

  ${media.mobile} {
    width: 100%;
    flex: initial;
    padding-block: 0;
    gap: 1.6rem;
  }
`

export const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  padding: 1.6rem;

  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.backgroundContent};
`

export const Pad = styled.div`
  align-self: center;
  margin-top: 1.2rem;

  display: grid;
  grid-template-columns: repeat(3, 2.8rem);
  grid-auto-rows: 2.8rem;
  gap: 0.4rem;

  .up {
    grid-area: 1 / 2;
  }
  .left {
    grid-area: 2 / 1;
  }
  .down {
    grid-area: 2 / 2;
  }
  .right {
    grid-area: 2 / 3;
  }
`

export const PadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.8rem;
  height: 2.8rem;

  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.4rem;

  background-color: ${({ theme }) =>
    theme.title === 'dark' ? theme.colors.background : theme.colors.buttonColor};
  color: ${({ theme }) => theme.colors.activeTitle};

  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;

  > svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`

export const Dots = styled.div`
  width: fit-content;
  margin-top: 0.8rem;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.8rem;
`

export const Dot = styled.span<{ $on?: boolean }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;

  background-color: ${({ $on, theme }) =>
    $on ? theme.colors.accent : 'rgba(67, 217, 173, 0.22)'};
  box-shadow: ${({ $on }) =>
    $on ? '0 0 6px rgba(67, 217, 173, 0.7)' : '0 0 4px rgba(67, 217, 173, 0.2)'};

  transition: background-color 0.2s ease, box-shadow 0.2s ease;
`

export const SkipButton = styled.button`
  margin-top: auto;
  align-self: flex-end;

  padding: 0.9rem 2rem;

  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.8rem;

  background: transparent;

  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.fontPrimary};
  }
  &:hover span {
    color: ${({ theme }) => theme.colors.activeTitle};
  }
`
