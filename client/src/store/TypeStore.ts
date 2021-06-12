import { makeAutoObservable } from 'mobx'
import { IType } from '../types/type'

class TypeStore {
  private _types: IType[] = []
  private _currentType: IType | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setTypes = (types: IType[]) => {
    this._types = types
  }

  addType = (type: IType) => {
    this._types.push(type)
  }

  setCurrentType = (type: IType) => {
    this._currentType = type
  }

  get types() {
    return this._types
  }

  get currentType() {
    return this._currentType
  }
}

export default new TypeStore()
