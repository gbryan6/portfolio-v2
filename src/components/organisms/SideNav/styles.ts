import styled from 'styled-components'
import { media } from '@/styles/breakpoints'

export const Container = styled.aside`
  grid-area: SN;
  display: flex;

  height: 100%;
  width: 100%;

  border-right: 1px solid ${({ theme }) => theme.colors.line};

  .side-nav_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2.4rem;
    width: 6.8rem;
    height: 100%;
    border-right: 1px solid ${({ theme }) => theme.colors.line};
    padding: 2rem 0;

    .side-nav_left-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      border-radius: 0.6rem;
      cursor: pointer;

      > svg {
        position: relative;
        z-index: 1;
        width: 2rem;
        height: 2rem;
        color: ${({ theme }) => theme.colors.fontPrimary};
        transition: color var(--motion-fast) ease;
      }
    }

    .side-nav_left-button:hover > svg,
    .side-nav_left-button.active > svg {
      color: ${({ theme }) => theme.colors.activeTitle};
    }

    .side-nav_left-indicator {
      position: absolute;
      inset: 0;
      border-radius: 0.6rem;
      background-color: ${({ theme }) => theme.colors.activeBackground};
    }
  }

  .side-nav_right {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }

  /*
   * Stacked layout: the dev/hobbies rail lies down into a row above the
   * accordions, and the whole aside stops being a fixed-height column so the
   * page can scroll past it into the content.
   */
  ${media.tablet} {
    flex-direction: column;
    height: auto;

    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};

    .side-nav_left {
      flex-direction: row;
      justify-content: flex-start;
      column-gap: 1.2rem;
      row-gap: 0;

      width: 100%;
      height: auto;
      padding: 0.8rem 1.2rem;

      border-right: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.line};
    }

    .side-nav_right {
      height: auto;
      overflow: visible;
    }
  }
`
