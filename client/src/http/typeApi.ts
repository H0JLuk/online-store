import { AxiosResponse } from 'axios'
import { $authHost, $host } from '.'
import { IType } from '../types/type'

export const createType = async (name: string) => {
  const { data }: AxiosResponse<IType> = await $authHost.post('api/type', { name })
  return data
}

export const fetchTypes = async () => {
  const { data }: AxiosResponse<IType[]> = await $host.get('api/type')
  return data
}
