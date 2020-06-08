import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message
} from 'antd'

import LinkButton from '../../components/link-button'
import { reqOrders, reqSearchOrders, updateOderStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";

const Option = Select.Option

export default class OrderHome extends Component {

    state = {
        total: 0, // 订单总数量
        orders: [], // 订单数量
        loading: false,
        searchName: '',
        searchType: 'userName',
    }

    /*
    初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: '顾客名称',
                dataIndex: 'userName',
            },
            {
                title: '顾客地址',
                dataIndex: 'userAddress',
            },
            {
                title: '顾客号码',
                dataIndex: 'userPhone',
                render: (userPhone) => + userPhone  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                title: '付款金额',
                dataIndex: 'orderPrice',
                render: (orderPrice) => '¥' + orderPrice  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 100,
                title: '状态',
                // dataIndex: 'status',
                render: (order) => {
                    // const { status, _id } = order
                    // const newStatus = status === 1 ? 2 : 1
                    // 商品状态: 1:未完成, 2: 已完成
                    return (
                        <span>
                            {/* <Button
                                type='primary'
                                onClick={() => this.updateStatus(_id, newStatus)}
                            >
                                {status === 1 ? '结束' : '物流中'}
                            </Button> */}

                            <span>物流中</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (order) => {
                    return (
                        <span>
                            {/*将order对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.showDetail(order)}>详情</LinkButton>
                            <LinkButton onClick={() => this.showUpdate(order)}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    /*
    显示订单详情界面
     */
    showDetail = (order) => {
        // 缓存order对象 ==> 给detail组件使用
        memoryUtils.order = order
        this.props.history.push('/admin/order/detail')
    }

    /*
    显示修改订单界面
     */
    showUpdate = (order) => {
        // 缓存order对象 ==> 给detail组件使用
        memoryUtils.order = order
        this.props.history.push('/admin/order/update')
    }

    /*
    获取指定页码的列表数据显示
     */
    getOrders = async (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({ loading: true }) // 显示loading

        const { searchName, searchType } = this.state
        // 如果搜索关键字有值, 说明我们要做搜索分页
        let result
        if (searchName) {
            result = await reqSearchOrders({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqOrders(pageNum, PAGE_SIZE)
        }

        this.setState({ loading: false }) // 隐藏loading
        if (result.status === 0) {
            // 取出分页数据, 更新状态, 显示分页列表
            const { total, list } = result.data
            this.setState({
                total,
                orders: list
            })
        }
    }

    /*
    更新指定订单的状态
     */
    updateStatus = async (orderId, status) => {
        const result = await updateOderStatus(orderId, status)
        if (result.status === 0) {
            message.success('更新订单成功')
            this.getOrders(this.pageNum)
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getOrders(1)
    }

    render() {

        // 取出状态数据
        const { orders, total, loading, searchType, searchName } = this.state



        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='userName'>按名称搜索</Option>
                    <Option value='userPhone'>按电话搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getOrders(1)}>搜索</Button>
            </span>
        )



        return (
            <Card title={title} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={orders}
                    columns={this.columns}
                    pagination={{
                        current: this.pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getOrders
                    }}
                />
            </Card>
        )
    }
}