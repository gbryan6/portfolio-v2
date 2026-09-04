import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  row-gap: 1.2rem;
  text-align: center;
  padding: 2.4rem;
`

export const ClearButton = styled.button`
  margin-top: 0.8rem;

  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.buttonColor};

  padding: 0.9rem 2rem;

  cursor: pointer;
  transition: border-color var(--motion-fast) ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`
