import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import ClothingCard from "../../components/card"
import {
    NotificationOutlined,
} from '@ant-design/icons';

import DiscountCarousel from '../../components/carousel'
import HeaderView from '../../components/header'
// import Admin from "../admin/admin"
import Test from "../test/test"

import logo from '../../assets/images/logo.png'
import "./main.less"
import "../../components/left-nav/index.less"

// const { Search } = Input;
const { Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

class Main extends Component {

    handleContent = () => {

    }
    render() {
        const path = this.props.location.pathname
        console.log("----------------path", path)
        return (
            <div className="main-page-wrap">
                <Layout>
                    <Sider
                        style={{
                            // overflow: 'auto',
                            height: '100%',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className="logo" />
                        {/* <Header>

                        </Header> */}
                        <Link to='/' className="left-nav-header">
                            <img src={logo} alt="logo" />
                            <h1>购物主页</h1>
                        </Link>

                        <Menu theme="dark"
                            mode="inline"
                            selectedKeys={[path]}
                            defaultOpenKeys={["man"]}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="/discount"
                            >
                                <Link to='/discount'>
                                    <Icon type="shopping" />
                                    <span>折扣专区</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/new">
                                <Link to='/new'>
                                    <Icon type="new" />
                                    <span>最新上架</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/map">
                                <Link to='/map'>
                                    <Icon type="search" />
                                    <span>附近门店</span>
                                </Link>
                            </Menu.Item>
                            <SubMenu key="man"
                                title={
                                    <span>
                                        <Icon type="man" />
                                        <span>男士服装</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/man/jacket">
                                    <Link to='/man/jacket'>
                                        <Icon type="man" />
                                        <span>上装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/man/pants">
                                    <Link to='/man/pants'>
                                        <Icon type="man" />
                                        <span>下装</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="woman"
                                title={
                                    <span>
                                        <Icon type="woman" />
                                        <span>女士服装</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/woman/jacket">
                                    <Link to='/woman/jacket'>
                                        <Icon type="woman" />
                                        <span>上装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/woman/pants">
                                    <Link to='/woman/pants'>
                                        <Icon type="woman" />
                                        <span>下装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/woman/dress">
                                    <Link to='/woman/dress'>
                                        <Icon type="woman" />
                                        <span>连衣裙</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="children" icon={<NotificationOutlined />} title="儿童服装">
                                <Menu.Item key="9">
                                    <Link to='/children/jacket'>
                                        <Icon type="children" />
                                        <span>上装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="10">
                                    <Link to='/children/pants'>
                                        <Icon type="children" />
                                        <span>下装</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="11">
                                    <Link to='/children/dress'>
                                        <Icon type="children" />
                                        <span>连衣裙</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>

                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        {/* <Header className="site-layout-background" style={{ padding: 0 }}>
                            <div className="main-header-action">
                                <Search
                                    className="action-item"
                                    placeholder="input search text"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 200 }}
                                />
                                <Button type="dashed" className="action-item">
                                    <Link to='/register'>
                                        <span>注册</span>
                                    </Link>
                                </Button>
                                <Button type="dashed" className="action-item">
                                    <Link to='/login'>
                                        <span>登录</span>
                                    </Link>
                                </Button>
                                <Button type="dashed" className="action-item">
                                    <Link to='/admin'>
                                        <span>管理</span>
                                    </Link>
                                </Button>
                            </div>
                        </Header> */}
                        <HeaderView></HeaderView>
                        <Content style={{ margin: 20, backgroundColor: '#FF8888' }} className="main-content">
                            {/* <div className="clothing-cards" style={{ padding: 24, textAlign: 'center' }}>
                                {[1, 2, 3, 4, 5, 6].map(() => {
                                    return <ClothingCard />
                                })}
                            </div>
                            <DiscountCarousel /> */}
                            <h1>content?????</h1>
                            <Switch>
                                {/* <Redirect exact from='/' to='main/discount' /> */}
                                <Route path='/' component={DiscountCarousel} />
                                <Route path='/discount' component={DiscountCarousel} />
                                <Route path='/new' component={ClothingCard} />
                                <Route path='/map' component={Test} />
                                {/* <Route path='/woman' component={Product} />
                                    <Route path='/children' component={Role} />
                                    <Route path='/map' component={Bar} />
                                    <Route component={NotFound} /> */}
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
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