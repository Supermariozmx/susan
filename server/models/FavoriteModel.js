/*
能操作categorys集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const favoriteSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: Array,
    userName:{type:String,default:"test"}
})

// 3. 定义Model(与集合对应, 可以操作集合)
const FavoriteModel = mongoose.model('favorites', favoriteSchema)

FavoriteModel.findOne({ userId: '5eb187e7c9b2bb59fcfdc413' }).then(favorites => {
    if (!favorites) {
        FavoriteModel.create({ userId: '5eb187e7c9b2bb59fcfdc413', products:[ {"status":1,"imgs":["image-1589300608883.jpg"],"quantity":8,"_id":"5ebacd8e948cc133e0f7e00c","name":"男士衬衫","desc":"这是一件谁穿谁好看的衬衫","price":99,"detail":"<p>这个衬衫真是狠狠好看的😂</p>\n","pCategoryId":"5eb7b89ff70c283f343efc1b","categoryId":"5eb7b9a7f70c283f343efc1f","__v":0}]})
        .then(favorites => {
          console.log('--------初始化收藏')
        })
    }
  })
  

// 4. 向外暴露Model
module.exports = FavoriteModel