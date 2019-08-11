"use strict";

var _util = require("../util");

const Router = require("koa-router");

const user = new Router();
// /user
user.get("/", (0, _util.checkParams)(true), async (ctx, next) => {
  ctx.body = "user";
  await next();
}); // user/list

user.get("/list", (0, _util.checkParams)(true), async (ctx, next) => {
  let res = await ctx.$get("/list", ctx.q);
  ctx.body = (0, _util.successRes)({
    data: res.data
  });
  await next();
});
module.exports = user;