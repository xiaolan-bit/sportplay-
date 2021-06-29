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
            placeholder="请输入完整货箱号"
            v-model="queryInfo.query"
            clearable
            @clear="getBoxList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getBoxList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 搜索按钮 -->

        
      </el-row>

      <!-- 用户列表 -->
      <el-table :data="boxList" border stripe>
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="箱号" prop="boxid" width="150px"></el-table-column>
        <el-table-column label="最新状态" prop="boxstate" ></el-table-column>
        <el-table-column label="是否空箱" prop="isempty" ></el-table-column>
      </el-table>
      <!-- 分页组件 size-change每页最大变化 current-change当前最大变化-->
    </el-card>
    </div>

</template>
<script>
export default {
    created() {
    
  },

  data() {
    return {
      //查询信息实体
      queryInfo: {
        query: "", //查询信息
        pagenumber: 1, //当前页
        pageSize: 5, //每页最大数
      },
      orderList: [], //订单列表
      boxList:[],//货箱表
      total: 0, //总记录数
      addDialogVisible: false, //对话框状态
      //添加表单信息
      //修改用户信息
      editForm: {},
      //显示/隐藏修改用户栏
      editDialogVisible: false,
      //表单验证
      
      //修改菜单验证
    

      checkList: ['']

    };
  },

  methods: {
    //获取所有用户
    async getBoxList() {
      const { data: res } = await this.$http.get("showboxstate", {
        params: this.queryInfo,
      });
      this.boxList = res.data;
      this.total = res.numbers;
    },
    //最大数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getBoxList();
    },
    //pageNum的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getBoxList();
    },
    formatDate(row, column) {
          // 获取单元格数据
          let data = row[column.property]
          if(data == null) {
              return null
          }
          let dt = new Date(data)
          return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
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