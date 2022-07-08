
const mongoose = require("mongoose")
let Schema = mongoose.Schema
let messageSchema = new Schema({
  //留言内容
  text: {
    type: String,
    required: true
  },

  //日期
  date: {
    type: Number,
    default: Date.now
  },

  //点赞
  likes: [
    {type: Schema.Types.ObjectId}
  ],

  //用户
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  //子评论
  children: [
    {
      //留言内容
      text: String,
      //用户
      author: {type: Schema.Types.ObjectId, ref: "user"},
      //点赞
      likes: [{type: Schema.Types.ObjectId}],
      //日期
      date: {type: Number, default: Date.now},
      //回复谁
      replyUser: {type: Schema.Types.ObjectId, ref: "user"}
    }
  ]

})

module.exports = mongoose.model("message", messageSchema)







