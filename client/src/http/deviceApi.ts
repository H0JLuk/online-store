import { AxiosResponse } from 'axios'
import { $authHost, $host } from '.'
import { IDevice, IDeviceReqQueries } from '../types/device'
import { concatUrlWithQueries } from '../utils/helpers'

export const createDevice = async (formData: FormData) => {
  const { data }: AxiosResponse<IDevice> = await $authHost.post('api/device', formData)
  return data
}

export const fetchDevices = async (queries?: IDeviceReqQueries) => {
  const url = concatUrlWithQueries('api/device', queries)
  const { data }: AxiosResponse<IDevice[]> = await $host.get(url)
  return data
}

export const fetchOneDevice = async (id: number) => {
  const url = 'api/device/' + id
  const { data }: AxiosResponse<IDevice> = await $host.get(url)
  return data
}
