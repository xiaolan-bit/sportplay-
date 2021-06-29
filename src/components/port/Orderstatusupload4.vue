<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>港口</el-breadcrumb-item>
      <el-breadcrumb-item>日志信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 用户列表 -->
      <el-table
        :data="messagelist"
        border
        stripe
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="航班号" prop="transnum" width="500px"></el-table-column>
        <el-table-column
          label="记录时间"
          prop="timenow"
          width="200px"
        ></el-table-column>
        <el-table-column
          label="进/出港口"
          prop="inoutside"
          width="200px"
        ></el-table-column>
      </el-table>
      <!-- 分页组件 size-change每页最大变化 current-change当前最大变化-->
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getmessage();
  },
  data() {
    return {
      nowTime: new Date(),
      messagelist: [],
    };
  },
  filters: {
    formatDate(nowTime) {
      var moment = require("moment");
      return moment(nowTime).format("YYYY-MM-DD");
    },
  },
  methods: {
    async getmessage() {
      const { data: res } = await this.$http.get("getmessage", {
        params: {
          place: sessionStorage.getItem("username"),
        },
      });
      this.messagelist = res.data;
    },
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property];
      if (data == null) {
        return null;
      }
      let dt = new Date(data);
      return (
        dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1) +
        "-" +
        dt.getDate() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds()
      );
    },
  },
};
</script>
<style lang = 'less'  scoped>
</style>