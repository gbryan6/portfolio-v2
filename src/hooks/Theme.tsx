'use client'

import { dark, light } from '@/styles/theme'
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../app/types/styled'

export type ThemeName = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'theme'
const THEMES: Record<ThemeName, Theme> = { dark, light }

type ThemeSwitcherData = {
  theme: Theme
  toggleTheme: () => void
}

const themeSwitcherContext = createContext({} as ThemeSwitcherData)

interface ThemeSwitcherProviderProps {
  children: React.ReactNode
  /** Seeded from the `theme` cookie in the root layout so SSR paints the right palette. */
  initialThemeName?: ThemeName
}

function readStoredName(): ThemeName | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (!raw) return null
    if (raw === 'dark' || raw === 'light') return raw
    // tolerate legacy values that stored the whole serialized theme object
    const parsed = JSON.parse(raw)
    return parsed?.title === 'light' ? 'light' : 'dark'
  } catch {
    return null
  }
}

export function ThemeSwitcherProvider({
  children,
  initialThemeName = 'dark',
}: ThemeSwitcherProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(initialThemeName)

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => {
      const next: ThemeName = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        /* private mode / storage disabled — cookie below still carries it */
      }
      // cookie so the server renders the right theme on the next load (no flash)
      document.cookie = `${THEME_STORAGE_KEY}=${next};path=/;max-age=31536000;samesite=lax`
      return next
    })
  }, [])

  // reconcile with the client's stored preference if the SSR seed was missing or stale
  useEffect(() => {
    const stored = readStoredName()
    if (stored && stored !== themeName) setThemeName(stored)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const theme = THEMES[themeName]
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <themeSwitcherContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </themeSwitcherContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(themeSwitcherContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeSwitcherProvider')
  }

  return context
}
