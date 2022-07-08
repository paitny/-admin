const mongoose = require("mongoose")
let Schema = mongoose.Schema
let swiperSchema = new Schema({
    //轮播图地址
    swiper: {
        type: String,
        required: true,
    },
    date:{
        type:Number,
        required:true,
        default:new Date()
    }
})
module.exports = mongoose.model("swiper", swiperSchema)







