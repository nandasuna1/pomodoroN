import { ThemeContextProvider } from './context/ThemeContext'
import { AppContent } from './AppContent'

export function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  )
}
