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

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    redirect: '/home',
    component: Layout,
    meta: { name: '', },
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta: { name: '首页' },
      },
      {
        path: "/printPage",
        name: "printPage",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/printPage/index.vue"),
        meta: { name: '打印Dom' },
      },
      {
        path: "/pdfToImg",
        name: "pdfToImg",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/pdfToImg/index.vue"),
        meta: { name: 'PDFToImage' },
      },
      
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
