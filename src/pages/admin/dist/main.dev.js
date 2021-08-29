"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _httpmanager = _interopRequireDefault(require("@/utils/httpmanager"));

var _elementPlus = _interopRequireDefault(require("element-plus"));

require("element-plus/lib/theme-chalk/index.css");

var _vMdEditor = _interopRequireDefault(require("@kangc/v-md-editor"));

require("@kangc/v-md-editor/lib/style/base-editor.css");

var _vuepress = _interopRequireDefault(require("@kangc/v-md-editor/lib/theme/vuepress.js"));

require("@kangc/v-md-editor/lib/theme/style/vuepress.css");

var _prismjs = _interopRequireDefault(require("prismjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
_vMdEditor["default"].use(_vuepress["default"], {
  Prism: _prismjs["default"]
});

var app = (0, _vue.createApp)(_App["default"]);
app.use(_elementPlus["default"]);
app.use(_store["default"]);
app.use(_router["default"]);
app.use(_vMdEditor["default"]);
app.config.globalProperties.$get = _httpmanager["default"].get;
app.config.globalProperties.$post = _httpmanager["default"].post;
app.config.globalProperties.$post = _httpmanager["default"].post;
app.config.productionTip = false;
_httpmanager["default"].defaults.baseURL = process.env.app_APP_URL;
app.mount('#app');