const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(), // Colorize the output
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Custom timestamp format
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
            // Custom log format
            let log = `${timestamp} [${level}] : ${message}`;
            if (Object.keys(meta).length) {
                log += ` ${JSON.stringify(meta, null, 2)}`; // Pretty print meta data
            }
            return log;
        })
    ),
    transports: [
        new winston.transports.Console(), // Colored console output
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

logger.requestLogger = (req, res, next) => {
    const start = process.hrtime(); // Start timing

    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);

        logger.info(`${req.method} ${req.url} ${res.statusCode} ${durationInMilliseconds} ms`);
    });

    next();
};

// Helper function to calculate duration in milliseconds
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9; // Convert to nanoseconds
    const NS_TO_MS = 1e6; // Convert nanoseconds to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

module.exports = logger;
