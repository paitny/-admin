<template>
  <el-table
      :data="MangerVideo"
      border
      style="width: 100%;height: 100%"
  >
    <el-table-column
        prop="date"
        label="发布日期"
        :key="MangerVideo.date"
        :formatter="dateFormat"
        align="center"
    >

    </el-table-column>
    <el-table-column label="标题"

    >
      <template #default="scope">
        <el-input v-model="scope.row.title"></el-input>
      </template>
    </el-table-column>

    <el-table-column label="重新上传视频"
                     align="center"
                     width="500px"
    >
      <template #default="scope">

        <div

        >
          <vue3VideoPlay :poster="`${baseURL}${scope.row.videoCover}`" :src="`${baseURL}${scope.row.video}`"
                         type="video/mp4" :autoPlay="false"/>

        </div>
        <el-upload
            class="upload-demo"
            :action="`${baseURL}/adminServer/video/videoAdd`"
            :on-success="function(res){video_upload_success(res,scope.row._id)}"
            :before-upload="video_before_upload"
            :limit="1"
            :with-credentials="true"
            :show-file-list="false"
        >
          <div
              style="margin-top:10px "
          >
            <el-button size="large" type="success">更新视频</el-button>
          </div>
        </el-upload>
      </template>
    </el-table-column>

    <el-table-column label="重新上传封面图"

    >
      <template #default="scope">
        <div class="videoCover">
          <el-image
              style="width: 150px; height:100px"
              :src="`${baseURL}${scope.row.videoCover}`"
              :preview-src-list="[`${baseURL}${scope.row.videoCover}`]"
              preview-teleported="true"
          >
          </el-image>
          <el-upload
              class="upload-demo"
              :action="`${baseURL}/adminServer/video/videoCover`"
              :on-success="function(res){videoCover_upload_success(res,scope.row._id)}"
              :before-upload="videoCover_before_upload"
              :limit="1"
              :with-credentials="true"
              :show-file-list="false"
          >
            <el-button size="large" type="warning">重传封面</el-button>
          </el-upload>
        </div>

      </template>
    </el-table-column>

    <el-table-column
        fixed="right"
        label="操作"
        width="150px"
        align="center"
    >
      <template #default="scope">
        <div
            style="margin-bottom: 50px"
        >
          <el-button
              type="primary"
              @click="update(scope.row._id,{title:scope.row.title})"
              size="large"
          >修改
          </el-button>
        </div>

        <div>
          <el-button
              type="danger"
              @click="deleteVideo(scope.row._id)"
              size="large"
          >删除
          </el-button>
        </div>


      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'

export default {
  name: "VideoManger",
  data() {
    return {
      MangerVideo: [],
    }
  },
  methods: {
    dateFormat: function (row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return "";
      }

      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },

    //请求所有视频数据
    async getVideo() {
      let {data} = await this.$axios({
        method: "get",
        url: "/get/video"
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.MangerVideo = data.data
    },
    //更新视频
    async update(id, doc) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/video/update",
        data: {id, doc}

      })
      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.$message.success("更新成功")
      await this.getVideo()
    },
    //视频上传之前的回调
    video_before_upload(file) {
      let ifVideo = /(.*)\.(mp4|rmvb|avi|ts|flv|mov|3gb)$/.test(file.name)
      if (!ifVideo) {
        this.$message.error("请上传视频文件")
      }
      return ifVideo
    },
    //视频上传成功后的回调
    video_upload_success(res, id) {
      //失败
      if (res.code) {
        return this.$message.error(res.msg)
      }
      //成功
      this.update(id, {video: res.url})
    },

    //封面图上传之前的回调
    videoCover_before_upload(file) {
      const isJPG = /^image\/(jpeg|png)$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M
    },
    //封面图上传成功后的回调
    videoCover_upload_success(res, id) {
      //失败
      if (res.code) {
        return this.$message.error(res.msg)
      }
      //成功
      this.update(id, {videoCover: res.url})
    }
    ,
    //删除视频
    async deleteVideo(id) {
      let {data} = await this.$axios({
        method: "DELETE",
        url: "/adminServer/video/delete",
        data: {id}
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }

      this.$message.success("视频已删除完成")
      await this.getVideo()
    }
  },

  created() {
    this.getVideo()

  }
}
</script>

<style lang="less" scoped>
.video {
  display: flex;
  justify-content: space-between;

}

.videoCover {
  display: flex;
  justify-content: space-between;
  line-height: 100px;
}

#refPlayerWrap {
  width: 420px;
  height: 230px;
}
</style>
