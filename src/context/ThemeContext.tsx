import { ReactNode, createContext, useEffect, useState } from 'react'
import { loadSettings, saveSettings } from '../utils/persistence'

interface ThemeContextType {
  darkThemeApp: boolean
  setAppTheme: () => void
}

interface ThemeContextProviderProps {
  children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [darkThemeApp, setDarkTheme] = useState(
    () => loadSettings().theme === 'dark',
  )

  useEffect(() => {
    saveSettings({ ...loadSettings(), theme: darkThemeApp ? 'dark' : 'light' })
  }, [darkThemeApp])

  function setAppTheme() {
    setDarkTheme((prevTheme) => !prevTheme)
  }

  return (
    <ThemeContext.Provider value={{ darkThemeApp, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
