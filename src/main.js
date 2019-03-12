//入口文件
import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login'
import odsheader from './components/odsheader'
import odssidebar from './components/odssidebar'
import odsmain from './components/odsmain'
import odsfooter from './components/odsfooter'
import goods from './components/goods'
import goodsinfo from './components/goodsinfo'
import cart from './components/cart'
import orders from './components/orders'
import adminlogin from './components/adminlogin'
import adminheader from './components/adminheader'
import adminuser from './components/adminuser'
import admincategory from './components/admincategory'
import adminorder from './components/adminorder'
import admingoods from './components/admingoods'
import adminnavi from './components/adminnavi'

Vue.component("Login",Login);
Vue.component('odsheader', odsheader);
Vue.component('odssidebar', odssidebar);
Vue.component('odsmain', odsmain);
Vue.component('odsfooter', odsfooter);
Vue.component('goods', goods);
Vue.component('goodsinfo', goodsinfo);
Vue.component('cart', cart);
Vue.component('orders', orders);
Vue.component('adminlogin', adminlogin);
Vue.component('adminheader', adminheader);
Vue.component('adminuser', adminuser);
Vue.component('admincategory', admincategory);
Vue.component('adminorder', adminorder);
Vue.component('admingoods', admingoods);
Vue.component('adminnavi', adminnavi);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'
Vue.use(ElementUI)

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)



var router = new VueRouter({
    routes:[
        {path:'/userLogin',component:Login},
        {path:'/',components:{
          'default':odsheader,
              'main':odsmain,
              'right':odssidebar,
              'foot':odsfooter
          }
      },
      {path:'/goods',components:{
        'default':odsheader,
        'main':goods,
        'right':odssidebar
    }},
    {path:'/goodsinfo',components:{
      'default':odsheader,
      'main':goodsinfo,
      'right':odssidebar,
      'foot':odsfooter
    }},
    {path:'/cart',components:{
      'default':odsheader,
      'main':cart,
      'right':odssidebar
    }},
    {path:'/orders',components:{
      'default':odsheader,
      'main':orders,
      'right':odssidebar
    }},
    {path:'/adminlogin',component:adminlogin},
    {path:'/adminuser',component:adminuser},
    {path:'/admincategory',component:admincategory},
    {path:'/adminorder',component:adminorder},
    {path:'/admingoods',component:admingoods},
    ]
})

var store = new Vuex.Store({
  state:{
      adminname:'',
      username:'',
      search:'',
      itemlist:[]
  },
  mutations:{
  },
 getters:{
     optsearch:function (state) {
         return state.search;
     }
 }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router:router,
  store:store,
})



