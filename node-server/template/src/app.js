import Koa from "koa"
import Router from "koa-router"
import { PROT } from "../config"
import { errorControl, routerInit } from "./util"
import controller from "./controller"

const app = new Koa()
const router = new Router()

router.use("/api", routerInit, controller.routes(), controller.allowedMethods())

router.get("/list", async (ctx, next) => {
    ctx.body = "from list infor"
    await next()
})

app.use(errorControl)
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(PROT, () => {
        console.log("server is running,port:%d",PROT)
    })
