import React, { Component } from 'react'
import { Radio, Icon, Button } from 'antd';
import './payment.less'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1818861_6i8268debnx.js',

});

class PayMent extends Component {
    handlePaySuccess = () => {
        this.props.history.push("/main/successpay");
    }
    render() {
        return (
            <div className="payment-view">
                <h2>请选择支付方式</h2>
                <div className="payment">
                    <div className="pay">
                        <Radio checked={true}></Radio>
                        <IconFont type="iconpay" className="pay-icon" />
                    </div>
                    <div className="wechat">
                        <Radio></Radio>
                        <IconFont type="iconwechat" className="wechat-icon" />
                    </div>

                </div>
                <Button className="payment-button" type="dashed" onClick={() => { this.handlePaySuccess() }}>付款</Button>
            </div>
        )
    }

}




export default connect(
    state => ({}),
    {}
)(withRouter(PayMent))