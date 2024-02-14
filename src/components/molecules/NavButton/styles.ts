'use client'

import Link from 'next/link'
import styled, { css, keyframes } from 'styled-components'

interface IButtonProps {
  active?: boolean
  iconOnly?: boolean
  textIcon?: boolean
}

const growAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const Container = styled(Link)<IButtonProps>`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
  text-decoration: none;
  color: inherit;

  > p {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-inline: ${({ iconOnly }) => (iconOnly ? '1.5rem' : '3.2rem')};
    border-left: 1px solid ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.fontPrimary};
  }
  > p > svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    > p,
    svg {
      color: ${({ theme }) => theme.colors.activeTitle};
      transition: 0.4s ease-in;
    }
  }

  ${({ textIcon }) =>
    textIcon &&
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

      p
    `}

  ${({ active }) =>
    active &&
    css`
      > p {
        color: ${({ theme }) => theme.colors.activeTitle};
      }

      > p::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: orange;
        top: 100%;
        left: 0;
        animation: ${growAnimation} 0.4s forwards;
      }
    `}
`
