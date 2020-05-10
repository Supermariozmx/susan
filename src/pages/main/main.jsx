import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import ClothingCard from "../../components/card"
const { Content, Footer, Sider } = Layout;


class Main extends Component {
    render() {
        return (
            <div  className="main-page-content">
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1" >
                                nav 1
                       </Menu.Item>
                            <Menu.Item key="2" >
                                nav 2
                       </Menu.Item>
                            <Menu.Item key="3" >
                                nav 3
                        </Menu.Item>
                            <Menu.Item key="4" >
                                nav 4
                        </Menu.Item>
                            <Menu.Item key="5" >
                                nav 5
                        </Menu.Item>
                            <Menu.Item key="6" >
                                nav 6
                        </Menu.Item>
                            <Menu.Item key="7" >
                                nav 7
                        </Menu.Item>
                            <Menu.Item key="8" >
                                nav 8
                        </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <div className="clothing-cards" style={{ padding: 24, textAlign: 'center' }}>
                                {[1, 2, 3, 4, 5, 6].map(() => {
                                    return <ClothingCard />
                                })}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default Main;