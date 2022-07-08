const express = require("express")
const router = express.Router()
const linkDB = require("../../db/link")
const {URL} = require("url")
//友链添加
router.post("/add", async (req, res) => {
  //先判断连接是否重复
  let {origin} = new URL(req.body.home)
  let doc = await linkDB.findOne({home: new RegExp(origin)})
  if (doc) {
    return res.send({
      code: 10,
      msg: "链接已存在，如需更新请切换到管理友链页面"
    })
  }
  //添加到数据库
  await linkDB.create(req.body)

  //返回前端
  res.send({
    code: 0,
    msg: "添加成功"
  })
})

//友链修改
router.post("/update", async (req, res) => {
  let {_id, name, home, logo, des} = req.body

  await linkDB.findByIdAndUpdate(_id, {name, home, logo, des})

  res.send({
    code: 0,
    msg: "更新完成"
  })
})

//友链删除
router.delete("/delete", async (req, res) => {
  let {_id} = req.body

  await linkDB.findByIdAndDelete(_id)

  res.send({
    code: 0,
    msg: "删除成功"
  })
})

module.exports = router



