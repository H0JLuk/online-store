import { AxiosResponse } from 'axios'
import { $authHost, $host } from '.'
import { IBrand } from '../types/brand'

export const createBrand = async (name: string) => {
  const { data }: AxiosResponse<IBrand> = await $authHost.post('api/brand', { name })
  return data
}

export const fetchBrands = async (page: number = 1, limit: number = 3, typeId?: number) => {
  const { data }: AxiosResponse<IBrand[]> = await $host.get('api/brand', { params: { page, limit, typeId } })
  return data
}
