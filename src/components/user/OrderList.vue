<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查询</el-breadcrumb-item>
      <el-breadcrumb-item>订单查询</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 订单列表主体 -->
    <el-card>
      <el-row :gutter="25">
        <!-- 搜索区域 -->
        <el-col :span="10">
          <el-input
            placeholder="请输入完整订单号"
            v-model="queryInfo.query"
            clearable
            @clear="getOrderList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 点击获取订单详情 -->
        <el-button type="primary" @click="(addDialogVisible = true), getorder()"
          >点击获取订单详情</el-button
        >
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="orderList" border stripe>
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="时间撮" prop="timerecord"></el-table-column>
        <el-table-column label="最新状态" prop="lateststatus"></el-table-column>
        <el-table-column label="航班号" prop="location"></el-table-column>
      </el-table>
      <!-- 分页组件 size-change每页最大变化 current-change当前最大变化-->
    </el-card>
    <div>
      <el-dialog
        title="订单详情"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form :model="order" ref="addFormRef" label-width="100px">
          <!-- orderid -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="订单号" prop="orderid">
                <el-input v-model="order.orderid"></el-input>
              </el-form-item>
            </el-col>
            <!-- 货名 -->
            <el-col :span="12">
              <el-form-item label="货名" prop="goodsname">
                <el-input v-model="order.goodsname"></el-input> </el-form-item
            ></el-col>
            <!-- 尺寸 -->
            <el-col :span="12">
              <el-form-item label="尺寸" prop="goodssize">
                <el-input v-model="order.goodssize"></el-input> </el-form-item
            ></el-col>
            <!-- 重量 -->
            <el-col :span="12">
              <el-form-item label="重量" prop="goodsweight">
                <el-input v-model="order.goodsweight"></el-input> </el-form-item
            ></el-col>
            <!-- 内/外贸 -->
            <el-col :span="12">
              <el-form-item label="内/外贸" prop="inoutside">
                <el-input v-model="order.inoutside"></el-input> </el-form-item
            ></el-col>
            <!-- 箱号 -->
            <el-col :span="14">
              <el-form-item label="箱号" prop="boxid">
                <el-input v-model="order.boxid"></el-input> </el-form-item
            ></el-col>
            <!-- 金额 -->
            <el-col :span="10">
              <el-form-item label="金额" prop="money">
                <el-input v-model="order.money"></el-input> </el-form-item
            ></el-col>
            <!-- 起点 -->
            <el-col :span="24">
              <el-form-item label="起点" prop="startaddress">
                <el-input
                  v-model="order.startaddress"
                ></el-input> </el-form-item
            ></el-col>
            <!-- 终点 -->
            <el-col :span="24">
              <el-form-item label="终点" prop="endaddress">
                <el-input v-model="order.endaddress"></el-input> </el-form-item
            ></el-col>
            <!-- 收件人姓名 -->
            <el-col :span="12">
              <el-form-item label="收件人姓名" prop="receivername">
                <el-input
                  v-model="order.receivername"
                ></el-input> </el-form-item
            ></el-col>
            <!-- 收件人电话 -->
            <el-col :span="12">
              <el-form-item label="收件人电话" prop="receivertelnum">
                <el-input
                  v-model="order.receivertelnum"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">返回</el-button>
        </span>
      </el-dialog>
    </div>
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
      chaxunorderid: sessionStorage.getItem("chaxunorderid"),
      jutiorderid: "",
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
      orderList: [], //订单列表
      boxList: [], //货箱表
      total: 0, //总记录数
      addDialogVisible: false, //对话框状态
      ordertext: {},
      //添加表单信息
      order: {},
      //修改用户信息
      editForm: {},
      //显示/隐藏修改用户栏
      editDialogVisible: false,
      //表单验证

      //修改菜单验证

      checkList: [""],
    };
  },

  methods: {
    //获取所有订单
    async getOrderList() {
      const { data: res } = await this.$http.get("showorderstate", {
        params: this.queryInfo,
      });
      window.sessionStorage.setItem("chaxunorderid", this.queryInfo.query);
      this.jutiorderid = this.queryInfo.query;
      this.orderList = res.data;
      this.total = res.numbers;
      console.log(res);
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
    async getorder() {
      console.log(this.chaxunorderid);
      console.log(this.jutiorderid);
      const { data: res } = await this.$http.get("getorder", {
        params: {
          orderid: this.jutiorderid,
        },
      });
      this.order = res; //查询出用户信息反馈编辑表单
      this.addDialogVisible = true; //开启编辑对话框
      console.log(res);
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