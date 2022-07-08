
const mongoose = require("mongoose")
let Schema = mongoose.Schema
let articleSchema = new Schema({

  //标题
  title: {type: String, default: "暂无标题"},

  //描述
  des: {type: String, default: "暂无描述"},

  //md地址
  md: {type: String, required: true},

  //cover地址
  cover: {type: String, default: "/file/cover/default.jpg"},

  //日期
  date: {type: Number, default: Date.now},

  //作者
  author: {type: Schema.Types.ObjectId, ref: "user", required: true},

  //浏览数
  pv: {type: Number, default: 0}

})

module.exports = mongoose.model("article", articleSchema)







