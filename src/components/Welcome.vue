<template>
  <div>
    <h3>欢迎使用管理平台</h3>
    <el-carousel :interval="5000" arrow="always" autoplay>
      <el-carousel-item v-for="item in imgBox" :key="item.id">
        <img :src="item.idView" class="image" />
      </el-carousel-item>
    </el-carousel>
    <el-button @click="update()">进入我的列表</el-button>
    <div></div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      imgBox: [
        { id: 0, idView: require("../assets/1.jpg") },
        { id: 1, idView: require("../assets/2.jpg") },
        { id: 2, idView: require("../assets/3.jpg") },
        { id: 3, idView: require("../assets/4.jpg") },
      ],
    };
  },
  methods: {
    update() {
      this.reload();
    },
    async sanxiangnum() {
      const { data: res } = await this.$http.get("sanxiangnum", {
        params: {},
      });

      window.sessionStorage.setItem("sannum", res.sannum);
      window.sessionStorage.setItem("xiangnum", res.xiangnum);
      this.sannum = res.sannum;
      // (this.option.series.data = res),
      this.xiangnum = res.xiangnum;
      // this.data1 = res;
      console.log(this.sannum);
      console.log(this.xiangnum);
    },
    async huodainum() {
      const { data: res } = await this.$http.get("huodainum", {
        params: {},
      });

      window.sessionStorage.setItem("zhongyuan", res.zhongyuan);
      window.sessionStorage.setItem("sunfeng", res.sunfeng);
      window.sessionStorage.setItem("jingdong", res.jingdong);
      window.sessionStorage.setItem("zhongguo", res.zhongguo);
    },
  },
};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>