const mongoose = require("mongoose")
const  bcrypt=require("bcrypt")
let Schema = mongoose.Schema
let userSchema = new Schema({
  //用户名
  user: {
    type: String,
    required: true
  },

  //密码
  pass: {
    type: String,
    required: true,
    set(value){
      return bcrypt.hashSync(value,10)
    },
  },

  //头像
  photo: {
    type: String,
    default: "/file/photo/default.jpg"
  },
  //是否管理员
  admin: {
    type: Boolean,
    default: false
  },
  //秘钥
  secret:{
    type:String,
    required:true
  },
  date:{
    type: Number,
    default: Date.now
  }
})

module.exports = mongoose.model("user", userSchema)







