const path = require('path');
const express = require('express');
const router = express.Router();

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const apiController = require('./controllers/api');

/**
 * Page routes.
 */
router.get('/', homeController.index);
router.get('/about', aboutController.index);

/**
 * API routes.
 */
router.post('/api/data-example', apiController.postDataExample);

/**
 * Static routes.
 */
// maxAge: 365.25 * 86400000
router.use('/dist', express.static(path.join(process.cwd(), 'dist'), { maxAge: 30 * 86400000 }));
router.use('/', express.static(path.join(process.cwd(), 'public'), { maxAge: 30 * 86400000 }));

// static-work-flow
// avoid this route when not using jQuery inline or within /public/js/
router.use('/lib/jquery', express.static(path.join(process.cwd(), 'node_modules/jquery/dist'), { maxAge: 30 * 86400000 }));


/**
 * Error Handler.
 */
router.use(function (req, res, next) {
	req.pageError();
});

module.exports = router;