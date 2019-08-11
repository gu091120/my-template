module.exports={
    SERVER_NAME:"mykoaserver",
    PROT:8080,
    ENV_DEV:{
        NODE_ENV: "development",
        LOG_ENV: "dev",
        LOG_URL: "",
        SIGN_KEY: "",
        BASEURL: "http://127.0.0.1:8080"
    },
    ENV_TEST:{
        NODE_ENV: "test",
        LOG_ENV: "test",
        LOG_URL: "",
        SIGN_KEY: "",
        BASEURL: "http://www.baidu11.com"
    },
    ENV_PRO:{
        NODE_ENV: "production",
        LOG_ENV: "prod",
        LOG_URL: "",
        SIGN_KEY: "",
        BASEURL: "http://www.baidu11.com"
    }
}