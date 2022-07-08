const mongoose = require("mongoose")
let Schema = mongoose.Schema
let contactSchema = new Schema({

  //名字
  name: {
    type: String,
    required: true
  },

  //email
  email: {
    type: String,
    required: true
  },

  //主题
  subject: {
    type: String,
    default: ""
  },

  //内容
  message: {
    type: String,
    required: ""
  },

  //日期
  date: {
    type: Number,
    default: Date.now
  },

  //是否读过
  read: {
    type: Boolean,
    default: false
  }

})

module.exports = mongoose.model("contact", contactSchema)







