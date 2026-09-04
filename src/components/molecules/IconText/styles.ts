import styled, { css } from 'styled-components'

interface IIconTextStyleProps {
  $active?: boolean
}

export const Container = styled.div<IIconTextStyleProps>`
  display: flex;
  align-items: center;

  width: 100%;

  cursor: pointer;

  overflow: hidden;

  > svg {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.8rem;
    color: #81a1c1;
    transition: color var(--motion-fast) ease;
  }

  span {
    transition: color var(--motion-fast) ease;
  }

  &:hover {
    span,
    svg {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }

  ${({ $active }) =>
    $active &&
    css`
      span,
      svg {
        color: ${({ theme }) => theme.colors.activeTitle};
      }
    `}
`
