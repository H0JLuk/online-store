import { AxiosResponse } from 'axios'
import jwt_decode from 'jwt-decode'
import { $authHost, $host } from '.'

export interface IDecodedUser {
  userId: number
  email: string
  role: string
}

export const registration = async (email: string, password: string) => {
  const response: AxiosResponse<{ token: string }> = await $host.post('api/user/registration', {
    email,
    password,
    role: 'admin',
  })
  localStorage.setItem('token', response.data.token)

  return jwt_decode<IDecodedUser>(response.data.token)
}

export const login = async (email: string, password: string) => {
  const response: AxiosResponse<{ token: string }> = await $host.post('api/user/login', { email, password })
  localStorage.setItem('token', response.data.token)
  return jwt_decode<IDecodedUser>(response.data.token)
}

export const check = async () => {
  const response: AxiosResponse<{ token: string }> = await $authHost.get('api/user/check')
  localStorage.setItem('token', response.data.token)
  return jwt_decode<IDecodedUser>(response.data.token)
}
