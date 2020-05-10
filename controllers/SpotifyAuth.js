const SpotifyWebApi = require("spotify-web-api-node");
const { pino } = require("../utils/logger");
const sessionControllers = require("./SessionInstanceMap");
require("dotenv").config();

/**
 * SpotifyAuth - A controller for the Spotify authorization process.
 * login - A user is redirected to the Spotify authentication modal. On acception, he's redirected to:
 * callback - With the code we can get the real authorization code and store it.
 *
 * Each individual SpotifyWebApi instance is mapped with the user for future use.
 */

const credentials = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};
const scopes = ["user-library-read", "user-read-email", "user-read-currently-playing"];

// Generates a random string used for the state in the Spotify authorization process
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

const login = (req, res) => {
	const authURL = credsSpotifyApi.createAuthorizeURL(scopes, state);
	res.cookie("spotify_auth_state", state).redirect(authURL);
};

const callback = async (req, res) => {
	const userSpotifyApi = new SpotifyWebApi(credentials);
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
		pino.info("The token expires in " + data.body["expires_in"]);
		pino.info("The access token is " + data.body["access_token"]);
		pino.info("The refresh token is " + data.body["refresh_token"]);
		// Set the access token on the API object to use it in later calls
		userSpotifyApi.setAccessToken(data.body["access_token"]);
		userSpotifyApi.setRefreshToken(data.body["refresh_token"]);
		const user = await userSpotifyApi.getMe();
		req.session.user = user.body["id"];
		sessionControllers[user.body["id"]] = userSpotifyApi;
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
