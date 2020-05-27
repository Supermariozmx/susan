import React, { Component } from 'react'
import { Carousel } from 'antd';
import "./index.less"
import weijin from '../../assets/images/weijin.jpg';

class CarouselView extends Component {
    render() {
        return (
            <>
                <Carousel autoplay>
                    <div>
                        <img className='autoplay-img' src={weijin} alt='test'></img>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </Carousel>
            </>
        )
    }
}

export default CarouselView;
