const express = require("express")
const router = express.Router()

//鉴权
router.use((req, res, next) => {
  if (!req.session.userInfo || !req.session.userInfo.admin) {
    return res.send({
      code: 6,
      msg: "您不是管理员"
    })
  }
  next()
})

//check
router.post("/check", (req, res) => {
  res.send({
    code: 0,
    msg: "您拥有管理员权限"
  })
})

//友链相关
router.use("/link", require("./link"))

//文章相关
router.use("/article", require("./article"))

//contact
router.use("/contact", require("./contact"))
//swiper
router.use("/swiper",require("./swiper"))
//video
router.use("/video",require("./video"))
//用户
router.use("/consumer",require("./consumer"))
//音乐
router.use("/music",require("./music"))

module.exports = router



