const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const VideoDB=require("../../db/video")
let vd_upload = multer({
    storage: multer.diskStorage({
        //文件存储的目录
        destination(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/file/videoPlayer'))
        },
        //文件的名字
        filename(req, file, cb) {
            let {ext} = path.parse(file.originalname)
            req.video_name = `video-${Date.now()}${ext}`
            cb(null, req.video_name)
        }
    })
}).single('file')

let vc_upload = multer({
    storage: multer.diskStorage({
        //文件存储的目录
        destination(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/file/videoCover'))
        },
        //文件的名字
        filename(req, file, cb) {
            let {ext} = path.parse(file.originalname)
            req.videoCover_name = `videoCover-${Date.now()}${ext}`
            cb(null, req.videoCover_name)
        }
    })
}).single('file')
//上传video
router.post("/videoAdd", (req, res) => {

    vd_upload(req, res, async (err) => {
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
            msg: "video上传成功",
            url: `/file/videoPlayer/${req.video_name}`
        })
    })

})
//video背景上传
router.post("/videoCover", (req, res) => {
    vc_upload(req, res, async (err) => {
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
            msg: "videoCover上传成功",
            url: `/file/videoCover/${req.videoCover_name}`
        })
    })

})


//video发表
router.post("/add",async (req,res)=>{
    let {title,video,videoCover}=req.body
    let doc = await VideoDB.create({
        title: title || undefined,
        video:video|| undefined,
        videoCover:videoCover||undefined
    })
    res.send({
        code: 0,
        msg: "视频上传成功",
        data: {id: doc._id}
    })
})
//视频修改
router.post("/update", async (req, res) => {
    let {id, doc} = req.body

    await VideoDB.findByIdAndUpdate(id, doc)

    res.send({
        code: 0,
        msg: "修改成功"
    })
})

//删除video

//文章删除
router.delete("/delete", async (req, res) => {
    let {id} = req.body

    await VideoDB.findByIdAndRemove(id)

    res.send({
        code: 0,
        msg: "删除完成"
    })
})



module.exports = router



