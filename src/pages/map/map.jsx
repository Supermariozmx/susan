import React, { Component } from 'react'
import { message } from 'antd'
import "./map.less"


class ShopMap extends Component {

    componentDidMount() {
        // const _this = this
        var onComplete = function (data) {
            map.clearMap()//清除地图上所有的覆盖物
            console.log("=====data", data)

            handleSearch(data)
        }
        var onError = function (data) {
            console.log("-----error ----data",data)
            message.error('定位出错，请开启定位服务')
        }


        //TODO:
        //1.点击marker，出现详情
        //2.点击marker，进行路线导航

        var handleSearch=function(data){
            const pos=data.position
            console.log("qqqqqqqqqqqqqqqqqqqqqq  search data",data);
            if (data.info === "SUCCESS" && data.type === 'complete') {
                message.success('成功定位您的位置,已为你显示附近门店')
                window.AMap.service(["AMap.PlaceSearch"], function() {
                    //构造地点查询类
                    var placeSearch = new window.AMap.PlaceSearch({ 
                        pageSize: 10, // 单页显示结果条数
                        pageIndex: 1, // 页码
                        city: "167", // 兴趣点城市
                        // citylimit: true,  //是否强制限制在设置的城市内搜索
                        map: map, // 展现结果的地图实例
                        extensions:'base'
                        // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                        // type:''
                    });
                    //关键字查询
                    // placeSearch.search('酒店');
                    placeSearch.searchNearBy("酒店",pos,5000,function(status,result){
                        console.log("酒店=====结果",result)
                        if(result.info==='OK'&&result.type==='complete'){
                         const pois=result.poiList.pois
                         console.log('==========位置信息',pois)
                        }
                    })
                    // window.AMap.event.addListener(placeSearch, 'complete', function(data){
                    // console.log("-----search  data----",data)
                    // })//返回定位信息
                });
            }
            else {
                message.error('调用地图服务出错')
            }
        }


        let content = this.refs.container

        let map = new window.AMap.Map(content, {
            resizeEnable: true,
            zoom: 15,

            rotateEnable:true,
            pitchEnable:true,
            pitch:80,
            rotation:-15,
            viewMode:'3D',//开启3D视图,默认为关闭
            buildingAnimation:true,//楼块出现是否带动画    
            expandZoomRange:true,
            zooms:[3,20],
            mapStyle:'amap://styles/macaron'
        })

        window.AMap.plugin('AMap.ToolBar', function () { //异步加载插件
            var toolbar = new window.AMap.ToolBar();
            map.addControl(toolbar);
            map.plugin(["AMap.Scale"], function () {
                var scale = new window.AMap.Scale();
                map.addControl(scale);
            });

            map.plugin('AMap.Geolocation', function () {
                const geolocation = new window.AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 10000, //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, //定位结果缓存0毫秒，默认：0
                    convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true, //显示定位按钮，默认：true
                    buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new window.AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    // buttonDom: locationIcon
                });
                map.addControl(geolocation);
                window.AMap.event.addListener(geolocation, 'complete', onComplete)//返回定位信息
                window.AMap.event.addListener(geolocation, 'error', onError)//返回定位出错信息          
            });
          
        });


    }
    render() {

        return (
            <div className="shop-map">
                <div className="map-container" ref="container">

                </div>
            </div>
        )
    }
}

export default ShopMap;