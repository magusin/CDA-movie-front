import React from 'react'
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

function Header() {
  const location = useLocation()
  const active = location.pathname
  return (
    <Navbar>
      <NavbarBrand href="/">Accueil</NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink
            href="/movie"
            className={active === '/movie' ? 'bg-primary text-white-50' : ''}
          >
            Movie
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header
