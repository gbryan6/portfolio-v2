'use client'

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 4.8rem;
`
export const Content = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.line };
  background-color: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 0.8rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5.6rem 1fr 4.8rem;
`