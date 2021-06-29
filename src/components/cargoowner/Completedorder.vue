<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>货主</el-breadcrumb-item>
      <el-breadcrumb-item>已完成订单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="orderlist" border stripe>
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column
          label="订单号"
          prop="orderid"
          width="200px"
        ></el-table-column>
        <el-table-column label="商品" prop="goodsname"></el-table-column>
        <el-table-column label="货代名称" prop="offerman"></el-table-column>
        <el-table-column label="评价">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              size="max"
              @click="
                addevaluate(
                  scope.row.orderid,
                  scope.row.goodsname,
                  scope.row.offerman
                )
              "
              >评价</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="请根据您的真实感受进行评价，分数为1~10分，10分为完美"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="70px">
        <!-- 时间评分 -->
        <el-form-item
          label="时间评分"
          prop="timeevaluate"
          label-width="100px"
          style="margin-left: 0px"
        >
          <el-select
            v-model="addForm.timeevaluate"
            placeholder="请选择"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in number"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="金额评分"
          prop="altitudeevaluate"
          label-width="100px"
          style="margin-left: 0px"
        >
          <el-select
            v-model="addForm.altitudeevaluate"
            placeholder="请选择"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in number"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="运输质量评分"
          prop="transevaluate"
          label-width="100px"
          style="margin-left: 0px"
        >
          <el-select
            v-model="addForm.transevaluate"
            placeholder="请选择"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in number"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 权限 -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            addevaluate2(), (addDialogVisible = false), updateorderstate(),update()
          "
          >确定</el-button
        >
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  created() {
    this.getOrderList();
  },
  data() {
    return {
      total: 0,
      orderlist: [],
      addDialogVisible: false,
      content: JSON.parse(sessionStorage.getItem("userid")),
      addForm: {
        orderid: "",
        goodsname: "",
        offerman: "",
        timeevaluate: "",
        altitudeevaluate: "",
        transevaluate: "",
      },
      number: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
        {
          value: "7",
          label: "7",
        },
        {
          value: "8",
          label: "8",
        },
        {
          value: "9",
          label: "9",
        },
        {
          value: "10",
          label: "10",
        },
      ],
    };
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get("getcompleteorder", {
        params: {
          userid: this.content,
        },
      });
      this.orderlist = res.data;
    },
    addevaluate(orderid, goodsname, offerman) {
      window.sessionStorage.setItem("evaluateorderid", orderid);
      window.sessionStorage.setItem("evaluategoodsname", goodsname);
      window.sessionStorage.setItem("evaluateofferman", offerman);
      this.addDialogVisible = true;
    },
    addevaluate2() {
      const { data: res } = this.$http.post("addevaluate", {
        orderid: window.sessionStorage.getItem("evaluateorderid"),
        goodsname: window.sessionStorage.getItem("evaluategoodsname"),
        offerman: window.sessionStorage.getItem("evaluateofferman"),
        timeevaluate: this.addForm.timeevaluate,
        altitudeevaluate: this.addForm.altitudeevaluate,
        transevaluate: this.addForm.transevaluate,
      });
      if (res != "success") {
        return this.$message.success("评论成功！！！");
      }
      this.$message.erroe("评论失败！！！");
    },
    async updateorderstate() {
      const { data: res } = await this.$http.get("updateorderstate", {
        params: {
          orderid: window.sessionStorage.getItem("evaluateorderid"),
        },
      });
    },
    update() {
      this.reload();
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
  },
};
</script>
<style lang = 'less'  scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
