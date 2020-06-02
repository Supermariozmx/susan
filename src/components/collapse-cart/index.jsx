import React, { Component } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';


class ShoppingCart extends Component {
    // constructor(){
    //     super(props);
       
    // }
  
    render() {

        return (
            <div className="collapse-cart">
                {/* <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={()=>{onClose}}
                    visible={visible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer> */}
            </div >
        )
    }
}

// export default ClothingCard;

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user }),
    {}
)(ShoppingCart)