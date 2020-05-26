import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import ClothingCard from "../../components/card"

// import DiscountCarousel from '../../components/carousel'
import HeaderView from '../../components/header'
import Culture from "../culture/culture"
import ShopMap from "../map/map"

import logo from '../../assets/images/logo.png'
import "./main.less"
import "../../components/left-nav/index.less"
import ClothingDetail from "../detail/detail"

// const { Search } = Input;
const { Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;


const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1818861_yrxd09gtnpg.js',
    
  });

class Main extends Component {

    handleContent = () => {

    }
    render() {
        const path = this.props.location.pathname
        console.log("----------------path", path)
        console.log("------------router location", this.props.location)
        return (
            <div className="main-page-wrap">
                <Layout>
                    <Sider
                        style={{
                            height: '100%',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className="logo" />
                        <Link to='/main/home' className="left-nav-header">
                            <img src={logo} alt="logo" />
                            <h1>购物主页</h1>
                        </Link>

                        <Menu theme="compact"
                            mode="inline"
                            selectedKeys={[path]}
                            defaultOpenKeys={["man"]}
                            style={{ height: '100%' }}
                        >
                            {/* <Menu.Item key="/main/discount"
                            >
                                <Link to='/main/discount'>
                                    <Icon type="shopping" />
                                    <span>折扣专区</span>
                                </Link>
                            </Menu.Item> */}
                            <Menu.Item key="/main/map">
                                <Link to='/main/map'>
                                    <IconFont type="iconmap-shop" />
                                    <span>附近门店</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/main/culture"
                            >
                                <Link to='/main/culture'>
                                    <IconFont type="iconculture1" />
                                    <span>服装文化</span>
                                </Link>
                            </Menu.Item>
                            <SubMenu key="man"
                                title={
                                    <span>
                                        <IconFont type="iconboy" />
                                        <span>男士服装</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/main/man/jacket/5eb7b9a7f70c283f343efc1f">
                                    <Link to='/main/man/jacket/5eb7b9a7f70c283f343efc1f'>
                                        <IconFont type="iconman-t" />
                                        <span>上装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/main/man/pants/5eba861d948cc133e0f7e001">
                                    <Link to='/main/man/pants/5eba861d948cc133e0f7e001'>
                                        <IconFont type="iconman-pants" />
                                        <span>下装</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="woman"
                                title={
                                    <span>
                                        <IconFont type="icongirl" />
                                        <span>女士服装</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/main/woman/jacket/5eb7b9d0f70c283f343efc21">
                                    <Link to='/main/woman/jacket/5eb7b9d0f70c283f343efc21'>
                                        <IconFont type="iconwoman-tshit" />
                                        <span>上装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/main/woman/pants/5ebb8db739d9ef548870e465">
                                    <Link to='/main/woman/pants/5ebb8db739d9ef548870e465'>
                                        <IconFont type="iconwoman-skirt" />
                                        <span>下装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/main/woman/dress/5eb7b9bbf70c283f343efc20">
                                    <Link to='/main/woman/dress/5eb7b9bbf70c283f343efc20'>
                                        <IconFont type="iconwoman-dress" />
                                        <span>连衣裙</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        <HeaderView></HeaderView>
                        <Content style={{ margin: 20, backgroundColor: '#FFFFFF' }} className="main-content">

                            <Switch>
                                <Redirect exact from='/main' to='main/map' />
                                {/* <Route path='/main/discount' component={DiscountCarousel} /> */}
                                <Route path='/main/culture' component={Culture} />
                                <Route path='/main/map' component={ShopMap} />
                                <Route path='/main/man/jacket/5eb7b9a7f70c283f343efc1f' component={ClothingCard} />
                                <Route path='/main/man/pants/5eba861d948cc133e0f7e001' component={ClothingCard} />
                                <Route path='/main/woman/jacket/5eb7b9d0f70c283f343efc21' component={ClothingCard} />
                                <Route path='/main/woman/pants/5ebb8db739d9ef548870e465' component={ClothingCard} />
                                <Route path='/main/woman/dress/5eb7b9bbf70c283f343efc20' component={ClothingCard} />

                                {/* <Route component={NotFound} /> */}
                                <Route key="detail" path="/main/detail/:id" component={ClothingDetail} />,
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Anne.Zhang graduation project 2020</Footer>
                    </Layout>
                </Layout>

            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(Main)


                // export default connect(
//     state => ({user: state.user}),
//     {}
//   )(withRouter(LeftNav))