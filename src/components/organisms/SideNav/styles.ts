import styled from 'styled-components';

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

    .side-nav_left-button{
      display: flex;
      cursor: pointer;
    }

    .side-nav_left-button:hover{
      svg{
        color: ${({ theme }) => theme.colors.activeTitle};
      }
    }

    .side-nav_left-button.active{
      svg{
        color: ${({ theme }) => theme.colors.activeTitle};
      }
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: ${({ theme }) => theme.colors.fontPrimary};
    }
  }

  .side-nav_right {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
`