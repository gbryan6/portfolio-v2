'use client'

import styled from 'styled-components'
import { media } from '@/styles/breakpoints'

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  .left {
    display: flex;
    height: 100%;

    a:last-child {
      border-right: 1px solid ${({ theme }) => theme.colors.line};
    }
  }

  .left > p {
    display: flex;
    align-items: center;
    padding-inline: 1.8rem;
    white-space: nowrap;
  }

  .right {
    display: flex;
    height: 100%;
  }

  /* The credit line is the first thing to go — the social cells earn the room. */
  ${media.tablet} {
    .right {
      display: none;
    }
  }

  ${media.mobile} {
    .left {
      width: 100%;
    }

    .left > p {
      flex: 1;
      padding-inline: 1.4rem;
    }
  }
`
