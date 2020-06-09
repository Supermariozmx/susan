import React, { Component } from 'react'
import { Card, List, Icon, Avatar, Switch, Input, Button, message } from 'antd'
import { BASE_IMG_URL } from "../../utils/constants"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import "./account.less"


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwitchChecked: false,
            receiverPhone: "",
            receiverAddress: "",
            receiverName: "",
            isLoadingAccountDetail: true,
            // isInfoFormatError: false
        }
    }

    handleSwitch = () => {
        const { isSwitchChecked } = this.state;
        this.setState({ isSwitchChecked: !isSwitchChecked })
    }
    handleSaveInfo = () => {
        const { receiverAddress, receiverPhone, receiverName } = this.state;
        const postInfo = { receiverAddress, receiverPhone, receiverName };
        if (!receiverAddress || !receiverPhone || !receiverName) {
            message.error("请您检查收货人姓名、电话、地址是否已填写")
        }
        if (!receiverPhone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
            message.error("检查电话号码格式是否正确")
        }
        console.log("--------------postInfo", postInfo);
    }
    handleReceiverItem = (key, value) => {
        console.log("==============input value", value);
        this.setState({
            [key]: value
        })
    }
    handlePay = () => {
        this.props.history.push("/main/payment");
    }

    componentDidMount() {
        this.handleMoney()
    }

    handleMoney = () => {
        const mockData = [{
            categoryId: "5eb7b9bbf70c283f343efc20",
            desc: "你就是最美的仙女",
            detail: "<p></p>↵",
            imgs: ["image-1590812451282.jpg"],
            name: "最美连衣裙",
            pCategoryId: "5eb7b987f70c283f343efc1d",
            price: 188,
            quantity: 9,
            status: 1,
            _id: "5eb7b968f70c283f343efc1c",
            number: 1
        },
        {
            categoryId: "5eb7b9bbf70c283f343efc20",
            desc: "复古、修身",
            detail: "<p></p>↵",
            imgs: ["image-1590812451282.jpg"],
            name: "复古连衣裙",
            pCategoryId: "5eb7b987f70c283f343efc1d",
            price: 188,
            quantity: 9,
            status: 1,
            _id: "test2",
            number: 1
        },
        {
            categoryId: "5eb7b9bbf70c283f343efc20",
            desc: "红色连衣裙",
            detail: "<p></p>↵",
            imgs: ["image-1590812451282.jpg"],
            name: "显瘦连衣裙",
            pCategoryId: "5eb7b987f70c283f343efc1d",
            price: 168,
            quantity: 9,
            status: 2,
            _id: "test3",
            number: 1
        },
        ]
        this.setState({ isLoadingAccountDetail: true })
        let sum = 0;
        mockData.forEach((item) => {
            sum = sum + item.price * item.number;
        })
        this.totalMoney = sum;
        this.setState({ isLoadingAccountDetail: false })
    }
    render() {
        const { isSwitchChecked, receiverAddress, receiverPhone, receiverName, isLoadingAccountDetail } = this.state;
        const mockData = [{
            categoryId: "5eb7b9bbf70c283f343efc20",
            desc: "你就是最美的仙女",
            detail: "<p></p>↵",
            imgs: ["image-1590812451282.jpg"],
            name: "最美连衣裙",
            pCategoryId: "5eb7b987f70c283f343efc1d",
            price: 188,
            quantity: 9,
            status: 1,
            _id: "5eb7b968f70c283f343efc1c",
            number: 1
        },
        {
            categoryId: "5eb7b9bbf70c283f343efc20",
            desc: "复古、修身",
            detail: "<p></p>↵",
            imgs: ["image-1590812451282.jpg"],
            name: "复古连衣裙",
            pCategoryId: "5eb7b987f70c283f343efc1d",
            price: 188,
            quantity: 9,
            status: 1,
            _id: "test2",
            number: 1
        },
        {
            categoryId: "5eb7b9bbf70c283f343efc20",
            desc: "红色连衣裙",
            detail: "<p></p>↵",
            imgs: ["image-1590812451282.jpg"],
            name: "显瘦连衣裙",
            pCategoryId: "5eb7b987f70c283f343efc1d",
            price: 168,
            quantity: 9,
            status: 2,
            _id: "test3",
            number: 1
        },
        ]
        // const itemValue = this.props.history.location.state.item
        // console.log("===========itemValue", itemValue)
        const title = (
            <span>
                <Icon
                    type='arrow-left'
                    style={{ marginRight: 10, fontSize: 20 }}
                    onClick={() => this.props.history.goBack()}
                />
                <span>结算清单</span>
            </span>
        )
        return (
            <div className="account-detail">
                <Card
                    className='product-list'
                    title={title}
                    loading={isLoadingAccountDetail}
                >
                    <List
                        loading={false}
                        itemLayout="horizontal"
                        // loadMore={loadMore}
                        dataSource={mockData}
                        renderItem={item => (
                            <List.Item
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar shape="square" size={48} src={BASE_IMG_URL + item.imgs[0]} />
                                    }
                                    title={<span>{item.name}</span>}
                                    description={<span>{item.desc}</span>}
                                />
                                <div>{item.price}X{item.number}</div>
                            </List.Item>
                        )}
                    />
                    <div className="account-total-money">总金额：{this.totalMoney}</div>
                    {/* 在订单结算时，可以让用户修改地址。
                    检测用户是否有地址放在点击结算按钮时判断，若没有按钮则直接弹出提示“请在个人中心设置地址”。 */}
                    <Switch
                        className="switch-toggle"
                        checkedChildren="修改地址"
                        unCheckedChildren="默认地址"
                        defaultChecked={false}
                        onChange={() => { this.handleSwitch() }}
                        checked={isSwitchChecked}
                    />
                    {isSwitchChecked ?
                        <div className="modify-info-list">
                            <Input
                                placeholder="请输入联系人"
                                prefix={<Icon type='plus' />}
                                value={receiverName}
                                onChange={(e) => {
                                    this.handleReceiverItem("receiverName", e.target.value)
                                }}
                            />
                            <Input
                                placeholder="请输入手机号"
                                prefix={<Icon type='plus' />}
                                value={receiverPhone}
                                onChange={(e) => {
                                    this.handleReceiverItem("receiverPhone", e.target.value)
                                }}
                            />
                            <Input
                                placeholder="请输入地址"
                                prefix={<Icon type='plus' />}
                                value={receiverAddress}
                                onChange={(e) => {
                                    this.handleReceiverItem("receiverAddress", e.target.value)
                                }}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                size="default"
                                onClick={() => { this.handleSaveInfo() }}
                            // disabled={isInfoFormatError}
                            >确认</Button>
                        </div>
                        : <div>
                            <p>联系人：mario</p>
                            <p>手机号：18742017518</p>
                            <p>用户地址：辽宁省大连市甘井子区大连工业大学</p>
                        </div>
                    }
                    <Button type="primary" className="account-footer-button" onClick={() => { this.handlePay() }} >确认付款</Button>
                    <Button type="dashed" className="account-footer-button" >取消付款</Button>
                </Card>
            </div>
        )
    }
}

// export default Account;
export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(Account))