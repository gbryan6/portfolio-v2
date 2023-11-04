'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'

interface IButtonProps {
  active?: boolean
  iconOnly?: boolean
}

export const Container = styled(Link)<IButtonProps>`
  > p {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-inline: ${({ iconOnly }) => (iconOnly ? '2rem' : '3.2rem')};
    border-left: 1px solid ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.fontPrimary};
  }
  
  ${({active}) => active && css`
    > p {
      color: ${({ theme }) => theme.colors.activeTitle};
    }

    > p::after{
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: orange;
      top: 100%;
      left: 0;
      right: 0;
    }
  `}

  > p:hover {
    color: ${({ theme }) => theme.colors.activeTitle};
  }

  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
  text-decoration: none;

  > p > svg.theme {
    width: 24px;
    height: 24px;
    path {
      animation: scaleAndRotate 0.2s linear forwards;
    }
  }

  @keyframes scaleAndRotate {
  0% {
    width: 0px;
    height: 0px;
    transform: rotate(0deg);
  }
  50% {
    width: 16px; /* Tamanho intermediário */
    height: 16px; /* Tamanho intermediário */
    transform: rotate(180deg);
  }
  100% {
    width: 24px; /* Tamanho final */
    height: 24px; /* Tamanho final */
    transform: rotate(360deg);
  }
}
  
`
