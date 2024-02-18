'use client'

import StyledComponentsRegistry from '@/app/lib/registry'
import { ThemeSwitcherProvider } from './Theme'
import { TabsProvider } from './Tabs'
import GlobalStyles from '@/styles/GlobalStyles'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <ThemeSwitcherProvider>
        <TabsProvider>
        {children}
        </TabsProvider>
      </ThemeSwitcherProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers
