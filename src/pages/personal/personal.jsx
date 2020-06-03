import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
// import { BASE_IMG_URL } from "../../utils/constants"
import { reqOneUser } from "../../api/index";
import "./personal.less"
import { connect } from 'react-redux'
const Item = List.Item
class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderData: {}
        }
    }


    componentDidMount() {
        this.handleRequestUser()
    }

    handleRequestUser = async () => {
        const { user } = this.props;
        const id = user ? user._id : "";
        if (id) {
            const result = await reqOneUser(id)
            if (result.status === 0) {
                console.log("============req user", result)
                this.setState({ renderData: result.data })
            } else {
                console.log("------------error")
            }
        } else {
            console.log("please login")
        }


    }

    render() {
        const { renderData } = this.state
        const title = (
            <span>
                <Icon
                    type='arrow-left'
                    style={{ marginRight: 10, fontSize: 20 }}
                    onClick={() => this.props.history.goBack()}
                />
                <span>个人中心</span>
            </span>
        )
        return (

            <div className="clothing-detail">
                <Card className='product-detail' title={title}>
                    <List>
                        <Item>
                            <span className="left">用户名:</span>
                            <span>{renderData.username}</span>
                        </Item>
                        <Item>
                            <span className="left">电话</span>
                            <span>{renderData.phone?renderData.phone:"您没有输入"}</span>
                        </Item>
                        <Item>
                            <span className="left">地址</span>
                            {/* <span>{itemValue.price}</span> */}
                        </Item>
                        <Item>
                            <span className="left">邮箱</span>
                            {/* <span>
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
                            </span> */}
                        </Item>
                        {/* <Item>
                            <span className="left">商品详情:</span>
                            <span dangerouslySetInnerHTML={{ __html: itemValue.detail }}>
                            </span>
                        </Item> */}

                    </List>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(PersonalCenter))
