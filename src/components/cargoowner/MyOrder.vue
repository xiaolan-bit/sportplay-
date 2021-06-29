<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>货主</el-breadcrumb-item>
      <el-breadcrumb-item>我的订单</el-breadcrumb-item>
    </el-breadcrumb>





    <!-- 订单列表主体 -->
    <el-card>
      

      <!-- 用户列表 -->
      <el-table :data="orderList" border stripe>
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column
          label="id"
          prop="orderid"
          width="150px"
        ></el-table-column>
        <el-table-column label="路径规划状况" prop="route"></el-table-column>
      </el-table>
      <!-- 分页组件 size-change每页最大变化 current-change当前最大变化-->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 100]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {
    this.getOrderList();
  },

  data() {
    return {
      //查询信息实体
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
      orderList: [], //用户列表
      total: 0, //总记录数
      addDialogVisible: false, //对话框状态
      //添加表单信息
      //修改用户信息
      editForm: {},
      //显示/隐藏修改用户栏
      editDialogVisible: false,
      //表单验证

      //修改菜单验证

      content: JSON.parse(sessionStorage.getItem("userid")),
      checkList: [""],
    };
  },

  methods: {
    //获取所有用户
    async getOrderList() {
      console.log(this.content);
      const { data: res } = await this.$http.get("showorder", {
        params: {userid:this.content,},
      });

      this.orderList = res.data;
      this.total = res.numbers;
    },
    showorder() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("showorder", {
          userid:this.content,
        });
        // if (res != "success") {
        //   return this.$message.error("操作失败");
        // }
        // this.$message.success("操作成功");
        // this.addDialogVisible = false;
        // console.log(res.endaddress);
        this.getOrderList();
      });
    },
    //最大数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getOrderList();
    },
    //pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getOrderList();
    },
    //监听添加用户
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
  },
};
</script>
<style lang = 'less'  scoped>
/* 面包屑样式 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>