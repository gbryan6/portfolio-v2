import styled from 'styled-components'

export const Container = styled.label`
  width: fit-content;
  height: fit-content;

  cursor: pointer;

  input[type='checkbox'] {
    display: none;

    &:checked {
      + span {
        background-color: ${({ theme }) => theme.colors.fontPrimary};
        > svg {
          color: ${({ theme }) => theme.colors.activeTitle};
        }
      }
    }
  }

  span.checkmark {
    display: flex;

    justify-content: center;
    align-items: center;

    border-radius: 0.2rem;

    border: 1px solid ${({ theme }) => theme.colors.fontPrimary};

    width: 1.8rem;
    height: 1.8rem;

    background-color: ${({ theme }) => theme.colors.backgroundContent};
  }
`
