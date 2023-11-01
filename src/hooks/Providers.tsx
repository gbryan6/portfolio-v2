'use client'

import StyledComponentsRegistry from '@/app/lib/registry'
import { ThemeSwitcherProvider } from './Theme'
import GlobalStyles from '@/styles/GlobalStyles'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <ThemeSwitcherProvider>{children}</ThemeSwitcherProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers
