import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Modal, Button } from 'antd'
import { connect } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons';

// import LinkButton from '../link-button'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import './index.less'
import { logout } from '../../redux/actions'

/*
左侧导航的组件
 */
class HeaderView extends Component {

  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', // 天气图片url
    weather: '', // 天气的文本
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


  render() {

    const { currentTime, dayPictureUrl, weather } = this.state

    const username = this.props.user.username

    // console.log("------user", this.props.user)

    // 得到当前需要显示的title
    // const title = this.getTitle()
    const title = this.props.headTitle
    const { user } = this.props
    return (
      <div className="header">
        <div className="header-top">

          <span>欢迎来到Only for You - {username}</span>
          {/* <LinkButton onClick={this.logout}>退出</LinkButton> */}

          {(!user || !user._id) &&
            < Button type="primary" primary className="action-item">
              <Link to='/login'>
                <span>登录</span>
              </Link>
            </Button>
          }
          {user.isAdmin && <Button type="primary" primary className="action-item">
            <Link to='/register'>
              <span>注册</span>
            </Link>
          </Button>}
          <ShoppingCartOutlined key="" className="header-icon" />
          {user.isAdmin ?
            <Button type="primary" primary className="action-item">
              <Link to='/admin'>
                <span>管理</span>
              </Link></Button>
            : null
          }
          {user.isAdmin && <Button
            type="primary"
            primary
            className="action-item"
            onClick={this.logout}
          >
            退出
          </Button>}
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div >
    )
  }
}

export default connect(
  state => ({ headTitle: state.headTitle, user: state.user }),
  { logout }
)(withRouter(HeaderView))