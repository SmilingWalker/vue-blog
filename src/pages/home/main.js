import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



// 新增代码：引入全部组件及样式
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
/**如果要use 那么绑定必须放到最后 */
app.mount("#app")