module.exports = {
    prompts: {
        description: {
            type: "string",
            required: false,
            message: "Project description",
            default: "A node api proxy server"
        },
        author: {
            type: "string",
            message: "project author",
            default: "author"
        },
        version: {
            type: "string",
            message: "project version",
            default: "0.0.1"
        },
        autoInstall: {
            when: "isNotTest",
            type: "list",
            message:
                "Should we run `npm install` for you after the project has been created? (recommended)",
            choices: [
                {
                    name: "Yes, use NPM",
                    value: "npm",
                    short: "npm"
                },
                {
                    name: "Yes, use Yarn",
                    value: "yarn",
                    short: "yarn"
                },
                {
                    name: "No, I will handle that myself",
                    value: false,
                    short: "no"
                }
            ]
        }
    }
};
