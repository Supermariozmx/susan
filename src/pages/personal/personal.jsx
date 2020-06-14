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
import { reqDeleteImg } from '../../api'
import { BASE_IMG_URL } from "../../utils/constants";
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin';
TweenOne.plugins.push(BezierPlugin);



// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1818861_07ln9qi4efv.js',

// });

class PersonalCenter extends Component {
    constructor(props) {
        super(props);

        let fileList = []

        // 如果传入了imgs属性
        const { imgs } = this.props.user
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: BASE_IMG_URL + img
            }))
        }

        this.state = {
            isSwitchOn: true,
            renderData: {},
            isModalShow: false,

            previewVisible: false, // 标识是否显示大图预览Modal
            previewImage: '', // 大图的url
            fileList // 所有已上传图片的数组
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


    handlePreviewCancel = () => this.setState({ previewVisible: false })

    handleAvatarPreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }


    handleAvatarChange = async ({ file, fileList }) => {
        console.log('handleChange()', file.status, fileList.length, file === fileList[fileList.length - 1])

        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            console.log("--------------------hanlde avatar change", result)
            if (result.status === 0) {
                message.success('上传图片成功!')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') { // 删除图片
            const result = await reqDeleteImg(file.name)
            if (result.status === 0) {
                message.success('删除图片成功!')
            } else {
                message.error('删除图片失败!')
            }
        }

        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
    };

    saveAvatar = async () => {
        const { ModifyUser } = this.props;
        this.setState({ isModalShow: false })
        const { user } = this.props
        user.imgs = this.state.fileList.map(file => file.name)
        console.log("=================modify avatar", user)
        const result = await reqAddOrUpdateUser(user)
        if (result.status === 0) {
            message.success("成功修改头像")
            ModifyUser(user)
            this.handleRequestUser()
        } else {
            message.error("更新头像失败")
        }
    }

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
                            action="/manage/img/upload" /*上传图片的接口地址*/
                            accept='image/*'  /*只接收图片格式*/
                            name='image' /*请求参数名*/
                            listType="picture-card"  /*卡片样式*/
                            fileList={fileList}  /*所有已上传图片文件对象的数组*/
                            onPreview={this.handleAvatarPreview}
                            onChange={this.handleAvatarChange}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {/* <Tooltip placement="topLeft" title="保存头像" arrowPointAtCenter>
                            <IconFont
                                type="iconsave"
                                className="save-avatar"
                                onClick={() => { this.saveAvatar() }}
                            >
                            </IconFont>
                        </Tooltip>, */}
                        <Button type="dashed" className="save-avatar" onClick={() => { this.saveAvatar() }} >保存头像</Button>

                        <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
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
