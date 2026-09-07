'use client'

import styled from 'styled-components'
import { media } from '@/styles/breakpoints'

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  .left {
    display: flex;
    height: 100%;

    a:last-child {
      border-right: 1px solid ${({ theme }) => theme.colors.line};
    }
  }

  .left > p {
    display: flex;
    align-items: center;
    padding-left: 2.2rem;
    padding-right: 15.4rem;
    font-weight: 500;
    width: 31rem;
  }

  .right {
    display: flex;
    height: 100%;
  }

  /*
   * Below desktop the whole nav collapses into the sheet: the route links and
   * the right-hand cluster come out, the burger goes in, and the name loses the
   * 31rem gutter that only exists to line up with the sidebar.
   */
  ${media.tablet} {
    .left > a,
    .right {
      display: none;
    }

    .left > p {
      width: auto;
      padding-right: 2.2rem;
    }
  }
`

export const MenuToggle = styled.button`
  display: none;

  align-items: center;
  justify-content: center;

  height: 100%;
  padding-inline: 2rem;

  border: 0;
  background-color: transparent;

  cursor: pointer;
  transition: background-color var(--motion-fast) ease;

  > span > svg {
    width: 2.4rem;
    height: 2.4rem;
    color: ${({ theme }) => theme.colors.fontPrimary};
    transition: color var(--motion-fast) ease;
  }

  &:hover,
  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.colors.activeBackground};

    > span > svg {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }

  ${media.tablet} {
    display: flex;
  }
`
