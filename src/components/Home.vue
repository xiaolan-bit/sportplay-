<template>
  <!-- 引入container布局 -->
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/jiaotou.png" alt />
        <span>荆州港多式联运</span>
      </div>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapase">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObject[item.id]"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="it.path"
              v-for="it in item.sList"
              :key="it.id"
              @click="saveNavState(it.path)"
            >
              <template slot="title">
                <i :class="iconsObject[it.id]"></i>
                <span>{{ it.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      //菜单列表
      content: JSON.parse(sessionStorage.getItem("userid")),
      con: sessionStorage.getItem("role"),
      menuList: [],
      isCollapse: false, //伸缩
      iconsObject: {
        100: "iconfont icon-quanxian",
        200: "iconfont icon-chaxun",
        300: "iconfont icon-huozhuduanshouye",
        400: "iconfont icon-gangkou",
        500: "iconfont icon-huoche",
        600: "iconfont icon-chuan",
        700: "iconfont icon-wuliu",
        800: "iconfont icon-apply01",
        101: "iconfont icon-yonghu",
        102: "iconfont icon-edit-1-copy",
        103: "iconfont icon-liebiao",
        201: "iconfont icon-dingdanchaxun",
        202: "iconfont icon-dingdanchaxun",
        301: "iconfont icon-tianjiazengjiajia",
        302: "iconfont icon-weibiaoti104",
        303: "iconfont icon-daijiedan",
        304: "iconfont icon-yiwancheng",
        401: "iconfont icon-huozhuguanli",
        402: "iconfont icon-daijiedan",
        403: "iconfont icon-liebiao",
        501: "iconfont icon-liebiao",
        502: "iconfont icon-shangchuan1",
        503: "iconfont icon-jinhangzhong",
        504: "iconfont icon-yiwancheng",
        601: "iconfont icon-liebiao",
        602: "iconfont icon-shangchuan1",
        603: "iconfont icon-jinhangzhong",
        604: "iconfont icon-yiwancheng",
        701: "iconfont icon-daijiedan",
        702: "iconfont icon-shangchuan1",
        703: "iconfont icon-jinhangzhong",
        704: "iconfont icon-yiwancheng",
        705: "iconfont icon-tianjiazengjiajia",
        706: "iconfont icon-daijiedan",
        801: "iconfont icon-zengjiatianjiajiajian",
      },
      activePath: "/welcome", //默认路径
    };
  },
  //inload 事件
  created() {
    //查询menuList
    this.Role();
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath"); //取出session里的path动态修改path
    this.getname();
  },
  methods: {
    logout() {
      window.sessionStorage.clear(); //清除session
      this.$router.push({ path: "/login" }); //回到首页
    },
    //获取导航菜单方法
    async Role() {
      const { data: res } = await this.$http.get("getrole", {
        params: { id: this.content },
      });
      console.log(res);
      window.sessionStorage.setItem("role", res);
    },
    //获取导航菜单方法
    async getMenuList() {
      const { data: res } = await this.$http.get("menus", {
        params: { role: this.con },
      });
      console.log(res);
      if (res.flag != 200)
        return this.$message.console.error("获取列表失败！！！");
      this.menuList = res.menus; //数据回填
    },
    toggleCollapase() {
      //控制伸缩
      this.isCollapse = !this.isCollapse;
    },
    //保存路径
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath); //存放在session里
      this.activePath = activePath;
    },
    async getname() {
      const { data: res } = await this.$http.get("getname", {
        params: { id: this.content },
      });
      window.sessionStorage.setItem("username", res);
    },
  },
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #f7f8f8;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: rgb(44, 38, 38);
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none; //把侧边凸起变没
  }
}
.el-main {
  background-color: #eaedf1;
}
.img {
  width: 55px;
  height: 55px;
}
//按钮样式
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer; //显示小手
}
</style>