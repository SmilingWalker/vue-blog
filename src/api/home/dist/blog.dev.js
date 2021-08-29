"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _requestAdmin = _interopRequireDefault(require("@/utils/requestAdmin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var blog = {
  QueryAllLabels: function QueryAllLabels() {
    return _requestAdmin["default"].get("/labels/all");
  },
  QueryArticlesByPage: function QueryArticlesByPage(page) {
    return _requestAdmin["default"].post("/articles/pages", {
      page: page
    });
  }
};
var _default = blog;
exports["default"] = _default;