"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _config = require("../config");

var _util = require("./util");

var _controller = _interopRequireDefault(require("./controller"));

const app = new _koa.default();
const router = new _koaRouter.default();
router.use("/api", _util.routerInit, _controller.default.routes(), _controller.default.allowedMethods());
router.get("/list", async (ctx, next) => {
  ctx.body = "from list infor";
  await next();
});
router.get("/info", async (ctx, next) => {
  ctx.body = process.env.NODE_ENV || "info";
  await next();
});
app.use(_util.errorControl).use(router.routes()).use(router.allowedMethods()).listen(_config.PROT, () => {
  console.log("server is running,port:%d", _config.PROT);
});