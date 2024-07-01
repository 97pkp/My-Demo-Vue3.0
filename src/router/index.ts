/*
 * @Author: Kong Lingju 1104152611@qq.com
 * @Date: 2023-07-21 16:50:17
 * @LastEditors: Kong Lingju 1104152611@qq.com
 * @LastEditTime: 2023-07-25 11:45:00
 * @FilePath: \vue3.0-ts-eslint-template-mytest\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Layout from '@/components/layout/index.vue'
import Login from '../views/login/index.vue'
import { useRouterConfig } from "@/store/permission";

// 静态路由-不需要权限
export const constantRoutes: Array<RouteRecordRaw> = [
  {
      path: '/login',
      component: Login,
      meta: { hidden: true }
  },
  {
    path: '/',
    name: '',
    redirect: '/home',
    component: Layout,
    meta: { hidden: false },
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta: { title: '首页' },
      },
      {
        path: "/printPage",
        name: "printPage",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/printPage/index.vue"),
        meta: { title: '打印Dom' },
      },
      {
        path: "/pdfToImg",
        name: "pdfToImg",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/pdfToImg/index.vue"),
        meta: { title: 'PDFToImage' },
      },
      {
        path: "/LiveQingVideo",
        name: "LiveQingVideo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/LiveQingVideo/index.vue"),
        meta: { title: 'LiveQing视频播放器' },
      },
      {
        path: "/LogicFlow",
        name: "LogicFlow",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/LogicFlow/index.vue"),
        meta: { title: 'LogicFlow流程图' },
      },
      {
        path: "/AutoScroll",
        name: "AutoScroll",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/AutoScroll/index.vue"),
        meta: { title: '自动滚动' },
      },
      {
        path: "/AutoScrollTable",
        name: "AutoScrollTable",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/AutoScrollTable/index.vue"),
        meta: { title: '自动滚动表格' },
      },
    ]
  }
];

// 异步路由-需要权限
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: '',
    redirect: '/auth',
    component: Layout,
    meta: { title: '用户权限', hidden: false },
    children: [
      {
        path: "/auth/admin",
        name: "AdminPage",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/AdminPage/index.vue"),
        meta: { title: '管理员可见', auth: 'admin' },
      },
      {
        path: "/auth/user",
        name: "UserPage",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/UserPage/index.vue"),
        meta: { title: '用户可见', auth: 'user' },
      },
    ]
  },
  {
    path: '/authuser',
    name: '',
    redirect: '/authuser',
    component: Layout,
    meta: { title: '用户权限user', hidden: false },
    children: [
      {
        path: "/authuser/index",
        name: "Authuser",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/Authuser/index.vue"),
        meta: { title: '用户可见user', auth: 'user' },
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});

router.beforeEach((to,from,next) => {
  console.log('to:',to,'from:',from);
  next()
  const routerConfig = useRouterConfig()
  if(to.path === '/login') {
    next()
  } else {
    if(localStorage.getItem('token')) {
      if(routerConfig.roles){
        next()
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
})


export default router;
