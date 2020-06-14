import React, { Component } from 'react'
import { Card, Icon, Form, Button, message, Modal, Upload } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reqAddOrUpdateUser, reqOneUser } from "../../api/index";
import { ModifyUser } from "../../redux/actions";
import ModifyPersonalForm from "./modify-personal"
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import "./personal.less"
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin';
TweenOne.plugins.push(BezierPlugin);

class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwitchOn: true,
            renderData: {},
            isModalShow: false,


            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }

        this.pw = React.createRef()
    }
    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        paused: PropTypes.bool,
    };

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
                this.oldUser = result.data;
                // renderData = result.data
            } else {
                message.error("服务器出错，获取信息失败")
            }
        } else {
            message.error("您还未登录，请登录")
        }
    }

    handleModalShow = () => {
        this.setState({
            isModalShow: true
        })
    }

    handlePersonalOrder = () => {
        this.props.history.push("/main/myorder")
    }

    handlePersonalFavorite = () => {
        this.props.history.push("/main/myfavorite")
    }

    handleUpdateUser = async () => {
        const { ModifyUser } = this.props;
        this.setState({ isModalShow: false })

        // 1. 收集输入数据
        const user = this.form.getFieldsValue()

        console.log("=================modify data", user)
        this.form.resetFields()
        user._id = this.id
        user.isAdmin = this.oldUser.isAdmin;
        user.create_time = this.oldUser.create_time;
        user.role_id = this.oldUser.role_id ? this.oldUser.role_id : ""

        // 2. 提交添加的请求
        const result = await reqAddOrUpdateUser(user)

        // 3. 更新列表显示
        if (result.status === 0) {
            message.success("成功修改资料")
            //此处需要更新redux中的state需要重新取出新的数据！！！！important
            ModifyUser(user)
            this.handleRequestUser()
        } else {
            message.error("更新信息失败")
        }
    }


    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
        const { renderData, isModalShow } = this.state;
        const { username, phone, email, address, imgs } = renderData;

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


        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Card title={title} className="personal-card">
                <div className="my-info">
                    <div className="my-avatar">
                        <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                    <div className="my-des">
                        <h3>我的资料</h3>
                        <p>用户名称：{username}</p>
                        <p>手机号码：{phone}</p>
                        <p>邮箱地址：{email}</p>
                        <p>默认地址：{address}</p>
                        <div className="my-action">
                            <Button type='primary' className="modify-data" onClick={() => { this.handleModalShow() }}>修改资料</Button>
                            <Button type='dashed' className="modify-data" onClick={() => { this.handlePersonalOrder() }}>我的订单</Button>
                            <Button type='dashed' onClick={() => { this.handlePersonalFavorite() }}>我的收藏</Button>
                        </div>
                    </div>
                </div>

                <Modal
                    title={"修改资料"}
                    visible={isModalShow}
                    onOk={this.handleUpdateUser}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({ isModalShow: false })
                    }}
                >
                    <ModifyPersonalForm
                        setForm={form => this.form = form}
                        user={renderData}
                    />
                </Modal>

            </Card>
        )
    }
}

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    { ModifyUser }
)(withRouter(Form.create()(PersonalCenter)))
