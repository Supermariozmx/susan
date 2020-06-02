import React, { Component } from 'react';
import "./culture.less";
import CarouselView from '../../components/carousel';
import { reqVarietyProduct } from "../../api/index"
import { BASE_IMG_URL } from '../../utils/constants'
import { Button } from 'antd'
// import { PictureTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
/*
应用的根组件
 */
class Culture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderCultureData: []
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
        const categoryId = categoryIdArray[3];
        const result = await reqVarietyProduct(categoryId)
        if (result.status === 0) {
            // console.log("--------------------test anne result", result.data)
            // this.data = result;
            this.setState({ renderCultureData: result.data })
            console.log("==================culture", this.state.renderCultureData)
        } else {
            console.log("------------error")
        }

    }

    render() {
        const { renderCultureData } = this.state;
        return (
            <div className="culture-content">
                <CarouselView></CarouselView>
                {renderCultureData ?
                    renderCultureData.map((item, index) => {
                        if (index % 2 === 0) {
                            return (

                                <div className="culture-block">
                                    <div className="culture-des culture-item">
                                        <div className='culture-product-detail'
                                            dangerouslySetInnerHTML={{ __html: item.detail }}>
                                        </div>
                                        <Button type="dashed" className='culture-more' block>
                                            查看更多
                                       </Button>
                                    </div>
                                    <div className='culture-img culture-item'>
                                        < img
                                            alt="example"
                                            src={BASE_IMG_URL + item.imgs[0]}
                                        />
                                        <div className='culture-product-content'>
                                            <p className='culture-product-name'>
                                                {item.name}
                                            </p>
                                            <p className='culture-product-price'>
                                                ￥{item.price}
                                            </p>
                                            <p className='culture-product-des'>
                                                {item.desc}
                                            </p>
                                            <div className="culture-product-action">
                                                <Button type="dashed" className='action-button view-button' >
                                                    查看
                                             </Button>
                                                <Button type="dashed" className='action-button buy-button' >
                                                    购买
                                             </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        } else {
                            return (
                                <div className="culture-block">
                                    <div className='culture-img culture-item'>
                                        < img
                                            alt="example"
                                            src={BASE_IMG_URL + item.imgs[0]}
                                        />
                                        <div className='culture-product-content'>
                                            <p className='culture-product-name'>
                                                {item.name}
                                            </p>
                                            <p className='culture-product-price'>
                                                ￥{item.price}
                                            </p>
                                            <p className='culture-product-des'>
                                                {item.desc}
                                            </p>
                                            <div className="culture-product-action">
                                                {/* <PictureTwoTone className="action-item" onClick={() => { }} />,
                                            <ShoppingCartOutlined key="" className="action-item" onClick={() => { }} /> */}
                                                <Button type="dashed" className='action-button view-button' >
                                                    查看
                                             </Button>
                                                <Button type="dashed" className='action-button buy-button' >
                                                    购买
                                             </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="culture-des culture-item">
                                        <div className='culture-product-detail'
                                            dangerouslySetInnerHTML={{ __html: item.detail }}>
                                        </div>
                                        <Button type="dashed" className='culture-more'>
                                            查看更多
                                       </Button>
                                    </div>
                                </div>
                            )
                        }
                    })

                    : null}


            </div>
        )
    }
}

export default Culture