import React, { Component } from 'react'
import { Card, List, Icon, Button, message } from 'antd'
import { BASE_IMG_URL } from "../../utils/constants"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addProduct } from '../../redux/actions'
import "./detail.less"

const Item = List.Item
class ClothingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderData: []
        }
    }

    addToCart = (item) => {
        const { user } = this.props;
        if (user && user._id) {
            this.props.addProduct(item);
        } else {
            message.error("无法加购，请先登录")
        }
    }
    buyNow = (item) => {
        const { user } = this.props;
        if (user && user._id) {
            this.props.history.push({ pathname: "/main/account", state: { item } });
        } else {
            message.error("无法立即购买，请先登录")
        }
    }
    render() {
        const itemValue = this.props.history.location.state.item
        const title = (
            <span>
                <Icon
                    type='arrow-left'
                    style={{ marginRight: 10, fontSize: 20 }}
                    onClick={() => this.props.history.goBack()}
                />
                <span>商品详情</span>
            </span>
        )
        return (
            <div className="clothing-detail">
                <Card className='product-detail' title={title}>
                    <List>
                        <Item>
                            <span className="left">商品名称:</span>
                            <span>{itemValue.name}</span>
                        </Item>
                        <Item>
                            <span className="left">商品描述:</span>
                            <span>{itemValue.desc}</span>
                        </Item>
                        <Item>
                            <span className="left">商品价格:</span>
                            <span>{itemValue.price}元</span>
                        </Item>
                        <Item>
                            <span className="left">商品库存:</span>
                            <span>{itemValue.quantity ? itemValue.quantity : 2}件</span>
                        </Item>
                        <Item>
                            <span className="left">商品图片:</span>
                            <span>
                                {
                                    itemValue.imgs.map(img => (
                                        <img
                                            key={img}
                                            src={BASE_IMG_URL + img}
                                            className="product-img"
                                            alt="img"
                                        />
                                    ))
                                }
                            </span>
                        </Item>
                        <Item>
                            <span className="left">商品详情:</span>
                            <span dangerouslySetInnerHTML={{ __html: itemValue.detail }}>
                            </span>
                        </Item>
                        <div className="action-button">
                            <Button className="action-add-cart" onClick={() => this.addToCart(itemValue)}>加购物车</Button>
                            <Button onClick={() => { this.buyNow(itemValue) }}>立即购买</Button>
                        </div>
                    </List>
                </Card>
            </div>
        )
    }
}
export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    { addProduct }
)(withRouter(ClothingDetail))