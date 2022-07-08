const mongoose = require("mongoose")
let Schema = mongoose.Schema
let musicSchema = new Schema({
    //歌曲名
    name: {
        type: String,
        default:"暂无歌名"
    },

    //歌曲演唱者
    artist: {
        type: String,
        default:"暂无演唱者"

    },
    music:{
        type:String,
        required:true
    },
    //封面
    cover:{
        type: String,
        default: "/file/photo/default.jpg"
    },
    //歌词
    lrc: {
        type: String,
        default: "暂无歌词"
    },
    //上传日期
    theme:{
        type:String,
        default:"#fff"

    },
    date:{
        type: Number,
        default: Date.now
    }
})

module.exports = mongoose.model("music", musicSchema)







