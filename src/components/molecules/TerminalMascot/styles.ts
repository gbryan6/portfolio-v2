'use client'

import styled, { keyframes } from 'styled-components'
import { media } from '@/styles/breakpoints'

// Simple, self-contained loop → CSS keyframes (design-system §6.3).
const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 99% { opacity: 0; }
  100% { opacity: 1; }
`

export const Container = styled.div`
  margin: auto 0.8rem 0.8rem;
  flex-shrink: 0;
  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.colors.activeBackground};

  /*
   * Hidden once the layout stacks: margin-top:auto has no slack to push
   * against, so the mascot would wedge itself between the accordions and the
   * file content instead of sitting at the foot of the sidebar.
   */
  ${media.tablet} {
    display: none;
  }

  .terminal-mascot_bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  }

  .terminal-mascot_bar > span:last-child {
    margin-left: 0.4rem;
  }

  .terminal-mascot_dot {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.colors.line};
  }
  .terminal-mascot_dot:first-child {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
  .terminal-mascot_dot:nth-child(2) {
    background-color: ${({ theme }) => theme.colors.accent};
  }

  .terminal-mascot_body {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 1rem;
  }

  .terminal-mascot_lines {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
    overflow: hidden;
  }
  .terminal-mascot_lines p {
    white-space: nowrap;
  }

  .terminal-mascot_prompt {
    margin-right: 0.6rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  .terminal-mascot_cursor {
    display: inline-block;
    width: 0.7rem;
    height: 1.3rem;
    margin-left: 0.3rem;
    vertical-align: text-bottom;
    background-color: ${({ theme }) => theme.colors.accent};
    animation: ${blink} 1.1s steps(1, end) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .terminal-mascot_cursor {
      animation: none;
      opacity: 1;
    }
  }
`
