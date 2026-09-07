'use client'

import { createGlobalStyle } from 'styled-components'
import { media } from './breakpoints'

const GlobalStyles = createGlobalStyle`
  :root {
    /* CSS-side transition durations — kept in sync with src/components/motion/tokens.ts */
    --motion-fast: 150ms;
    --motion-base: 250ms;

    /*
     * Shell metrics. The layout grid, the mobile menu overlay and the editor
     * panes all read these, so the chrome only has to be resized in one place.
     */
    --shell-padding: 2.8rem;
    --header-height: 5.6rem;
    --footer-height: 5.2rem;

    /* What the middle grid row actually gets: viewport minus the chrome. */
    --content-pane-height: calc(
      100dvh - (var(--shell-padding) * 2) - var(--header-height) -
        var(--footer-height)
    );

    /* editor content height: viewport minus Header + TabBar + outer padding */
    --editor-content-height: calc(100vh - 206px);
  }

  ${media.tablet} {
    :root {
      --shell-padding: 1.6rem;
    }
  }

  ${media.mobile} {
    :root {
      --shell-padding: 0.8rem;
      --header-height: 4.8rem;
      --footer-height: 4.8rem;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-fira-code);
  }

  html {
    font-size: 62.5%;
  }

  .slide-in {
    animation-name: slideIn;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-10%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /*
   * Reduced-motion: kill the standalone CSS keyframe animations. Motion
   * components are handled by <MotionConfig reducedMotion="user"> and
   * useMotionPreset; ambient JS loops branch on useReducedMotion(). Per-selector
   * on purpose — never a blanket * { animation: none }.
   */
  @media (prefers-reduced-motion: reduce) {
    .slide-in {
      animation: none;
    }
  }
`

export default GlobalStyles
