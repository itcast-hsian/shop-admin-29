import Vue from 'vue'
import App from './App.vue'
import axios from "axios"

import VueRouter from "vue-router"

// 1.element - 引入
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

// 导入组件
import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/GoodsList.vue"
import GoodsAdd from "./pages/GoodsAdd.vue"
import GoodsEdit from "./pages/GoodsEdit.vue"

// 2.element - 注册
Vue.use(ElementUI)
// 注册路由
Vue.use(VueRouter);

// 路由的配置
const routes = [
  {path: "/", redirect: "/admin"},
  // 登录页
  {path: "/login", component: Login, meta: "登录"}, 
  // 首页
  {path: "/admin", component: Admin, meta: "管理后台", children: [
    {path: "goods-list", component: GoodsList, meta: "商品列表"},
    {path: "goods-add", component: GoodsAdd, meta: "新增商品"},
    {path: "goods-edit/:id", component: GoodsEdit, meta: "编辑商品"}
  ]} 
]

// 创建路由对象
const router = new VueRouter({routes})

// 拦截路由的请求，先判断用户是否是登录
// beforeEach中的函数在每个页面组件加载之前执行
// to：要去的页面的路由对象
// from：来自哪个页面的路由对象
// nextL 是否下一步，next如果不执行页面不会加载
router.beforeEach((to, from, next) => {

  // 如果是登录页
  if(to.path === "/login"){
    // 实现如果访问的是登录并且是登录的状态，就跳转到首页
    return next();
  }
  
  // 没有登录
  if(!localStorage.getItem("username")){
    // 跳转到登录页
    next("/login");
  }else{
    next();
  }
})

// 是否是生成环境
Vue.config.productionTip = false;

// 把axios绑定到原型，每个组件都可以通过this.$axios可以访问到
Vue.prototype.$axios = axios;
// 每次axios请求时候都会自动加上这串路径
axios.defaults.baseURL = "http://localhost:8899";

new Vue({
  router,
  render: h => h(App),
  // $mount作用相当于el，根实例挂载到节点
}).$mount('#app')
