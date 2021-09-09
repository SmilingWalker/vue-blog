"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _requestAdmin = _interopRequireDefault(require("@/utils/requestAdmin"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var blog = {
  QueryAllLabels: function QueryAllLabels() {
    return _requestAdmin["default"].get("/labels/all");
  },
  QueryArticlesByPage: function QueryArticlesByPage(page) {
    return _requestAdmin["default"].post("/articles/pages", {
      page: page
    });
  },
  QueryArticleById: function QueryArticleById(id) {
    return _requestAdmin["default"].post("/articles/content", _qs["default"].stringify({
      id: id
    }));
  },
  QueryMessageByArticleId: function QueryMessageByArticleId(articleId) {
    return _requestAdmin["default"].post("/message/query/article", _qs["default"].stringify({
      articleId: articleId
    }));
  }
};
var _default = blog;
exports["default"] = _default;