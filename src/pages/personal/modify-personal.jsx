import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Switch, Button, message } from 'antd'
import { comparePassword } from '../../api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
const Item = Form.Item

/*
添加/修改用户的form组件
 */
class ModifyPersonalForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isSwitchChecked: false,
            oldPassword: "",
            isLoadingVarifyPwd: false
        }
    }
    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        user: PropTypes.object
    }


    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    handleSwitch = () => {
        const { isSwitchChecked } = this.state;
        this.setState({ isSwitchChecked: !isSwitchChecked })
    }

    varifyOldpwd = (value) => {
        const { user } = this.props;
        // const userId = user._id;
        const username = user.username
        this.setState({ isLoadingVarifyPwd: true })
        comparePassword(username, value).then((res) => {
            if (res.status === 0) {
                this.setState({ isLoadingVarifyPwd: false })
                message.success("验证原密码通过")
            } else {
                // this.setState({ isLoadingVarifyPwd: false })
                message.success("原密码不正确")
            }
        })
    }

    render() {

        const { user } = this.props
        const { getFieldDecorator } = this.props.form
        const { isSwitchChecked } = this.state
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }

        return (
            <Form {...formItemLayout} className="modify-personal-form">
                <Item label='用户名'>
                    {
                        getFieldDecorator('username', {
                            initialValue: user.username,
                        })(
                            <Input placeholder='请输入用户名' />
                        )
                    }
                </Item>

                {
                    user._id ? null : (
                        <Item label='密码'>
                            {
                                getFieldDecorator('password', {
                                    initialValue: user.password,
                                })(
                                    <Input type='password' placeholder='请输入密码' />
                                )
                            }
                        </Item>
                    )
                }

                <Item label='手机号'>
                    {
                        getFieldDecorator('phone', {
                            initialValue: user.phone,
                        })(
                            <Input placeholder='请输入手机号' />
                        )
                    }
                </Item>
                <Item label='邮箱'>
                    {
                        getFieldDecorator('email', {
                            initialValue: user.email,
                        })(
                            <Input placeholder='请输入邮箱' />
                        )
                    }
                </Item>

                <Item label='地址'>
                    {
                        getFieldDecorator('address', {
                            initialValue: user.address,
                        })(
                            <Input placeholder='请输入地址' />
                        )
                    }
                </Item>
                <Switch
                    className="changepwd-toggle"
                    checkedChildren="修改密码"
                    defaultChecked={false}
                    onChange={() => { this.handleSwitch() }}
                    checked={isSwitchChecked}
                />
                {isSwitchChecked &&
                    <div>

                        <Item label='原密码' className="verify-oldpwd-item" >
                            <Input placeholder='请输输入原密码'
                                value={this.state.oldPassword}
                                onChange={(e) => { this.setState({ oldPassword: e.target.value }) }}
                                onBlur={(e) => { this.varifyOldpwd(e.target.value) }}
                            />
                            <Button shape="circle" type="primary" className="loading-circle" loading={this.state.isLoadingVarifyPwd} />
                        </Item>

                        <Item label='新密码'>
                            {
                                getFieldDecorator('password', {
                                })(
                                    <Input placeholder='请输入新密码' type="password" />
                                )
                            }
                        </Item>
                    </div>
                }
            </Form>
        )
    }
}

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(Form.create()(ModifyPersonalForm)))
