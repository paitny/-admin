<template>
  <div id="LinkManger">
    <el-table
        :data="linkData"
        border
        style="width: 100%"
    >
      <el-table-column
          label="名称"
          align="center"
      >
        <template #default="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="首页"
          align="center"
      >
        <template #default="scope">
          <el-input v-model="scope.row.home"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="logo"
          align="center"
      >
        <template #default="scope">
          <el-input v-model="scope.row.logo"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="描述"
          align="center"
      >
        <template #default="scope">
          <el-input v-model="scope.row.des"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          align="center"
      >
        <template #default="scope">
          <div style="display: flex;width: 50%;height: 50% ;justify-content: space-between;margin: 0 auto">
            <el-button type="primary" @click="update(scope.row)" size="large">修改</el-button>
            <el-button type="danger" @click="deleteLink(scope.row)" size="large">删除</el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "LinkManger",
  data() {
    return {}
  },
  computed: {
    ...mapState(['linkData'])
  },
  methods: {
    ...mapMutations(['updateLinkData']),
    //修改
    async update(item) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/link/update",
        data: {
          _id: item._id,
          name: item.name,
          home: item.home,
          logo: item.logo,
          des: item.des
        }
      })

      if (data.code) {
        return this.$message.error(data.code)
      }

      this.$message.success("更新完成")
    },

    //删除
    async deleteLink(item) {
      let {data} = await this.$axios({
        method: "delete",
        url: "/adminServer/link/delete",
        data: {
          _id: item._id
        }
      })

      if (data.code) {
        return this.$message.error(data.code)
      }

      this.$message.success("删除完成")
      await this.getLinkData()
    },

    //获取友链
    async getLinkData() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/get/link"
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }

      this.updateLinkData(data.data)
    }
  },
  created() {
    this.getLinkData(this)
  }
}
</script>

<style lang="less" scoped>
#LinkManger {
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>














