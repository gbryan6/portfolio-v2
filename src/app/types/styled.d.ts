import 'styled-components';

export type Theme = {
  title: string,
  colors: {
    activeTitle: string,
    background: string,
    buttonColor: string,
    fontPrimary: string,
    fontSecondary: string,
    line: string,
  }
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}