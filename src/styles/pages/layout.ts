'use client'

import styled from 'styled-components'
import { media } from '@/styles/breakpoints'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  /* iOS: dvh tracks the collapsing address bar, so the shell never overflows. */
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: var(--shell-padding);
  transition: background-color var(--motion-base) ease;

  /*
   * Below desktop the shell is pinned to the viewport instead of growing with
   * its content, so header and footer stay put and the middle row scrolls on
   * its own — the behaviour the mobile reference shows.
   */
  ${media.tablet} {
    height: 100dvh;
    overflow: hidden;
  }
`
export const Content = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background-color: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 0.8rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: var(--header-height) 1fr var(--footer-height);

  width: 100%;
  height: 100%;
  /* Row 2 must be allowed to shrink or a tall page pushes the footer away. */
  min-height: 0;

  position: relative;
  z-index: 0;
  overflow: hidden;
  transition: background-color var(--motion-base) ease,
    border-color var(--motion-base) ease, color var(--motion-base) ease;

  ${media.mobile} {
    border-radius: 0.6rem;
  }
`
