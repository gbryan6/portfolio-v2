import styled, { css } from "styled-components";

interface IIcontextStylesProps {
  active?: boolean
}

export const Container = styled.div<IIcontextStylesProps>`
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
    color: #81A1C1;
  }

  &:hover {
    span, svg {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }

  ${({active}) => active && css`
    span, svg {
        color: ${({ theme }) => theme.colors.activeTitle};
      }
  `}
`