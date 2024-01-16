/*
 * @Author: Kong Lingju 1104152611@qq.com
 * @Date: 2023-07-21 16:50:17
 * @LastEditors: Kong Lingju 1104152611@qq.com
 * @LastEditTime: 2023-07-25 14:42:10
 * @FilePath: \vue3.0-ts-eslint-template-mytest\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@router/index"
import 'normalize.css/normalize.css'
import { createPinia } from 'pinia'
const pinia = createPinia()
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.scss'
import print from 'vue3-print-nb'


const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(print)
app.mount("#app");
