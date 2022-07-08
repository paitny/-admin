<template>
  <div id="userAdmin">
    <el-table
        :data="userData"
        border
        style="width: 100%"

    >
      <el-table-column
          prop="date"
          label="注册日期"
          :key="userData.date"
          :formatter="dateFormat"
          width="200px"
          align="center"
      >

      </el-table-column>
      <el-table-column
          prop="_id"
          label="id"
          align="center"
      >

      </el-table-column>
      <el-table-column
          prop="user"
          label="Name"
          align="center"
      >

      </el-table-column>

      <el-table-column
          prop="secret"
          label="secret"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="photo"
          label="头像"
          align="center"
      >
        <template #default="scope">
          <div class="demo-image__preview" >
            <el-image
                style="width: 150px; height:100px"
                :src="`${baseURL}${scope.row.photo}`"
                :preview-src-list="[`${baseURL}${scope.row.photo}`]"
                :initial-index="4"
                fit="cover"
                preview-teleported="true"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="管理员账号授权"
          align="center"
      >
        <template #default="scope">
          <el-switch
              style="display: block"
              v-model="scope.row.admin"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="管理员"
              inactive-text="不是管理员"
              @change="switchHandle(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="谨慎操作"
          align="center"
      >
        <template #default="scope">
          <el-button
              type="danger"
              @click="deleteUser(scope.row._id)"
              size="large"
          >注销用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "ContactMsg",
  data() {
    return {
      userData: [],
    }
  },
  methods: {
    //转换日期显示
    //ui中自带的方法
    dateFormat: function (row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    //请求所有数据
    async getUserData() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/get/user"
      })
      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.userData = data.data

    },
    //用户注销
    async deleteUser(id) {
      let {data} = await this.$axios({
        method: "DELETE",
        url: "/adminServer/consumer/delete",
        data: {id}
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.$message.success("用户已注销")
      await this.getContactData()
    },
    //管理员
    //switch切换触发
    async switchHandle(item) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/consumer/admin",
        data: {
          id: item._id,
          admin: item.admin
        }
      })
      console.log(item.admin)
      if (data.code) {
        return this.$message.error(data.msg)
      }
      await this.getUserData()
    }
  },
  created() {
    this.getUserData()

  }
}
</script>

<style scoped>

</style>














