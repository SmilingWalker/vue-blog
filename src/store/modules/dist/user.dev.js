"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var user = {
  state: {
    user: '',
    token: localStorage.getItem('token') || ''
  },
  mutations: {},
  actions: {}
};
var _default = user;
exports["default"] = _default;