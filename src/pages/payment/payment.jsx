import React, { Component } from 'react'
import { Radio,Icon } from 'antd';
import './payment.less'

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1818861_6i8268debnx.js',
    
  });

class PayMent extends Component {
    render() {
        return (
            <div className="payment-view">
                <h2>请选择支付方式</h2>
                <div className="payment">
                    <div className="pay">
                        <Radio checked={true}></Radio>
                        <IconFont type="iconpay" className="pay-icon"/>
                    </div>
                    <div className="wechat">
                        <Radio></Radio>
                        <IconFont type="iconwechat" className="wechat-icon"/>
                    </div>
                </div>
            </div>
        )
    }

}

export default PayMent;