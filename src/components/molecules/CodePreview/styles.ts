import styled from 'styled-components'
import type { Theme } from '@/app/types/styled'

export const Container = styled.div`
  display: flex;

  width: 100%;
  min-width: 0;
  height: 100%;

  /* long lines scroll inside the pane, never the page */
  overflow: auto;

  background-color: ${({ theme }) => theme.colors.activeBackground};
  transition: background-color var(--motion-base) ease;

  &::-webkit-scrollbar {
    width: 1.2rem;
    height: 1.2rem;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.activeBackground};
    border-left: 1px solid ${({ theme }) => theme.colors.line};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.fontPrimary};
    border-left: 1px solid ${({ theme }) => theme.colors.line};
  }
`

export const LineNumbers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  flex-shrink: 0;
  width: 5.2rem;
  padding-top: 2.4rem;
  row-gap: 1rem;

  user-select: none;
`

export const Code = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 2.4rem 2.4rem 2.4rem 3.2rem;
  padding-top: 2.4rem;
  row-gap: 1rem;

  pre {
    min-height: 2.1rem;
    white-space: pre;
  }
`

export const Token = styled.span<{ $color: keyof Theme['colors'] }>`
  color: ${({ theme, $color }) => theme.colors[$color]};
  transition: color var(--motion-base) ease;
`
