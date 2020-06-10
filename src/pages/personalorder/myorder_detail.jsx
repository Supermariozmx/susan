import React, { Component } from 'react'
import {
    Card,
    Icon,
    List
} from 'antd'
import LinkButton from '../../components/link-button'

const Item = List.Item


/*
Product的详情子路由组件
 */
export default class MyOrderDetail extends Component {
    handleStatusDisplay = (status) => {
        let statusDisplay = ""
        if (status === "paid") {
            statusDisplay = "待揽收"
        } else if (status === "transport") {
            statusDisplay = "物流中"

        } else {
            statusDisplay = "已完成"
        }
        return statusDisplay
    }

    render() {


        const itemValue = this.props.history.location.state.item
        const { userName, userAddress, userPhone, orderPrice, products, status } = itemValue
        const title = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 10, fontSize: 20 }}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>

                <span>订单详情</span>
            </span>
        )
        return (
            <Card title={title} className='personal-order-detail'>
                <List>
                    <Item>
                        <span className="left">收货人名称</span>
                        <span>{userName}</span>
                    </Item>
                    <Item>
                        <span className="left">收货人电话</span>
                        <span>{userPhone}</span>
                    </Item>

                    <Item>
                        <span className="left">收货人地址</span>
                        <span>{userAddress}</span>
                    </Item>
                    <Item>
                        <span className="left">商品列表:</span>
                        <div className="order-product-list">
                            {products ?
                                products.map(item => (
                                    <div className="order-product-content">
                                        <span className="order-product-name product-item">{item.name}</span>
                                        <span className="order-product-price product-item">{item.price}元</span>
                                        <span className="order-product-number">X{item.number}</span>
                                    </div>
                                ))
                                : null
                            }
                        </div>
                    </Item>
                    <Item>
                        <span className="left">订单状态</span>
                        <span>{this.handleStatusDisplay(status)}</span>
                    </Item>
                    <Item>
                        <span className="left">付款金额:</span>
                        <span>{orderPrice}元</span>
                    </Item>

                </List>
            </Card>
        )
    }
}