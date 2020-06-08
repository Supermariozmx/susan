import React, { Component } from 'react'
import { Card, List, Icon, Form, Button, Input, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reqAddOrUpdateUser, reqOneUser } from "../../api/index";
import PicturesWall from '../product/pictures-wall'
import "./personal.less"
const Item = List.Item
class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwitchOn: true,
            renderData: {}
        }
        this.pw = React.createRef()
    }

    componentDidMount() {
        this.handleRequestUser()
    }

    handleRequestUser = async () => {
        const { user } = this.props;
        this.id = user ? user._id : "";
        if (this.id) {
            const result = await reqOneUser(this.id)
            if (result.status === 0) {
                console.log("============req user", result)
                this.setState({ renderData: result.data })
                // renderData = result.data
            } else {
                message.error("服务器出错，获取信息失败")
            }
        } else {
            message.error("您还未登录，请登录")
        }
    }

    handleSwitchChange = () => {

    }
    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            // const user = this.form.getFieldsValue()
            const imgs = this.pw.current.getImgs()
            const { username, email, phone, address } = values
            const user = { username, email, phone, address, imgs }
            if (!error) {
                user._id = this.id
                const result = await reqAddOrUpdateUser(user)
                if (result.status === 0) {
                    message.success("更新信息成功")
                    this.props.history.goBack()
                } else {
                    message.error("更新信息失败")
                }
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        // const { imgs } = this.props.user
        const { renderData } = this.state;
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
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }

        return (
            <Card title={title}>
                <Form {...formItemLayout} >
                    <Item label="名称">
                        {
                            getFieldDecorator('username', {
                                initialValue: renderData.username ? renderData.username : "",
                                rules: [
                                    { required: true, message: '必须输入用户名称' }
                                ]
                            })(<Input placeholder='请输入用户名称' />)
                        }
                    </Item>
                    <Item label="邮箱">
                        {
                            getFieldDecorator('email', {
                                initialValue: renderData.email,
                                rules: [
                                    { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' },
                                ]
                            })(<Input placeholder="您可以输入邮箱" autosize={{ minRows: 2, maxRows: 6 }} />)
                        }

                    </Item>
                    {!renderData.isAdmin && <Item label="电话">
                        {
                            getFieldDecorator('phone', {
                                initialValue: renderData.phone,
                                rules: [
                                    { required: true, whitespace: true, message: '电话号码必须输入' },
                                    { max: 11, message: '电话号码最多11位' },
                                    { pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '手机号格式不正确' },

                                ]
                            })(<Input placeholder="请输入电话" />)
                        }

                    </Item>}
                    {!renderData.isAdmin && <Item label="地址">

                        {
                            getFieldDecorator('address', {
                                initialValue: renderData.address,
                                rules: [
                                    { required: true, message: '必须输入地址' },
                                ]
                            })(<Input type='number' placeholder='请输入地址' autosize={{ minRows: 2, maxRows: 6 }} />)
                        }
                    </Item>
                    }
                    {renderData.imgs &&
                        (<Item label="商品图片">
                            <PicturesWall ref={this.pw} imgs={renderData.imgs} />
                        </Item>)
                    }
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(Form.create()(PersonalCenter)))
