import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styled'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

export function Header() {
  const { setAppTheme } = useContext(ThemeContext)

  return (
    <HeaderContainer>
      <button onClick={setAppTheme}>Mude o tema</button>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
