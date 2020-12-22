const path = require('path');
const winston = require('winston');

// Logging levels
// 0: error
// 1: warn
// 2: info
// 3: verbose
// 4: debug
// 5: silly

// define the custom settings for each transport (file, console)
var options = {
	fileInfo: {
		level: 'info',
		filename: path.join(process.cwd(), 'logs/info.log'),
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	fileError: {
		level: 'error',
		filename: path.join(process.cwd(), 'logs/error.log'),
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	consoleInfo: {
		level: 'info',
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	},
	consoleError: {
		level: 'error',
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	},
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
	transports: [
		// new winston.transports.File(options.fileInfo),
		// new winston.transports.File(options.fileError),
		// new winston.transports.Console(options.consoleInfo),
		// new winston.transports.Console(options.consoleError),
	],
	exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV === 'development') {
	logger.add(new winston.transports.Console(options.consoleInfo));
	logger.add(new winston.transports.Console(options.consoleError));
}
else {
	logger.add(new winston.transports.File(options.fileError));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function (message, encoding) {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger.info(message);
	},
};

module.exports = logger;