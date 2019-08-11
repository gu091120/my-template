var {SERVER_NAME,ENV_DEV,ENV_PRO,ENV_TEST} = require("./config")

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: SERVER_NAME,
            script: "./lib/app.js",
            instances: 0,
            watch: ["lib", "package.json", "ecosystem.config.js","config"],
            watch_options: {
                usePolling: true
            },
            exec_mode: "cluster",
            env_dev:ENV_DEV,
            env_test:ENV_TEST,
            env:ENV_PRO,
        }
    ],
    
}
