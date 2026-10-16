import { Coffee, Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styled'
import { ThemeSettings } from '../settings/ThemeSettings'

export function Header() {
  return (
    <HeaderContainer>
      <NavLink className="brand" to="/" aria-label="Pomodoro home">
        <Coffee size={26} weight="duotone" />
        <span>Pomodoro</span>
      </NavLink>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
          <span>Focus</span>
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
          <span>History</span>
        </NavLink>
      </nav>
      <ThemeSettings />
    </HeaderContainer>
  )
}
