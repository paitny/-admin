<template>
  <div>
    <el-carousel :height="bannerHeight+'px'" type="card">
      <el-carousel-item v-for="item in urlList" :key="item.id">
        <div class="img" :style="{backgroundImage: `url(${baseURL}${item.swiper})`}" alt="正在加载中" >  </div>
      </el-carousel-item>
    </el-carousel>
  </div>

</template>
<script>
export default {
  name: 'swiper',
  data(){
    return {
      urlList: [
        {id:0},
        {id:1},
        {id:2},
        {id:3},
        {id:4},
      ]
      ,
      //el-carousel容器高度
      bannerHeight:0,
      screenWidth:0
    };
  },
  methods: {
   async getSwiper(){
      let {data}=await this.$axios({
        method:"GET",
        url:"/get/swiper"
      })
     if(data.code){
       return this.$message.error(data.msg)
     }
       this.urlList=data.data

    }
  },
  mounted () {
    this.getSwiper()
    // 首次加载时,初始化高度
    this.screenWidth = window.innerWidth
    this.bannerHeight =350 / 2200 * this.screenWidth
    // 窗口大小发生改变
    window.onresize = () => {
      this.screenWidth = window.innerWidth
      this.bannerHeight = 350 / 2200 * this.screenWidth
    }
  }
}
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin:0;


}
:deep(.el-carousel__indicators) {// 指示器
  left: unset;
  transform: unset;
  right: 2%;
}
:deep(.el-carousel__button) {// 指示器按钮
  width: 8px;
  height: 8px;
  border: none;
  border-radius: 50%;
  background-color: #00b7ff;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 10px;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
  border-radius: 10px;
}
.img{
  width: 100%;
  height: inherit;
  border-radius: 10px;
  background-size:cover ;
}
</style>
