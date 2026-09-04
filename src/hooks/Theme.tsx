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
    // Persiste só o nome do tema — nunca o objeto serializado.
    // Guardar o objeto inteiro "congela" a paleta: quando novas cores são
    // adicionadas em theme.ts, visitantes com valor antigo no localStorage
    // recebem tokens `undefined` no primeiro carregamento.
    localStorage.setItem('theme', targetTheme.title)
  }

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (!stored) return

    let title = stored
    try {
      // tolera valores legados que guardaram o objeto de tema inteiro
      const parsed = JSON.parse(stored)
      title = parsed?.title ?? stored
    } catch {
      // valor já é o nome do tema em texto puro
    }

    setTheme(title === 'light' ? light : dark)
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
