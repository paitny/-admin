<template>
  <div id="LinkAdd">
    <el-form
        :model="form"
        :rules="rules"
        ref="form"
        status-icon
        label-position="top"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="首页" prop="home">
        <el-input v-model="form.home"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="logo">
        <el-input v-model="form.logo"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="des">
        <el-input v-model="form.des"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="submit">确认添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "LinkAdd",
  data() {
    return {
      form: {
        name: "",
        home: "",
        logo: "",
        des: ""
      },
      rules: {
        name: [{required: true}],
        des: [{required: true}],
        home: [{required: true, type: "url"}],
        logo: [{required: true, type: "url"}]
      }
    }
  },
  methods: {
    ...mapMutations(['updateLinkData']),
    submit() {
      this.$refs.form.validate(async v => {
        if (v) {
          let {data} = await this.$axios({
            method: "POST",
            url: "/adminServer/link/add",
            data: this.form
          })

          if (data.code) {
            return this.$message.error(data.msg)
          }

          this.$message.success("添加成功")
          this.$refs.form.resetFields()
          await this.getLinkData()
        } else {
          return false
        }
      })
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
  }
}
</script>

<style lang="less" scoped>

</style>














