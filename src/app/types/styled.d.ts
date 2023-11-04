import 'styled-components';

export type Theme = {
  title: string,
  colors: {
    activeTitle: string,
    background: string,
    backgroundContent: string,
    buttonColor: string,
    fontPrimary: string,
    fontSecondary: string,
    line: string,
  },
  typograph: {
    head: string,
    subhead: string,
    body: string,
    label: string,
    snippet: string,
  }
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}