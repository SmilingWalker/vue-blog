"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var user = {
  state: {
    musicList: [],
    showLogin: false
  },
  mutations: {
    showLogDia: function showLogDia(state) {
      state.showLogin = true;
    },
    closeLogDia: function closeLogDia(state) {
      state.showLogin = false;
    }
  },
  actions: {}
};
var _default = user;
exports["default"] = _default;