"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("@/pages/admin/store/index"));

var _router = _interopRequireDefault(require("@/pages/admin/router"));

var _base = _interopRequireDefault(require("@/api/base.js"));

var _elementPlus = require("element-plus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Vue from "vue"
//创建 axios实例 
var instance = _axios["default"].create({
  baseURL: _base["default"].blog,
  timeout: 5000
});
/**
 * 添加请求拦截器
 */


instance.interceptors.request.use(function (config) {
  //如果当前状态信息内有token数据，就携带token数据
  if (_index["default"].state.user.token != "") {
    config.headers.Authorization = _index["default"].state.user.token;
  }

  return config;
}, function (error) {
  Promise.error(error);
});
/**
 * response拦截器
 */

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // Message('操作成功')
  if (response.headers.authorization) {
    _index["default"].dispatch("setToken", response.headers.authorization);
  }

  if (response.data.code == 200) {
    return Promise.resolve(response.data);
  } else {
    _elementPlus.ElNotification.warning({
      title: '错误提示',
      message: response.data.message
    });
  } // 打印错误信息


  return Promise.reject(response.data);
}, function (error) {
  switch (error.response.status) {
    case 400:
      _elementPlus.ElNotification.warning({
        title: '用户登录提示',
        message: error.response.data.message,
        onClose: function onClose() {
          _index["default"].dispatch("Logout");

          _router["default"].push('/login');
        }
      });

      break;

    case 401:
      _elementPlus.ElNotification.warning({
        title: '请求参数有误',
        message: error.response.data.message
      });

      break;

    case 403:
      _elementPlus.ElNotification.warning({
        title: '用户权限提示',
        message: error.response.data.message,
        onClose: function onClose() {
          _router["default"].push('/login');
        }
      });

      break;

    case 404:
      _elementPlus.ElNotification.warning({
        title: '访问路径不正确',
        message: error.response.data.message
      });

      break;

    case 422:
      _elementPlus.ElNotification.warning({
        title: '温馨提示',
        message: error.response.data.message,
        onClose: function onClose() {
          _index["default"].dispatch("logOut");

          _router["default"].push('/login');
        }
      });

      break;

    case 500:
      _elementPlus.ElNotification.error({
        title: '网络提示',
        message: '服务器连接失败，请稍后再试'
      });

      break;

    default:
      _elementPlus.ElNotification.error({
        title: '错误提示 ' + error.response.status,
        message: error.response.data.message
      });

  }
});
var _default = instance;
exports["default"] = _default;