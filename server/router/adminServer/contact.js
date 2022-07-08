const express = require("express")
const router = express.Router()
const contactDB = require("../../db/contact")

//请求数据
router.get("/", async (req, res) => {
  let doc = await contactDB.find({}, {}, {sort: {read: 1}})
  res.send({
    code: 0,
    msg: "请求成功",
    data: doc
  })
})

//更新read
router.post("/read", async (req, res) => {
  let {id, read} = req.body

  await contactDB.findByIdAndUpdate(id, {read})

  res.send({
    code: 0,
    msg: "read状态切换完成"
  })

})

module.exports = router



