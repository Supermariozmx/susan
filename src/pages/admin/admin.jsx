import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import LeftNav from '../../components/left-nav'
import HeaderView from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'
import Order from '../order/order'

const { Footer, Sider, Content } = Layout

/*
后台管理的路由组件
 */
class Admin extends Component {
  render() {
    const user = this.props.user
    // 如果内存没有存储user ==> 当前没有登陆
    if (!user || !user._id) {
      // 自动跳转到登陆(在render()中)
      return <Redirect to='/login' />
    }
    return (
      <Layout>
        <Sider
        >
          <LeftNav />
        </Sider>
        <Layout>
          <HeaderView>Header</HeaderView>
          <Content style={{ margin: 20, backgroundColor: '#fff' }}>
            <Switch>
              <Redirect exact from='/admin' to='admin/home' />
              <Route path='/admin/category' component={Category} />
              <Route path='/admin/product' component={Product} />
              <Route path='/admin/role' component={Role} />
              <Route path='/admin/user' component={User} />
              <Route path='/admin/charts/bar' component={Bar} />
              <Route path='/admin/charts/line' component={Line} />
              <Route path='/admin/charts/pie' component={Pie} />
              <Route path="/admin/order" component={Order} />
              <Route path='/admin/home' component={Home} />
              <Route component={NotFound} /> {/*上面没有一个匹配, 直接显示*/}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}


export default connect(
  state => ({ user: state.user }),
  {}
)(Admin)