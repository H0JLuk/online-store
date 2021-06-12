import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/userAPI'
import UserStore from './store/UserStore'

const App = () => {
  const { setUser, loading } = UserStore

  useEffect(() => {
    check()
      .then((data) => {
        const { userId: id, email, role } = data
        setUser({ id, email, role })
      })
      .catch(() => {
        setUser(null)
      })
  }, [setUser])

  if (loading) {
    return (
      <Row className='justify-content-center align-items-center' style={{ height: '100vh' }}>
        <Spinner animation='border' />
      </Row>
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default observer(App)
