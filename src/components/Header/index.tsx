import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from 'phosphor-react'

import { HeaderContainer } from './styles'
import LogoIgnite from '../../assets/Logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="logo" />
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
