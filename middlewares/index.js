const { getToken, policyFor } = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../app/config');
const User = require('../app/user/model');

function decodeToken() {
	return async function(req, res, next) {
		try {
			let token = getToken(req);

			if (!token) return next();

			req.user = jwt.verify(token, config.secretKey);

			let user = await User.findOne({ token: { $in: [ token ] } });

			if (!user) {
				res.json({
					error: 1,
					message: 'session expired'
				});
			}
		} catch (err) {
			if (err && err.name === 'JsonWebTokenError') {
				return res.json({
					error: 1,
					message: err.message
				});
			}

			next(err);
		}

		return next();
	};
}
// cek hak akses
function police_check(action, subject) {
	return function(req, res, next) {
		let policy = policyFor(req.user);
		if (!policy.can(action, subject)) {
			return res.json({
				error: 1,
				message: `You are not allowed to ${action} ${subject}`
			});
		}
		next();
	};
}

module.exports = {
	decodeToken,
	police_check
};
