/*
用来定义路由的路由器模块
 */
const express = require('express')
const md5 = require('blueimp-md5')

const UserModel = require('../models/UserModel')
const CategoryModel = require('../models/CategoryModel')
const ProductModel = require('../models/ProductModel')
const RoleModel = require('../models/RoleModel')
const OrderModel = require('../models/OrderModel')
const FavoriteModel = require('../models/FavoriteModel')


// 得到路由器对象
const router = express.Router()
// console.log('router', router)

// 指定需要过滤的属性
const filter = { password: 0, __v: 0 }



//用户添加收藏
router.post('/personal/favorites/add', (req, res) => {
  const { userId, product } = req.body
  FavoriteModel.find({ userId: userId }).then((data) => {
    if (data.length > 0) {
      FavoriteModel.updateOne({ userId: userId }, { $addToSet: { products: [product] } })
        .then(data => {
          console.log("-------------- add favorite", data)
          res.send({ status: 0, msg: "添加收藏成功", msgCode: "add_success" })
        }).catch(error => {
          res.send({ status: 1, msg: '更新收藏异常, 请重新尝试' })
        })
    } else {
      FavoriteModel.create({ userId: userId, products: [product] })
        .then(favorites => {
          res.send({ status: 0, data: favorites, msg: "添加收藏成功", msgCode: "add_success" })
        })
        .catch(error => {
          console.error('创建收藏异常,', error)
          res.send({ status: 1, msg: '创建收藏异常, 请重新尝试' })
        })
    }
  })
})


//用户取消收藏
router.post('/personal/favorites/delete', (req, res) => {
  // console.log("==============req.  favorite", req)
  const { userId, product } = req.body
  FavoriteModel.findOne({ "products._id": product._id, "userId": userId }).then((data) => {
    if (data) {
      FavoriteModel.updateOne({ userId: userId }, { $pull: { "products": { _id: product._id } } })
        .then(data => {
          res.send({ status: 0, msg: "取消收藏成功", msgCode: "cancel_success" })
        }).catch(error => {
          res.send({ status: 1, msg: '取消收藏失败, 请重新尝试' })
        })
    } else {
      res.send({ status: 1, msg: '该用户不存在或该商品未被收藏, 请重新尝试', msgCode: "cancel_error" })
    }
  }).catch((error) => {
    res.send({ status: 1, msg: '取消收藏失败, 请重新尝试' })
  })
})

//获取用户收藏列表
router.get('/personal/favorites/list', (req, res) => {
  const { userId } = req.query
  FavoriteModel.findOne({ userId: userId })
    .then(favorites => {
      res.send({ status: 0, data: favorites })
    })
    .catch(error => {
      console.error('获取收藏列表失败', error)
      res.send({ status: 1, msg: '获取收藏列表失败, 请重新尝试' })
    })
})


// 获取订单
router.get('/manage/order/list', (req, res) => {
  const { pageNum, pageSize } = req.query
  OrderModel.find({})
    .then(orders => {
      res.send({ status: 0, data: pageFilter(orders, pageNum, pageSize) })
    })
    .catch(error => {
      console.error('获取订单列表失败', error)
      res.send({ status: 1, msg: '获取订单列表失败, 请重新尝试' })
    })
})


//获取某个用户的订单

router.get('/manage/order/personal', (req, res) => {
  const { userId } = req.query
  OrderModel.find({ userId: userId })
    .then(orders => {
      res.send({ status: 0, data: orders })
    })
    .catch(error => {
      console.error('获取个人订单列表失败', error)
      res.send({ status: 1, msg: '获取个人订单列表失败, 请重新尝试' })
    })
})

// 搜索订单列表
router.get('/manage/order/search', (req, res) => {
  const { pageNum, pageSize, userName, userPhone } = req.query
  let contition = {}
  if (userName) {
    contition = { userName: new RegExp(`^.*${userName}.*$`) }
  } else if (userPhone) {
    contition = { userPhone: new RegExp(`^.*${userPhone}.*$`) }
  }
  OrderModel.find(contition)
    .then(orders => {
      res.send({ status: 0, data: pageFilter(orders, pageNum, pageSize) })
    })
    .catch(error => {
      console.error('搜索商品列表异常', error)
      res.send({ status: 1, msg: '搜索商品列表异常, 请重新尝试' })
    })
})


