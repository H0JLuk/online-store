import { makeAutoObservable } from 'mobx'
import { IBrand } from '../types/brand'

class BrandStore {
  private _brands: IBrand[] = []
  private _currentBrand: IBrand | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setBrands = (brands: IBrand[]) => {
    this._brands = brands
  }

  addBrand = (brand: IBrand) => {
    this._brands.push(brand)
  }

  setCurrentBrand = (brand: IBrand) => {
    this._currentBrand = brand
  }

  get brands() {
    return this._brands
  }

  get currentBrand() {
    return this._currentBrand
  }
}

export default new BrandStore()
