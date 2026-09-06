import styled from 'styled-components'
import { media } from '@/styles/breakpoints'

// SN = SIDE NAV
// FM = FORM
// CD = CODE PREVIEW

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 31.1rem minmax(0, 1fr) minmax(0, 1.15fr);
  grid-template-areas: 'SN FM CD';

  width: 100%;
  height: 100%;
  min-height: 0;

  /* The code pane is commentary, not content — drop it before it cramps. */
  ${media.wide} {
    grid-template-columns: 31.1rem minmax(0, 1fr);
    grid-template-areas: 'SN FM';
  }

  /* Stacked, like the other pages: channels on top, the form underneath. */
  ${media.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'SN'
      'FM';

    align-content: start;

    /* Definite height, or overflow-y:auto has nothing to scroll against. */
    height: 100%;
    min-height: 0;

    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
`

export const FormPane = styled.div`
  grid-area: FM;

  display: flex;
  min-width: 0;
  min-height: 0;

  border-right: 1px solid ${({ theme }) => theme.colors.line};
  transition: border-color var(--motion-base) ease;

  ${media.wide} {
    border-right: none;
  }
`

export const CodePane = styled.aside`
  grid-area: CD;

  display: flex;
  min-width: 0;
  min-height: 0;

  ${media.wide} {
    display: none;
  }
`
