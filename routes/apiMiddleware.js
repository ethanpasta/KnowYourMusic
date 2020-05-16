const sessionApiMapper = require("../controllers/SessionInstanceMap");
const SpotifyAPI = require("../services/spotifyWrapper");
const User = require("../models/users/model.js");
const { pino } = require("../utils/logger");

/**
 * Add the spotifyApi instance to the request object.
 * If session is found in the local memory mapper, it's attached to the req object
 * Otherwise, new API is created, saved, and attached to the req object
 */
exports.sessionAttach = (req, res, next) => {
	if (req.session.user && req.session.user in sessionApiMapper) {
		console.log("Session existed in SessionMapper");
		req.api = sessionApiMapper[req.session.user];
		next();
	} else if (req.session.user) {
		// Server was restarted, session still exists in mongo, but the users api is gone
		// Get user from database, get his access token, create a new spotify api instance, save it
		User.findOne({ username: req.session.user }, "access_token refresh_token updated_at")
			.then(user => {
				const userApi = new SpotifyAPI();
				userApi.setUpdatedAt(user.updated_at);
				userApi.setAccessToken(user.access_token);
				userApi.setRefreshToken(user.refresh_token);
				sessionApiMapper[req.session.user] = userApi;
				req.api = userApi;
				console.log("User existed, added a new api to the map");
				next();
			})
			.catch(err => {
				console.log("Couldn't find user, error: " + err);
				next(err);
			});
	} else {
		console.log("User is not logged in. Session did not exist.");
		res.redirect("/");
	}
};

/**
 * Checks if the Spotify API is expired and needs to be refreshed.
 */
exports.checkRefresh = (req, res, next) => {
	const api = req.api;
	if (api.needsToRefresh()) {
		console.log("Refresh is needed");
		api.refreshAccessToken().then(
			data => {
				// Save the access token so that it's used in future calls
				api.setAccessToken(data.body["access_token"]);
				const newUpdateTime = Date.now();
				api.setUpdatedAt(newUpdateTime);
				User.refreshUpdate(req.session.user, data.body["access_token"], newUpdateTime)
					.then(pino.log)
					.catch(pino.error);
				next();
			},
			err => {
				console.log("Could not refresh access token", err);
				res.redirect("/");
			}
		);
	} else {
		console.log("Access token is still valid!");
		next();
	}
};
