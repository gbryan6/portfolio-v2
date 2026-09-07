'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import styled, { css } from 'styled-components'

interface IButtonProps {
  $active?: boolean
  $iconOnly?: boolean
  $textIcon?: boolean
}

export const Container = styled(Link)<IButtonProps>`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
  text-decoration: none;
  color: inherit;
  transition: background-color var(--motion-base) ease;

  > p {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-inline: ${({ $iconOnly }) => ($iconOnly ? '1.5rem' : '3.2rem')};
    border-left: 1px solid ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.fontPrimary};
    transition: color var(--motion-base) ease;
  }
  /*
   * Descendant, not direct child: the theme toggle wraps its icon in the
   * motion.span that rotates it, so a "> p > svg" rule skipped that one and it
   * fell back to the react-icons default of 1em (i.e. the 14px snippet size).
   */
  > p svg {
    width: 24px;
    height: 24px;
    transition: color var(--motion-base) ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.activeBackground};

    > p,
    > p svg {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }

  ${({ $textIcon }) =>
    $textIcon &&
    css`
      padding-inline: 2.4rem;
      border-left: 1px solid ${({ theme }) => theme.colors.line};

      > p {
        padding-inline: initial;
        border: none;
        + svg {
          width: 3.2rem;
          height: 2.4rem;
          color: ${({ theme }) => theme.colors.fontPrimary};
        }
      }
    `}

  ${({ $active }) =>
    $active &&
    css`
      > p {
        color: ${({ theme }) => theme.colors.activeTitle};
      }
    `}
`

/** Active-route underline. Shared layoutId makes it glide between nav items. */
export const NavIndicator = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.highlight};
`
