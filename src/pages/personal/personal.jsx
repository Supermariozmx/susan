import React, { Component } from 'react'
import { Card, List, Icon, Switch, Form } from 'antd'
import { withRouter } from 'react-router-dom'
// import { BASE_IMG_URL } from "../../utils/constants"
import { reqOneUser } from "../../api/index";
import "./personal.less"
import { connect } from 'react-redux'
const Item = List.Item
class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderData: {},
            isSwitchOn: true
        }
    }


    componentDidMount() {
        this.handleRequestUser()
    }

    handleRequestUser = async () => {
        const { user } = this.props;
        const id = user ? user._id : "";
        if (id) {
            const result = await reqOneUser(id)
            if (result.status === 0) {
                console.log("============req user", result)
                this.setState({ renderData: result.data })
            } else {
                console.log("------------error")
            }
        } else {
            console.log("please login")
        }
    }

    handleSwitchChange = () => {

    }
    render() {
        const { renderData } = this.state
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

            <div className="clothing-detail">
                <Card className='product-detail' title={title}>
                    <Form {...formItemLayout}>

                        <Item>
                            <span className="left">用户名</span>
                            <span>{renderData.username}</span>
                        </Item>
                        <Item>
                            <span className="left">电话</span>
                            <span>{renderData.phone ? renderData.phone : ""}</span>
                        </Item>
                        <Item>
                            <span className="left">地址</span>
                            <span>{renderData.address ? renderData.address : ""}</span>
                        </Item>
                        <Item>
                            <span className="left">邮箱</span>
                            {/* <span>
                                {
                                    itemValue.imgs.map(img => (
                                        <img
                                            key={img}
                                            src={BASE_IMG_URL + img}
                                            className="product-img"
                                            alt="img"
                                        />
                                    ))
                                }
                            </span> */}
                        </Item>
                        <Item>
                            <Switch defaultChecked onChange={() => { this.handleSwitchChange() }} />,
                        </Item>onSwitchChange


                    </Form>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    {}
)(withRouter(PersonalCenter))
