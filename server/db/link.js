
const mongoose = require("mongoose")
let Schema = mongoose.Schema
let linkSchema = new Schema({
  //名称
  name: String,
  //首页
  home: String,
  //logo
  logo: String,
  //描述
  des: String
})

module.exports = mongoose.model("link", linkSchema)







