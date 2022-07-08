const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const swiperDB = require("../../db/swiper")
const fs=require("fs")

let md_upload = multer({
    storage: multer.diskStorage({
        //文件存储的目录
        destination(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/file/swiperPhoto'))
        },
        //文件的名字
        filename(req, file, cb) {
            let {ext} = path.parse(file.originalname)
            req.swiper_name = `swiper-${Date.now()}${ext}`
            cb(null, req.swiper_name)
        }
    })
}).single('file')
//上传swiper
router.post("/swiperAdd", (req, res) => {

    md_upload(req, res, async (err) => {
        //上传失败
        if (err) {
            return res.send({
                code: 9,
                msg: "上传失败"
            })
        }
        //上传成功
        res.send({
            code: 0,
            msg: "cover上传成功",
            url: `/file/swiperPhoto/${req.swiper_name}`
        })
    })

})

//swiper发表
router.post("/add",async (req,res)=>{

    let {swiper}=req.body
    let doc = await swiperDB.create({
        swiper:swiper,

    })
    res.send({
        code: 0,
        msg: "轮播图上传成功",
        data: {id: doc._id}
    })
})
//swiper轮播图修改
router.post("/update",async(req,res)=>{
    let {id,doc}=req.body
    await swiperDB.findByIdAndUpdate(id, doc)
    res.send({
        code: 0,
        msg: "修改成功"
    })
})
//删除轮播图
router.post("/delete",async (req,res)=>{
    let {id}=req.body
    await swiperDB.findByIdAndRemove(id)
    res.send({
        code: 0,
        msg: "删除完成"
    })

})
module.exports = router



