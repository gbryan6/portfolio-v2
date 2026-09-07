import styled, { css } from 'styled-components'
import { media } from '@/styles/breakpoints'

interface ITabBarStyleProps {
  $isDropTarget?: boolean
}

export const Container = styled.ul<ITabBarStyleProps>`
  grid-area: TB;

  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  text-decoration: none;

  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  transition: background-color var(--motion-fast) ease,
    border-color var(--motion-fast) ease;

  ${({ $isDropTarget, theme }) =>
    $isDropTarget &&
    css`
      background-color: ${theme.colors.activeBackground};
      border-bottom-color: ${theme.colors.accent};
    `}

  /*
   * Open tabs scroll sideways rather than squeezing each other flat. Height
   * comes from the tabs themselves so an empty bar (projects with no filter)
   * collapses instead of leaving a dead band under the header.
   */
  ${media.tablet} {
    height: auto;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`
