import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/homePage.vue'
import myInfo from '../views/my/myIndex.vue'
import menuList from '../views/menuList/menuList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      keepLive: true,//是否缓存
      needLogin: false,//是否登录
      showTop: false,//是否显示头部
      showBottom: true,//是否显示底部
    }
  },
  {
    path: '/myInfo',
    name: 'myInfo',
    component: myInfo,
    meta: {
      keepLive: true,//是否缓存
      needLogin: false,//是否登录
      showTop: true,//是否显示头部
      showBottom: true,//是否显示底部

    }
  },
  {
    path: '/menuList',
    name: 'menuList',
    component: menuList,
    meta: {
      keepLive: true,//是否缓存
      needLogin: false,//是否登录
      showTop: true,//是否显示头部
      showBottom: true,//是否显示底部
    }
  },

  {
    path: '/excele',
    name: 'excele',
    meta: {
      keepLive: true,//是否缓存
      needLogin: false,//是否登录

    },
    component: () => import(/* webpackChunkName: "about" */ '../views/excele/excele.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
