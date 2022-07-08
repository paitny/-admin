<template>
  <div id="ArticleManger">

    <el-input
        class="search"
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
        @input="handleSearch"
        v-model="searchTxt">
    </el-input>

    <el-table
        :data="articleData"
        border
        style="width: 100%"
    >
      <el-table-column label="标题">
        <template #default="scope">
          <el-input v-model="scope.row.title"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template #default="scope">
          <el-input v-model="scope.row.des"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="重新上传md" width="140px">
        <template #default="scope">
          <el-upload
              class="upload-demo"
              :action="`${baseURL}/adminServer/article/md`"
              :on-success="function(res){md_upload_success(res,scope.row._id)}"
              :before-upload="md_before_upload"
              :limit="1"
              :with-credentials="true"
              :show-file-list="false"
          >
            <el-button size="large" type="success">点击上传md</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="重新上传封面图">
        <template #default="scope">
          <div class="cover">
            <el-image
                style="width: 200px; height: 150px;"
                :src="`${baseURL}${scope.row.cover}`"
                :preview-src-list="[`${baseURL}${scope.row.cover}`]"
                preview-teleported="true"
            >
            </el-image>
            <el-upload
                class="upload-demo"
                :action="`${baseURL}/adminServer/article/cover`"
                :on-success="function(res){cover_upload_success(res,scope.row._id)}"
                :before-upload="cover_before_upload"
                :limit="1"
                :with-credentials="true"
                :show-file-list="false"

            >
              <el-button size="large" type="warning" style="margin: auto 0">重传封面</el-button>
            </el-upload>
          </div>

        </template>
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作">
        <template #default="scope">
          <div class="buttonSubmit">
            <el-button
                type="primary"
                @click="update(scope.row._id,{title:scope.row.title,des:scope.row.des})"
                size="large"
            >修改
            </el-button>
            <el-button
                type="danger"
                @click="deleteArticle(scope.row._id)"
                size="large"
            >删除
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-if="display"
        background
        layout="sizes,prev,pager,next,jumper,->,slot, total"
        :total="total"
        v-model:page-size="query.perPage"
        v-model:current-page="query.page"
        @current-change="getArticles"
        @size-change="getArticles"
        :page-sizes="[2,5,10,20,30]"


    />
  </div>
</template>

<script>
export default {
  name: "ArticleManger",
  data() {
    return {
      articleData: [],
      AllArticleData: [],
      searchTxt: "",
      timer: null,
      total: 0,
      display: true,
      query:
          {
            page: 1,
            perPage: 5
          }
    }
  },
  methods: {

    //搜索
    handleSearch() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let txt = this.searchTxt.trim()
        if (!txt) {
          return this.articleData = this.AllArticleData
        }
        let arr = []
        this.AllArticleData.forEach(item => {
          //通过title和des筛选
          if (item.title.includes(txt) || item.des.includes(txt)) {
            arr.push(item)
          }
        })
        this.articleData = arr
      }, 500)
    },

    //请求所有文章数据
    async getArticles() {
      let {data} = await this.$axios({
        method: "get",
        url: "/get/article",
        params: this.query
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.AllArticleData = data.data
      this.total = data.total
      if (this.total == 0) {
        this.display = false
      }
      this.handleSearch()
    },

    //更新文章
    async update(id, doc) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/article/update",
        data: {id, doc}
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.$message.success("更新成功")
      await this.getArticles()
    },

    //md上传之前的回调
    md_before_upload(file) {
      let ifMd = /\.md$/.test(file.name)
      if (!ifMd) {
        this.$message.error("请上传md文件")
      }
      return ifMd
    },
    //md上传成功后的回调
    md_upload_success(res, id) {
      //失败
      if (res.code) {
        return this.$message.error(res.msg)
      }

      //成功
      this.update(id, {md: res.url})
    },

    //封面图上传之前的回调
    cover_before_upload(file) {
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
    cover_upload_success(res, id) {
      //失败
      if (res.code) {
        return this.$message.error(res.msg)
      }

      //成功
      this.update(id, {cover: res.url})
    },

    //删除文章
    async deleteArticle(id) {
      let {data} = await this.$axios({
        method: "DELETE",
        url: "/adminServer/article/delete",
        data: {id}
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }

      this.$message.success("删除完成")
      await this.getArticles()
    }
  },

  created() {
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
#ArticleManger {
  .cover {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search {
    margin-bottom: 10px;
  }

  .buttonSubmit {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
}
</style>














