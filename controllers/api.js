/**
 * POST /api/data-example
 * return rendered pug file (api/data-example.pug)
 */
exports.postDataExample = (req, res) => {
	res.render('api/data-example', {
		say: req.body.say,
		again: req.body.again,
	});
};
