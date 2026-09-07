import styled from 'styled-components'
import { motion } from 'motion/react'
import { media } from '@/styles/breakpoints'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
  height: 100%;

  padding: 3.2rem 2.4rem;
  overflow: auto;

  .contact-form_shell {
    width: 100%;
    max-width: 38rem;
  }

  /*
   * Stacked: the page owns the scrolling, so the form stops centring itself in
   * a fixed box and just flows from the top of its row.
   */
  ${media.tablet} {
    align-items: flex-start;
    height: auto;
    overflow: visible;
  }

  ${media.mobile} {
    padding: 2.4rem 1.6rem 3.2rem;
  }
`

export const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;

  /* <Stagger> renders one wrapper around the fields — it carries their spacing. */
  .contact-form_fields {
    display: flex;
    flex-direction: column;
    row-gap: 0.4rem;
  }

  /* Off-screen rather than display:none — bots skip fields they can't focus. */
  .contact-form_honeypot {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  .contact-form_status {
    min-height: 2rem;
  }
`

export const Sent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  padding: 2rem;

  border: 1px solid ${({ theme }) => theme.colors.line};
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.activeBackground};

  .contact-form_sent-lines {
    display: flex;
    flex-direction: column;
    row-gap: 0.6rem;
  }

  .contact-form_prompt {
    margin-right: 0.6rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`
