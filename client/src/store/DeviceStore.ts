import { makeAutoObservable } from 'mobx'
import { IDevice } from '../types/device'

class DeviceStore {
  private _devices: IDevice[] = []
  private _currentDevice: IDevice | null = null
  private _loading = false
  
  private _page = 1
  private _totalDevices = 0
  private _limit = 3

  constructor() {
    makeAutoObservable(this)
  }

  setDevices = (devices: IDevice[]) => (this._devices = devices)

  setCurrentDevice = (device: IDevice | null) => {
    this._currentDevice = device
    this._loading = false
  }

  setLoading = (loading: boolean) => (this._loading = loading)

  setPage = (page: number) => (this._page = page)

  setTotalDevices = (count: number) => (this._totalDevices = count)

  get devices() {
    return this._devices
  }

  get currentDevice() {
    return this._currentDevice
  }

  get loading() {
    return this._loading
  }

  get page() {
    return this._page
  }

  get totalDevices() {
    return this._totalDevices
  }

  get limit() {
    return this._limit
  }
}

export default new DeviceStore()
