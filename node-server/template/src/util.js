import { SERVER_NAME, ENV_DEV } from "../config"
import axios from "axios"
import qs from "qs"

const req = axios.create({
    baseURL: process.env.BASEURL || ENV_DEV.BASEURL,
    timeout: 10000
})

const post = ctx => async (url, data, ...opts) => {
    let res
    try {
        res = await req.post(url, data, { headers: ctx.headers, ...opts })
    } catch (err) {
        resErrorFomart(ctx, err)
    }
    if (res.data.code !== "0") {
        resErrorFomart(ctx, res)
    }
    return res
}

const get = ctx => async (url, data, ...opts) => {
    url += "?" + qs.stringify(data)
    let res

    try {
        res = await req.get(url, { headers: ctx.headers, ...opts })
    } catch (err) {
        resErrorFomart(ctx, err)
    }
    if (res.data.code !== "0") {
        resErrorFomart(ctx, res)
    }
    return res
}

export const checkParams = checkinfo => async (ctx, next) => {
    if (!checkinfo) {
        ctx.throw("400", "checkinfo is error")
        return false
    }
    let params
    if (ctx.method === "GET") {
        params = ctx.query
    } else {
        param = ctx.request.body
    }
    ctx.q = params
    await next()
}

function errorRes({ msg = "error", code = 500, data = {} }) {
    return {
        msg,
        code,
        data
    }
}

export function successRes({ msg = "success", code = 0, data = {} }) {
    return {
        msg,
        code,
        data
    }
}

const resErrorFomart = (ctx, res) => {
    let isError = res.isAxiosError
    let err

    if (isError) {
        err = new Error("target sever is error")
        err.code = "500"
    } else {
        err = new Error("that target sever responese error")
        err.code = "401"
    }
    err.res = res
    throw err
}

export async function errorControl(ctx, next) {
    try {
        await next()
    } catch (err) {
        const res = err.res
        ctx.$log(
            {
                ajax_param: ctx.method == "GET" ? ctx.query : ctx.request.body,
                status: res.status,
                url: res.config.url,
                param: qs.parse(res.config.data),
                res_data: res.data
            },
            "error"
        )
        if (err.code) {
            if (err.code === "401") {
                ctx.throw(401)
                return
            }
            ctx.body = errorRes({ msg: err.message })
        } else {
            ctx.throw(400, err.msg)
        }
    }
}

export async function routerInit(ctx, next) {
    ctx.$get = get(ctx)
    ctx.$post = post(ctx)
    ctx.$log = (data, logType = "log") => {
        setImmediate(() => {
            try {
                let json = {
                    env: process.env.LOG_ENV || "test",
                    module: "node",
                    time: +new Date(),
                    serverName: SERVER_NAME,
                    data: data,
                    url: ctx.url,
                    ip: toArray((ctx.headers["x-forwarded-for"] || "").split(","))[0] || ctx.ip,
                    session_key: ctx.request.headers.cookie,
                    logType: logType
                }
                //send log Server
                console.log("server log:$o", json)
            } catch (err) {
                console.log("log error:%o", err)
            }
        })
    }
    await next()
}

export function toArray(arr) {
    return arr instanceof Array ? arr : []
}
