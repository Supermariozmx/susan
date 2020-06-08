import React, { Component } from 'react'
import { Card, Spin, message } from 'antd';
import { connect } from 'react-redux'
import { PictureTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { reqVarietyProduct } from "../../api/index"
import { BASE_IMG_URL } from '../../utils/constants'
import "./index.less"
import { addProduct } from '../../redux/actions'
const { Meta } = Card;

class ClothingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderData: []
        }
    }


    componentDidMount() {
        this.handleVarifyProduct()
    }
    componentWillReceiveProps() {
        this.handleVarifyProduct()
    }
    handleVarifyProduct = async () => {
        const pathName = this.props.location.pathname
        const categoryIdArray = pathName.split("/")
        const categoryId = categoryIdArray[4];
        const result = await reqVarietyProduct(categoryId)
        if (result.status === 0) {
            // console.log("--------------------test anne result", result.data)
            // this.data = result;
            this.setState({ renderData: result.data })
        } else {
            console.log("------------error")
        }

    }
    showDetail = (item) => {
        this.props.history.push({ pathname: `/main/detail/${item._id}`, state: { item } });
    }
    buyCloth = (item) => {
        // const clothId = item._id;
        const { user } = this.props;
        if (user && user._id) {
            this.props.addProduct(item);
        }else{
            message.error("无法加购，请先登录")
        }


    }
    render() {
        const { renderData } = this.state;
        console.log("----------------------------renderData", renderData)
        return (
            <div className="product-cards">
                {
                    renderData ? renderData.map((item) => {
                        return (
                            <div className="product-card">
                                < Card
                                    style={{ width: 300 }
                                    }
                                    cover={
                                        < img
                                            alt="example"
                                            src={BASE_IMG_URL + item.imgs[0]}
                                        />
                                    }
                                    actions={
                                        [
                                            <PictureTwoTone onClick={() => { this.showDetail(item) }} />,
                                            <ShoppingCartOutlined key="" onClick={() => { this.buyCloth(item) }} />
                                        ]}
                                >
                                    <Meta
                                        avatar={
                                            <span className="product-price">
                                                ￥{item.price}
                                            </span>
                                        }
                                        title={item.name}
                                        description={item.desc}
                                    />
                                </Card >

                            </div>
                        )
                    })
                        :
                        <div className="spin-loading">
                            <Spin />
                        </div>

                }
            </div>
        )
    }
}

// export default ClothingCard;

export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    { addProduct }
)(ClothingCard)