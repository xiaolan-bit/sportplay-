<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>船务公司</el-breadcrumb-item>
      <el-breadcrumb-item>已完成订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-select
        v-model="choses"
        placeholder="请选择"
        filterable
        allow-create
        default-first-option
      >
        <el-option
          v-for="item in chose"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-col>
        <el-row v-show="choses == '订单散装/箱装 饼状图'">
          <highcharts :options="option" :callback="myCallback" ></highcharts
        ></el-row>
        <el-row v-show="choses == '港口流量 折线图'">
          <highcharts
            :options="chartOptions"
            :callback="myCallback"
          ></highcharts
        ></el-row>
        <el-row v-show="choses == '港口货代比例 饼状图'">
          <highcharts
            :options="options"
            :callback="myCallback"
          ></highcharts></el-row
      ></el-col>
    </div>
  </div>
</template>
<script>
import XChart from "highcharts-vue";
import { Chart } from "highcharts-vue";
export default {
  name: "HelloWorld",
  components: {
    highcharts: Chart,
    XChart,
  },
  created() {
    this.sanxiangnum();
    window.addEventListener("setItem", () => {
      this.sannum = JSON.parse(sessionStorage.getItem("sannum"));
      this.xiangnum = JSON.parse(sessionStorage.getItem("xiangnum"));
      console.log(this.sannum)
    });
  },
  data() {
    return {
      data1: [
      ],
      sannum: "",
      xiangnum: "",
      choses: "",
      chose: [
        {
          value: "订单散装/箱装 饼状图",
          label: "订单散装/箱装 饼状图",
        },
        {
          value: "港口流量 折线图",
          label: "港口流量 折线图",
        },
        {
          value: "港口货代比例 饼状图",
          label: "港口货代比例 饼状图",
        },
      ],

      option: {
        title: {
          text: "订单散装/箱装 饼状图",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            name: "浏览器访问量占比",
            data: [
              ["散装", JSON.parse(sessionStorage.getItem("sannum"))],
              ["箱装", JSON.parse(sessionStorage.getItem("xiangnum"))],
            ],
          },
        ],
      },

      optionss: {
        title: {
          text: "订单散装/箱装 饼状图",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            name: "浏览器访问量占比",
            data: [
              ["散装", 16],
              ["箱装", 18],
            ],
          },
        ],
      },

      chartOptions: {
        title: {
          text: "港口流量 折线图",
        },
        subtitle: {
          text: "数据来源：港口日常流量",
        },
        yAxis: {
          title: {
            text: "港口日流量",
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
          },
        },
        series: [
          {
            name: "亿钧港",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          },
          {
            name: "李埠港",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
          },
          {
            name: "松滋港",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
          },
          {
            name: "盐卡港",
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
          },
          {
            name: "洪湖港",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      },
      options: {
        title: {
          text: "港口货代比例 饼状图",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            name: "浏览器访问量占比",
            data: [
              ["中远集团", 39.1],
              ["顺丰速递", 26.8],
              ["京东快递", 8.5],
              ["中国外运", 6.2],
              ["其他", 0.7],
            ],
          },
        ],
      },
    };
  },

  methods: {
    myCallback() {
      console.log("this is callback function");
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
  },
};
// Vue.set(data1, '散装', window.sessionStorage.getItem("sannum"));
// Vue.set(data1, '箱装', window.sessionStorage.getItem("xiangnum"));
</script>
<style lang = 'less'  scoped>
</style>