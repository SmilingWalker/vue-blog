import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/httpmanager'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// import VMdEditor from '@kangc/v-md-editor';
// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import '@kangc/v-md-editor/lib/style/preview.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// VMdEditor.use(githubTheme);
// VMdPreview.use(githubTheme);



/**
 * VUE3 中md预览控件设置
 */
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});


const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)

app.use(VueMarkdownEditor)


app.config.globalProperties.$get = http.get;
app.config.globalProperties.$post = http.post;
app.config.globalProperties.$post = http.post;
app.config.productionTip = false
http.defaults.baseURL = process.env.app_APP_URL;
app.mount('#app')