import React, { Component } from 'react';
import "./culture.less";
import CarouselView from '../../components/carousel';
import han from '../../assets/images/han.jpg';
import weijin from '../../assets/images/weijin.jpg';

import { reqVarietyProduct } from "../../api/index"
import { BASE_IMG_URL } from '../../utils/constants'
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
                                        <div  className='culture-product-detail'
                                        dangerouslySetInnerHTML={{ __html: item.detail }}>
                                        </div>
                                    </div>
                                    <div className='culture-img culture-item'>
                                        < img
                                            alt="example"
                                            src={BASE_IMG_URL + item.imgs[0]}
                                        />
                                    </div>
                                </div>
                            )

                        } else {
                            return (
                                <div className="culture-block">
                                    <div className='culture-img culture-item'>
                                        <img src={han} alt='han'>
                                        </img>
                                    </div>
                                    <div className="culture-des culture-item">
                                        <h3>汉朝服饰</h3>
                                        <p> 最有名的是留仙裙</p>
                                        <p> 汉朝女人每层衣服的领子必须露出</p>
                                        <p> 层层叠叠可以超过3层</p>
                                        <p> 名曰三重衣</p>
                                        <p> 宽大的衣袖也许不太方便</p>
                                        <p> 但显得端庄大气</p>
                                    </div>
                                </div>
                            )
                        }
                    })

                    : null}
                <div className="culture-block">

                    <div className='culture-img culture-item'>
                        <img src={han} alt='han'>
                        </img>
                    </div>
                    <div className="culture-des culture-item">
                        <h3>汉朝服饰</h3>
                        <p> 最有名的是留仙裙</p>
                        <p> 汉朝女人每层衣服的领子必须露出</p>
                        <p> 层层叠叠可以超过3层</p>
                        <p> 名曰三重衣</p>
                        <p> 宽大的衣袖也许不太方便</p>
                        <p> 但显得端庄大气</p>
                    </div>
                </div>

                <div className="culture-block">
                    <div className="culture-des culture-item">
                        <h3>魏晋南北朝服饰</h3>
                        <p> 以风流人物著称的魏晋南北朝</p>
                        <p> 女孩衣服当然也要浪漫</p>
                        <p> 飘逸的长裙</p>
                        <p> 而曳地五尺是常用标准</p>
                        <p> 宽大的袖口缀有不同颜色的袖贴</p>
                        <p> 条纹间色长裙让视觉很有跳跃感</p>
                    </div>
                    <div className='culture-img culture-item'>
                        <img
                            src={weijin} alt='weijin'></img>
                    </div>
                </div>


                <div className="culture-block">
                    <div className='culture-img culture-item'>
                        <img
                            src={weijin} alt='weijin'>
                        </img>
                    </div>
                    <div className="culture-des culture-item">
                        <h3>魏晋南北朝服饰</h3>
                        <p> 以风流人物著称的魏晋南北朝</p>
                        <p> 女孩衣服当然也要浪漫</p>
                        <p> 飘逸的长裙</p>
                        <p> 而曳地五尺是常用标准</p>
                        <p> 宽大的袖口缀有不同颜色的袖贴</p>
                        <p> 条纹间色长裙让视觉很有跳跃感</p>
                    </div>
                </div>


                <div className="culture-block" >
                    <div span={12} className="culture-des culture-item">
                        <h3>隋朝服饰</h3>
                        <p> 隋朝时隋文帝厉行节俭</p>
                        <p> 衣着简朴</p>
                        <p> 不注重服装的等级尊卑</p>
                        <p> 在位时平时只戴乌纱帽</p>
                        <p> 女子服饰也简单大方</p>
                    </div>
                    <div className='culture-img culture-item' >
                        <img
                            src={weijin} alt='weijin'>
                        </img>
                    </div>
                </div>

                <div className="culture-block">
                    <div className='culture-img culture-item'>
                        <img
                            src={weijin} alt='weijin'>
                        </img></div>
                    <div className="culture-des culture-item">
                        <h3>唐朝服饰</h3>
                        <p> 隋朝时隋文帝厉行节俭</p>
                        <p> 衣着简朴</p>
                        <p> 不注重服装的等级尊卑</p>
                        <p> 在位时平时只戴乌纱帽</p>
                        <p> 女子服饰也简单大方</p>

                    </div>

                </div>

                <div className="culture-block">
                    <div span={12} className="culture-des culture-item">
                        <h3>民国时期</h3>
                        <p> 服装走向平民化、国际化、多样化</p>
                        <p> 在女性中最受欢迎的还是旗袍</p>
                        <p> 不注重服装的等级尊卑</p>
                        <p> 在位时平时只戴乌纱帽</p>
                        <p> 女子服饰也简单大方</p>

                    </div>
                    <div className='culture-img culture-item'>
                        <img
                            src={weijin} alt='weijin'>
                        </img>
                    </div>
                </div>

                <div className="culture-block">
                    <div className='culture-img culture-item'>
                        <img
                            src={weijin} alt='weijin'>
                        </img>
                    </div>
                    <div className="culture-des culture-item">
                        <h3>现代服饰</h3>
                        <p> 建国后50—70年代</p>
                        <p> 整体外部环境变化</p>
                        <p> 物质生活极为匮乏</p>
                        <p> 那一代年轻人</p>
                        <p> 不是把美、把装饰穿在身上</p>
                        <p> 而是把建设、革命等崇高的理念穿在身上</p>
                        <p> 中山装、列宁装、军服是他们的首选</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Culture