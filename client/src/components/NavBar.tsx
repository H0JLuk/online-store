import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import UserStore from '../store/UserStore'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'

const NavBar: React.FC = () => {
  const history = useHistory()
  const { isAuth, setUser } = UserStore

  const signOut = () => {
    setUser(null)
    history.push(LOGIN_ROUTE)
  }

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <NavLink to={SHOP_ROUTE}>
            <Navbar.Brand>КупиКупиКупи</Navbar.Brand>
          </NavLink>
          <Nav className='ml-auto'>
            {isAuth ? (
              <>
                <Button onClick={() => history.push(ADMIN_ROUTE)} variant='outline-light' className='mr-3'>
                  Админ панель
                </Button>
                <Button onClick={signOut} variant='outline-light'>
                  Выйти
                </Button>
              </>
            ) : (
              <Button onClick={() => history.push(LOGIN_ROUTE)} variant='outline-light'>
                Авторизация
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default observer(NavBar)
