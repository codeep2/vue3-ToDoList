/*
 * @Date: 2020-10-27 09:48:01
 * @Author: Codeep2
 * @LastEditTime: 2020-10-27 11:20:33
 * @LastEditors: Codeep2
 * @Description: 项目入口文件
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
