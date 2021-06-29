<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>货代</el-breadcrumb-item>
      <el-breadcrumb-item>发布订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="addForm" ref="addFormRef" label-width="70px">
      <!-- :rules="addFormRules" -->

      <!-- 名称 -->
      <el-form-item label="货物名称" prop="goodsname" label-width="100px" >
        <el-input v-model="addForm.goodsname" ></el-input>
      </el-form-item>
      <!-- 尺寸 -->
      <el-form-item label="货物尺寸" prop="goodssize" label-width="100px">
        <el-input v-model="addForm.goodssize"></el-input>
      </el-form-item>
      <!-- 重量 -->
      <el-form-item label="货物重量" prop="goodsweight" label-width="100px">
        <el-input v-model="addForm.goodsweight"></el-input>
      </el-form-item>
      <!-- 散货/箱装 -->
      <el-form-item label="运输形式" prop="transtype" label-width="100px">
        <el-select v-model="addForm.transtype" placeholder="请选择">
          <el-option
            v-for="item in trans"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-row v-show="addForm.transtype == '箱装'">
        <!-- 箱号 -->
        <div style="margin-left:100px">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            style="margin-left: 5px"
          >
            {{ tag }}
          </el-tag>
        </div>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="addForm"
          ref="saveTagInput"
          size="small"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="addboxdialogvisible = true"
          >+ New Tag</el-button
        >
      </el-row>

      <!-- 内外贸 -->
      <el-form-item label="内/外贸" prop="inoutside" label-width="100px">
        <el-select v-model="addForm.inoutside" placeholder="请选择">
          <el-option
            v-for="item in inoutsides"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 货物起始点 -->
      <el-form-item label="起始港" prop="startaddress" label-width="100px">
        <el-select
          v-model="addForm.startaddress"
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
      </el-form-item>
      <!-- 收货地址 -->
      <el-form-item label="收货地址" prop="endaddress" label-width="100px">
        <el-select
          v-model="addForm.endaddress"
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
      </el-form-item>
      <!-- 收货人姓名 -->
      <el-form-item label="收货人姓名" prop="receivername" label-width="100px">
        <el-input v-model="addForm.receivername"></el-input>
      </el-form-item>
      <!-- 联系电话 -->
      <el-form-item label="联系电话" prop="receivertelnum" label-width="100px">
        <el-input v-model="addForm.receivertelnum"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="addOrder">确定</el-button> -->
      <el-button
        type="primary"
        @click="
          addOrder();
          update();
        "
        >添加订单</el-button
      >
      <el-button type="primary" @click="getRouteList">地点搜索</el-button>
      <el-button type="primary" @click="update">刷新</el-button>
      <el-row v-show="checkboxid() && boolboxid == '0'">
        <el-button type="primary" @click="addbox">加箱</el-button>
      </el-row>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true"
          >添加路径</el-button
        >
      </el-col>
    </span>
    <div>
      <el-dialog
        title="添加箱"
        :visible.sync="addboxdialogvisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form :model="addForm" ref="addFormRef" label-width="100px">
          <el-form-item label="箱号" prop="boxid" label-width="100px">
            <el-input v-model="addForm.boxid"></el-input>
          </el-form-item>

          <el-row v-show="checkboxid() && boolboxid == '0'">
            <!-- 箱型 -->
            <el-form-item label="箱型" prop="boxtype" label-width="100px">
              <el-select
                v-model="addForm.boxtype"
                placeholder="请选择"
                filterable
                allow-create
                default-first-option
              >
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 持箱人 -->
            <el-form-item label="持箱人" prop="boxowner" label-width="100px">
              <el-input v-model="addForm.boxowner"></el-input>
            </el-form-item>
            <!-- 箱皮重 -->
            <el-form-item label="箱重" prop="boxweight" label-width="100px">
              <el-select
                v-model="addForm.boxweight"
                placeholder="请选择"
                filterable
                allow-create
                default-first-option
              >
                <el-option
                  v-for="item in weight"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <!-- 铅封号 -->
          <el-form-item label="铅封号" prop="leadseal" label-width="100px">
            <el-input v-model="addForm.leadseal"></el-input>
          </el-form-item>
          <span>
            <el-button @click="addboxdialogvisible = false">取消</el-button>
            <el-button type="primary" @click="addBoxes">确定</el-button>
          </span>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="添加路径"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form :model="routeForm" ref="addFormRef" label-width="100px">
          <!-- orderid -->
          <el-form-item label="您的订单号" prop="orderid">
            <el-input v-model="routeForm.orderid" disabled></el-input>
          </el-form-item>
          <!-- 出发地 -->
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
          </el-form-item>
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
          <!-- 目的地 -->
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
          </el-form-item>
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
            <!-- 运输号 -->
            <el-form-item label="运输号" prop="transnum">
              <el-input v-model="routeForm.transnum"></el-input>
            </el-form-item>
          </el-row>
          <!-- 负责人id -->
          <el-form-item label="负责人id" prop="personchargeid">
            <el-input v-model="routeForm.personchargeid"></el-input>
          </el-form-item>
          <!-- 负责人 -->
          <el-form-item label="负责人" prop="personcharge">
            <el-input v-model="routeForm.personcharge"></el-input>
          </el-form-item>
          <!-- 联系方式 -->
          <el-form-item label="联系方式" prop="telnum">
            <el-input v-model="routeForm.telnum"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addRoute">确定</el-button>
        </span>
      </el-dialog>
    </div>

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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
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
    <!-- 修改对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="routeForm" ref="addFormRef" label-width="100px">
        <!-- orderid -->
        <el-form-item label="您的订单号" prop="orderid">
          <el-input v-model="routeForm.orderid" disabled></el-input>
        </el-form-item>
        <!-- 出发地 -->
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
        </el-form-item>
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
        <!-- 目的地 -->
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
        </el-form-item>
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
          <!-- 运输号 -->
          <el-form-item label="运输号" prop="transnum">
            <el-input v-model="routeForm.transnum"></el-input>
          </el-form-item>
        </el-row>
        <!-- 负责人id -->
        <el-form-item label="负责人id" prop="personchargeid">
          <el-input v-model="routeForm.personchargeid"></el-input>
        </el-form-item>
        <!-- 负责人 -->
        <el-form-item label="负责人" prop="personcharge">
          <el-input v-model="routeForm.personcharge"></el-input>
        </el-form-item>
        <!-- 联系方式 -->
        <el-form-item label="联系方式" prop="telnum">
          <el-input v-model="routeForm.telnum"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserInfo">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  created() {
    this.getRouteList();
    this.getOrderList();
    this.getUserList();
    this.checkboxid();
    window.addEventListener("setItem", () => {
      this.orderid2 = JSON.parse(sessionStorage.getItem("orderid2"));
    });
  },
  data() {
    return {
      //查询信息实体
      radio: "1",
      nowTime: new Date(),
      orderid2: "",
      addDialogVisible: false, //增加路径对话框状态
      addboxdialogvisible: false, //增加箱对话框状态
      dynamicTags: ["COSTE131313", "COSXU123131", "COSXU123345"],
      inputVisible: false,
      inputValue: "",
      form: {
        username: "",
        userid: "",
      },
      value: "",
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
      inoutsides: [
        {
          value: "内贸",
          label: "内贸",
        },
        {
          value: "外贸",
          label: "外贸",
        },
      ],
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
          value: "铁路",
          label: "铁路",
        },
        {
          value: "停港",
          label: "停港",
        },
      ],
      weight: [
        {
          value: "2200",
          label: "2200",
        },
        {
          value: "4400",
          label: "4400",
        },
      ],
      trans: [
        {
          value: "散货",
          label: "散货",
        },
        {
          value: "箱装",
          label: "箱装",
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
      types: [
        {
          value: "20'GP",
          label: "20'GP",
        },
        {
          value: "40'GP",
          label: "40'GP",
        },
        {
          value: "40'HQ",
          label: "40'HQ",
        },
      ],
      boolboxid: "", //判断箱子的id是否已经存在
      routeList: [], //路线列表
      userlist: [], //用户列表
      total: 0, //总记录数
      addDialogVisible: false, //对话框状态
      //添加表单信息
      content: JSON.parse(sessionStorage.getItem("userid")),
      addForm: {
        userid: JSON.parse(sessionStorage.getItem("userid")),
        orderid: "",
        route: "",
        personchargenow: "",
        Expecteddeliverytime: "", //期待送达时间

        startaddress: "武汉",
        endaddress: "荆州",
        receivername: "魏武王",
        receivertelnum: "12345678901",
        inoutside: "",
        goodsname: "无纺布",
        goodssize: "40",
        goodsweight: "2000",

        transtype: "",

        boxid: "COSXU123345",
        boxtype: "20'GP",
        boxowner: "COS",
        boxweight: "2200",

        leadseal: "C321282", //铅封号
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

      //修改用户信息
      editForm: {},
      //显示/隐藏修改用户栏
      editDialogVisible: false,

      checkList: [""],
    };
  },
  filters: {
    formatDate(nowTime) {
      var moment = require("moment");
      return moment(nowTime).format("YYYY-MM-DD");
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
      const { data: res } = await this.$http.get("getroute", {
        params: {
          orderid: this.routeForm.orderid,
        },
      });
      this.routeList = res.data;
      this.total = res.numbers;
    },
    // async getRouteList() {
    //   const { data: res } = await this.$http.get("showroute", {
    //     params: {
    //       placeA: this.addForm.startaddress,
    //       placeB: this.addForm.endaddress,
    //     },
    //   });
    //   this.routeList = res.data;
    //   this.total = res.numbers;
    // },
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
        });
        this.getRouteList();
      });
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
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    update() {
      this.reload();
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

    async deleteUser(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除用户，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButton: "取消",
          type: "waring",
        }
      ).catch((err) => err);
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("deleteUser?id=" + id);
      if (res != "success") {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getUserList();
    },
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("getupdate?id=" + id);
      this.editForm = res; //查询出用户信息反馈编辑表单
      this.editDialogVisible = true; //开启编辑对话框
    },
    //关闭窗口
    editDialogClosed() {
      this.$refs.editFormRef.resetFields(); //重置信息
    },
    //确认修改
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let addForm = this.addForm;
      if (addForm.boxid) {
        this.dynamicTags.push(addForm.boxid);
      }
      this.addboxdialogvisible = false;
      this.addForm = "";
    },
    addOrder() {
      window.sessionStorage.setItem(
        "orderid2",
        this.$moment().format("YYYYMMDDHHmmss")
      );
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("addOrder", this.addForm);

        if (res != "success") {
          return this.$message.error("操作失败");
        }
        this.$message.success("操作成功");
      });
    },
    async checkboxid() {
      const { data: res } = await this.$http.get("checkboxid", {
        params: { boxid: this.addForm.boxid },
      });
      this.boolboxid = res;
      return res;
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
    addbox() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("addbox", this.addForm);
        if (res != "success") {
          return this.$message.error("操作失败");
        }
        this.$message.success("操作成功");
      });
    },
    addBoxes() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
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
.inputstyle{
  width: 300px;
}
</style>