<template>
  <div class="swiperAdd">
    <div class="swiperPhoto">
      <el-form
          :model="form"
      >
        <el-form-item label="轮播图上传：" label-width="150px" >
          <el-upload
              class="upload-demo"
              drag
              :action="`${baseURL}/adminServer/swiper/swiperAdd`"
              :auto-upload="false"
              :on-change="fileChange"
              :limit="1"
              ref="swiperForm"
              :on-success="swiper_upload_success"
              :with-credentials="true"
          >
            <i class="el-icon-upload"> <el-icon class="el-icon--upload"><upload-filled /></el-icon></i>
            <div class="el-upload__text">将.jpj或者png文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitSwiper" size="large" style="margin: 50px 16%">确认上传</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>



</template>

<script>
export default {
  name: "SwiperAdd",
  data(){
    return{
      form:{
        swiper:""
      }
    }
  },
  methods:{

    //轮播图发表
    async submit(){
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/swiper/add",
        data: this.form
      })
      if(data.code){
        return this.$message.error(data.msg)
      }
      await this.$router.push('/swiperManager')
    },

//上传之前验证
    fileChange(file,fileList){
      if(file.status!=='ready')return
      if( /^(\s|\S)+(jpg|png|JPG|PNG)+$/.test(file.name)){
      }else {
        this.$message.error("只能上传.png 或. jpj文件")
        fileList.pop()
      }

    },
    submitSwiper(){
      this.$refs.swiperForm.submit()
    }
    ,
    //上传成功
    swiper_upload_success(res){
      if (res.code) {
        return this.$message.error("上传轮播图失败，请检查后端报错")
      }
      this.form.swiper = res.url
      this.submit()
    }
  }
}
</script>

<style lang="less" scoped>

.swiperAdd{
  .swiperPhoto{
    margin-left: 50px;
  }
  :deep(.el-upload-dragger){
    width: 360px;

  }
}


</style>
