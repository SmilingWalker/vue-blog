"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpmanager = _interopRequireDefault(require("@/utils/httpmanager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var user = {
  state: {
    user: {},
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setToken: function setToken(state, data) {
      //写入token
      state.token = data;
    },
    userInfo: function userInfo(state, data) {
      //写入个人信息
      state.user = _objectSpread({}, state.user, {}, data);
    },
    logOut: function logOut(state) {
      //退出
      state.token = '';
      state.user = '';
    }
  },
  actions: {
    setToken: function setToken(_ref, data) {
      var commit = _ref.commit;
      commit('setToken', data);
    },
    userInfo: function userInfo(_ref2) {
      var commit, res;
      return regeneratorRuntime.async(function userInfo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref2.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap(_httpmanager["default"].get('/apis/user/info'));

            case 3:
              res = _context.sent;
              commit('userInfo', res.data);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    logOut: function logOut(_ref3) {
      var commit = _ref3.commit;
      commit('logOut');
    }
  }
};
var _default = user;
exports["default"] = _default;