const SpotifyWebApi = require("spotify-web-api-node");
const { pino } = require("../utils/logger");
const session_controllers = require("./mapSessionControllers");
require("dotenv").config();

const credentials = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};
const scopes = ["user-library-read", "user-read-email", "user-read-currently-playing"];

function generateRandomString(length) {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

let credsSpotifyApi = new SpotifyWebApi(credentials);
const state = generateRandomString(16);

const login = res => {
	const auth_url = credsSpotifyApi.createAuthorizeURL(scopes, state);
	res.cookie("spotify_auth_state", state).redirect(auth_url);
};

const callback = async (req, res) => {
	const userSpotifyApi = new SpotifyWebApi(credentials);
	const { code, state, error } = req.query,
		orig_state = req.cookies["spotify_auth_state"];
	if (error || state != orig_state) {
		pino.error(
			"User didn't authorize OR state didn't match. \n" +
				"Request param error: " +
				error +
				", Cookie state: " +
				orig_state +
				", req state: " +
				state
		);
		res.redirect("/");
		return;
	}
	try {
		const data = await userSpotifyApi.authorizationCodeGrant(code);
		pino.info("The token expires in " + data.body["expires_in"]);
		pino.info("The access token is " + data.body["access_token"]);
		pino.info("The refresh token is " + data.body["refresh_token"]);
		// Set the access token on the API object to use it in later calls
		userSpotifyApi.setAccessToken(data.body["access_token"]);
		userSpotifyApi.setRefreshToken(data.body["refresh_token"]);
		const user = await userSpotifyApi.getMe();
		req.session.user = user.body["id"];
		session_controllers[user.body["id"]] = userSpotifyApi;
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
};
