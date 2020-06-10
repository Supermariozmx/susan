import React, { Component } from 'react'
import { Card, Table, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reqPersonalOrder } from '../../api'


class PersonalOrder extends Component {

    state = {
        myOrder: []
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        const { user } = this.props;
        const userId = user._id
        reqPersonalOrder(userId).then((result) => {
            console.log("personal----------------order", result)
            this.setState({ myOrder: result.data })
            console.log("==============personal order", this.personalOrder)
        })
    }

    showDetail = (item) => {
        this.props.history.push({ pathname: `/main/orderdetail/${item._id}`, state: { item } });
    }
    initColumns = () => {
        this.columns = [
            {
                title: '',
                dataIndex: 'userName',
            },
            {
                title: '',
                dataIndex: 'userAddress',
            },
            {
                title: '',
                dataIndex: 'userPhone',
                render: (userPhone) => + userPhone  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                title: '',
                dataIndex: 'orderPrice',
                render: (orderPrice) => '¥' + orderPrice  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 100,
                title: '',

                render: (order) => {
                    let orderStatus = ""
                    if (order.status === "paid") {
                        orderStatus = "待揽收"
                    } else if (order.status === "transport") {
                        orderStatus = "物流中"
                    } else {
                        orderStatus = "已完成"
                    }
                    return (
                        <span>{orderStatus}</span>

                    )
                }
            },
            {
                width: 100,
                title: '',
                render: (order) => {
                    return (
                        <span>
                            {/*将order对象使用state传递给目标路由组件*/}
                            <Button type="dashed" onClick={() => this.showDetail(order)}>详情</Button>

                        </span>
                    )
                }
            },
        ];
    }


    render() {
        const { myOrder } = this.state;
        // const mockData = [
        //     {"_id":{"$oid":"5edf9e452ee7b04a84af2bd4"},"products":[{"status":1,"imgs":["image-1589345454580.jpg"],"quantity":8,"_id":"5ebb7cddaf974b49fce5933b","name":"男士t恤","desc":"清爽、干净、白色、大气","price":69,"detail":"<p><strong>这是一件很好看的男士t恤，干净、清爽、是夏天必备品�</strong>�</p>\n","pCategoryId":"5eb7b89ff70c283f343efc1b","categoryId":"5eb7b9a7f70c283f343efc1f","__v":0,"number":1},{"status":1,"imgs":["image-1590830582981.jpg","image-1590830587736.jpg","image-1590830591389.jpg","image-1590830595822.jpg"],"quantity":8,"_id":"5ed22641b6e38c1fd0278a82","name":"男士短袖","desc":"帅气、修身、黑色","price":98,"detail":"<p></p>\n","pCategoryId":"5eb7b89ff70c283f343efc1b","categoryId":"5eb7b9a7f70c283f343efc1f","__v":0,"number":1}],"status":"paid","userName":"mario0609","userId":"5edda59262af5b1efcedf639","userAddress":"法国巴黎","orderPrice":167,"create_time":1591713349298,"__v":0}
        // ]
        // const mockUser={"_id":{"$oid":"5eddd02d62af5b1efcedf63a"},"isAdmin":true,"imgs":["image-1589345440541.jpg"],"username":"zane","password":"e10adc3949ba59abbe56e057f20f883e","phone":"18898089999","email":"1469080717@qq.com","role_id":"5eb7ba24f70c283f343efc23","create_time":1591595053071,"__v":0}
        const title = (
            <span>
                <Icon
                    type='arrow-left'
                    style={{ marginRight: 10, fontSize: 20 }}
                    onClick={() => this.props.history.goBack()}
                />
                <span>我的订单</span>
            </span>
        )
        return (
            <Card title={title} >
                <Table
                    showHeader={false}
                    bordered={false}
                    rowKey='_id'
                    // loading={loading}
                    dataSource={myOrder}
                    columns={this.columns}
                    pagination={false}
                // pagination={{
                //     current: this.pageNum,
                //     total,
                //     defaultPageSize: PAGE_SIZE,
                //     showQuickJumper: true,
                //     onChange: this.getOrders
                // }}
                />
            </Card>
        )
    }
}

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(PersonalOrder))