/**
 * Module dependencies.
 */
const config = require('config');
const path = require('path');
const loggerMorgan = require('morgan');
const loggerWinston = require('./config/winston-logger');
const app = require('express')();
const session = require('express-session')
const memoryStore = require('memorystore')(session)
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');

/**
 * Express configuration.
 */

app.set('trust proxy', 1);
app.set('host', config.get('host') || '0.0.0.0');
app.set('port', config.get('port') || 8080);
app.set('protocol', 'http');
app.disable('x-powered-by');

// Logging to console while dev or to files while prod
if (process.env.NODE_ENV === 'development')
	app.use(loggerMorgan('dev'));
else
	app.use(loggerMorgan('combined', { stream: loggerWinston.stream }));

// Views engine pug
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session management
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.get('session.secret'),
	name: config.get('session.name'),
	cookie: {
		maxAge: config.get('session.maxAge'),
	},
	store: new memoryStore({
		checkPeriod: config.get('session.maxAge')
	}),
}));

/**
 * Headers
 */
app.use(helmet());
if (process.env.NODE_ENV === 'production') {
	app.use(function (req, res, next) {
		res.setHeader(`content-security-policy`, `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'`);
		next();
	});
}

/* Express helper */
app.use(function (req, res, next) {
	req.pageError = function () {
		return res.status(404).render(`404.pug`, {
			pageName: 'pageError',
			data: { /*...*/ }
		});
	}
	// more helpers here
	// ...
	return next();
});

/**
 * Routes
 */
app.use(require('./app-router'));

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
	console.log('-----------------------------------------------');
	console.log('');
	console.log('App is running at http://localhost:%d in %s mode', app.get('port'), process.env.NODE_ENV);
	console.log('Press CTRL-C to stop');
	console.log('');
	console.log('-----------------------------------------------');
});
