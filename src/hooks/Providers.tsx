'use client'

import StyledComponentsRegistry from '@/app/lib/registry'
import { ThemeSwitcherProvider } from './Theme'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <ThemeSwitcherProvider>{children}</ThemeSwitcherProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers
