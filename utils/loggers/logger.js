const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const {
  combine, timestamp, label, printf,
} = format;

const myFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);
const {
  Console,
  DailyRotateFile,
} = transports;

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new Console(),
    new DailyRotateFile({
      name: 'base_loogger',
      filename: 'utils/logs/info.log',
      prepend: false,
      datePattern: 'YYYY-MM-DD-HH',
    }),
    new DailyRotateFile({
      name: 'error_logger',
      filename: 'utils/logs/error.log',
      prepend: false,
      datePattern: 'YYYY-MM-DD-HH',
      level: 'error',
    })],
});

module.exports = logger;
