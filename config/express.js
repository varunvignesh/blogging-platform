// External Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const expressValidation = require("express-validation");
const expressJwt = require("express-jwt");

// Internal Dependencies
const routes = require("../index.route");
const logger = require("./logger").logger;

// Express instance
const app = express();

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing, Not added any as of this case.
app.use(cors());

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 10 * 1024 * 1024 })); // 10 MB

// Mount logger
app.use(logger);

// API to check health
app.get("/api/v1/health/", (req, res) =>
    res.status(200).send({
        status: "SUCCESS",
        message: "Application is active",
    }),
);

// Mount routes to api
app.use("/api/v1", routes);

// Middleware to handle request errors
app.use((err, req, res, next) => {
    // Middleware to handle express validation error
    if (err instanceof expressValidation.ValidationError) {
        const error_data = {
            status: "ERROR",
            code: 911, // internal custom code if required
            error: [],
        };

        err.errors.forEach((error) => {
            error_data.error.push({
                field: error.field[0],
                messages: error.messages[0],
            });
        });

        return res.status(err.status).send(error_data);
    }

    // Middleware for authentication error
    if (err instanceof expressJwt.UnauthorizedError) {
        return res.status(err.status).send({
            status: "ERROR",
            code: 912, // internal custom code if required
            message: "Token Expired",
        });
    }

    return next(err);
});

module.exports = app;
