'use client'

import { dark, light } from '@/styles/theme'
import { createContext, useState, useEffect, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../app/types/styled'

const INITIAL_STATE = dark

type ThemeSwitcherData = {
  INITIAL_STATE: Theme
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
  const [theme, setTheme] = useState(INITIAL_STATE)

  function toggleTheme() {
    const targetTheme = theme.title === 'dark' ? light : dark
    setTheme(targetTheme)
    localStorage.setItem('theme', JSON.stringify(targetTheme))
  }

  useEffect(() => {
    const storageValue = localStorage.getItem('theme')
    if (storageValue) {
      setTheme(JSON.parse(storageValue))
    } else {
      setTheme(INITIAL_STATE)
    }
  }, [])

  return (
    <themeSwitcherContext.Provider
      value={{
        INITIAL_STATE,
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
