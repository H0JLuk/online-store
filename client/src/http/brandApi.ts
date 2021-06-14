import { AxiosResponse } from 'axios'
import { $authHost, $host } from '.'
import { IBrand } from '../types/brand'

export const createBrand = async (name: string, types: number[]) => {
  const { data }: AxiosResponse<IBrand> = await $authHost.post('api/brand', { name, types })
  return data
}

export const fetchBrands = async (typeId?: number) => {
  const { data }: AxiosResponse<IBrand[]> = await $host.get('api/brand', { params: { typeId } })
  return data
}
