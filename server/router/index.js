
const express = require("express")
const router = express.Router()

//注册
router.use("/reg",require("./reg/index"))

//登录
router.use("/login", require("./login/index"))

//个人信息修改
router.use("/personal", require("./personal/index"))

//留言
router.use("/msg", require("./msg/index"))

//管理员
router.use("/adminServer", require("./adminServer/index"))

//请求各种数据
router.use("/get", require("./get/index"))

//反馈消息
router.use("/contact", require("./contact/index"))

module.exports = router









