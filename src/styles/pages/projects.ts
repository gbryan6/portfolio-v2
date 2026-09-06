import styled from 'styled-components'
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

  /* Same stack as about-me: filters on top, the grid scrolling underneath. */
  ${media.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'TB'
      'SN'
      'CT';

    /* Auto rows stretch to fill a taller grid — keep them at natural height. */
    align-content: start;

    /* Definite height, or overflow-y:auto has nothing to scroll against. */
    height: 100%;
    min-height: 0;

    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
`
