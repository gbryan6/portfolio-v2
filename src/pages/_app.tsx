import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalCSS } from '../components/bosons/GlobalCSS'
import { theme } from '../components/bosons/DefaultTheme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalCSS />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}