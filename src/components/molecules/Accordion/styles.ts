import styled from 'styled-components'
import { media } from '@/styles/breakpoints'

interface IAccordionStyleProps {
  $isOpen: boolean
}

export const Container = styled.div<IAccordionStyleProps>`
  display: flex;
  flex-direction: column;

  width: 100%;

  & + div > div.accordion-head {
    ${({ $isOpen, theme }) =>
      $isOpen && `border-top: 1px solid ${theme.colors.line}`};
  }

  .accordion-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 4rem;

    padding-inline: 1.4rem;

    border-bottom: 1px solid ${({ theme }) => theme.colors.line};

    cursor: pointer;
  }

  .accordion-arrow {
    display: inline-flex;
    margin-right: 1.2rem;

    > svg {
      width: 2rem;
      height: 2rem;
      color: ${({ $isOpen, theme }) =>
        $isOpen ? theme.colors.activeTitle : theme.colors.fontPrimary};
    }
  }

  .accordion-content_inner {
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
  }

  .label-button {
    margin-bottom: 0.8rem;
  }

  /*
   * Stacked layout: the heads become full-width tap targets, so they get a
   * resting surface to sit on. buttonColor is the token for exactly that and
   * carries its own dark/light pair — grey-blue on dark, grey on light.
   */
  ${media.tablet} {
    .accordion-head {
      background-color: ${({ theme }) => theme.colors.buttonColor};
      transition: background-color var(--motion-base) ease;
    }
  }
`
