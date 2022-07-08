const mongoose = require("mongoose")
let Schema = mongoose.Schema
let videoSchema = new Schema({
    //视频地址
    video: {
        type: String,
        required: true,
    },
    title:{
        type:String,
        default:"暂无标题"
    },
    //日期
    date: {
        type: Number,
        default: Date.now
    },
    videoCover:{
        type:String,
        default:"/file/videoCover/default.jpg"
    }
})
module.exports = mongoose.model("video", videoSchema)