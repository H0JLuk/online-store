import { AxiosResponse } from 'axios'
import { $authHost, $host } from '.'
import { IDevice, IDeviceReqQueries } from '../types/device'

export const createDevice = async (formData: FormData) => {
  const { data }: AxiosResponse<IDevice> = await $authHost.post('api/device', formData)
  return data
}

export const fetchDevices = async (queries?: IDeviceReqQueries) => {
  const { data }: AxiosResponse<{ rows: IDevice[]; count: number }> = await $host.get('api/device', { params: queries })
  return data
}

export const fetchOneDevice = async (id: number) => {
  const url = 'api/device/' + id
  const { data }: AxiosResponse<IDevice> = await $host.get(url)
  return data
}
