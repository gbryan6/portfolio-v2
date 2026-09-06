import styled from 'styled-components'
import { media } from '@/styles/breakpoints'

export const Container = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  min-height: 0;

  padding-left: 31rem;
  padding-right: 31rem;
  column-gap: 1.6rem;

  font-weight: normal;
  .writer {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow-wrap: break-word;

    .writer-top {
      display: flex;
      flex-direction: column;
      margin-bottom: 4.2rem;
    }

    .writer-bottom{
      display: flex;
      flex-direction: column;
      row-gap: 0.8rem;
    }
  }

  .snippet {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }

  .snippet-break-column {
    padding-left: 2rem;
  }

  .snippet-purple {
    color: ${({ theme }) => theme.colors.codeEntity};
  }

  .snippet-green {
    color: #43d9ad;
  }

  .snippet-orange {
    color: #e99287;
  }

  .snippet-red {
    color: #f16b6b;
  }

  .snippet-download {
    color: white;
  }

  /*
   * The 31rem gutters exist to clear the desktop sidebar rail. Below desktop
   * there is no rail, so the hero stacks over the game and the pane scrolls.
   */
  ${media.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    padding: 4rem 3.2rem;
    row-gap: 4rem;
    column-gap: 0;

    overflow-y: auto;
    overscroll-behavior: contain;

    .writer .writer-top {
      margin-bottom: 3.2rem;
    }

    /* Reveal wraps the game — centre the wrapper, not just the board. */
    > * {
      align-self: center;
      width: 100%;
      max-width: 60rem;
    }
  }

  ${media.mobile} {
    padding: 2.4rem 1.6rem;
    row-gap: 3.2rem;

    /*
     * The hero owns the first screen: it fills the content row minus this
     * pane's own padding, so the name lands centred with room to breathe and
     * the game sits just below the fold as a deliberate scroll reward.
     */
    .writer {
      min-height: calc(var(--content-pane-height) - 4.8rem);
      justify-content: center;
    }

    .writer .writer-top {
      margin-bottom: 3.2rem;
    }

    .snippet-break-column {
      padding-left: 1.2rem;
    }
  }
`
