import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  
  .left{
    display: flex;
    height: 100%;
    
    a:last-child{
      border-right: 1px solid ${({ theme }) => theme.colors.line};
    }
  }

  .left > p {
    display: flex;
    align-items: center;
    padding-left: 2.2rem;
    padding-right: 15.4rem;
    font-weight: 500;
    width: 31rem;
  }

  .right {
    display: flex;
    height: 100%;
  }
`