import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 1.2rem;

  height: 100%;

  border-right: 1px solid ${({ theme }) => theme.colors.line};

  > p {
    margin-right: 4.6rem;
  } 

  .tab-button_close {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.2rem;

    width: 1.8rem;
    height: 1.8rem;

    cursor: pointer;

    svg {
      width: 1.8rem;
    height: 1.8rem;
      color: ${({ theme }) => theme.colors.fontPrimary}
    }
  }

  .tab-button_close:hover{
    background-color: red;
  }

`;
