import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import './assets/css/global.css'
//引入iconfont
import './assets/font/iconfont.css'
//导入axios
import axios from 'axios'
//挂载axios
import XLSX from 'xlsx'
//导入XLSX
import moment from 'moment'
Vue.prototype.$moment = moment;//赋值使用
//导入获取时间元素
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 引入echarts
// import highcharts from 'highcharts'
// import VueHighcharts from 'vue-highcharts'
// import highcharts3d from 'highcharts/highcharts-3d'
// highcharts3d(highcharts)
// Vue.use(VueHighcharts)
// //引入highcharts
import Highchart from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import stockInit from "highcharts/modules/stock";
//百度地图
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Uk1m1uGaXhHsAd7UhClWR2pA8qoBaKqP'
})
stockInit(Highchart);
Vue.use(HighchartsVue);

Vue.config.productionTip = false;
//highcharts
Vue.prototype.$http = axios
//设置访问根路径
axios.defaults.baseURL = "http://localhost:9000"


Vue.config.productionTip = false

Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'printReportShowQuery') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
}
Vue.prototype.$addStorageEvent = function (type, key, data) {
  if (type === 1) {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  } else {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
