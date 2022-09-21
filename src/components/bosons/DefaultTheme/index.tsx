import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    background: '#010C15',
    primary700: '#01080E',
    primary400: '#011627',
    primary300: '#011221',
    gray: '#607B96',
    green: '#3C9D93',
    purple: '#4D5BCE',
    white: '#FFFFFF',
    orange: '#FEA55F',
    ciano: '#43D9AD',
    red300: '#E99287',
    lilac: '#C98BDF',
    line: '#1E2D3D',
  },
  breakPoints: {
    up: (value: number): string | undefined => {
      if (typeof value === 'number') {
        return `@media screen and (min-width: ${value}px `;
      }
    },
    down: (value: number): string | undefined => {
      if (typeof value === 'number') {
        return `@media screen and (max-width: ${value}px)`;
      }
    },
    between: (start: number, end: number): string | undefined => {
      if (typeof start === 'number' && typeof end === 'number') {
        return `@media screen and (min-width: ${start}px) and (max-width: ${end}px)`;
      }
    },
  },
  typography: {
    headline: '62px',
    subheadline: '32px',
    body: '18px',
    labels: '16px',
    codeSnippet: '14px',
  },
};

export { theme };
