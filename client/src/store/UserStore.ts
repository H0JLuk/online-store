import { makeAutoObservable } from 'mobx'
import { IUser } from '../types/user'

class UserStore {
  private _isAuth: boolean = false
  private _loading: boolean = true
  private _user: IUser | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setIsAuth = (bool: boolean) => {
    this._isAuth = bool
  }

  setUser = (user: IUser | null) => {
    this._user = user
    this._loading = false

    this._isAuth = user ? true : false
  }

  get isAuth(): boolean {
    return this._isAuth
  }

  get user(): IUser | null {
    return this._user
  }

  get loading(): boolean {
    return this._loading
  }
}

export default new UserStore()
