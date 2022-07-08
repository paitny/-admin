const express = require("express")
const multer = require("multer")
const router = express.Router()
const path = require("path")
const userDB = require("../../db/user")

let upload = multer({
  storage: multer.diskStorage({
    //文件存储的目录
    destination(req, file, cb) {
      cb(null, path.join(__dirname, '../../public/file/photo'))
    },
    //文件的名字
    filename(req, file, cb) {
      let name = req.session.userInfo._id
      let {ext} = path.parse(file.originalname)
      req.filename = name + ext
      cb(null, name + ext)
    }
  })
}).single('file')

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    //上传失败
    if (err) {
      return res.send({
        code: 9,
        msg: "上传失败"
      })
    }

    //上传成功
    //修改数据库信息
    let _id = req.session.userInfo._id
    let photo = `/file/photo/${req.filename}`
    await userDB.findByIdAndUpdate(_id, {photo})
    //修改session
    req.session.userInfo.photo = photo
    //返回前端
    res.send({
      code: 0,
      msg: "头像修改成功",
      data: req.session.userInfo
    })

  })
})

module.exports = router
