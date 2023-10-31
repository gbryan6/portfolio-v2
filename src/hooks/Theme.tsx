'use client'

import { dark, light } from '@/styles/theme'
import { createContext, useState, useEffect, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../app/types/styled'

type ThemeSwitcherData = {
  theme: Theme
  toggleTheme: () => void
}

const themeSwitcherContext = createContext({} as ThemeSwitcherData)

interface ThemeSwitcherProviderProps {
  children: React.ReactNode
}

export function ThemeSwitcherProvider({
  children,
}: ThemeSwitcherProviderProps) {
  const [theme, setTheme] = useState(dark)

  function toggleTheme() {
    setTheme(theme.title === 'dark' ? light : dark)
  }

  return (
    <themeSwitcherContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </themeSwitcherContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(themeSwitcherContext)

  if (!context) {
    throw new Error('No most be used this context without provider')
  }

  return context
}
