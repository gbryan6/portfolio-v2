"use client"

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-fira-code);

    transition: all 0.5s ease-in-out;
  }

  html {
    font-size: 62.5%;
  }
`;

export default GlobalStyles;