import React, { PureComponent } from 'react'
import { Card, Icon, Form, Input, Button, message, Select, Table, Avatar, InputNumber } from 'antd'
import { BASE_IMG_URL } from '../../utils/constants'
import LinkButton from '../../components/link-button'
import { updateOrder } from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import "./order.less"

const { Item } = Form
const { TextArea } = Input
const Option = Select.Option;
/*
Product的添加和更新的子路由组件
 */
class OrderUpdate extends PureComponent {
    state = {
        prductsData: []
    }
    /*
    验证价格的自定义验证函数
     */
    validatePrice = (rule, value, callback) => {
        console.log(value, typeof value)
        if (value * 1 > 0) {
            callback() // 验证通过
        } else {
            callback('价格必须大于0') // 验证没通过
        }
    }



    submit = () => {
        const { prductsData } = this.state;
        const products = prductsData;
        this.props.form.validateFields(async (error, values) => {
            if (!error) {

                const { userName, userAddress, userPhone, orderPrice, status } = values
                const order = { userName, userAddress, userPhone, orderPrice, status, products }
                order._id = this.order._id
                const result = await updateOrder(order)
                if (result.status === 0) {
                    message.success("更新订单成功")
                    this.props.history.goBack()
                } else {
                    message.error("更新订单失败")
                }
            }
        })
    }


    componentWillMount() {
        // 取出携带的state
        const order = memoryUtils.order
        this.order = order || {}
        this.initColumns()

    }
    componentDidMount() {
        const order = memoryUtils.order
        this.order = order || {}
        if (this.order) {
            this.setState({ prductsData: order.products })
        }

    }
    handleRemoveProduct = (product) => {

    }

    handleProductNumber = (value, product) => {
        const { prductsData } = this.state;
        const handleProducts = prductsData
        handleProducts.forEach((item) => {
            if (item._id === product._id) {
                item.number = value;
            }
        })
        this.setState({ prductsData: handleProducts })
    }

    handleProductPrice = (value, product) => {
        const { prductsData } = this.state;
        const handleProducts = prductsData
        handleProducts.forEach((item) => {
            if (item._id === product._id) {
                item.price = value;
            }
        })
        this.setState({ prductsData: handleProducts })
    }

    initColumns = () => {
        this.columns = [
            {
                width: 130,
                title: '',
                render: (product) => {
                    return (
                        <div className="product-title">
                            <span>{product.name}</span>
                            <Avatar shape="square" className="header-action" size={32}
                                src={BASE_IMG_URL + product.imgs[0]} />
                        </div>
                    )
                }

            },
            {
                title: '',
                render: (product) => {
                    return (
                        <div className="order-update-action">
                            <InputNumber
                                size="small"
                                className="product-number"
                                min={1}
                                max={product.quantity}
                                defaultValue={product.number}
                                onChange={(value) => { this.handleProductNumber(value, product) }} />
                            <span> 件</span>
                        </div>
                    )
                }
            },
            {
                title: '',
                render: (product) => {
                    return (
                        <div className="order-update-action">
                            <span>￥</span>
                            <InputNumber
                                min={1}
                                max={1000000}
                                defaultValue={product.price}
                                onChange={(value) => { this.handleProductPrice(value, product) }
                                } />
                        </div>
                    )
                }
            },
        ];
    }


    selectOrderStatus = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }


    render() {


        const { userName, userAddress, userPhone, orderPrice, products } = memoryUtils.order
        // 用来接收级联分类ID的数组


        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }

        // 头部左侧标题
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{ fontSize: 20 }} />
                </LinkButton>
                <span>修改订单</span>
            </span>
        )
        const { getFieldDecorator } = this.props.form

        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="顾客名称">
                        {
                            getFieldDecorator('userName', {
                                initialValue: userName,
                                rules: [
                                    { required: true, message: '必须输入顾客名称' }
                                ]
                            })(<Input placeholder='请输入顾客名称' />)
                        }
                    </Item>
                    <Item label="顾客地址">
                        {
                            getFieldDecorator('userAddress', {
                                initialValue: userAddress,
                                rules: [
                                    { required: true, message: '必须输入顾客地址' }
                                ]
                            })(<TextArea placeholder="输入顾客地址" autosize={{ minRows: 2, maxRows: 6 }} />)
                        }

                    </Item>
                    <Item label="顾客电话">
                        {
                            getFieldDecorator('userPhone', {
                                initialValue: userPhone,
                                rules: [
                                    { required: true, message: '必须输入顾客电话' },
                                    { max: 11, message: '电话号码最多11位' },
                                    { pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '手机号格式不正确' },

                                ]
                            })(<Input placeholder='请输入顾客电话' />)
                        }
                    </Item>

                    <Item label="商品详情">
                        <Table
                            showHeader={false}
                            bordered={false}
                            rowKey='_id'
                            dataSource={products}
                            columns={this.columns}
                            pagination={false}>

                        </Table>
                    </Item>


                    <Item label="付款金额">
                        {
                            getFieldDecorator('orderPrice', {
                                initialValue: orderPrice,
                                rules: [
                                    { required: true, message: '必须输入付款金额' },
                                    { validator: this.validatePrice }

                                ]
                            })(<Input placeholder="必须输入付款金额" type='number' />)
                        }

                    </Item>

                    <Item label="状态">
                        {
                            getFieldDecorator('status', {
                                 rules: [
                                    { required: true, message: '必须选择订单状态' },
                                ]
                            })(<Select
                                placeholder='更改订单状态'
                                onChange={this.selectOrderStatus}
                                defaultValue="transport"
                            >
                                <Option value="transport">物流中</Option>
                                <Option value="finished">派送中</Option>
                            </Select>)
                        }

                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(OrderUpdate)


/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */