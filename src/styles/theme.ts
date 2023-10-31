import { Theme } from '@/app/types/styled'

const dark: Theme = {
  title: 'dark',
  colors: {
    activeTitle: '#FFFFFF',
    background: '#1E2D3D',
    buttonColor: '#1C2B3A',
    fontPrimary: '#607B96',
    fontSecondary: '#E5E9F0',
    line: '#1E2D3D',
  },
}

const light: Theme = {
  title: 'light',
  colors: {
    activeTitle: '#000000',
    background: '#FFFFFF',
    buttonColor: '#D1D5DB',
    fontPrimary: '#607B96',
    fontSecondary: '#505A64',
    line: '#607B96',
  },
}

export { dark, light }
