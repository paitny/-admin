const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const musicDB = require("../../db/music")


let music_upload = multer({
    storage: multer.diskStorage({
        //文件存储的目录
        destination(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/file/music'))
        },
        //文件的名字
        filename(req, file, cb) {
            let {ext} = path.parse(file.originalname)
            req.music_name = `music-${Date.now()}${ext}`
            cb(null, req.music_name)
        }
    })
}).single('file')
//歌词上传
let lyric_upload = multer({
    storage: multer.diskStorage({
        //文件存储的目录
        destination(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/file/lyric'))
        },
        //文件的名字
        filename(req, file, cb) {
            let {ext} = path.parse(file.originalname)
            req.lyric_name = `lyric-${Date.now()}${ext}`
            cb(null, req.lyric_name)
        }
    })
}).single('file')
//封面上传
let cover_upload = multer({
    storage: multer.diskStorage({
        //文件存储的目录
        destination(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/file/mcover'))
        },
        //文件的名字
        filename(req, file, cb) {
            let {ext} = path.parse(file.originalname)
            req.cover_name = `cover-${Date.now()}${ext}`
            cb(null, req.cover_name)
        }
    })
}).single('file')
//上传音乐
//上传cover封面图
router.post("/musicAdd", (req, res) => {
    music_upload(req, res, async (err) => {
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
            url: `/file/music/${req.music_name}`
        })
    })
})

//上传cover封面图
router.post("/lrc", (req, res) => {
    lyric_upload(req, res, async (err) => {
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
            url: `/file/lyric/${req.lyric_name}`
        })
    })
})
//上传cover封面图
router.post("/cover", (req, res) => {
    cover_upload(req, res, async (err) => {
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
            url: `/file/mcover/${req.cover_name}`
        })
    })
})
//文章发表
router.post("/add", async (req, res) => {
    let {name, artist,lrc, imageUrl,theme,music} = req.body
    console.log(req.body)
    let doc = await musicDB.create({
        name: name || undefined,
        artist:artist||undefined,
        lrc: lrc || undefined,
        cover:imageUrl ||undefined,
        theme:theme||undefined,
        music
    })

    res.send({
        code: 0,
        msg: "文章发表成功",
        data: {id: doc._id}
    })
})
module.exports = router



