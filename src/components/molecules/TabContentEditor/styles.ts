import styled from 'styled-components';
import { media } from '@/styles/breakpoints';

export const Container = styled.div`
  grid-area: CT;
  display: flex;

  width: 100%;
  min-width: 0;
  height: var(--editor-content-height);

  /* long non-wrapping <pre> lines scroll inside the pane, not the page */
  overflow: auto;

  background-color: ${({ theme }) => theme.colors.activeBackground};

  &::-webkit-scrollbar {
   width: 1.2rem;           
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.activeBackground};        
    border-left: 1px solid ${({ theme }) => theme.colors.line};
    padding-left: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.fontPrimary};

    border-left: 1px solid ${({ theme }) => theme.colors.line};
  }

  /*
   * Stacked layout: the editor grows to fit its lines instead of being pinned
   * to a viewport-derived height, so the file's text reads as one block below
   * the accordions. overflow:auto stays for the long non-wrapping pre lines —
   * with height:auto it only ever scrolls horizontally.
   */
  ${media.tablet} {
    height: auto;
  }

  ${media.mobile} {
    padding-bottom: 2.4rem;
  }
`;

export const LineNumbers = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  row-gap: 1rem;
  width: 5.2rem;
  padding-top: 1.7rem;
  text-align: right;

  /*
   * Gone on phones. Once <pre> wraps, one logical line spans several visual
   * rows and the gutter can no longer line up with it — and the reference
   * drops the numbers here anyway, leaving plain prose.
   */
  ${media.mobile} {
    display: none;
  }
`;

export const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding-top: 1.7rem;
  padding-left: 4rem;

  row-gap: 1rem;

  pre {
    min-height: 2.1rem;
    /*
     * Flex items shrink by default. Without this the lines collapse onto each
     * other the moment the pane is height-constrained — text is never the
     * thing that should give way.
     */
    flex-shrink: 0;
  }

  ${media.mobile} {
    padding-top: 1.6rem;
    padding-left: 1.6rem;
    padding-right: 1.6rem;

    /*
     * The gap is per *logical* line. Once lines wrap, one paragraph spans many
     * visual rows and a 1rem gap between each turns the file into a wall, so
     * spacing moves into line-height instead.
     */
    row-gap: 0;

    /* No horizontal scroll on a phone — the prose wraps instead. */
    pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      line-height: 1.7;
      /* Keeps min-height from the base rule: it is what gives the blank
         source lines their height, so paragraph breaks survive row-gap: 0. */
    }
  }
`