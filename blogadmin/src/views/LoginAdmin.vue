<template>
  <div class="loginBox">
    <div class="box">
      <!-- 背景颜色 -->
      <div class="color"></div>
      <div class="color"></div>
      <div class="color"></div>

      <div class="main">
        <div class="circle" style="--x:0"></div>
        <div class="circle" style="--x:1"></div>
        <div class="circle" style="--x:2"></div>
        <div class="circle" style="--x:3"></div>
        <div class="circle" style="--x:4"></div>
        <el-tabs
            v-model="activeName"
        >
          <el-tab-pane label="管理员账号登录" name="first">
            <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                label-width="80px"
                @keydown.enter="loginSubmit"
            >
              <el-form-item label="用户名" prop="user" label-width="80px">
                <el-input v-model="loginForm.user"/>
              </el-form-item>
              <el-form-item label="密码" prop="pass" label-width="80px">
                <el-input type="password" v-model="loginForm.pass"/>
              </el-form-item>
              <el-form-item label-width="80px">
                <el-button type="primary" @click="loginSubmit">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>

<script>

import {mapMutations} from "vuex"

export default {
  name: "LoginAdmin",
  data() {
    return {
      activeName: "first",

      //登录表单数据
      loginForm: {
        user: "",
        pass: ""
      },
      //表单字段规则
      rules: {
        user: [
          {required: true, message: "请输入用户名"},
          {
            validator(rule, value, cb) {
              //长度验证
              if (value.length < 2 || value.length > 8) {
                cb(new Error("请输入2~8位的用户名"))
              }
              //规则验证
              if (!/^[\w\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]+$/.test(value)) {
                cb(new Error("只允许 数字 字母 _ 中/日/韩文"))
              }

              cb()
            }
          }
        ],
        pass: [
          {required: true, message: "请输入密码"},
          {
            validator(rule, value, cb) {
              //长度验证
              if (value.length < 6 || value.length > 18) {
                cb(new Error("请输入6~18位的密码"))
              }
              //规则验证
              if (!/^[\w\[\]\/\\~`|<>,.?;':"{}!@#$%^&*()_+=-]+$/.test(value)) {
                cb(new Error("不允许的密码字符"))
              }

              cb()
            }
          }
        ]
      }
    }
  },

  watch: {},
  methods: {
    //登录提交
    loginSubmit() {
      this.$refs.loginForm.validate(async v => {
        if (v) {
          let {data} = await this.$axios({
            method: "POST",
            url: "/login",
            data: this.loginForm
          })

          //登录失败
          if (data.code) {
            return this.$message.error(data.msg)
          }
          //登录成功
          this.$message.success("欢迎回来,亲爱的工程师,请开始您后台管理之旅") //弹窗
          this.$refs.loginForm.resetFields() //清空登录框数据
          this.loginSuccess(data.data) //存到vuex
          await this.$router.replace('/home')
        } else {
          return false
        }
      })
    },

    //vuex
    ...mapMutations(['loginSuccess']),


  },

}
</script >

<style scoped lang="less">
.loginBox {
  padding: 11px 0;

  .box {
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;

    .color:nth-child(1) {
      top: -350px;
      width: 600px;
      height: 600px;
      background: #ff359b;
    }

    .color:nth-child(2) {
      bottom: -150px;
      left: 100px;
      width: 500px;
      height: 500px;
      background: #fffd87;
    }

    .color:nth-child(3) {
      bottom: 50px;
      right: 100px;
      width: 500px;
      height: 500px;
      background: #00d2ff;
    }

    .color {
      /* 绝对定位 */
      position: absolute;
      /* 使用filter(滤镜) 属性，给图像设置高斯模糊*/
      filter: blur(200px);
    }

    .main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      padding: 10px 20px;
      position: relative;
      width: 400px;
      min-height: 400px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgb(0 0 0 / 10%);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;

      :deep(.el-form-item__label) {
        color: #fff;
      }

      :deep(.el-tabs__item) {
        color: #fff;
      }

      .circle {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
        backdrop-filter: blur(5px);
        box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        /* 使用filter(滤镜) 属性，改变颜色。
        hue-rotate(deg)  给图像应用色相旋转
        calc() 函数用于动态计算长度值
        var() 函数调用自定义的CSS属性值x*/
        filter: hue-rotate(calc(var(--x) * 70deg));
        /* 调用动画animate，需要10s完成动画，
        linear表示动画从头到尾的速度是相同的，
        infinite指定动画应该循环播放无限次*/
        animation: animate 10s linear infinite;
        /* 动态计算动画延迟几秒播放 */
        animation-delay: calc(var(--x) * -1s);
      }

      @keyframes animate {
        0%, 100% {
          transform: translateY(-50px);
        }
        50% {
          transform: translateY(50px);
        }
      }

      .circle:nth-child(1) {
        top: -50px;
        right: -60px;
        width: 100px;
        height: 100px;
      }

      .circle:nth-child(2) {
        top: 150px;
        left: -100px;
        width: 120px;
        height: 120px;
        z-index: 2;
      }

      .circle:nth-child(3) {
        bottom: 50px;
        right: -60px;
        width: 80px;
        height: 80px;
        z-index: 2;
      }

      .circle:nth-child(4) {
        bottom: -80px;
        left: 100px;
        width: 60px;
        height: 60px;
      }

      .circle:nth-child(5) {
        top: -80px;
        left: 140px;
        width: 60px;
        height: 60px;
      }

    }

  }
}

a {
  /* 相对定位 */
  display: block;
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  color: #fff;
  /* 渐变背景 */
  background: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
  /* 背景渐变色大小 */
  background-size: 400%;
  /* 圆角 */
  border-radius: 50px;
  z-index: 1;
  font-family: Pacifico;
  animation: streamer 5s infinite;
}

/* 发光效果 */
a::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  bottom: -5px;
  right: -5px;
  /* 渐变背景 */
  background: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
  /* 背景渐变色大小 */
  background-size: 400%;
  /* 圆角 */
  border-radius: 50px;
  /* 位于按钮之下 */
  z-index: -1;
  /* 设置模糊度 显示发光效果 */
  filter: blur(20px);
}

/* 鼠标移入执行动画 */
a:hover {
  /* 动画：名称 时间 infinite是无限次播放 */
  animation: streamer 8s infinite;
}

a:hover::before {
  animation: streamer 8s infinite;
}

/* 接下来定义动画 */
@keyframes streamer {
  100% {
    /* 背景位置 */
    background-position: -400% 0;
  }
}
</style>














