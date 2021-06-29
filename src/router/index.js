import Vue from 'vue'
import VueRouter from 'vue-router'
//引入Login组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/admin/UserList.vue'
import OrderList from '../components/user/OrderList.vue'
import BoxList from '../components/user/BoxList.vue'
import AddOrder from '../components/cargoowner/AddOrder.vue'
import MyOrder from '../components/cargoowner/MyOrder.vue'
import MyOfferList from '../components/cargoowner/MyOfferList.vue'
import Completedorder from '../components/cargoowner/Completedorder.vue'
import Cargoinformation from '../components/port/Cargoinformation.vue'
import Orderstatusupload4 from '../components/port/Orderstatusupload4.vue'
import Neworder from '../components/port/Neworder.vue'
import Orderstatusupload5 from '../components/fleet/Orderstatusupload5.vue'
import Receivinglist5 from '../components/fleet/Receivinglist5.vue'
import Orderinprogress5 from '../components/fleet/Orderinprogress5.vue'
import Completedorder5 from '../components/fleet/Completedorder5.vue'
import Orderstatusupload6 from '../components/shippingcompany/Orderstatusupload6.vue'
import Receivinglist6 from '../components/shippingcompany/Receivinglist6.vue'
import Orderinprogress6 from '../components/shippingcompany/Orderinprogress6.vue'
import Completedorder6 from '../components/shippingcompany/Completedorder6.vue'
import Ownersdemandlist7 from '../components/logisticscompany/Ownersdemandlist7.vue'
import Orderstatusupload7 from '../components/logisticscompany/Orderstatusupload7.vue'
import Orderinprogress7 from '../components/logisticscompany/Orderinprogress7.vue'
import Completedorder7 from '../components/logisticscompany/Completedorder7.vue'
import Proxyadd from '../components/logisticscompany/Proxyadd.vue'
import newrights from '../components/Newidentity/newrights.vue'



Vue.use(VueRouter);

  const routes = [
    {
      path: "/",
      redirect:"/login"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/user",component:UserList,},
        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/ordercheck",component:OrderList,},      
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/boxcheck",component:BoxList,},      
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/releaseorder",component:AddOrder,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/myorder",component:MyOrder,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/myofferlist",component:MyOfferList,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Completedorder",component:Completedorder,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Cargoinformation",component:Cargoinformation,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Orderstatusupload4",component:Orderstatusupload4,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Neworder",component:Neworder,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Receivinglist5",component:Receivinglist5,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Orderstatusupload5",component:Orderstatusupload5,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Orderinprogress5",component:Orderinprogress5,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Completedorder5",component:Completedorder5,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Receivinglist6",component:Receivinglist6,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Orderstatusupload6",component:Orderstatusupload6,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Orderinprogress6",component:Orderinprogress6,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Completedorder6",component:Completedorder6,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Ownersdemandlist7",component:Ownersdemandlist7,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Orderstatusupload7",component:Orderstatusupload7,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Orderinprogress7",component:Orderinprogress7,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Completedorder7",component:Completedorder7,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/Proxyadd",component:Proxyadd,},        
      ]
    },
    {
      path:"/home",
      component: Home ,
      redirect:"/welcome",
      children:[
        {path:"/welcome",component:Welcome,},
        {path:"/newrights",component:newrights,},        
      ]
    },
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫

// 出现问题的时候使用
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to,from,next)=>{
  //to将要访问
  //from 从哪访问
  //next 接着干什么 next(url) 重定向到url上；next()继续访问 to路径
  if(to.path=='/login') return next();
  //获取user
  const userFlag = window.sessionStorage.getItem("user");//取出当前用户
  if(!userFlag) return next('/login');//无值返回登录页
  next();//符合要求 
})
export default router
