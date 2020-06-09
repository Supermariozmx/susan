import React, { Component } from 'react'
import { Icon, Button } from 'antd';

class SuccessPay extends Component {
    seeOrder = () => {

    }
    goMain = () => {

    }

    render() {
        return (
            <div className="pay-success">
                <Icon type="check-circle-o" className="success-icon" />
                <p>付款成功</p>
                <p>订单已生成，可在个人中心=>我的订单查看您的订单</p>

                <Button type='primary' onClick={() => { this.seeOrder() }}>
                    查看订单
               </Button>
                <Button type="dashed" onClick={() => { this.goMain() }}>
                    回到首页
                </Button>

            </div>
        )
    }

}

export default SuccessPay;