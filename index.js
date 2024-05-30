// Internal modules
const config = require("./config/config");
const app = require("./config/express");

if (!module.parent) {
    app.listen(config.app_port, () => {
        console.info(
            `Server started on port ${config.app_port} in ${config.node_env} environment`,
        );
    });
}

module.exports = app;
