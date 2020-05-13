import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Main from "./pages/main/main"
// import ClothingCard from './components/card'
import Register from './pages/register/register'
// import Culture from "./pages/culture/culture"
/*
应用的根组件
 */
export default class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <Switch> {/*只匹配其中一个*/}
          {/* <Route path='/main/discount' exact component={Main}></Route> */}
          <Redirect exact from='/' to='/main' />
          <Route path='/admin' component={Admin}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/main' component={Main}></Route>
          {/* <Route key="detail"  path="/product/detail/:id([a-zA-Z0-9\\-]{36})" component={Culture} />, */}
        </Switch>
      </BrowserRouter>
    )
  }
}