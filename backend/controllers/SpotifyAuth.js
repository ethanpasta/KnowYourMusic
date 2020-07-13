const querystring = require("query-string");
const { sessionMap, UserAuthHandler } = require("../services/userService");
const { pino } = require("../utils").logger;
const { generateRandomString } = require("../utils").helperFuncs;
const { CREDENTIALS, SCOPES, MY_API } = require("../utils").constants;

/* Module hands user authorization with Spotify */

// Function handles user login and redirects to spotify authorization
const login = (_, res) => {
	const state = generateRandomString(16);
	const authURL = querystring.stringifyUrl({
		url: "https://accounts.spotify.com/authorize",
		query: {
			client_id: CREDENTIALS.clientId,
			response_type: "code",
			redirect_uri: CREDENTIALS.redirectUri,
			scope: SCOPES.join(", "),
			state,
		},
	});
	res.cookie("spotify_auth_state", state).redirect(authURL);
};

// Function handles user logout
const logout = (req, res) => {
	sessionMap.deleteUser(req.session.user);
	req.session.destroy(err => {
		if (err) {
			pino.error("Logout failed: " + err);
		}
		res.redirect("/");
	});
};

// Function handles redirection after user accepts/declines Spotify authorization
const callback = async (req, res) => {
	const { code, state, error } = req.query,
		origState = req.cookies["spotify_auth_state"];
	// If the user did not authorize, or some type of cross-site request happened
	if (error || state != origState) {
		pino.error(
			"User didn't authorize OR state didn't match. \n" +
				"Request param error: " +
				error +
				", Cookie state: " +
				origState +
				", req state: " +
				state
		);
		res.redirect("/");
		return;
	}
	try {
		// Get Spotify token
		const data = await MY_API.authorizationCodeGrant(code);
		const access_token = data.body["access_token"],
			refresh_token = data.body["refresh_token"];

		pino.info(">>> Prepping user..");
		const user = new UserAuthHandler(access_token, refresh_token, data.body["expires_in"]);
		req.session.user = await user.recognizeAndInitialize();
		res.clearCookie("spotify_auth_state").redirect("/");
	} catch (error) {
		pino.error("Something went wrong: " + error);
		res.redirect("/");
		return;
	}
};

module.exports = {
	login,
	callback,
	logout,
};
