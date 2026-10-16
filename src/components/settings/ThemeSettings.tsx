import { useContext } from 'react'
import { Moon, Sun } from 'phosphor-react'
import { ThemeContext } from '../../context/ThemeContext'

export function ThemeSettings() {
  const { darkThemeApp, setAppTheme } = useContext(ThemeContext)

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={setAppTheme}
      aria-label={`Switch to ${darkThemeApp ? 'coffee light' : 'dark'} theme`}
    >
      {darkThemeApp ? <Sun size={21} /> : <Moon size={21} />}
    </button>
  )
}
