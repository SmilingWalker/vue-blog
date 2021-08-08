"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _user = _interopRequireDefault(require("./modules/user"));

var _home = _interopRequireDefault(require("./modules/home"));

var _message = _interopRequireDefault(require("./modules/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _vuex.createStore)({
  modules: {
    user: _user["default"],
    index: _home["default"],
    message: _message["default"]
  }
});

exports["default"] = _default;