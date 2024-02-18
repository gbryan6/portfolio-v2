'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
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
`

export default GlobalStyles
