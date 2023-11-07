import styled from 'styled-components'

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  .left {
    display: flex;
    height: 100%;

    a:last-child {
      border-right: 1px solid ${({ theme }) => theme.colors.line};
    }
  }

  .left > p {
    display: flex;
    align-items: center;
    padding-inline: 1.8rem;
  }

  .right {
    display: flex;
    height: 100%;
  }
`