// 更新订单
router.post('/manage/order/update', (req, res) => {
  const order = req.body
  OrderModel.findOneAndUpdate({ _id: order._id }, order)
    .then(old => {
      res.send({ status: 0 })
    })
    .catch(error => {
      console.error('更新订单异常', error)
      res.send({ status: 1, msg: '更新订单异常, 请重新尝试' })
    })
})


//生成新的订单

router.post('/manage/order/add', (req, res) => {
  const order = req.body
  OrderModel.create(order)
    .then(order => {
      res.send({ status: 0, data: order })
    })
    .catch(error => {
      console.error('生成订单异常', error)
      res.send({ status: 1, msg: '生成订单异常, 请重新尝试' })
    })
})



// 更新订单状态(完成/未完成)
router.post('/manage/order/updateStatus', (req, res) => {
  const { orderId, status } = req.body
  OrderModel.findOneAndUpdate({ _id: orderId }, { status })
    .then(old => {
      res.send({ status: 0 })
    })
    .catch(error => {
      console.error('更新订单状态异常', error)
      res.send({ status: 1, msg: '更新订单状态异常, 请重新尝试' })
    })
})





// 登陆
router.post('/login', (req, res) => {
  const { username, password } = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  UserModel.findOne({ username, password: md5(password) })
    .then(user => {
      if (user) { // 登陆成功
        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
        if (user.role_id) {
          RoleModel.findOne({ _id: user.role_id })
            .then(role => {
              user._doc.role = role
              console.log('role user', user)
              res.send({ status: 0, data: user })
            })
        } else {
          user._doc.role = { menus: [] }
          // 返回登陆成功信息(包含user)
          res.send({ status: 0, data: user })
        }

      } else {// 登陆失败
        res.send({ status: 1, msg: '用户名或密码不正确!' })
      }
    })
    .catch(error => {
      console.error('登陆异常', error)
      res.send({ status: 1, msg: '登陆异常, 请重新尝试' })
    })
})


router.post('/compare', (req, res) => {
  const { username, password } = req.body
  console.log("req.body--------compare", req.body)
  UserModel.findOne({ username, password: md5(password) })
    .then(user => {
      if (user) {
        res.send({ status: 0, data: user })
      }
      else {
        res.send({ status: 1, msg: '原密码不正确!' })
      }
    })
    .catch(error => {
      res.send({ status: 1, msg: '验证密码异常, 请重新尝试' })
    })
})



// 添加用户
router.post('/manage/user/add', (req, res) => {
  // 读取请求参数数据
  const { username, password } = req.body
  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  console.log("server========req.body", req.body)
  UserModel.findOne({ username })
    .then(user => {
      // 如果user有值(已存在)
      if (user) {
        // 返回提示错误的信息
        res.send({ status: 1, msg: '此用户已存在' })
        return new Promise(() => {
        })
      } else { // 没值(不存在)
        // 保存
        return UserModel.create({ ...req.body, password: md5(password || '123456') })
      }
    })
    .then(user => {
      // 返回包含user的json数据
      res.send({ status: 0, data: user })
    })
    .catch(error => {
      console.error('注册异常', error)
      res.send({ status: 1, msg: '添加用户异常, 请重新尝试' })
    })
})


// 更新用户
router.post('/manage/user/update', (req, res) => {
  const user = req.body
  UserModel.findOneAndUpdate({ _id: user._id }, user)
    .then(oldUser => {
      console.log("更新用户----------post 数据", user);
      console.log("-----------------older user", oldUser)
      const data = Object.assign(oldUser, user)
      // 返回
      res.send({ status: 0, data })
    })
    .catch(error => {
      console.error('更新用户异常', error)
      res.send({ status: 1, msg: '更新用户异常, 请重新尝试' })
    })
})

// 删除用户
router.post('/manage/user/delete', (req, res) => {
  const { userId } = req.body
  UserModel.deleteOne({ _id: userId })
    .then((doc) => {
      res.send({ status: 0 })
    })
})

