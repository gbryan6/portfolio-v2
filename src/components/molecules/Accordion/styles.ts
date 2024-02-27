import styled, { keyframes } from "styled-components";

interface IAccordion {
  isOpen: boolean
}

const fadeIn = keyframes`
  from {
    height: 0;
    opacity: 0;
  }
  to {
    padding: 1.6rem 1.6rem;
    height: auto;
    opacity: 1;
  }
`;


export const Container = styled.div<IAccordion>`
  display: flex;
  flex-direction: column;
  
  width: 100%;

  & + div > div.accordion-head {
    ${({ isOpen, theme }) => isOpen && ` border-top: 1px solid ${theme.colors.line}`};
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

    > svg {
      color: ${({ isOpen, theme }) => isOpen ? theme.colors.activeTitle : theme.colors.fontPrimary};
      width: 2rem;
      height: 2rem;

      margin-right: 1.2rem;
      transition: transform 0.3s ease; 
      transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')}; 
    }
  }  

  .accordion-content {
    display: flex;
    flex-direction: column;
    height: 0;
  

    overflow: hidden;
    animation-duration: 0.2s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-name: ${({ isOpen }) => (isOpen && fadeIn)};
  }

  .label-button {
    margin-bottom: 0.8rem;
  }

`;