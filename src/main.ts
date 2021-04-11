import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// 引入vant-ui, vue3需要手动引入样式
import { VantComponents } from '@/components/vant'
import 'vant/lib/index.css';

// 引入element-plus
import { EleComponents } from '@/components/element'
import 'element-plus/lib/theme-chalk/index.css';
import { ElLoading } from 'element-plus';

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")

// 循环遍历使用组件，有以下两种方式
// 1、使用use
VantComponents.forEach(componet => {
  app.use(componet)
});
// 2、使用component
EleComponents.forEach(component => {
  app.component(component.name, component)
})
// 注册自定义指令
app.directive('loading',ElLoading.directive);
