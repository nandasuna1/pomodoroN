import { ThemeContextProvider } from './context/ThemeContext'
import { AppContent } from './Appcontent'

export function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  )
}
