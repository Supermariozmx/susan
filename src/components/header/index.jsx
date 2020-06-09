import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Icon, Drawer, Avatar, Button, Dropdown, Menu, Popconfirm, Table, InputNumber } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { ShoppingCartOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import personal from '../../assets/images/personal.jpg';
import { BASE_IMG_URL } from '../../utils/constants'
// import LinkButton from '../link-button'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import './index.less'
import { logout, removeProduct, clearCart, setProductNumber } from '../../redux/actions'


const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1818861_hn2luc3ef7q.js',

});


// const mockData = [{
//   categoryId: "5eb7b9bbf70c283f343efc20",
//   desc: "你就是最美的仙女",
//   detail: "<p></p>↵",
//   imgs: ["image-1590812451282.jpg"],
//   name: "最美连衣裙",
//   pCategoryId: "5eb7b987f70c283f343efc1d",
//   price: 188,
//   quantity: 9,
//   status: 1,
//   _id: "5eb7b968f70c283f343efc1c",
//   number: 1
// },
// {
//   categoryId: "5eb7b9bbf70c283f343efc20",
//   desc: "复古、修身",
//   detail: "<p></p>↵",
//   imgs: ["image-1590812451282.jpg"],
//   name: "复古连衣裙",
//   pCategoryId: "5eb7b987f70c283f343efc1d",
//   price: 188,
//   quantity: 9,
//   status: 1,
//   _id: "test2",
//   number: 1
// },
// {
//   categoryId: "5eb7b9bbf70c283f343efc20",
//   desc: "红色连衣裙",
//   detail: "<p></p>↵",
//   imgs: ["image-1590812451282.jpg"],
//   name: "显瘦连衣裙",
//   pCategoryId: "5eb7b987f70c283f343efc1d",
//   price: 168,
//   quantity: 9,
//   status: 2,
//   _id: "test3",
//   number: 1
// },
// ]

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
    checked: false,
    isPopupDisabled: true
  }

  // getTime = () => {
  //   // 每隔1s获取当前时间, 并更新状态数据currentTime
  //   this.intervalId = setInterval(() => {
  //     const currentTime = formateDate(Date.now())
  //     this.setState({ currentTime })
  //   }, 1000)
  // }

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
    // this.getTime()
    // 获取当前天气
    this.getWeather()
  }

  componentWillMount() {
    this.initColumns()
  }


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
    // this.handleProducts(products);
  };
  onDrawerClose = () => {
    this.setState({ isDrawerVisible: false });
  }

  handleRemoveProduct = (product) => {
    const { removeProduct } = this.props;
    // removeProduct(product);
    console.log("remove=======product", product)
  }
  handleClear = () => {
    const { clearCart } = this.props;
    clearCart();
  }
  handledMenu = () => {
    const { user } = this.props;
    return (
      <Menu onClick={() => { }}>
        <Menu.Item key="1" icon={<UserOutlined />}>

          <IconFont
            type="iconregister"
            className="action-item"
            onClick={() => { this.props.history.push("/register") }}
          />
          注册
      </Menu.Item>
        {(!user || !user._id) && <Menu.Item key="2">
          <IconFont
            type="iconzhanghaodenglu"
            className="action-item"
            onClick={() => { this.props.history.replace("/login") }}
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
  handleEmail = () => {
    window.location.href = "https://outlook.live.com/owa/"
  }
  handleProductNumber = (value, product) => {
    console.log("===================number", value);
    console.log("-------------------order", product);
    product.number = value;
    console.log("handled product ---------", product)

  }
  handleAccount = () => {
    this.setState({
      isDrawerVisible: false
    })
    this.props.history.push("/main/account")
  }
  initColumns = () => {
    this.columns = [
      {
        width: 130,
        title: '',
        render: (product) => {
          return (
            <div className="product-title">
              <span>{product.name}</span>
              <Avatar shape="square" className="header-action" size={32}
                src={BASE_IMG_URL + product.imgs[0]} />
            </div>
          )
        }

      },
      {
        title: '',
        render: (product) => {
          return (
            <InputNumber
              size="small"
              className="product-number"
              min={1}
              max={product.quantity}
              defaultValue={product.number}
              onChange={(value) => { this.handleProductNumber(value, product) }} />
          )
        }
      },
      {
        title: '',
        dataIndex: 'price',
      },
      {
        title: '',
        dataIndex: '',
        render: (product) => {
          return (
            <IconFont type='icondelete' className='product-action'
              onClick={() => { this.handleRemoveProduct(product) }}></IconFont>
          )
        }
      },
    ];
  }

  render() {

    const { currentTime, dayPictureUrl, weather, isDrawerVisible } = this.state

    const username = this.props.user.username
    const products = this.props.cart.products;
    const rowSelection = {
      //可直接根据onChange来确定选择了哪行物品
      onChange: (selectedRowKeys, selectedRows) => {
        console.log("===============onChange")
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      // onSelect: (record, selected, selectedRows) => {
      //   console.log("===============onSelect")
      //   console.log(record, selected, selectedRows);
      // },
      onSelectAll: (selected, selectedRows) => {
        console.log("===============onSelectAll")
        console.log(selected, selectedRows);
      },
    };

    const title = this.props.headTitle
    // const {user} = this.props;
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
            {/* <IconFont
              type="iconadvice"
              className="action-item header-action"
              onClick={() => { this.setState({ isPopupDisabled: false }) }}
            // onClick={() => { this.props.history.push('/advice') }}
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

          <Table
            bordered={false}
            // showHeader={false}
            rowKey='_id'
            loading={false}
            rowSelection={rowSelection}
            dataSource={products}
            columns={this.columns}
            pagination={false}
          />
          <div className='cart-footer'>
            <Button className='footer-button cart-count' onClick={() => { this.handleAccount() }}>结算</Button>
            <Button className='footer-button ' onClick={() => { this.handleClear() }}>清空</Button>
          </div>
          <Popconfirm title="欢迎提出建议"
            icon={<IconFont
              type="iconadvice"
            // onClick={() => { this.props.history.push('/advice') }}
            />}
            // disabled={this.state.isPopupDisabled}
            onConfirm={() => { this.handleEmail() }}
          >
          </Popconfirm>,
        </Drawer>
      </div >

    )
  }
}

export default connect(
  state => ({ headTitle: state.headTitle, user: state.user, cart: state.cart }),
  { logout, removeProduct, clearCart, setProductNumber }
)(withRouter(HeaderView))