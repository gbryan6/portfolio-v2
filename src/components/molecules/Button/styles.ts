'use client'

import styled, { css } from 'styled-components'
import { motion } from 'motion/react'

export type ButtonVariant = 'solid' | 'pill'

interface IButtonStylesProps {
  $variant: ButtonVariant
}

const variants = {
  solid: css`
    border-radius: 0.8rem;
    border-color: ${({ theme }) => theme.colors.line};
    padding: 0.9rem 2rem;
  `,
  pill: css`
    border-radius: 999rem;
    border-color: transparent;
    padding: 0.8rem 1.6rem;
  `,
}

/*
 * One surface for every button on the site. The border is always present (it is
 * merely transparent on the pill variant) so hover never nudges the layout.
 */
const base = css<IButtonStylesProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;

  border: 1px solid;
  background-color: ${({ theme }) => theme.colors.buttonColor};

  text-decoration: none;
  cursor: pointer;

  transition: border-color var(--motion-fast) ease,
    background-color var(--motion-base) ease;

  ${({ $variant }) => variants[$variant]}

  /* The label is a <Text> span — outrank its own colour rule from here. */
  &:hover:not(:disabled) span {
    color: ${({ theme }) => theme.colors.activeTitle};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ButtonElement = styled(motion.button)<IButtonStylesProps>`
  ${base}
`

export const AnchorElement = styled(motion.a)<IButtonStylesProps>`
  ${base}
`
