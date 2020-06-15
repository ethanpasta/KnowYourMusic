const userMap = require("../services/userMap");
const UserSpotifyAPI = require("../services/UserSpotifyAPI");
const { User } = require("../models");
const { pino } = require("../utils").logger;

/**
 * Check is session exists before continuing to other middlewares
 */
const checkSession = (req, res, next) => {
	if (req.session.user === undefined) {
		console.log("User session doesn't exist");
		res.send({
			loggedIn: false,
			user: null,
			err: null,
		});
		return;
	}
	next();
};

/**
 * Add the spotifyApi instance to the request object.
 * If session is found in the local memory mapper, it's attached to the req object
 * Otherwise, new API is created, saved, and attached to the req object
 */
const sessionAttach = (req, res, next) => {
	if (req.session.user in userMap) {
		req.api = userMap[req.session.user].api;
		return next();
	}
	pino.info(`Session for ${req.session.user} wasn't in UserMap. Adding it.`);
	User.findOne({ username: req.session.user }, "access_token refresh_token last_refresh_update")
		.then(user => {
			const userApi = new UserSpotifyAPI(user.access_token, user.refresh_token);
			userApi.lastRefresh = user.last_refresh_update;
			req.api = (userMap[req.session.user] = { api: userApi }).api;
			next();
		})
		.catch(err => {
			pino.error("Couldn't find user, error: " + err);
			next(err);
		});
};

/**
 * Checks if the Spotify API is expired and needs to be refreshed.
 */
const checkRefresh = (req, res, next) => {
	const api = req.api;
	if (api.needsToRefresh()) {
		pino.info(`Access token refresh for user '${req.session.user}' is needed. refreshing...`);
		api.refreshAccessToken()
			.then(data => {
				// Save the access token so that it's used in future calls
				api.setAccessToken(data.body["access_token"]);
				let update_time = api.updateRefreshTime();
				User.refreshUpdate(req.session.user, data.body["access_token"], update_time)
					.then(res => pino.info(`Success: ${res}`))
					.catch(err => pino.error(`Error: ${err}`));
				next();
			})
			.catch(err => {
				console.log(err);
				pino.error("Could not refresh access token", err);
				res.redirect("/");
			});
	} else {
		pino.info("Access token is still valid!");
		next();
	}
};

module.exports = [checkSession, sessionAttach, checkRefresh];
