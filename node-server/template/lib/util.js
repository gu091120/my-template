"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.successRes = successRes;
exports.errorControl = errorControl;
exports.routerInit = routerInit;
exports.toArray = toArray;
exports.checkParams = void 0;

var _setImmediate2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set-immediate"));

var _config = require("../config");

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

const req = _axios.default.create({
  baseURL: process.env.BASEURL || _config.ENV_DEV.BASEURL,
  timeout: 10000
});

const post = ctx => async (url, data, ...opts) => {
  let res;

  try {
    res = await req.post(url, data, {
      headers: ctx.headers,
      ...opts
    });
  } catch (err) {
    resErrorFomart(ctx, err);
  }

  if (res.data.code !== "0") {
    resErrorFomart(ctx, res);
  }

  return res;
};

const get = ctx => async (url, data, ...opts) => {
  url += "?" + _qs.default.stringify(data);
  let res;

  try {
    res = await req.get(url, {
      headers: ctx.headers,
      ...opts
    });
  } catch (err) {
    resErrorFomart(ctx, err);
  }

  if (res.data.code !== "0") {
    resErrorFomart(ctx, res);
  }

  return res;
};

const checkParams = checkinfo => async (ctx, next) => {
  if (!checkinfo) {
    ctx.throw("400", "checkinfo is error");
    return false;
  }

  let params;

  if (ctx.method === "GET") {
    params = ctx.query;
  } else {
    param = ctx.request.body;
  }

  ctx.q = params;
  await next();
};

exports.checkParams = checkParams;

function errorRes({
  msg = "error",
  code = 500,
  data = {}
}) {
  return {
    msg,
    code,
    data
  };
}

function successRes({
  msg = "success",
  code = 0,
  data = {}
}) {
  return {
    msg,
    code,
    data
  };
}

const resErrorFomart = (ctx, res) => {
  let isError = res.isAxiosError;
  let err;

  if (isError) {
    err = new Error("target sever is error");
    err.code = "500";
  } else {
    err = new Error("that target sever responese error");
    err.code = "401";
  }

  err.res = res;
  throw err;
};

async function errorControl(ctx, next) {
  try {
    await next();
  } catch (err) {
    const res = err.res;
    ctx.$log({
      ajax_param: ctx.method == "GET" ? ctx.query : ctx.request.body,
      status: res.status,
      url: res.config.url,
      param: _qs.default.parse(res.config.data),
      res_data: res.data
    }, "error");

    if (err.code) {
      if (err.code === "401") {
        ctx.throw(401);
        return;
      }

      ctx.body = errorRes({
        msg: err.message
      });
    } else {
      ctx.throw(400, err.msg);
    }
  }
}

async function routerInit(ctx, next) {
  ctx.$get = get(ctx);
  ctx.$post = post(ctx);

  ctx.$log = (data, logType = "log") => {
    (0, _setImmediate2.default)(() => {
      try {
        let json = {
          env: process.env.LOG_ENV || "test",
          module: "node",
          time: +new Date(),
          serverName: _config.SERVER_NAME,
          data: data,
          url: ctx.url,
          ip: toArray((ctx.headers["x-forwarded-for"] || "").split(","))[0] || ctx.ip,
          session_key: ctx.request.headers.cookie,
          logType: logType //send log Server

        };
        console.log("server log:$o", json);
      } catch (err) {
        console.log("log error:%o", err);
      }
    });
  };

  await next();
}

function toArray(arr) {
  return arr instanceof Array ? arr : [];
}