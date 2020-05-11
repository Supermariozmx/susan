import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'
import './register.less'


const Item = Form.Item

class Register extends Component {
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
                                /*
                              用户名/密码的的合法性要求
                                1). 必须输入
                                2). 必须大于等于4位
                                3). 必须小于等于12位
                                4). 必须是英文、数字或下划线组成
                               */
                            }
                            {
                                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue: 'admin', // 初始值
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
                                getFieldDecorator('repeatpassword', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="确认密码"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('phone', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
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
                                        {
                                            validator: this.validatePwd
                                        }
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
                            <Button type="primary" htmlType="submit" className="register-form-button">
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