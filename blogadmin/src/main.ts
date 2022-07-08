import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
// @ts-ignore
import router from "./router";
// @ts-ignore
import {mapState} from "vuex";
import store from './store'
// @ts-ignore
import axiosInit from "./axios-init";
//配置请求数据
// @ts-ignore
import axios, {AxiosInstance} from "axios";
// @ts-ignore
import Axios from "axios";
// @ts-ignore
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
// @ts-ignore
import {message} from "./assets/js/resetMessage";
//全局配置Axios
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


//--------------------------------------------------------------------------
const app = createApp(App)

//服务器前缀设置
const baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''
//配置全局axios
Axios.defaults.baseURL = baseURL //配置前缀url
Axios.defaults.withCredentials = true //携带cookie
app.config.globalProperties.$axios = Axios;
app.use(ElementPlus)
app.use(vue3videoPlay)
//重写message添加到vue实例
app.config.globalProperties.$message = message
//全局引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store).use(router).mixin({
    data() {
        return {baseURL}
    },

}).mount('#app')



