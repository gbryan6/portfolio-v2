import { Theme } from '@/app/types/styled'

/*
 * Fluid scale. Every `clamp()` maxes out at the original desktop value, so wide
 * viewports render exactly as before — only narrow ones scale down. This is why
 * pages never override a font-size in a media query.
 */
const typhograph = {
  head: 'clamp(4.2rem, 7.5vw, 62px)',
  subHead: 'clamp(2.2rem, 4vw, 32px)',
  pageTitle: 'clamp(2rem, 3vw, 26px)',
  body: 'clamp(1.5rem, 2vw, 18px)',
  label: 'clamp(1.4rem, 1.6vw, 16px)',
  snippet: '14px',
}

const dark: Theme = {
  title: 'dark',
  colors: {
    activeTitle: '#FFFFFF',
    activeBackground: '#011E35',
    backgroundContent: '#011627',
    background: '#010C15',
    buttonColor: '#1C2B3A',
    fontPrimary: '#607B96',
    fontSecondary: '#E5E9F0',
    line: '#1E2D3D',
    accent: '#43D9AD',
    highlight: '#FEA55F',
    codeEntity: '#4D5BCE',
    codeString: '#7FB0FF',
  },
  typograph: typhograph,
}

const light: Theme = {
  title: 'light',
  colors: {
    activeTitle: '#000000',
    activeBackground: '#E8E8E8',
    background: '#616161',
    backgroundContent: '#FFFFFF',
    buttonColor: '#D1D5DB',
    fontPrimary: '#607B96',
    fontSecondary: '#505A64',
    line: '#607B96',
    accent: '#43D9AD',
    highlight: '#FEA55F',
    codeEntity: '#3B3F9E',
    codeString: '#2F6BD6',
  },
  typograph: typhograph,
}

export { dark, light }
