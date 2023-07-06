import { ReactNode, createContext, useState } from 'react'

interface ThemeContextType {
  darkThemeApp: boolean
  setAppTheme: () => void
}

interface ThemeContextProviderProps {
  children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [darkThemeApp, setDarkTheme] = useState<boolean>(false)

  function setAppTheme() {
    setDarkTheme((prevTheme) => !prevTheme)
    console.log('context', darkThemeApp)
  }

  return (
    <ThemeContext.Provider value={{ darkThemeApp, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
