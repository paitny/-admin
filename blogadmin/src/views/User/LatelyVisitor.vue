<template>
  <div id="lateUser">
    <el-table
        :data="visitorData"
        border
        style="width: 100%"

    >
      <el-table-column
          prop="date"
          label="访问时间"
          :key="visitorData.date"
          :formatter="dateFormat"
          width="200px"
          align="center"
      >

      </el-table-column>
      <el-table-column
          prop="visitor._id"
          label="id"
          align="center"
      >

      </el-table-column>
      <el-table-column
          prop="visitor.user"
          label="Name"
          align="center"
      >

      </el-table-column>

      <el-table-column
          prop="visitor.secret"
          label="secret"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="visitor.photo"
          label="头像"
          align="center"
      >
        <template #default="scope">
          <div class="demo-image__preview" >
            <el-image
                style="width: 150px; height:100px"
                :src="`${baseURL}${scope.row.visitor.photo}`"
                :preview-src-list="[`${baseURL}${scope.row.visitor.photo}`]"
                :initial-index="4"
                fit="cover"
                preview-teleported="true"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="是否管理员登录"
          align="center"
          prop="visitor.admin"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "LatelyVisitor",
  data() {
    return {
      visitorData: [],
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
  },

    async created() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/get/visitor"
      })
      if (data.code)return
      this.visitorData = data.data


  }
}
</script>

<style scoped>
</style>














