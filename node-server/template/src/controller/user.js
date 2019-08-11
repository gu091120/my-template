const Router = require("koa-router")
const user = new Router()
import {  checkParams,successRes } from "../util"

// /user
user.get("/", checkParams(true), async (ctx, next) => {
    ctx.body = "user"
    await next()
})

// user/list
user.get("/list", checkParams(true), async (ctx, next) => {
    let res = await ctx.$get("/list", ctx.q)
    ctx.body = successRes({data:res.data})
    await next()
})

module.exports = user
