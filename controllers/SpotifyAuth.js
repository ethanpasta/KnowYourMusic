const SpotifyAPI = require("../utils/spotifyWrapper");
const { pino } = require("../utils/logger");
const sessionControllers = require("./SessionInstanceMap");
const User = require("../models/user.model");
const querystring = require("query-string");
const { credentials, scopes } = require("../utils/constants");

// Generates a random string used for the state in the Spotify authorization process
function generateRandomString(length) {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

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
	console.log(authURL);
	res.cookie("spotify_auth_state", state).redirect(authURL);
};

const logout = req => {
	delete sessionControllers[req.session.user];
};

const callback = async (req, res) => {
	const userSpotifyApi = new SpotifyAPI();
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
		const data = await userSpotifyApi.authorizationCodeGrant(code);
		const access_token = data.body["access_token"],
			refresh_token = data.body["refresh_token"];
		pino.info("The token expires in " + data.body["expires_in"]);
		pino.info("The access token is " + access_token);
		pino.info("The refresh token is " + refresh_token);
		// Set the access token on the API object
		userSpotifyApi.setAccessToken(access_token);
		userSpotifyApi.setRefreshToken(refresh_token);
		userSpotifyApi.setUpdatedAt();
		userSpotifyApi.setExpiresIn(data.body["expires_in"]);

		// Get user ID and display name
		const user = await userSpotifyApi.getMe();
		const username = user.body["id"];
		const display_name = user.body["display_name"];
		// Create user session
		req.session.user = user.body["id"];

		new User({
			username,
			display_name,
			access_token,
			refresh_token,
		})
			.save()
			.then(doc => console.log("Added user to db: " + doc))
			.catch(err => pino.warn(err.errors.username.message + ", Skipping."));
		sessionControllers[username] = userSpotifyApi;
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
