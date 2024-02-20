import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  margin-bottom: 0.8rem;
  
  cursor: pointer;

  &:hover {
    span, svg {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }

  > svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.8rem;
    color: #81A1C1;
  }
`