// 获取用户信息的路由(根据cookie中的userid)
/*router.get('/user', (req, res) => {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({status: 1, msg: '请先登陆'})
  }
  // 根据userid查询对应的user
  UserModel.findOne({_id: userid}, filter)
    .then(user => {
      if (user) {
        res.send({status: 0, data: user})
      } else {
        // 通知浏览器删除userid cookie
        res.clearCookie('userid')
        res.send({status: 1, msg: '请先登陆'})
      }
    })
    .catch(error => {
      console.error('获取用户异常', error)
      res.send({status: 1, msg: '获取用户异常, 请重新尝试'})
    })
})*/

// 获取所有用户列表
router.get('/manage/user/list', (req, res) => {
  UserModel.find({ username: { '$ne': 'admin' } })
    .then(users => {
      RoleModel.find().then(roles => {
        res.send({ status: 0, data: { users, roles } })
      })
    })
    .catch(error => {
      console.error('获取用户列表异常', error)
      res.send({ status: 1, msg: '获取用户列表异常, 请重新尝试' })
    })
})

//获取单个用户


router.get('/personal/user', (req, res) => {
  const userId = req.query.userId
  UserModel.findOne({ _id: userId })
    .then(userInfo => {
      res.send({ status: 0, data: userInfo })
    })
    .catch(error => {
      console.error('获取信息异常', error)
      res.send({ status: 1, msg: '获取分类信息异常, 请重新尝试' })
    })
})




// 添加分类
router.post('/manage/category/add', (req, res) => {
  const { categoryName, parentId } = req.body
  CategoryModel.create({ name: categoryName, parentId: parentId || '0' })
    .then(category => {
      res.send({ status: 0, data: category })
    })
    .catch(error => {
      console.error('添加分类异常', error)
      res.send({ status: 1, msg: '添加分类异常, 请重新尝试' })
    })
})

// 获取分类列表
router.get('/manage/category/list', (req, res) => {
  const parentId = req.query.parentId || '0'
  CategoryModel.find({ parentId })
    .then(categorys => {
      res.send({ status: 0, data: categorys })
    })
    .catch(error => {
      console.error('获取分类列表异常', error)
      res.send({ status: 1, msg: '获取分类列表异常, 请重新尝试' })
    })
})

// 更新分类名称
router.post('/manage/category/update', (req, res) => {
  const { categoryId, categoryName } = req.body
  CategoryModel.findOneAndUpdate({ _id: categoryId }, { name: categoryName })
    .then(oldCategory => {
      res.send({ status: 0 })
    })
    .catch(error => {
      console.error('更新分类名称异常', error)
      res.send({ status: 1, msg: '更新分类名称异常, 请重新尝试' })
    })
})

// 根据分类ID获取分类
router.get('/manage/category/info', (req, res) => {
  const categoryId = req.query.categoryId
  CategoryModel.findOne({ _id: categoryId })
    .then(category => {
      res.send({ status: 0, data: category })
    })
    .catch(error => {
      console.error('获取分类信息异常', error)
      res.send({ status: 1, msg: '获取分类信息异常, 请重新尝试' })
    })
})


// 添加产品
router.post('/manage/product/add', (req, res) => {
  const product = req.body
  ProductModel.create(product)
    .then(product => {
      res.send({ status: 0, data: product })
    })
    .catch(error => {
      console.error('添加产品异常', error)
      res.send({ status: 1, msg: '添加产品异常, 请重新尝试' })
    })
})

// 获取产品分页列表
router.get('/manage/product/list', (req, res) => {
  const { pageNum, pageSize } = req.query
  ProductModel.find({})
    .then(products => {
      res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) })
    })
    .catch(error => {
      console.error('获取商品列表异常', error)
      res.send({ status: 1, msg: '获取商品列表异常, 请重新尝试' })
    })
})

// 搜索产品列表
router.get('/manage/product/search', (req, res) => {
  const { pageNum, pageSize, searchName, productName, productDesc } = req.query
  const categoryId = req.query.categoryId
  let contition = {}
  if (productName) {
    contition = { name: new RegExp(`^.*${productName}.*$`) }
  } else if (productDesc) {
    contition = { desc: new RegExp(`^.*${productDesc}.*$`) }
  }
  ProductModel.find(contition)
    .then(products => {
      res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) })
    })
    .catch(error => {
      console.error('搜索商品列表异常', error)
      res.send({ status: 1, msg: '搜索商品列表异常, 请重新尝试' })
    })
})

