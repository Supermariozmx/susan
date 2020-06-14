import React, { Component } from 'react'
import { Card, List, Icon, Avatar, Switch, Input, Button, message, Modal } from 'antd'
import { BASE_IMG_URL } from "../../utils/constants"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addOrder, reqAddOrUpdateProduct } from '../../api'
import "./account.less"

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1818861_2jeeejr47tl.js',

});

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
            isReceiverInfoChanged: false,
            isModalShow: false
        }
    }

    handleSwitch = () => {
        const { isSwitchChecked } = this.state;
        this.setState({ isSwitchChecked: !isSwitchChecked })
    }
    handleSaveInfo = () => {
        let isPassed = true;
        const { receiverAddress, receiverPhone, receiverName } = this.state;
        const postInfo = { receiverAddress, receiverPhone, receiverName };
        if (!receiverAddress || !receiverPhone || !receiverName) {
            this.isPassed = false
            message.error("请您检查收货人姓名、电话、地址是否已填写")
        }
        if (!receiverPhone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
            this.isPassed = false
            message.error("检查电话号码格式是否正确")
        }
        if (isPassed) {
            message.success("收货人信息修改成功");
            this.setState({ isReceiverInfoChanged: true })
        }
        console.log("--------------postInfo", postInfo);
    }
    handleReceiverItem = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    handlePay = () => {
        const itemValue = this.props.history.location.state ? [this.props.history.location.state.item] : []
        const { isReceiverInfoChanged, receiverAddress, receiverPhone, receiverName } = this.state
        const { user } = this.props;
        const { username, _id, address, phone } = user;
        const { selectProducts } = this.props.cart;
        const orderProducts = itemValue.length > 0 ? itemValue : selectProducts
        const handledData = orderProducts
        console.log("-------------------商品信息", orderProducts)
        handledData.forEach((item) => {
            item.quantity = item.quantity - item.number;
            console.log("-------------item",item)
        })
        console.log("===============看看变美边",handledData);
        handledData.forEach((item)=>{
            reqAddOrUpdateProduct(item).then((data) => {
                console.log("---------------更新商品库存", data)
            })
        })


        const order = {
            userName: isReceiverInfoChanged ? receiverName : username,
            userId: _id,
            userPhone: isReceiverInfoChanged ? receiverPhone : phone,
            userAddress: isReceiverInfoChanged ? receiverAddress : address,
            orderPrice: this.totalMoney,
            products: handledData,
            status: "paid",
        }
        addOrder(order)
        this.props.history.push("/main/payment");

    }

    handleCancel = () => {
        this.setState({ isModalShow: true })
    }
    modalCancel = () => {
        this.setState({ isModalShow: false })
    }
    modalConfirm = () => {
        const itemValue = this.props.history.location.state ? [this.props.history.location.state.item] : []
        const { isReceiverInfoChanged, receiverAddress, receiverPhone, receiverName } = this.state
        const { user } = this.props;
        const { username, _id, address, phone } = user;
        const { selectProducts } = this.props.cart;
        const orderProducts = itemValue.length > 0 ? itemValue : selectProducts
        const order = {
            userName: isReceiverInfoChanged ? receiverName : username,
            userId: _id,
            userPhone: isReceiverInfoChanged ? receiverPhone : phone,
            userAddress: isReceiverInfoChanged ? receiverAddress : address,
            orderPrice: this.totalMoney,
            products: orderProducts,
            status: "cancel",
        }
        addOrder(order)
        this.props.history.goBack()
    }

    componentDidMount() {
        this.handleMoney()
    }

    handleMoney = () => {
        const { selectProducts } = this.props.cart;
        const itemValue = this.props.history.location.state ? [this.props.history.location.state.item] : []
        this.setState({ isLoadingAccountDetail: true })
        let sum = 0;
        const handledProducts = itemValue.length > 0 ? itemValue : selectProducts
        handledProducts.forEach((item) => {
            if (item.number) {
                sum = sum + item.price * item.number;
            } else {
                sum = item.price
            }

        })
        this.totalMoney = sum;
        this.setState({ isLoadingAccountDetail: false })
    }


    render() {
        const { isSwitchChecked, receiverAddress, receiverPhone, receiverName, isLoadingAccountDetail } = this.state;
        const { selectProducts } = this.props.cart;
        const itemValue = this.props.history.location.state ? [this.props.history.location.state.item] : []

        const { user } = this.props;
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
                        dataSource={itemValue.length > 0 ? itemValue : selectProducts}
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
                                <div>{item.price}X{item.number ? item.number : "1"}</div>
                            </List.Item>
                        )}
                    />
                    <div className="account-total-money">总金额：{this.totalMoney}</div>
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
                                prefix={<Icon type="user" />}
                                value={receiverName}
                                onChange={(e) => {
                                    this.handleReceiverItem("receiverName", e.target.value)
                                }}
                            />
                            <Input
                                placeholder="请输入手机号"
                                prefix={<Icon type="phone" />}
                                value={receiverPhone}
                                onChange={(e) => {
                                    this.handleReceiverItem("receiverPhone", e.target.value)
                                }}
                            />
                            <Input
                                placeholder="请输入地址"
                                prefix={<IconFont type="iconaddress1" />}
                                value={receiverAddress}
                                onChange={(e) => {
                                    this.handleReceiverItem("receiverAddress", e.target.value)
                                }}
                            />
                            <Button
                                type="primary"
                                shape="round"
                                size="default"
                                onClick={() => { this.handleSaveInfo() }}
                            >确认</Button>
                        </div>
                        : <div>
                            <p>联系人：{user ? user.username : ""}</p>
                            <p>手机号：{user ? user.phone : ""}</p>
                            <p>用户地址：{user ? user.address : ""}</p>
                        </div>
                    }
                    <Button type="primary" className="account-footer-button" onClick={() => { this.handlePay() }} >确认付款</Button>
                    <Button type="dashed" className="account-footer-button" onClick={() => { this.handleCancel() }} >取消付款</Button>
                </Card>
                <Modal
                    title="友情提示"
                    visible={this.state.isModalShow}
                    onOk={this.modalConfirm}
                    onCancel={this.modalCancel}
                >
                    <p>您确认取消付款吗？</p>
                </Modal>
            </div>
        )
    }
}

// export default Account;
export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(Account))