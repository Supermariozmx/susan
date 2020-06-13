import React, { Component } from 'react'
import {
    Card,
    Icon,
    List
} from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from "../../utils/memoryUtils";
import "./order.less"

const Item = List.Item


/*
Product的详情子路由组件
 */
export default class OrderDetail extends Component {

    componentWillUnmount() {
        memoryUtils.order = {}
    }


    render() {


        // 读取携带过来的state数据
        const { userName, userAddress, userPhone, orderPrice, products } = memoryUtils.order

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
            <Card title={title} className='order-detail'>
                <List>
                    <Item>
                        <span className="left">顾客名称:</span>
                        <span>{userName}</span>
                    </Item>
                    <Item>
                        <span className="left">顾客电话:</span>
                        <span>{userPhone}</span>
                    </Item>

                    <Item>
                        <span className="left">顾客地址:</span>
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
                        <span className="left">付款金额:</span>
                        <span>{orderPrice}元</span>
                    </Item>
                </List>
            </Card>
        )
    }
}