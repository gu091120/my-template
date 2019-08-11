import Router from "koa-router"
const router = new Router()
import user from "./user"

router.use(
    "/user",
    user.routes(),
    user.allowedMethods()
)

export default router
