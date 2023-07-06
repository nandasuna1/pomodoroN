import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './styles/theme/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './context/CyclesContext'
import { ThemeContext } from './context/ThemeContext'
import { useContext } from 'react'

export function AppContent() {
  const { darkThemeApp } = useContext(ThemeContext)
  return (
    <ThemeProvider theme={darkThemeApp ? darkTheme : lightTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
