import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { REGISTRATION_ROUTE } from '../utils/consts'

interface IProps {
  onSubmit: (email: string, password: string) => void
}

const AuthLogin: React.FC<IProps> = ({ onSubmit }) => {
  const [data, setData] = useState({ email: '', password: '' })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const { email, password } = data
    onSubmit(email, password)
  }

  return (
    <Form onSubmit={handleSubmit} className='d-flex flex-column'>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control value={data.email} onChange={handleChange} name='email' type='email' placeholder='Enter email' />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={data.password}
          onChange={handleChange}
          name='password'
          type='password'
          placeholder='Enter password'
        />
      </Form.Group>
      <Row className='mr-0 ml-0 d-flex justify-content-between align-items-center'>
        <div>
          Haven't account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
        </div>
        <Button variant='outline-success' type='submit'>
          Submit
        </Button>
      </Row>
    </Form>
  )
}

export default AuthLogin
