"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _requestHome = _interopRequireDefault(require("@/utils/requestHome"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user = {
  AdminLogin: function AdminLogin(formdata) {
    return _requestHome["default"].post("/users/login", _qs["default"].stringify(formdata));
  },
  QueryUsersByPage: function QueryUsersByPage(page) {
    return _requestHome["default"].post("/users/pages", _qs["default"].stringify({
      page: page
    }));
  },
  setUserOffline: function setUserOffline(state, id) {
    return _requestHome["default"].post("/users/offline", _qs["default"].stringify({
      state: state,
      id: id
    }));
  }
};
var _default = user;
exports["default"] = _default;