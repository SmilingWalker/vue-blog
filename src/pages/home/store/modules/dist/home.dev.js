"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var user = {
  state: {
    musicList: [],
    showLogin: false,
    showSign: false
  },
  mutations: {
    showLogDia: function showLogDia(state) {
      state.showLogin = true;
    },
    closeLogDia: function closeLogDia(state) {
      state.showLogin = false;
    },
    showSignDia: function showSignDia(state) {
      state.showSign = true;
    },
    closeSignDia: function closeSignDia(state) {
      state.showSign = false;
    }
  },
  actions: {}
};
var _default = user;
exports["default"] = _default;