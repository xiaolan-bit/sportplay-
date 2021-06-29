<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>货主</el-breadcrumb-item>
      <el-breadcrumb-item>我的报价单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 订单列表主体 -->
    <el-card>
      <!-- 用户列表 -->
      <el-table :data="orderList" border stripe>
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="报价号" prop="offerid"></el-table-column>
        <el-table-column
          label="订单号"
          prop="orderid"
          width="150px"
        ></el-table-column>
        <el-table-column label="货代名称" prop="offername"></el-table-column>
        <el-table-column label="货代id" prop="offerman"></el-table-column>
        <el-table-column label="价格" prop="money"></el-table-column>
        <el-table-column label="选择" prop="">
          <template slot-scope="scope">
            <el-button
              slot="append"
              @click="
                confirmoffer(
                  scope.row.orderid,
                  scope.row.money,
                  scope.row.offerman
                ),
                  deleteoffer(scope.row.orderid),update()
              "
              >确定</el-button
            >
          </template></el-table-column
        >
      </el-table>
      <!-- 分页组件 size-change每页最大变化 current-change当前最大变化-->
    </el-card>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  created() {
    this.getOfferList();
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
    async getOfferList() {
      console.log(this.content);
      const { data: res } = await this.$http.get("showoffer", {
        params: { userid: this.content },
      });

      this.orderList = res.data;
      this.total = res.numbers;
    },
    showoffer() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("showoffer", {
          userid: this.content,
        });
        this.getOfferList();
      });
    },
    update() {
      this.reload();
    },
    //最大数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getOfferList();
    },
    //pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getOfferList();
    },
    confirmoffer(orderid, money, offerman) {
      console.log(orderid, money, offerman);
      const { data: res } = this.$http.get("confirmoffer", {
        params: {
          orderid: orderid,
          money: money,
          offerman: offerman,
        },
      });
      // this.getRouteList();
    },
    async deleteoffer(orderid) {
      console.log(orderid);
      const { data: res } = await this.$http.delete("deleteoffer", {
        params: {
          orderid: orderid,
        },
      });
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