import React, { Component } from 'react'
import { Card, Spin, message, Icon, Tooltip, Input, Button, Select } from 'antd';
import { connect } from 'react-redux'
import { PictureTwoTone, ShoppingCartOutlined, HeartFilled } from '@ant-design/icons';
import { reqVarietyProduct, persoanlCancelFavorite, persoanlAddFavorite, reqVarietySearchProducts } from "../../api/index"
import { BASE_IMG_URL } from '../../utils/constants'
import "./index.less"
import { addProduct } from '../../redux/actions'
const { Meta } = Card;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1818861_qu3ldual4zg.js',

});
const Option = Select.Option


class ClothingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderData: [],
            isFavoriteLoading: false,
            searchName: "",
            searchType: 'productName',
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
            this.setState({ renderData: result.data })
        } else {
            console.log("------------error")
        }

    }
    handleSearchProduct = () => {
        const { searchName, searchType } = this.state
        const pathName = this.props.location.pathname
        const categoryIdArray = pathName.split("/")
        const categoryId = categoryIdArray[4];
        reqVarietySearchProducts(categoryId, searchName, searchType).then((res) => {
            this.setState({ renderData: res.data })
        })

    }
    showDetail = (item) => {
        this.props.history.push({ pathname: `/main/detail/${item._id}`, state: { item } });
    }
    buyNow = (item) => {
        const { user } = this.props;
        if (user && user._id) {
            this.props.history.push({ pathname: "/main/account", state: { item } });
        } else {
            message.error("无法立即购买，请先登录")
        }
    }
    buyCloth = (item) => {
        const { user } = this.props;
        if (user && user._id) {
            this.props.addProduct(item);
        } else {
            message.error("无法加购，请先登录")
        }
    }
    handleFavorite = (product) => {
        const { user } = this.props;
        const userId = user._id;
        persoanlAddFavorite(userId, product).then((res) => {
            if (res.msgCode === "add_success") {
                message.success(`该商品(${product.name})被收藏成功`)
            }
        })
    }
    handleCancelFavorite = (product) => {
        const { user } = this.props;
        const userId = user._id;
        console.log("===================", product)
        persoanlCancelFavorite(userId, product).then((res) => {
            if (res.msgCode === "cancel_error") {
                message.error(`该商品(${product.name})未被收藏,被收藏商品才可取消收藏`)
            }
            if (res.msgCode === "cancel_success") {
                message.success(`商品(${product.name})取消收藏成功`)
            }
        })
    }
    render() {
        const { renderData, searchName, searchType } = this.state;
        return (
            <div className="display-products">
                <div className="products-search">
                    <Select
                        value={searchType}
                        style={{ width: 150 }}
                        onChange={value => this.setState({ searchType: value })}
                    >
                        <Option value='productName'>按名称搜索</Option>
                        <Option value='productDesc'>按描述搜索</Option>
                    </Select>
                    <Input
                        placeholder='关键字'
                        style={{ width: 150, margin: '0 15px' }}
                        value={searchName}
                        onChange={event => this.setState({ searchName: event.target.value })}
                    />
                    <Button type='primary' onClick={() => this.handleSearchProduct()}>搜索</Button>
                </div>
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
                                                <Tooltip placement="topLeft" title="添加收藏" color="#FFCCCC" arrowPointAtCenter>
                                                    <HeartFilled className="card-favorite" onClick={() => this.handleFavorite(item)} />
                                                </Tooltip>,
                                                <Tooltip placement="topLeft" title="取消收藏" arrowPointAtCenter>
                                                    <IconFont type="iconcancelfavorite" className="card-cancelfavorite" onClick={() => this.handleCancelFavorite(item)} />
                                                </Tooltip>,
                                                <Tooltip placement="topLeft" title="立即购买" arrowPointAtCenter>
                                                    <IconFont type="iconbuynow" className="card-icon" onClick={() => { this.buyNow(item) }}></IconFont>
                                                </Tooltip>,
                                                <Tooltip placement="topLeft" title="查看详情" arrowPointAtCenter>
                                                    <PictureTwoTone onClick={() => { this.showDetail(item) }} />
                                                </Tooltip>,
                                                <Tooltip placement="topLeft" title="加购物车" arrowPointAtCenter>
                                                    <ShoppingCartOutlined className="card-cart" onClick={() => { this.buyCloth(item) }} />,
                                         </Tooltip>,
                                            ]}
                                    >
                                        <Meta
                                            avatar={
                                                <span className="product-price">
                                                    <IconFont type="iconprice" className="card-icon"></IconFont>
                                                    {item.price}
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
            </div>
        )
    }
}


export default connect(
    state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
    { addProduct }
)(ClothingCard)