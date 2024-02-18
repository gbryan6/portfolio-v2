import styled from 'styled-components';

export const Container = styled.ul`
  grid-area: TB;

  display: flex;
  align-items: center;
  
  width: 100%;
  height: 100%;

  text-decoration: none;

  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

`