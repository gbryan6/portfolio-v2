import { Theme } from '@/app/types/styled'

const typhograph = {
  head: '62px',
  subhead: '32px',
  body: '18px',
  label: '16px',
  snippet: '14px',
}

const dark: Theme = {
  title: 'dark',
  colors: {
    activeTitle: '#FFFFFF',
    backgroundContent: '#011627',
    background: '#010C15',
    buttonColor: '#1C2B3A',
    fontPrimary: '#607B96',
    fontSecondary: '#E5E9F0',
    line: '#1E2D3D',
  },
  typograph: typhograph,
}

const light: Theme = {
  title: 'light',
  colors: {
    activeTitle: '#000000',
    background: '#616161',
    backgroundContent: '#FFFFFF',
    buttonColor: '#D1D5DB',
    fontPrimary: '#607B96',
    fontSecondary: '#505A64',
    line: '#607B96',
  },
  typograph: typhograph,
}

export { dark, light }
