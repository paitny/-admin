const express = require("express")
const router = express.Router()
//文章删除
const userDB = require("../../db/user");
router.delete("/delete", async (req, res) => {
    let {id} = req.body
    await userDB.findByIdAndRemove(id)
    res.send({
        code: 0,
        msg: "删除完成"
    })
})

//admin管理员设置
router.post("/admin", async (req, res) => {
    let {id, admin} = req.body
    await userDB.findByIdAndUpdate(id, {admin})
    res.send({
        code: 0,
        msg: "管理员状态切换完成"
    })

})
module.exports = router
