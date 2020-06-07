import React, { PureComponent } from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    Button,
    message
} from 'antd'


import LinkButton from '../../components/link-button'
import {updateOrder } from '../../api'
import memoryUtils from "../../utils/memoryUtils";

const { Item } = Form
const { TextArea } = Input

/*
Product的添加和更新的子路由组件
 */
class OrderUpdate extends PureComponent {

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
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            if (!error) {

                const { userName, userAddress, userPhone, orderPrice } = values
                const order = { userName, userAddress, userPhone, orderPrice }
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

    // componentDidMount() {
    //     this.getCategorys('0')
    // }

    componentWillMount() {
        // 取出携带的state
        const order = memoryUtils.order
        this.order = order || {}
    }

    /*
    在卸载之前清除保存的数据
    */
    componentWillUnmount() {
        memoryUtils.product = {}
    }

    render() {


        const { userName, userAddress, userPhone, orderPrice } = memoryUtils.order
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
                            })(<Input type='number' placeholder='请输入顾客电话' />)
                        }
                    </Item>




                    {/* <Item label="购买商品">
                        {
                            getFieldDecorator('products', {
                                initialValue: products[0].productName,
                                rules: [
                                    { required: true, message: '必须输入付款金额' },
                                    { validator: this.validatePrice }

                                ]
                            })(<Cascader
                                placeholder='请指定商品分类'
                                options={this.state.options} 
                                loadData={this.loadData} 
                            />)
                        }
                    </Item> */}


                    <Item label="付款金额">
                        {
                            getFieldDecorator('orderPrice', {
                                initialValue: orderPrice,
                                rules: [
                                    { required: true, message: '必须输入付款金额' },
                                    { validator: this.validatePrice }

                                ]
                            })(<Input placeholder="必须输入付款金额" />)
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