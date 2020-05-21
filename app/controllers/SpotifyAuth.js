const querystring = require("query-string");
const userMap = require("../services/userMap");
const UserHandler = require("../services/userHandler");
const { pino, credentials, scopes, myApi, generateRandomString } = require("../utils");

const login = (_, res) => {
	const state = generateRandomString(16);
	const authURL = querystring.stringifyUrl({
		url: "https://accounts.spotify.com/authorize",
		query: {
			client_id: credentials.clientId,
			response_type: "code",
			redirect_uri: credentials.redirectUri,
			scope: scopes.join(", "),
			state,
		},
	});
	res.cookie("spotify_auth_state", state).redirect(authURL);
};

const logout = (req, res) => {
	delete userMap[req.session.user];
	req.session.destroy(err => {
		if (err) {
			pino.error("Logout failed: " + err);
		}
		res.redirect("/");
	});
};

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
		const data = await myApi.authorizationCodeGrant(code);
		const access_token = data.body["access_token"],
			refresh_token = data.body["refresh_token"];

		pino.info(">>> Prepping user..");
		const user = new UserHandler(access_token, refresh_token, data.body["expires_in"]);
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
