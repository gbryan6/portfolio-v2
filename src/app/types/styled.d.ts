import 'styled-components';

export type Theme = {
  title: string,
  colors: {
    activeTitle: string,
    activeBackground: string,
    background: string,
    backgroundContent: string,
    buttonColor: string,
    fontPrimary: string,
    fontSecondary: string,
    line: string,
  },
  typograph: {
    head: string,
    subHead: string,
    pageTitle: string,
    body: string,
    label: string,
    snippet: string,
  }
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}