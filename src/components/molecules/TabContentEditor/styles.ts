import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CT;
  display: flex;

  width: 100%;
  height: calc(100vh - 206px);

  
  overflow-y: scroll;

  background-color:  ${({ theme }) => theme.colors.activeBackground};

  &::-webkit-scrollbar {
   width: 1.2rem;           
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.activeBackground};        
    border-left: 1px solid ${({ theme }) => theme.colors.line};
    padding-left: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.fontPrimary};    
   
    border-left: 1px solid ${({ theme }) => theme.colors.line};
  }
`;

export const LineNumbers = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  row-gap: 1rem;
  width: 5.2rem;
  padding-top: 1.7rem;
  text-align: right;
`;

export const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  padding-top: 1.7rem;
  padding-left: 4rem;

  row-gap: 1rem; 

  pre {
    min-height: 2.1rem;
  }
`