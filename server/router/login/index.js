const express = require("express")
const router = express.Router()
const userDB = require("../../db/user")
const visitorDB = require("../../db/visitor")
//用户密码加密
const  bcrypt=require("bcrypt")
//生成token
const jwt=require("jsonwebtoken")
//添加访客
async function addVisitor(req) {
  try{
    let userID = req.session.userInfo._id

    //先看存没存当前用户
    let doc = await visitorDB.findOne({visitor: userID})
    if (doc) {
      //已经存在该用户访问记录
      await visitorDB.findOneAndUpdate({visitor: userID}, {date: Date.now()})
    } else {
      //不存在该用户访问记录
      await visitorDB.create({
        visitor: userID
      })
    }
  }catch (e) {}
}

//登录
router.post("/", async (req, res) => {
  let {user, pass} = req.body

  //验证数据格式
  if (!/^[\w\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]{2,8}$/.test(user) || !/^[\w\[\]\/\\~`|<>,.?;':"{}!@#$%^&*()_+=-]+$/.test(pass)) {
    return res.send({
      code: 1,
      msg: "数据格式错误"
    })
  }

  //验证用户名和密码
  let doc = await userDB.findOne({user})

  //用户不存在
  if (!doc) {
    return res.send({
      code: 3,
      msg: "用户不存在"
    })
  }
  //验证密码是否正确
const IsLoginPassword=bcrypt.compareSync(pass,doc.pass)
  //验证密码
  if (!IsLoginPassword) {
    return res.send({
      code: 5,
      msg: "密码错误"
    })
  }
//生成token值
  let token=jwt.sign({id:String(doc._id)},doc.secret)
  //登录成功
  let userInfo = {
    user: doc.user,
    _id: doc._id,
    photo: doc.photo,
    admin: doc.admin,
    token:token
  }
  req.session.userInfo = userInfo
  //更新visitor
  await addVisitor(req)
  res.send({
    code: 0,
    msg: "登录成功",
    data: userInfo
  })

})

//检测是否登录
router.post("/check", (req, res) => {
  let data = req.session.userInfo
  if (data) {
    //更新visitor
    addVisitor(req)
    //登录过的
    res.send({
      code: 0,
      msg: "已经登录",
      data
    })
  } else {
    //没有登陆过的
    res.send({
      code: 1,
      msg: "未登录",
      data: {}
    })
  }
})
//退出登录
router.post("/out", (req, res) => {
  req.session.destroy() //销毁session
  res.send({
    code: 0,
    msg: "退出登录完成"
  })
})

module.exports = router



















