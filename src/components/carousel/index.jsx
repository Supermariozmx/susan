import React, { Component } from 'react'
import { Carousel } from 'antd';
import "./index.less"
import autoplay1 from '../../assets/images/autoplay1.jpg';
import autoplay2 from '../../assets/images/autoplay2.jpg';
import autoplay3 from '../../assets/images/autoplay3.jpg';
import autoplay4 from '../../assets/images/autoplay4.jpg';

class CarouselView extends Component {
    render() {
        return (
            <>
                <Carousel autoplay className="autoplay-wrap">
                  
                    {
                        [autoplay1,autoplay2,autoplay3,autoplay4].map((item)=>{
                            return(<div className='autoplay-block'>
                            <img className='autoplay-img' src={item} alt={item}>
                            </img>
                            </div>)
                        })
                    }
                </Carousel>
            </>
        )
    }
}

export default CarouselView;
