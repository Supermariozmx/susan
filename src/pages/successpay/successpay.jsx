import React, { Component } from 'react'
import { Icon, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import "./successpay.less"

class SuccessPay extends Component {
    seeOrder = () => {
        this.props.history.push("/main/myorder")
    }
    goMain = () => {
        this.props.history.push("/main")
    }

    render() {
        return (
            <div className="pay-success">
                <div className="success-content">
                    <Icon type="check-circle-o" className="success-icon" />
                    <p className="success-title">付款成功</p>
                    <p className="success-des">订单已生成，可在个人中心=>我的订单查看您的订单</p>
                    <div className="success-button">
                        <Button type='dashed' className="view-orders" onClick={() => { this.seeOrder() }}>
                            查看订单
                   </Button>
                        <Button type="dashed" onClick={() => { this.goMain() }}>
                            回到首页
                       </Button>
                    </div>
                </div>
            </div>
        )
    }

}


export default connect(
    state => ({}),
    {}
)(withRouter(SuccessPay))