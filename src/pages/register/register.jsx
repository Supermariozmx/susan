import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { connect } from 'react-redux'
import './register.less'
import { reqAddOrUpdateUser } from "../../api/index";



const Item = Form.Item

class Register extends Component {
    state = {
        username: "", // 用户名
        password: "", // 密码
        phone: "",
        email: "",
        create_time: Date.now,
        isAdmin: false
    }
    validatePwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value)
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码长度不能小于4位')
        } else if (value.length > 12) {
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
        } else {
            callback() // 验证通过
        }
        // callback('xxxx') // 验证失败, 并指定提示的文本
    }

    handleSubmit = async (event) => {

        // 阻止事件的默认行为
        event.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            console.log("======form values", values)
            if (!err) {
                const user = values
                user.isAdmin = false
                user.create_time = Date.now
                const result = await reqAddOrUpdateUser(user)
                if (result.status === 0) {
                    message.success('注册成功')
                    this.props.history.push('./login')
                }else{
                    message.error(`${result.msg}`)
                }
            } else {
                message.error('注册失败!')
            }
        });
    }
    render() {
        const form = this.props.form
        const { getFieldDecorator } = form;
        return (
            <div className="register">
                <header className="register-header">
                    {/* <img src={} alt="logo" /> */}
                    <h1>欢迎来到Only For You-</h1>
                </header>
                <section className="register-content">
                    <h2>用户注册</h2>
                    <Form onSubmit={this.handleSubmit} className="register-form">
                        <Item>
                            {
                                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue: '', // 初始值
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"

                                    />
                                )
                            }
                        </Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"

                                    />
                                )
                            }

                        </Form.Item>

                        <Form.Item>
                            {
                                getFieldDecorator('phone', {
                                    rules: [
                                        { required: true, whitespace: true, message: '电话号码必须输入' },
                                        { max: 11, message: '电话号码最多11位' },
                                        { pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '用户名必须是英文、数字或下划线组成' },

                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="text"
                                        placeholder="电话"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('address', {
                                    rules: [
                                        { required: true, whitespace: true, message: '地址必须输入' },
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="address" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="text"
                                        placeholder="地址"

                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('email', {
                                    rules: [
                                        { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' },
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="text"
                                        placeholder="邮箱"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                htmlType="submit"
                                className="register-form-button">
                                注册
                           </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}



const WrapRegister = Form.create()(Register)
export default connect(
    state => ({}),
    {}
)(WrapRegister)