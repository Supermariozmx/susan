import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Main from "./pages/main/main"
// import ClothingCard from './components/card'
import Register from './pages/register/register'
/*
应用的根组件
 */
export default class App extends Component {


  render() {
    return (
      <HashRouter>
        <Switch> {/*只匹配其中一个*/}
          {/* <Route path='/main/discount' exact component={Main}></Route> */}
          <Route path='/' exact component={Main}></Route>
          <Route path='/admin' exact component={Admin}></Route>
          <Route path='/register' exact component={Register}></Route>
          <Route path='/login'exact component={Login}></Route>
        </Switch>
      </HashRouter>
    )
  }
}