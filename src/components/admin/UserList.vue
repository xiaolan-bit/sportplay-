<template>
  <div>
    用户列表
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户列表主体 -->
    <el-card>
      <el-row :gutter="25">
        <!-- 搜索区域 -->
        <el-col :span="10">
          <el-input
            placeholder="请输入搜索用户名"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 搜索按钮 -->

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="id" prop="id" width="50px"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="telnum"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="状态" prop="state">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
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

    <!-- 新增用户区域 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"   show-password class="in"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="电话" prop="telnum">
          <el-input v-model="addForm.telnum"></el-input>
        </el-form-item>
        <!-- 权限 -->
        <el-form-item
          label="权限"
          prop="role"
          label-width="100px"
          style="margin-left: -30px"
        >
          <el-select
            v-model="addForm.role"
            placeholder="请选择"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in roles"
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
        <el-button type="primary" @click="addUser">确定</el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" show-password class="in"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="电话" prop="telnum">
          <el-input v-model="editForm.telnum"></el-input>
        </el-form-item>
        <!-- 权限 -->
        <el-form-item
          label="权限"
          prop="role"
          label-width="100px"
          style="margin-left: -30px"
        >
          <el-select
            v-model="editForm.role"
            placeholder="请选择"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUserInfo">确定</el-button>
        <el-button @click="editDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const roleOptions = [
  "普通用户",
  "超级管理员",
  "货主",
  "港口",
  "车队",
  "船务公司",
  "物流公司",
];
export default {
  created() {
    this.getUserList();
  },

  data() {
    return {
      //查询信息实体
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
      userList: [], //用户列表
      total: 0, //总记录数
      addDialogVisible: false, //对话框状态
      //添加表单信息
      addForm: {
        id: "",
        username: "",
        password: "",
        telnum: "",
        role: "",
      },
      roles: [
        {
          value: "管理员",
          label: "管理员",
        },
        {
          value: "货主",
          label: "货主",
        },
        {
          value: "货代",
          label: "货代",
        },
        {
          value: "港口",
          label: "港口",
        },
        {
          value: "船主",
          label: "船主",
        },
        {
          value: "车队",
          label: "车队",
        },
      ],
      //修改用户信息
      editForm: {},
      //显示/隐藏修改用户栏
      editDialogVisible: false,
      //表单验证
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        telnum: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 5, max: 12, message: "请输入正确电话", trigger: "blur" },
        ],
      },
      //修改菜单验证
      editFormRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        telnum: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 5, max: 15, message: "请输入正确电话", trigger: "blur" },
        ],
      },

      checkList: [""],
    };
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
    //最大数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    //pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
    //修改用户状态
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.put(
        `userstate?id=${userInfo.id}&state=${userInfo.state}`
      );
      if (res != "success") {
        userInfo.id = !userInfo.id;
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
    },
    //监听添加用户
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("addUser", this.addForm);
        if (res != "success") {
          return this.$message.error("操作失败");
        }
        this.$message.success("操作成功");
        this.addDialogVisible = false;
        this.getUserList();
      });
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
    //显示对话框
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
    //修改权限
    //用7个数字来代替复选框中信息
    async getRole(id) {
      const { data: res } = await this.$http.get("updateRole?id=" + id);
      console.log(res);
    },
  },
};
</script>
<style  lang='less' scoped>
/* 面包屑样式 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>