<template >
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流公司</el-breadcrumb-item>
      <el-breadcrumb-item>规划已竞标路线</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 用户列表 -->
    <el-table :data="orderList" border stripe>
      <el-table-column label="No" type="index"></el-table-column>
      <el-table-column
        label="订单号"
        prop="orderid"
        width="150px"
      ></el-table-column>
      <el-table-column label="起点" prop="startaddress"></el-table-column>
      <el-table-column label="终点" prop="endaddress"></el-table-column>
      <el-table-column label="选择订单号">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            type="primary"
            size="mini"
            @click="
              checkorderid(scope.row.orderid), updateorder(scope.row.orderid)
            "
            >确认</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h3>订单号：</h3>
    <el-input v-model="thisorderid" disabled></el-input>
    <el-button type="primary" @click="addDialogVisible = true"
      >添加路径</el-button
    >
    <el-input v-model="thisboxid" ></el-input>
    <el-button type="primary" @click="addboxid()">添加箱号</el-button>
    <el-card>
      <!-- 用户列表 -->
      <el-table :data="routeList" border stripe>
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="出发地" prop="placeA"></el-table-column>
        <el-table-column
          label="预计出发时间"
          prop="placeAtime"
          :formatter="formatDate"
        ></el-table-column>
        <el-table-column label="目的地" prop="placeB"></el-table-column>
        <el-table-column
          label="预计到达时间"
          prop="placeBtime"
          :formatter="formatDate"
        ></el-table-column>
        <el-table-column label="方式" prop="way" width="50px"></el-table-column>
        <el-table-column label="运输号" prop="transnum"></el-table-column>
        <el-table-column label="负责人" prop="personcharge"></el-table-column>
        <el-table-column label="联系方式" prop="telnum"></el-table-column>
      </el-table>

      <div>
        <el-button @click="update()" type="primary"
          >完成此订单路径录入</el-button
        >
      </div>
    </el-card>

    <div>
      <el-dialog
        title="添加路径"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form :model="routeForm" ref="addFormRef" label-width="100px">
          <!-- orderid --><el-col :span="24">
          <el-form-item label="您的订单号" prop="orderid">
            <el-input v-model="routeForm.orderid" disabled></el-input>
          </el-form-item></el-col>
          <!-- 出发地 --><el-col :span="24">
          <el-form-item label="出发地" prop="placeA" label-width="100px">
            <el-select
              v-model="routeForm.placeA"
              placeholder="请选择"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in address"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item></el-col>
          <!-- 预计出发时间 -->
          <div class="block">
            <span class="demonstration">选择预出发时间</span>
            <el-date-picker
              v-model="routeForm.placeAtime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
          <!-- 目的地 --><el-col :span="24">
          <el-form-item
            label="目的地"
            prop="placeB"
            label-width="100px"
            style="margin-top: 20px"
          >
            <el-select
              v-model="routeForm.placeB"
              placeholder="请选择"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in address"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item></el-col>
          <!-- 预计到达时间 -->
          <div class="block">
            <span class="demonstration">选择预到达时间</span>
            <el-date-picker
              v-model="routeForm.placeBtime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
          <!-- 方式 -->
          <el-form-item
            label="方式"
            prop="way"
            label-width="100px"
            style="margin-top: 20px"
          >
            <el-select
              v-model="routeForm.way"
              placeholder="请选择"
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="item in ways"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-row v-show="this.routeForm.way != '停港'">
            <!-- 运输号 --><el-col :span="12">
            <el-form-item label="运输号" prop="transnum">
              <el-input v-model="routeForm.transnum"></el-input>
            </el-form-item></el-col>
          </el-row>
          <!-- 负责人id --><el-col :span="12">
          <el-form-item label="负责人id" prop="personchargeid">
            <el-input v-model="routeForm.personchargeid"></el-input>
          </el-form-item></el-col>
          <!-- 负责人 --><el-col :span="12">
          <el-form-item label="负责人" prop="personcharge">
            <el-input v-model="routeForm.personcharge"></el-input>
          </el-form-item></el-col>
          <!-- 联系方式 --><el-col :span="12">
          <el-form-item label="联系方式" prop="telnum">
            <el-input v-model="routeForm.telnum"></el-input>
          </el-form-item></el-col>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addRoute">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  created() {
    this.gethuodaiorder();
    this.getRouteList();
  },
  data() {
    return {
      //查询信息实体
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
      routeList: [], //路线列表
      orderList: [], //用户列表
      total: 0, //总记录数
      addDialogVisible: false, //对话框状态
      //添加表单信息
      //修改用户信息
      editForm: {},
      //显示/隐藏修改用户栏
      editDialogVisible: false,
      //表单验证
      thisboxid: "",
      orderid: "",
      thisorderid: "",
      //修改菜单验证
      content: JSON.parse(sessionStorage.getItem("userid")),
      checkList: [""],
      routeForm: {
        orderid: sessionStorage.getItem("orderid2"),
        placeA: "盐卡港",
        placeAtime: "2021-4-12",
        placeB: "洪湖港",
        placeBtime: "2021-4-14",
        way: "船运",
        transnum: "HAN HAI 1 HAO/汉海一号/B048E",
        personchargeid: "1",
        personcharge: "张三",
        telnum: "12345678901",

        boxid: "",
      },

      ways: [
        {
          value: "船运",
          label: "船运",
        },
        {
          value: "公路",
          label: "公路",
        },
        {
          value: "停港",
          label: "停港",
        },
      ],

      address: [
        {
          value: "盐卡港",
          label: "盐卡港",
        },
        {
          value: "松滋港",
          label: "松滋港",
        },
        {
          value: "亿钧港",
          label: "亿钧港",
        },
        {
          value: "李埠港",
          label: "李埠港",
        },
        {
          value: "洪湖港",
          label: "洪湖港",
        },
      ],
    };
  },

  methods: {
    async getRouteList() {
      const { data: res } = await this.$http.get("getroute", {
        params: {
          orderid: this.routeForm.orderid,
        },
      });
      this.routeList = res.data;
      this.total = res.numbers;
    },
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
    async gethuodaiorder() {
      console.log(this.content);
      const { data: res } = await this.$http.get("gethuodaiorder", {
        params: { userid: this.content },
      });
      this.orderList = res.data;
      this.total = res.numbers;
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addRoute() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("addRoute", this.routeForm);
        if (res != "success") {
          return this.$message.error("操作失败");
        }
        this.$message.success("操作成功");
        this.addDialogVisible = false;
        this.getRouteList();
      });
    },
    async addboxid() {
      const { data: res } = await this.$http.get("addboxid", {
        params: {
          orderid: this.thisorderid,
          boxid:this.thisboxid,
        },
      });
      if (res != "success") {
          return this.$message.error("操作失败");
        }
        this.$message.success("添加箱成功");
    },
    checkorderid(orderid) {
      this.thisorderid = orderid;
      this.routeForm.orderid = orderid;
    },
    updateorder(orderid) {
      const { data: res } = this.$http.get("updateorder", {
        params: {
          orderid: orderid,
        },
      });
    },
    update() {
      this.reload();
    },
  },
};
</script>
<style lang = 'less' scoped>
/* 面包屑样式 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
      
  