//种类下商品进行搜索

router.get('/main/product/category/search', (req, res) => {
  const { productName, productDesc, categoryId } = req.query
  console.log("---------search", req)
  let contition = {}
  if (productDesc) {
    ProductModel.find({ "desc": new RegExp(`^.*${productDesc}.*$`), "categoryId": categoryId })
      .then(products => {
        res.send({ status: 0, data: products })
      })
      .catch(error => {
        console.error('分类搜索商品列表异常', error)
        res.send({ status: 1, msg: '分类搜索商品列表异常, 请重新尝试' })
      })
  }
  if (productName) {
    ProductModel.find({ "name": new RegExp(`^.*${productName}.*$`), "categoryId": categoryId })
      .then(products => {
        res.send({ status: 0, data: products })
      })
      .catch(error => {
        console.error('分类搜索商品列表异常', error)
        res.send({ status: 1, msg: '分类搜索商品列表异常, 请重新尝试' })
      })
  }

})

//搜索不同种类商品
router.get('/main/product/category', (req, res) => {
  const categoryId = req.query.categoryId
  ProductModel.find({ categoryId: categoryId })
    .then(product => {
      res.send({ status: 0, data: product })
    })
    .catch(error => {
      console.error('获取分类信息异常', error)
      res.send({ status: 1, msg: '获取分类信息异常, 请重新尝试' })
    })
})


// 更新产品
router.post('/manage/product/update', (req, res) => {
  const product = req.body
  ProductModel.findOneAndUpdate({ _id: product._id }, product)
    .then(oldProduct => {
      res.send({ status: 0 })
    })
    .catch(error => {
      console.error('更新商品异常', error)
      res.send({ status: 1, msg: '更新商品名称异常, 请重新尝试' })
    })
})

// 更新产品状态(上架/下架)
router.post('/manage/product/updateStatus', (req, res) => {
  const { productId, status } = req.body
  ProductModel.findOneAndUpdate({ _id: productId }, { status })
    .then(oldProduct => {
      res.send({ status: 0 })
    })
    .catch(error => {
      console.error('更新产品状态异常', error)
      res.send({ status: 1, msg: '更新产品状态异常, 请重新尝试' })
    })
})




// 添加角色
router.post('/manage/role/add', (req, res) => {
  const { roleName } = req.body
  RoleModel.create({ name: roleName })
    .then(role => {
      res.send({ status: 0, data: role })
    })
    .catch(error => {
      console.error('添加角色异常', error)
      res.send({ status: 1, msg: '添加角色异常, 请重新尝试' })
    })
})

// 获取角色列表
router.get('/manage/role/list', (req, res) => {
  RoleModel.find()
    .then(roles => {
      res.send({ status: 0, data: roles })
    })
    .catch(error => {
      console.error('获取角色列表异常', error)
      res.send({ status: 1, msg: '获取角色列表异常, 请重新尝试' })
    })
})

// 更新角色(设置权限)
router.post('/manage/role/update', (req, res) => {
  const role = req.body
  role.auth_time = Date.now()
  RoleModel.findOneAndUpdate({ _id: role._id }, role)
    .then(oldRole => {
      // console.log('---', oldRole._doc)
      res.send({ status: 0, data: { ...oldRole._doc, ...role } })
    })
    .catch(error => {
      console.error('更新角色异常', error)
      res.send({ status: 1, msg: '更新角色异常, 请重新尝试' })
    })
})


/*
得到指定数组的分页信息对象
 */
function pageFilter(arr, pageNum, pageSize) {
  pageNum = pageNum * 1
  pageSize = pageSize * 1
  const total = arr.length
  const pages = Math.floor((total + pageSize - 1) / pageSize)
  const start = pageSize * (pageNum - 1)
  const end = start + pageSize <= total ? start + pageSize : total
  const list = []
  for (var i = start; i < end; i++) {
    list.push(arr[i])
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list
  }
}

require('./file-upload')(router)

module.exports = router