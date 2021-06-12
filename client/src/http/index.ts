import axios, { AxiosRequestConfig } from 'axios'

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = (config: AxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
