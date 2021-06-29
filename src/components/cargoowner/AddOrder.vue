<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>货主</el-breadcrumb-item>
      <el-breadcrumb-item>发布订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="addForm" ref="addFormRef" label-width="70px">
      <!-- :rules="addFormRules" -->

      <el-row>
        <el-col :span="6">
          <!-- 名称 -->
          <el-form-item label="货物名称" prop="goodsname" label-width="100px">
            <el-input v-model="addForm.goodsname"></el-input>
          </el-form-item>
        </el-col>
        <!-- 尺寸 --><el-col :span="6">
          <el-form-item label="货物尺寸" prop="goodssize" label-width="100px">
            <el-input v-model="addForm.goodssize"></el-input> </el-form-item
        ></el-col>
        <!-- 重量 --><el-col :span="6">
          <el-form-item label="货物重量" prop="goodsweight" label-width="100px">
            <el-input v-model="addForm.goodsweight"></el-input> </el-form-item
        ></el-col>
        <!-- 内外贸 --><el-col :span="6">
          <el-form-item label="内/外贸" prop="inoutside" label-width="100px">
            <el-select v-model="addForm.inoutside" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 货物起始点 --><el-col :span="6">
          <el-form-item
            label="货物起始点"
            prop="startaddress"
            label-width="100px"
          >
            <el-input v-model="addForm.startaddress"></el-input> </el-form-item
        ></el-col>
        <!-- 收货地址 --><el-col :span="6">
          <el-form-item label="收货地址" prop="endaddress" label-width="100px">
            <el-input v-model="addForm.endaddress"></el-input> </el-form-item
        ></el-col>
        <!-- 收货人姓名 --><el-col :span="6">
          <el-form-item
            label="收货人姓名"
            prop="receivername"
            label-width="100px"
          >
            <el-input v-model="addForm.receivername"></el-input> </el-form-item
        ></el-col>
        <!-- 联系电话 --><el-col :span="6">
          <el-form-item
            label="联系电话"
            prop="receivertelnum"
            label-width="100px"
          >
            <el-input
              v-model="addForm.receivertelnum"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 负责人 --><el-col :span="12">
          <el-form-item label="货代(选填):" prop="offerman" label-width="100px">
            <el-input v-model="addForm.offerman"></el-input> </el-form-item
        ></el-col>
        <!-- 负责人 --><el-col :span="12">
          <el-form-item
            label="可根据下方推荐填写货代"
            prop="offerman"
            label-width="200px"
          >
          </el-form-item
        ></el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="addOrder">确定</el-button> -->
      <el-button type="primary" @click="addOrder">发布订单</el-button>
    </span>
    <h2>为您推荐物流公司：</h2>
    <el-button @click="showofferman()">综合推荐</el-button>
    <el-button @click="timetuijian()">根据时间推荐</el-button>
    <el-button @click="moneytuijian()">价格推荐</el-button>
    <!-- 综合推荐 -->
    <el-row v-show="temp == '1'">
      <el-card>
        <!-- 用户列表 -->
        <el-table :data="offermanlist" border stripe>
          <el-table-column label="No" type="index"></el-table-column>
          <el-table-column label="货代名称" prop="offerman"></el-table-column>
          <el-table-column label="时间" prop="timeevaluate"></el-table-column>
          <el-table-column
            label="价格"
            prop="altitudeevaluate"
          ></el-table-column>
          <el-table-column label="质量" prop="transevaluate"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 删除 -->
              <el-button type="primary" @click="enterhuodai(scope.row.offerman)"
                >确认货代</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card></el-row
    >
    <!-- 时间推荐 -->
    <el-row v-show="temp == '2'">
      <el-card>
        <!-- 用户列表 -->
        <el-table :data="offermanlist" border stripe>
          <el-table-column label="No" type="index"></el-table-column>
          <el-table-column
            label="货代名称"
            prop="personcharge"
          ></el-table-column>
          <el-table-column
            label="参考时间（小时）"
            prop="personchargeid"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改 -->
              <el-button
                type="primary"
                @click="
                  showtuijianroute(
                    scope.row.orderid,
                    scope.row.placeA,
                    scope.row.placeB
                  ),
                    (addDialogVisible = true)
                "
                >查看参考路径</el-button
              >
              <!-- 删除 -->
              <el-button
                type="primary"
                @click="enterhuodai(scope.row.personcharge)"
                >确认货代</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <!-- 价格推荐 -->
    <el-row v-show="temp == '3'">
      <el-card>
        <!-- 用户列表 -->
        <el-table :data="offermanlist" border stripe>
          <el-table-column label="No" type="index"></el-table-column>
          <el-table-column label="货代名称" prop="offerman"></el-table-column>
          <el-table-column
            label="参考价格（元）"
            prop="money"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改 -->
              <el-button
                type="primary"
                @click="
                  showtuijianroute2(
                    scope.row.orderid,
                    scope.row.startaddress,
                    scope.row.endaddress
                  ),
                    (addDialogVisible = true)
                "
                >查看参考路径</el-button
              >
              <!-- 删除 -->
              <el-button type="primary" @click="enterhuodai(scope.row.offerman)"
                >确认货代</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <el-dialog
      title="参考路线显示"
      :visible.sync="addDialogVisible"
      width="50%"

    >
    <div class="steps">
      <div
        v-bind:class="[
          stepArray.length == 2
            ? 'width-2'
            : stepArray.length == 3
            ? 'width-3'
            : 'width-4',
          '',
        ]"
        v-for="(item, index) in stepArray"
        :key="index"
      >
        <div class="width-100 mt-b">
          <p class="title">{{ item }}</p>
        </div>
        <div v-if="errorStep <= 0" class="width-100">
          <div
            class
            v-bind:class="[
              index < currentVal
                ? 'color-pick circle'
                : 'color-no-pick circle-no-border',
              '',
            ]"
          ></div>
          <p
            v-show="index != 0"
            class="line-1"
            v-bind:class="[
              index < currentVal ? 'color-pick' : 'color-no-pick',
              '',
            ]"
          ></p>
          <p
            v-show="index != stepArray.length - 1"
            class="line-2"
            v-bind:class="[
              index < currentVal - 1 ? 'color-pick' : 'color-no-pick',
              '',
            ]"
          ></p>
        </div>
        <div v-else class="width-100">
          <div
            class
            v-bind:class="[
              index < errorStep
                ? 'color-pick circle'
                : index == errorStep
                ? 'color-pick circle-error'
                : 'color-no-pick circle-no-border',
              '',
            ]"
          ></div>
          <p
            v-show="index != 0"
            class="line-1"
            v-bind:class="[
              index < errorStep
                ? 'color-pick'
                : index == errorStep
                ? 'color-error-pick-1'
                : 'color-no-pick',
              '',
            ]"
          ></p>
          <p
            v-show="index != stepArray.length - 1"
            class="line-2"
            v-bind:class="[
              index < errorStep - 1
                ? 'color-pick'
                : index == errorStep - 1
                ? 'color-error-pick-2'
                : 'color-no-pick',
              '',
            ]"
          ></p>
        </div>
      </div>
    </div>
      <el-table :data="routesList" border stripe>
        <el-table-column label="出发地" prop="placeA"></el-table-column>
        <el-table-column label="中转站/目的地" prop="placeB"></el-table-column>
        <el-table-column label="方式" prop="way"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDialogVisible = false"
          >确定</el-button
        >
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.getRouteList();
    this.getOrderList();
    this.getUserList();
    this.showofferman();
  },
  data() {
    return {
      //查询信息实体
      temp: "1",
      radio: "1",
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
      options: [
        {
          value: "内贸",
          label: "内贸",
        },
        {
          value: "外贸",
          label: "外贸",
        },
      ],
      routesList: [], //推荐的路径
      routeList: [], //用户列表
      chartsList:["盐卡港", "洪湖港","亿钧港"],//图形展示的页面
      offermanlist: [],
      total: 0, //总记录数
      addDialogVisible: false, //对话框状态
      //添加表单信息
      content: JSON.parse(sessionStorage.getItem("userid")),
      addForm: {
        userid: JSON.parse(sessionStorage.getItem("userid")),
        orderid: "",
        route: "",
        offerman: "平台竞标",
        Expecteddeliverytime: "", //期待送达时间

        startaddress: "盐卡港",
        endaddress: "亿钧港",
        receivername: "魏武王",
        receivertelnum: "17456487332",
        way: "平台",
        inoutside: "",
        goodsname: "无纺布",
        goodssize: "40",
        goodsweight: "2000",
      },

      routeForm: {
        routeid: "",
        placeA: "",
        placeB: "",
        personcharge: "",
        time: "",
        price: "",
        way: "",
      },
      editForm: {},
      editDialogVisible: false,
      checkList: [""],
    };
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
  props: {
    currentVal: {
      type: Number,
      default: 2,
    },
    errorStep: {
      type: Number,
      default: 0,
    },
    stepArray: {
      type: Array,
      default: function () {
        return ["盐卡港", "洪湖港","亿钧港"];
      },
    },
  },
  methods: {
    //获取所有用户
    async getUserList() {
      const { data: res } = await this.$http.get("alluser", {
        params: this.queryInfo,
      });
      this.userList = res.data;
      this.total = res.numbers;
    },
    async getOrderList() {
      const { data: res } = await this.$http.get("allorder", {
        params: this.queryInfo,
      });
      this.orderList = res.data;
      this.total = res.numbers;
    },
    async getRouteList() {
      const { data: res } = await this.$http.get("showroute", {
        params: {
          placeA: this.addForm.startaddress,
          placeB: this.addForm.endaddress,
          way: this.addForm.way,
        },
      });
      this.routeList = res.data;
      this.total = res.numbers;
    },
    showuserid() {
      let content = JSON.parse(sessionStorage.getItem("userid"));
      console.log(content);
    },
    showplaceA() {
      console.log(this.addForm.startaddress);
      console.log(this.addForm.endaddress);
    },
    showroute() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("showroute", {
          placeA: this.addForm.startaddress,
          placeB: this.addForm.endaddress,
          way: this.addForm.way,
        });
        this.getRouteList();
      });
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    async timetuijian() {
      const { data: res } = await this.$http.get("timetuijian", {
        params: {
          startaddress: this.addForm.startaddress,
          endaddress: this.addForm.endaddress,
        },
      });
      this.offermanlist = res.data;
      console.log(res.data);
      this.temp = 2;
    },
    async moneytuijian() {
      const { data: res } = await this.$http.get("moneytuijian", {
        params: {
          startaddress: this.addForm.startaddress,
          endaddress: this.addForm.endaddress,
        },
      });
      this.offermanlist = res.data;
      console.log(res.data);
      this.temp = 3;
    },
    //最大数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getRouteList();
    },
    //pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getRouteList();
    },
    async showofferman() {
      const { data: res } = await this.$http.get("getbestorder", {});
      this.offermanlist = res.data;
      this.temp = 1;
    },
    async checkofferman(offerman) {
      const { data: res } = await this.$http.post("checkofferman", {
        personchargenow: offerman,
      });
      if (res != "success") {
        return this.$message.error("操作失败");
      }
      this.$message.success("操作成功");
    },
    enterhuodai(offerman) {
      this.addForm.offerman = offerman;
    },
    async showtuijianroute(orderid, placeA, placeB) {
      const { data: res } = await this.$http.get("showtuijianroute", {
        params: {
          orderid: orderid,
          placeA: placeA,
          placeB: placeB,
        },
      });
      this.routesList = res.data;
      
      console.log(orderid);
      console.log(res);
    },
    async showtuijianroute2(orderid, startaddress, endaddress) {
      const { data: res } = await this.$http.get("showtuijianroute", {
        params: {
          orderid: orderid,
          placeA: startaddress,
          placeB: endaddress,
        },
      });
      this.routesList = res.data;
      console.log(orderid);
      console.log(res);
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
    editDialogClosed() {
      this.$refs.editFormRef.resetFields(); //重置信息
    },
    addOrder() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        if (this.addForm.offerman == "平台竞标") {
          const { data: res } = await this.$http.post("addOrder", this.addForm);
          if (res != "success") {
            return this.$message.error("操作失败");
          }
          this.$message.success("操作成功");
        } else {
          const { data: res } = await this.$http.post(
            "addmyOrder",
            this.addForm
          );
          if (res != "success") {
            return this.$message.error("操作失败");
          }
          this.$message.success("操作成功");
        }
      });
    },
  },
};
</script>
<style lang = 'less'  scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.inputstyle {
  width: 300px;
}
.steps {
  background: #fff;
  display: flex;
  /*justify-content: space-evenly;*/
  align-items: flex-end;
  width: 100%;
  overflow: scroll;
  text-align: center;
  padding: 16px 0;
}
.line-1 {
  width: 50%;
  height: 2px;
  position: absolute;
  z-index: 0;
  left: 0;
  top: 3px;
}
.line-2 {
  width: 50%;
  height: 2px;
  position: absolute;
  z-index: 0;
  top: 3px;
  left: 50%;
}
.mt-b {
  margin-bottom: 4px;
}
.color-pick {
  background: #007aff;
  /*border-color: rgba(0,122,255,.3);*/
}
.color-no-pick {
  background: #dddee3;
}
.color-error-pick-1 {
  background-image: linear-gradient(90deg, #b377f6 0%, #df3031 100%);
}
.color-error-pick-2 {
  background-image: linear-gradient(
    90deg,
    #007aff 0%,
    #8091ff 60%,
    #b377f6 100%
  );
}
.width-100 {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}
.title {
  width: 100px;
  /*font-weight: bold;*/
  line-height: 18px;
  font-size: 12px;
  color: #4a4a4a;
}
.width-2 {
  width: 50%;
}
.width-3 {
  width: 33.33%;
}
.width-4 {
  width: 25%;
}
.circle {
  width: 8px;
  height: 8px;
  /*border: 2px solid #fff;*/
  border-radius: 50%;
  /*background: #007AFF;*/
  z-index: 9;
}
.circle-error {
  width: 8px;
  height: 8px;
  /*border: 2px solid #fff;*/
  border-radius: 50%;
  background: #df3031;
  z-index: 9;
}
.circle-no-border {
  width: 8px;
  height: 8px;
  /*border: 2px solid #fff;*/
  border-radius: 50%;
  /*background: #007AFF;*/
  z-index: 9;
}
.circle-no-border::before {
  display: inline-block;
  content: "";
  width: 8px;
  height: 8px;
  background: #dddee3;
  position: absolute;
  top: -2px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 2px solid #fff;
}
.circle::after {
  display: inline-block;
  content: "";
  width: 12px;
  height: 12px;
  background: rgba(0, 122, 255, 0.15);
  position: absolute;
  top: -2px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.circle-error::after {
  display: inline-block;
  content: "";
  width: 12px;
  height: 12px;
  background: rgba(223, 48, 49, 0.15);
  position: absolute;
  top: -2px;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
</style>