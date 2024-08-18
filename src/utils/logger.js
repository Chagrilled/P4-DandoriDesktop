const { app } = require('electron');
const winston = require('winston');
const { createLogger, format, transports } = winston;
require('winston-daily-rotate-file');

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${app.getPath('userData')}/logs/ddt-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '5m',
    maxFiles: '7d',
    zippedArchive: false,
    format: logFormat
});

const logger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            )
        }),
        dailyRotateFileTransport
    ]
});

module.exports = logger;