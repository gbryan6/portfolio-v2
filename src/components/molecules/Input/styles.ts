'use client'

import styled, { css } from 'styled-components'

interface IInputStylesProps {
  $invalid?: boolean
}

const field = css<IInputStylesProps>`
  width: 100%;

  padding: 1rem 1.2rem;

  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.highlight : theme.colors.line};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.activeBackground};
  color: ${({ theme }) => theme.colors.fontSecondary};
  caret-color: ${({ theme }) => theme.colors.accent};

  font-size: ${({ theme }) => theme.typograph.label};
  line-height: 1.5;

  transition: border-color var(--motion-fast) ease,
    box-shadow var(--motion-fast) ease, background-color var(--motion-base) ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.fontPrimary};
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, $invalid }) =>
      $invalid ? theme.colors.highlight : theme.colors.fontPrimary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $invalid }) =>
      $invalid ? theme.colors.highlight : theme.colors.accent};
    box-shadow: 0 0 0 1px
      ${({ theme, $invalid }) =>
        $invalid ? theme.colors.highlight : theme.colors.accent};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
  width: 100%;

  /* Reserved so a message appearing never shifts the fields below it. */
  .input_error {
    min-height: 1.8rem;
  }
`

export const Field = styled.input<IInputStylesProps>`
  ${field}
`

export const TextArea = styled.textarea<IInputStylesProps>`
  ${field}

  resize: vertical;
  min-height: 12rem;
`
