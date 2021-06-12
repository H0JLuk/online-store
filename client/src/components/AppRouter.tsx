import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes, unAuthRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'

import UserStore from '../store/UserStore'
import { observer } from 'mobx-react-lite'

const AppRouter: React.FC = () => {
  const { isAuth, user } = UserStore

  const renderFn = ({ path, component }: { path: string; component: React.FC }) => (
    <Route path={path} component={component} key={path} exact />
  )

  return (
    <Switch>
      {isAuth ? authRoutes.map(renderFn) : unAuthRoutes.map(renderFn)}
      {isAuth && user?.role === 'admin' && adminRoutes.map(renderFn)}
      {publicRoutes.map(renderFn)}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  )
}

export default observer(AppRouter)
