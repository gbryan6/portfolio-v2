'use client'

import styled, { css } from 'styled-components'
import { motion } from 'motion/react'
import { media } from '@/styles/breakpoints'

// SN = SIDE NAV
// CT = CONTENT
// TB = TABS

export const Container = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-columns: 31.1rem 1fr;
  grid-template-areas:
    'SN TB'
    'SN CT';
  width: 100%;
  height: 100%;
  min-height: 0;

  /*
   * One column below desktop: tabs, then the accordions, then the active file's
   * content directly underneath them. The pane scrolls as a single document
   * instead of the sidebar and editor scrolling independently.
   */
  ${media.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'TB'
      'SN'
      'CT';

    /* Auto rows stretch to fill a taller grid — keep them at natural height. */
    align-content: start;

    /*
     * Must stay a definite height: overflow-y:auto only scrolls a box that is
     * constrained. With height:auto the grid just grew past the row and the
     * shell clipped it, so the page had no scroll at all.
     */
    height: 100%;
    min-height: 0;

    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
`

export const ContentPane = styled(motion.div)<{ $dropTarget?: boolean }>`
  grid-area: CT;

  display: flex;
  width: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  transition: box-shadow var(--motion-fast) ease;

  ${({ $dropTarget, theme }) =>
    $dropTarget &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.colors.accent};
    `}

  ${media.tablet} {
    /* Height now comes from the content — the page is what scrolls. */
    overflow: visible;
  }
`
