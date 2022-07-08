<template>
  <div class="videoAdd">
    <div class="videoPhoto">
      <el-form
          :model="form"
      >
        <el-form-item label="标题：" label-width="150px">
          <el-input
              style="height: 50px;width: 500px"
              v-model="form.title"
              placeholder="可通过上传视频文件自动获取文件名"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频上传：" label-width="150px" >
          <el-upload
              class="upload-demo"
              drag
              :action="`${baseURL}/adminServer/video/videoAdd`"
              :auto-upload="false"
              :on-change="fileChange"
              :limit="1"
              ref="videoForm"
              :on-success="video_upload_success"
              :with-credentials="true"
          >
            <i class="el-icon-upload"> <el-icon class="el-icon--upload"><upload-filled /></el-icon></i>
            <div class="el-upload__text">将视频格式文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="封面图上传：" label-width="150px">
          <el-upload
              class="avatar-uploader"
              :action="`${baseURL}/adminServer/video/videoCover`"
              :show-file-list="false"
              :on-change="videoCoverChange"
              :on-success="videoCover_upload_success"
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
        <el-form-item
            label-width="150px"
        >
          <el-button type="success" @click="submitVideo" style="width: 200px;height: 100px">确认上传</el-button>
        </el-form-item>
      </el-form>
    </div>



  </div>
</template>

<script>
export default {
  name: "VideoAdd",
  data(){
    return{
      form:{
        title:"",
        video:"",
        videoCover:""
      },
      imageUrl: ""
    }
  },
  methods:{

    //视频发表
    async submit(){
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/video/add",
        data: this.form
      })
      if(data.code){
        return this.$message.error(data.msg)
      }
      await this.$router.push('/VideoManager')
    },

//上传之前验证
    fileChange(file,fileList){
      if(file.status!=='ready')return
      if( /(.*)\.(mp4|rmvb|avi|ts|flv|mov|3gb|m3u8)$/.test(file.name)){
        if (this.form.title) return
        this.form.title = RegExp.$1
      }else {
        this.$message.error("只能上传.mp4 .avi .flv .rmvb .mov .m3u8 或.3gb格式的文件")
        fileList.pop()
      }

    },
    submitVideo(){
      this.$refs.videoForm.submit()
    }
    ,
    beforeRemove() {
      this.form.title = ""
    },
    //上传成功的钩子
    video_upload_success(res){
      if (res.code) {
        return this.$message.error("上传视频失败，请检查后端报错")
      }
      this.form.video = res.url
      //判断是否有封面图
      if (this.imageUrl) {
        //有封面图，触发封面图的上传
        this.$refs.imgForm.submit()
      } else {
        //没有封面图，直接发表文章
        this.submit()
      }
    },
    videoCoverChange(file, fileList) {
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
    videoCover_upload_success(res) {
      if (res.code) {
        return this.$message.error("上传封面失败，请检查后端报错")
      }
      this.form.videoCover = res.url
      this.submit()
    }
  }
}
</script>

<style lang="less" scoped>
.videoAdd {
  background:#fff;
  height:100vh;
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
