'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'motion/react'

/*
 * Covers the content row only — it starts under the header and stops above the
 * footer, so the chrome stays put while the menu is open (see the reference).
 */
export const Overlay = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: var(--header-height);
  bottom: var(--footer-height);
  z-index: 20;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.backgroundContent};
  overflow-y: auto;
  overscroll-behavior: contain;
`

export const SectionLabel = styled.div`
  display: flex;
  align-items: center;

  flex-shrink: 0;
  height: var(--header-height);
  padding-inline: 2.2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;

  flex-shrink: 0;
  min-height: var(--header-height);
  padding-inline: 2.2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  text-decoration: none;

  transition: background-color var(--motion-fast) ease;

  span {
    transition: color var(--motion-fast) ease;
  }

  &:hover,
  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.colors.activeBackground};

    span {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }
`

export const ThemeRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-shrink: 0;
  width: 100%;
  min-height: var(--header-height);
  padding-inline: 2.2rem;

  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background-color: transparent;

  cursor: pointer;
  transition: background-color var(--motion-fast) ease;

  .mobile-menu_theme-icon {
    display: inline-flex;

    > svg {
      width: 2rem;
      height: 2rem;
      color: ${({ theme }) => theme.colors.fontPrimary};
      transition: color var(--motion-fast) ease;
    }
  }

  &:hover,
  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.colors.activeBackground};

    span,
    .mobile-menu_theme-icon > svg {
      color: ${({ theme }) => theme.colors.activeTitle};
    }
  }
`
