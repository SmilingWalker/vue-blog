"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("@/components/editor/show.js");

require("highlight.js/styles/github.css");

var _elementPlus = _interopRequireDefault(require("element-plus"));

require("element-plus/lib/theme-chalk/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 新增代码：引入全部组件及样式
var app = (0, _vue.createApp)(_App["default"]);
app.use(_elementPlus["default"]);
app.use(_store["default"]);
app.use(_router["default"]);
/**如果要use 那么绑定必须放到最后 */

app.mount("#app");