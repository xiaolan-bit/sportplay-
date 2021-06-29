<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车队</el-breadcrumb-item>
      <el-breadcrumb-item>行程目录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 用户列表 -->
      <el-table
        :data="routeList"
        border
        stripe
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="出发地" prop="placeA"></el-table-column>
        <el-table-column
          label="预计出发时间"
          prop="placeAtime"
          :formatter="formatDate"
          width="143px"
        ></el-table-column>
        <el-table-column label="目的地" prop="placeB"></el-table-column>
        <el-table-column
          label="预计到达时间"
          prop="placeBtime"
          :formatter="formatDate"
          width="143px"
        ></el-table-column>
        <el-table-column label="方式" prop="way" width="50px"></el-table-column>
        <el-table-column label="运输号" prop="transnum"></el-table-column>
        <el-table-column label="负责人" prop="personcharge"></el-table-column>
        <el-table-column
          label="联系方式"
          prop="telnum"
          width="112px"
        ></el-table-column>
        <el-table-column label="出发">
          <template slot-scope="scope">
            <!-- 开始作业前进港 -->
            <el-button
              type="primary"
              icon="el-icon-download"
              size="max"
              style="margin-left: 10px"
              @click="enterport1(scope.row.placeA, scope.row.transnum)"
            ></el-button>
            <!-- 开始作业 -->
            <el-button
              type="warning"
              icon="el-icon-caret-right"
              size="max"
              @click="
                startwork(
                  scope.row.orderid,
                  scope.row.placeA,
                  scope.row.transnum
                ),
                changeboxstate(scope.row.orderid,scope.row.placeA)
              "
            ></el-button>
            <!-- 开始作业后离港 -->
            <el-button
              type="primary"
              icon="el-icon-upload2"
              size="max"
              @click="leaveport1(scope.row.placeA, scope.row.transnum)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="到达">
          <template slot-scope="scope">
            <!-- 完成作业前进港 -->
            <el-button
              type="primary"
              icon="el-icon-download"
              size="max"
              style="margin-left: 10px"
              @click="enterport2(scope.row.placeB, scope.row.transnum)"
            ></el-button>
            <!-- 完成作业 -->
            <el-button
              type="success"
              icon="el-icon-circle-check"
              size="max"
              @click="
                endwork(scope.row.orderid, scope.row.placeB, scope.row.transnum),
                checkrouteend(scope.row.orderid, scope.row.placeB),changeboxstate2(scope.row.orderid,scope.row.placeB),
                updateboxisempty(scope.row.orderid, scope.row.placeB)
              "
            ></el-button>
            <!-- 完成作业后离港 -->
            <el-button
              type="primary"
              icon="el-icon-upload2"
              size="max"
              @click="
                leaveport2(scope.row.placeB, scope.row.transnum),
                  updateliststate(
                    scope.row.personchargeid,
                    scope.row.orderid,
                    scope.row.placeA,
                    scope.row.placeB,
                    scope.row.way,
                    scope.row.transnum,
                    scope.row.personcharge,
                    scope.row.telnum
                  ),
                  update()
              "
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 size-change每页最大变化 current-change当前最大变化-->

    </el-card>
  </div>
</template>
      


<script>
export default {
  inject: ["reload"],
  created() {
    this.getRouteList();
    window.addEventListener("setItem", () => {
      this.nowtime = JSON.parse(sessionStorage.getItem("nowtime"));
    });
  },
  data() {
    return {
      nowTime: new Date(),
      nowtime: "",
      routeList: [], //路线列表
      userlist: [], //用户列表
      total: 0, //总记录数
      content: JSON.parse(sessionStorage.getItem("userid")),
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
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
    };
  },
  filters: {
    formatDate(nowTime) {
      var moment = require("moment");
      return moment(nowTime).format("YYYY-MM-DD");
    },
  },
  methods: {
    async getRouteList() {
      const { data: res } = await this.$http.get("getmypersonchargeroute", {
        params: {
          userid: this.content,
        },
      });
      this.routeList = res.data;
      this.total = res.numbers;
    },
    update() {
      this.reload();
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
    enterport1(placeA, transnum) {
      const { data: res } = this.$http.post("addmessage", {
        place: placeA,
        transnum: transnum,
        inoutside: "进",
      });
      if (res != "success") {
        return this.$message.success("上传信息成功");
      }
      this.$message.error("上传信息失败");
    },
    leaveport1(placeA, transnum) {
      const { data: res } = this.$http.post("addmessage", {
        place: placeA,
        transnum: transnum,
        inoutside: "出",
      });
      if (res != "success") {
        return this.$message.success("上传信息成功");
      }
      this.$message.error("上传信息失败");
    },
    enterport2(placeB, transnum) {
      const { data: res } = this.$http.post("addmessage", {
        place: placeB,
        transnum: transnum,
        inoutside: "进",
      });
      if (res != "success") {
        return this.$message.success("上传信息成功");
      }
      this.$message.error("上传信息失败");
    },
    leaveport2(placeB, transnum) {
      console.log(placeB, transnum);
      const { data: res } = this.$http.post("addmessage", {
        place: placeB,
        transnum: transnum,
        inoutside: "出",
      });
      if (res != "success") {
        return this.$message.success("上传信息成功");
      }
      this.$message.error("上传信息失败");
    },
    updateliststate(
      personchargeid,
      orderid,
      placeA,
      placeB,
      way,
      transnum,
      personcharge,
      telnum
    ) {
      console.log(personchargeid);
      const { data: res } = this.$http.get("updateliststate", {
        params: {
          personchargeid: personchargeid,
          orderid: orderid,
          placeA: placeA,
          placeB: placeB,
          way: way,
          transnum: transnum,
          personcharge: personcharge,
          telnum: telnum,
        },
      });
      if (res != "success") {
        return this.$message.success("上传信息成功");
      }
      this.$message.error("上传信息失败");
    },
    startwork(orderid, placeA, transnum) {
      const { data: res } = this.$http.post("addorderstate", {
        orderid: orderid,
        location: transnum,
        lateststatus: placeA,
      });
      if (res != "success") {
        return this.$message.success("上传信息成功");
      }
      this.$message.error("上传信息失败");
    },
    endwork(orderid, placeB, transnum) {
      const { data: res } = this.$http.post("addorderstate", {
        orderid: orderid,
        location: transnum,
        lateststatus: placeB,
      });
      if (res != "success") {
        return this.$message.success("上传信息成功");
      }
      this.$message.error("上传信息失败");
    },
    checkrouteend(orderid, placeB) {
      const { data: res } = this.$http.get("checkrouteend", {
        params: {
          orderid: orderid,
          endaddress: placeB,
        },
      });
    },
    changeboxstate(orderid,placeA){
      const { data: res } = this.$http.get("changeboxstate", {
        params: {
          orderid: orderid,
          placeA: placeA,
        },
      });
    },
    changeboxstate2(orderid,placeB){
      const { data: res } = this.$http.get("changeboxstate", {
        params: {
          orderid: orderid,
          placeA: placeB,
        },
      });
    },
    updateboxisempty(orderid,placeB){
      const { data: res } = this.$http.get("updateboxisempty", {
        params: {
          orderid: orderid,
          placeB: placeB,
        },
      });
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