import React from 'react'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import DevicePage from './pages/DevicePage'
import Shop from './pages/Shop'
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts'

interface IRoute {
  path: string
  component: React.FC
}

export const adminRoutes: IRoute[] = [{ path: ADMIN_ROUTE, component: Admin }]

export const authRoutes: IRoute[] = [{ path: BASKET_ROUTE, component: Basket }]

export const unAuthRoutes: IRoute[] = [
  { path: LOGIN_ROUTE, component: Auth },
  { path: REGISTRATION_ROUTE, component: Auth },
]

export const publicRoutes: IRoute[] = [
  { path: SHOP_ROUTE, component: Shop },
  { path: DEVICE_ROUTE + '/:id', component: DevicePage },
]
