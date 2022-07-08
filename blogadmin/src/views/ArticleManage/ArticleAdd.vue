<template>
  <div id="ArticleAdd">
    <el-form
        :model="form"
        status-icon
        ref="ruleForm"
        label-width="100px"
    >
      <el-form-item label="标题：" label-width="100px">
        <el-input
            v-model="form.title"
            placeholder="可通过上传 md 自动获取文件名"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述：" label-width="100px">
        <el-input type="textarea" v-model="form.des"></el-input>
      </el-form-item>
      <el-form-item label="md上传：" label-width="100px">
        <el-upload
            class="upload-demo"
            drag
            :action="`${baseURL}/adminServer/article/md`"
            :auto-upload="false"
            :on-change="fileChange"
            :on-success="md_upload_success"
            :before-remove="beforeRemove"
            :limit="1"
            ref="mdForm"
            :with-credentials="true"
        >
          <i class="el-icon-upload"><el-icon class="el-icon--upload"><upload-filled /></el-icon></i>
          <div class="el-upload__text">将.md文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="封面图上传：" label-width="100px">
        <el-upload
            class="avatar-uploader"
            :action="`${baseURL}/adminServer/article/cover`"
            :show-file-list="false"
            :on-change="coverChange"
            :on-success="cover_upload_success"
            :auto-upload="false"
            ref="imgForm"
            :with-credentials="true"
        >
          <div
              v-if="imageUrl"
              class="avatar"
              :style="{
              backgroundImage: `url(${imageUrl})`
            }"
          >
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"><el-icon><Plus /></el-icon></i>
        </el-upload>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="submitForm" size="large">确认发表</el-button>
      </el-form-item>
    </el-form>
  </div>
  <router-view/>
</template>

<script >
export default {
  name: "ArticleAdd",
  data() {
    return {
      form: {
        title: "",
        des: "",
        md: "",
        cover: ""
      },
      imageUrl: ""
    }
  },
  methods: {
    //发表按钮点击
    submitForm() {
      //从上传md开始，后续的上传在对应的回调里面完成
      this.$refs.mdForm.submit()
    },

    //文章发表
    async submit() {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/article/add",
        data: this.form
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }

      //跳转到对应的文章页面
      await this.$router.push("/articleManager")
    },

    //添加md文件的各种检测
    fileChange(file, fileList) {
      if (file.status !== 'ready') return
      //简单判断是否是.md文件
      if (/^(.+)\.md$/.test(file.name)) {
        //当没有输入title的时候，获取名字填充到title
        if (this.form.title) return
        this.form.title = RegExp.$1
      } else {
        //提示并阻止文件添加
        this.$message.error("只能上传 .md 文件")
        fileList.pop()
      }
    },

    //删除md文件之前的钩子
    beforeRemove() {
      this.form.title = ""
    },

    //md上传成功的钩子
    md_upload_success(res) {
      //md上传失败
      if (res.code) {
        return this.$message.error("上传md失败，请检查后端报错")
      }

      //md上传成功
      this.form.md = res.url
      //判断是否有封面图
      if (this.imageUrl) {
        //有封面图，触发封面图的上传
        this.$refs.imgForm.submit()
      } else {
        //没有封面图，直接发表文章
        this.submit()
      }
    },

    //添加封面的钩子
    coverChange(file, fileList) {
      if (file.status !== 'ready') return

      const isJPG = /^image\/(jpeg|png)$/.test(file.raw.type);
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if (isJPG && isLt2M) {
        this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.imageUrl = ""
        fileList.pop()
      }
    },

    //封面上传成功
    cover_upload_success(res) {
      if (res.code) {
        return this.$message.error("上传封面失败，请检查后端报错")
      }
      this.form.cover = res.url
      this.submit()
    }

  }
}
</script>
<style lang="less" scoped>
#ArticleAdd {
  z-index: 999;
  :deep(.avatar-uploader .el-upload)  {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }

  :deep(.avatar-uploader .el-upload:hover)  {
    border-color: #409EFF;
  }
  :deep(.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;

  }

  :deep(.avatar) {
    width: 178px;
    height: 178px;
    display: block;
    background: none center center/cover;
  }
  :deep(.el-upload-dragger){
    width: 360px;

  }
}
</style>














