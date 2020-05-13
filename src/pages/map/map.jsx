import React, { Component } from 'react'

import "./map.less"


class ShopMap extends Component {
    render() {

        return (
            <div className="shop-map">
                <webview source="https://www.baidu.com" ></webview>


            </div>
        )
    }
}

export default ShopMap;