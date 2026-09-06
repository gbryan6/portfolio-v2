import styled from 'styled-components'

export const Container = styled.span`
  position: relative;

  display: inline-flex;
  flex-shrink: 0;

  width: 1.8rem;
  height: 1.8rem;

  /*
   * The input stays in the DOM and focusable — hiding it with display:none
   * would take the control off the keyboard entirely. It sits invisibly on top
   * of the drawn box so a direct click hits the real control exactly once.
   */
  input[type='checkbox'] {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;
    margin: 0;

    opacity: 0;
    cursor: pointer;

    &:checked + span.checkmark {
      background-color: ${({ theme }) => theme.colors.accent};
      border-color: ${({ theme }) => theme.colors.accent};

      svg {
        color: ${({ theme }) => theme.colors.activeTitle};
      }
    }

    &:focus-visible + span.checkmark {
      outline: 1px solid ${({ theme }) => theme.colors.accent};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  span.checkmark {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    border-radius: 0.2rem;
    border: 1px solid ${({ theme }) => theme.colors.fontPrimary};

    background-color: ${({ theme }) => theme.colors.backgroundContent};

    transition: background-color var(--motion-fast) ease,
      border-color var(--motion-fast) ease;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`
