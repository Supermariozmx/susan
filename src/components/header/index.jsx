import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Icon, Drawer, Avatar, Button, InputNumber, Dropdown, Menu, Checkbox } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { ShoppingCartOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import personal from '../../assets/images/personal.jpg';

// import LinkButton from '../link-button'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import './index.less'
import { logout, removeProduct } from '../../redux/actions'


import { BASE_IMG_URL } from "../../utils/constants"

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1818861_hn2luc3ef7q.js',

});

/*
左侧导航的组件
 */
class HeaderView extends Component {
  static propTypes = {
    loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
    changeProductQuantity: PropTypes.func,
    productToChange: PropTypes.object,

  };


  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', // 天气图片url
    weather: '', // 天气的文本
    isDrawerVisible: false,
    checked: false
  }

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }

  getWeather = async () => {
    // 调用接口请求异步获取数据
    const { dayPictureUrl, weather } = await reqWeather('北京')
    // 更新状态
    this.setState({ dayPictureUrl, weather })
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }

  /*
  退出登陆
   */
  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        console.log('OK', this)
        this.props.logout()
      }
    })
  }

  /*
  第一次render()之后执行一次
  一般在此执行异步操作: 发ajax请求/启动定时器
   */
  componentDidMount() {
    // 获取当前的时间
    this.getTime()
    // 获取当前天气
    this.getWeather()
  }
  /*
  // 不能这么做: 不会更新显示
  componentWillMount () {
    this.title = this.getTitle()
  }*/

  /*
  当前组件卸载之前调用
   */
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  onCartClick = () => {
    const { isDrawerVisible } = this.state;
    const { products } = this.props.cart;
    console.log("========cartproducts", products);
    const productToAdd = this.props.cart.productToAdd;
    console.log("99999999999999productToAdd", productToAdd)
    this.setState({ isDrawerVisible: !isDrawerVisible });
    console.log("88888888888888cart", this.props.cart)
    this.handleProducts(products);
  };
  onDrawerClose = () => {
    this.setState({ isDrawerVisible: false });
  }
  handleProducts = (products) => {
    console.log("test handle products execute")
    for (let i = 0; i < products.length; i++) {
      // eslint-disable-next-line no-lone-blocks
      {
        for (let j = i + 1; j < products.length; j++) {
          if (products[i].id === products[j].id) {
            products[i].number++;
            products.splice(j, 1);
          }
        }

      }
    }
    console.log("handled products======", products)
    return products;
    // products.forEach((item) => {
    //   products.forEach((citem) => {
    //     if (item._id === citem._id) {
    //       item.number = item.number + 1
    //     }
    //   })
    // })
    // console.log("handled-=========products", products)
    // return products;

  }
  removeProduct = (item) => {
    const { removeProduct } = this.props;
    removeProduct(item);
    console.log("remove=======product", item)
  }
  handledMenu = () => {
    const { user } = this.props;
    return (
      <Menu onClick={() => { }}>
        <Menu.Item key="1" icon={<UserOutlined />}>

          <IconFont
            type="iconregister"
            className="action-item"
            onClick={() => { this.props.history.push("./register") }}
          />
          注册
      </Menu.Item>
        {(!user || !user._id) && <Menu.Item key="2">
          <IconFont
            type="iconzhanghaodenglu"
            className="action-item"
            onClick={() => { this.props.history.replace("./login") }}
          />
          登录
      </Menu.Item>}
        {user && user._id && <Menu.Item key="3">
          <IconFont
            type="iconlogout"
            className="action-item"
            onClick={this.logout}
          />
          退出
      </Menu.Item>}
        {user.isAdmin && <Menu.Item key="4">
          <IconFont
            type="iconadmin"
            className="action-item"
            onClick={() => { this.props.history.push('/admin') }}
          />
          管理
      </Menu.Item>
        }
      </Menu>
    );
  }
  render() {

    const { currentTime, dayPictureUrl, weather, isDrawerVisible } = this.state

    const username = this.props.user.username
    const products = this.props.cart.products;

    // const menu =
    //   (
    //     <Menu onClick={() => { }}>
    //       <Menu.Item key="1" icon={<UserOutlined />}>

    //         <IconFont
    //           type="iconregister"
    //           className="action-item"
    //         />
    //         注册
    //     </Menu.Item>
    //       {/* <Menu.Item key="2" icon={<UserOutlined />}>
    //       <IconFont
    //         type="iconzhanghaodenglu"
    //         className="action-item"
    //       />
    //       登录
    //     </Menu.Item> */}
    //       <Menu.Item key="3" icon={<UserOutlined />}>
    //         <IconFont
    //           type="iconlogout"
    //           className="action-item"

    //         />
    //         退出
    //     </Menu.Item>
    //       <Menu.Item key="3" icon={<UserOutlined />}>
    //         <IconFont
    //           type="iconadmin"
    //           className="action-item"
    //           onClick={() => { this.props.history.push('/admin') }}
    //         />
    //         管理
    //     </Menu.Item>

    //     </Menu>
    //   );


    // 得到当前需要显示的title
    // const title = this.getTitle()
    const title = this.props.headTitle
    // const { user } = this.props;
    return (
      <div className="header" >
        <div className="header-top">
          <div className="header-action-bar">
            <span>欢迎来到Only for You - {username}</span>
            <Dropdown overlay={this.handledMenu} className="quick-dropdown header-action">
              <Button>
                <IconFont type="iconquick" /><DownOutlined />
              </Button>
            </Dropdown>

            <IconFont
              type="iconhome"
              className="action-item header-action"
              onClick={() => { this.props.history.push('/main') }}
            >
            </IconFont>
            <IconFont
              type="iconadvice"
              className="action-item header-action"
              onClick={() => { this.props.history.push('/advice') }}
            >
            </IconFont>
            {/* {(!user || !user._id) &&

            <IconFont
              type="iconzhanghaodenglu"
              className="action-item"
              onClick={() => { this.props.history.push('/login') }}
            >
            </IconFont>
          } */}

            {/* <IconFont
            type="iconregister"
            className="action-item"
            onClick={() => { this.props.history.push('/register') }}
          >
          </IconFont> */}

            {/* {user.isAdmin ?
            <IconFont
              type="iconadmin"
              className="action-item"
              onClick={() => { this.props.history.push('/admin') }}
            >
            </IconFont>
            : null
          } */}
            {/* <IconFont
            type="iconlogout"
            className="action-item"
            onClick={this.logout}
          >
          </IconFont> */}
            <ShoppingCartOutlined className="action-item header-action" onClick={() => { this.onCartClick() }} />
            <Avatar shape="square" className="header-action" size={32} src={personal} onClick={() => { this.props.history.push("/main/personal") }} />
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
        <Drawer
          className="cart-drawer"
          title="购物车"
          placement="right"
          closable={true}
          onClose={() => { this.onDrawerClose() }}
          visible={isDrawerVisible}
        >
          {products ? <div className="cart-product" >
            {this.handleProducts(products).map((item, index) => {
              // console.log("购物车内商品", item)
              return (<div className='product-wrap' key={index}>
                <span className='product-title'>{item.name}</span>
                <div className='product-content'>
                  <Checkbox
                    className='product-check'
                    checked={this.state.checked}
                    onChange={this.onChange}
                  >
                  </Checkbox>
                  <Avatar shape="square" size={48} src={BASE_IMG_URL + item.imgs[0]} />
                  <InputNumber size="small" className="product-number" min={1} max={100000} defaultValue={3} onChange={() => { }} />
                  <IconFont type='icondelete' className='product-action'
                    onClick={(item) => { this.removeProduct(item) }}></IconFont>
                </div>
              </div>)
            })}
            <div className='cart-footer'>
              <Button className='footer-button cart-count'>结算</Button>
              <Button className='footer-button '>清空</Button>
            </div>
          </div> : null}


        </Drawer>
      </div >

    )
  }
}

export default connect(
  state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
  { logout, removeProduct }
)(withRouter(HeaderView))