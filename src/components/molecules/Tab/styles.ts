import styled, { css } from 'styled-components'

interface ITabStyleProps {
  active: boolean
  noAction?: boolean
}

export const Container = styled.li<ITabStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 1.2rem;

  height: 100%;

  border-right: 1px solid ${({ theme }) => theme.colors.line};

  background-color: ${({ active, theme }) =>
    active && theme.colors.activeBackground};

  cursor: pointer;

  > p {
    margin-right: 4.6rem;
    color: ${({ active, theme }) => active && theme.colors.activeTitle};
  }

  .tab-button_close {
    display: ${({ active }) => active ? "flex": "none"};
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 1.1rem;

    border-radius: 0.2rem;

    width: 1.8rem;
    height: 1.8rem;

    cursor: pointer;

    svg {
      width: 1.8rem;
      height: 1.8rem;
      color: ${({ theme }) => theme.colors.fontPrimary};
    }
  }

  &:hover {
    .tab-button_close {
      display: flex;
    }

    p {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }

  .tab-button_close:hover {
    background-color: #ea4835;
  }

  ${({ noAction }) =>
    noAction &&
    css`
      pointer-events: none;
    `}
`
