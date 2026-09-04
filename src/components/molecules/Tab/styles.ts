import styled, { css } from 'styled-components'
import { motion } from 'motion/react'

interface ITabStyleProps {
  $active: boolean
  $noAction?: boolean
}

export const Container = styled(motion.li)<ITabStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  padding: 0 1.2rem;
  height: 100%;

  border-right: 1px solid ${({ theme }) => theme.colors.line};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.activeBackground : 'transparent'};

  cursor: pointer;
  overflow: hidden;

  > p {
    margin-right: 4.6rem;
    white-space: nowrap;
    color: ${({ $active, theme }) =>
      $active ? theme.colors.activeTitle : theme.colors.fontPrimary};
  }

  .tab-button_close {
    display: ${({ $active }) => ($active ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 1.1rem;

    border-radius: 0.2rem;

    width: 1.8rem;
    height: 1.8rem;

    cursor: pointer;

    svg {
      width: 1.8rem;
      height: 1.8rem;
      color: ${({ theme }) => theme.colors.fontPrimary};
    }
  }

  &:hover {
    .tab-button_close {
      display: flex;
    }

    p {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }

  .tab-button_close:hover {
    background-color: #ea4835;
  }

  ${({ $noAction }) =>
    $noAction &&
    css`
      pointer-events: none;
    `}
`

/** Shared layoutId marker — glides between tabs on activation. */
export const ActiveMarker = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.highlight};
`
