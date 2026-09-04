'use client'

import StyledComponentsRegistry from '@/app/lib/registry'
import { ThemeSwitcherProvider, ThemeName } from './Theme'
import { TabsProvider } from './Tabs'
import GlobalStyles from '@/styles/GlobalStyles'
import { MotionProvider } from '@/components/motion'

const Providers = ({
  children,
  initialThemeName,
}: {
  children: React.ReactNode
  initialThemeName?: ThemeName
}) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <MotionProvider>
        <ThemeSwitcherProvider initialThemeName={initialThemeName}>
          <TabsProvider>{children}</TabsProvider>
        </ThemeSwitcherProvider>
      </MotionProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers
