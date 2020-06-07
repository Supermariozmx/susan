import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import OrderHome from './order-home'
import OrderUpdate from './order-update'
import OrderDetail from './order-detail'

import './order.less'


/*
商品路由
 */
export default class Order extends Component {
  render() {
    return (
      <Switch>
        <Route path='/admin/order' component={OrderHome} exact /> {/*路径完全匹配*/}
        <Route path='/admin/order/update' component={OrderUpdate} />
        <Route path='/admin/order/detail' component={OrderDetail} />
        <Redirect to='/admin/order' />
      </Switch>
    )
  }
}