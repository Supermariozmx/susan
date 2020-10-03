
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  orderPrice: { type: Number, required: true },
  userAddress: { type: String },
  userPhone: { type: String},
  products: Array,
  status: { type: String, default: "paid" }, // 商品状态: 1:未完成, 2: 已完成
  create_time: { type: Number, default: Date.now },
})

// 3. 定义Model(与集合对应, 可以操作集合)
const OrderModel = mongoose.model('orders', orderSchema)



// 4. 向外暴露Model
module.exports = OrderModel