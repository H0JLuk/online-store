import React, { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'

import AuthLogin from '../components/AuthLogin'
import AuthRegistration from '../components/AuthRegistration'
import { login, registration, IDecodedUser } from '../http/userAPI'
import UserStore from '../store/UserStore'
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'

function Auth() {
  const location = useLocation()
  const history = useHistory()
  const isLogin = location.pathname === LOGIN_ROUTE

  const { user, setUser } = UserStore

  useEffect(() => {
    user && history.push(SHOP_ROUTE)
  }, [user, history])

  const handleSubmit = async (email: string, password: string, confirmEmail?: string) => {
    try {
      let data: IDecodedUser = isLogin ? await login(email, password) : await registration(email, password)

      const { userId: id, role } = data
      setUser({ id, email, role })
      history.push(SHOP_ROUTE)
    } catch (error) {
      alert(`${error.response.data.message}`)
    }
  }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className='p-5'>
        <h2>{isLogin ? 'Authorization' : 'Registration'}</h2>

        {isLogin ? <AuthLogin onSubmit={handleSubmit} /> : <AuthRegistration onSubmit={handleSubmit} />}
      </Card>
    </Container>
  )
}

export default Auth
