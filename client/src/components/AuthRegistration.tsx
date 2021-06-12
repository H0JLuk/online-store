import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'

interface IProps {
  onSubmit: (email: string, password: string, confirmPassword: string) => void
}

const AuthRegistration: React.FC<IProps> = ({ onSubmit }) => {
  const [data, setData] = useState({ email: '', password: '', confirmPassword: '' })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const { email, password, confirmPassword } = data
    onSubmit(email, password, confirmPassword)
  }

  return (
    <Form onSubmit={handleSubmit} className='d-flex flex-column'>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={data.email}
          onChange={handleChange}
          name='email'
          type='email'
          autoComplete='false'
          placeholder='Enter email'
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={data.password}
          onChange={handleChange}
          name='password'
          type='password'
          placeholder='Enter password'
          autoComplete='false'
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          value={data.confirmPassword}
          onChange={handleChange}
          name='confirmPassword'
          type='password'
          placeholder='Confirm password'
          autoComplete='false'
        />
      </Form.Group>
      <Row className='mr-0 ml-0 d-flex justify-content-between align-items-center'>
        <div>
          Have account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
        </div>
        <Button variant='outline-success' type='submit'>
          Submit
        </Button>
      </Row>
    </Form>
  )
}

export default AuthRegistration
