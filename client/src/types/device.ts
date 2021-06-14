export interface IDevice {
  id: number
  name: string
  price: number
  rating: number
  img: string
  devicesInfo: IDeviceInfo[]
}

export interface IDeviceInfo {
  id: number
  title: string
  description: string
}

export interface IDeviceReqQueries {
  typeId?: number
  brandId?: number
  limit?: number
  page?: number
}
