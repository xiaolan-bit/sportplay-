<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流公司</el-breadcrumb-item>
      <el-breadcrumb-item>私密订单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 用户列表 -->
      <el-form :model="offerForm" ref="addFormRef" label-width="70px">
        <el-table :data="orderList" border stripe>
          <el-table-column label="No" type="index"></el-table-column>
          <el-table-column
            label="订单号"
            prop="orderid"
            width="150px"
          ></el-table-column>
          <el-table-column label="货名" prop="goodsname"></el-table-column>
          <el-table-column
            label="货重"
            prop="goodsweight"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="尺寸"
            prop="goodssize"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="内/外贸"
            prop="inoutside"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="出发地点"
            prop="startaddress"
          ></el-table-column>
          <el-table-column label="收货地点" prop="endaddress"></el-table-column>
          <el-table-column label="报价" prop="money">
            <template slot-scope="scope">
              <el-input placeholder="报价" v-model="scope.row.money" clearable>
                <el-button
                  slot="append"
                  @click="addOffer(scope.row.orderid, scope.row.money)"
                  >确定</el-button
                >
              </el-input></template
            >
          </el-table-column>
        </el-table>
        <!-- 分页组件 size-change每页最大变化 current-change当前最大变化-->

      </el-form>
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
      addOfferForm: {
        offerid: "",
        orderid: "",
        offerman: JSON.parse(sessionStorage.getItem("userid")),
        money: "",
        offername: sessionStorage.getItem("username"),
      },
      offerForm: {
        offerid: "",
        orderid: "",
        offerman: "",
        money: "",
        offername: "",
      },
      money: "",
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
      content2: sessionStorage.getItem("username"),
      checkList: [""],
    };
  },

  methods: {
    //获取所有用户
    async getOrderList() {
      console.log(this.content);
      const { data: res } = await this.$http.get("getmyNeworder", {
        params: { userid: this.content, username: this.content2 },
      });

      this.orderList = res.data;
      this.total = res.numbers;
    },
    showorder() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("showorder", {
          userid: this.content,
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
    getNeworder() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("getNeworder", {
          userid: this.content,
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
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("getupdate?id=" + id);
      this.editForm = res; //查询出用户信息反馈编辑表单
      this.editDialogVisible = true; //开启编辑对话框
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields(); //重置信息
    },
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        //发起修改请求
        const { data: res } = await this.$http.put("edituser", this.editForm);
        if (res != "success") return this.$message.error("操作失败");
        this.$message.success("操作成功");
        //隐藏
        this.editDialogVisible = false;
        this.getUserList();
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

    addOffer(orderid, money) {
      console.log(orderid);
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("addOffer", {
          money: money,
          orderid: orderid,
          offerman: this.addOfferForm.offerman,
          offername: this.addOfferForm.offername,
        });
        if (res != "success") return this.$message.error("操作失败");
        this.$message.success("操作成功");
        //隐藏
        // money: this.addForm.money,
        // orderid:scope.row.id,

        // placeB: this.addForm.endaddress,
        // way: this.addForm.way,
        // });
        // if (res != "success") {
        //   return this.$message.error("操作失败");
        // }
        // this.$message.success("操作成功");
        // this.addDialogVisible = false;
        // console.log(res.endaddress);
        // this.getRouteList();
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