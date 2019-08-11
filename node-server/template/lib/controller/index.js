"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _user = _interopRequireDefault(require("./user"));

const router = new _koaRouter.default();
router.use("/user", _user.default.routes(), _user.default.allowedMethods());
var _default = router;
exports.default = _default;