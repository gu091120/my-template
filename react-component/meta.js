module.exports = {
  prompts: {
      projectName: {
          type: "string",
          required: true,
          message: "Project name"
      },
      description: {
          type: "string",
          required: false,
          message: "Project description",
          default: "A react component"
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
      terminal: {
          type: "list",
          message: "select terminal type",
          choices: ["PC", "H5","Common"],
          default: 3
      },
      autoInstall: {
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
