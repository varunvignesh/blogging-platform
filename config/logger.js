// External dependencies
const expressWinston = require("express-winston");
const winston = require("winston");

const logger = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.json(),
    ),
    meta: false, // made it false just make the console logs not cluttered
    expressFormat: true,
    colorize: false,
});

// Instantiate logger
const logging = winston.createLogger(logger);

module.exports = {
    logger,
    logging,
};
