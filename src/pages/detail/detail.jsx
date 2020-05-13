import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'
import { BASE_IMG_URL } from "../../utils/constants"
import "./detail.less"

const Item = List.Item
class ClothingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderData: []
        }
    }


    render() {
        const itemValue = this.props.history.location.state.item
        console.log("===========itemValue", itemValue)
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

                    </List>
                </Card>
            </div>
        )
    }
}

export default ClothingDetail;