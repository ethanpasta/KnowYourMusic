const SpotifyWebApi = require("spotify-web-api-node");
const { pino } = require("../utils/logger");
require("dotenv").config();

const spotify_credentials = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};
const scopes = ["user-library-read", "user-read-email", "user-read-currently-playing"];
const spotifyApi = new SpotifyWebApi(spotify_credentials);

function generateRandomString(length) {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const login = res => {
	const state = generateRandomString(16);
	const auth_url = spotifyApi.createAuthorizeURL(scopes, state);
	res.cookie("spotify_auth_state", state).redirect(auth_url);
};

const callback = async (req, res) => {
	const { code, state, error } = req.query,
		orig_state = req.cookies["spotify_auth_state"];
	console.log(code, state, error);
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
		const data = await spotifyApi.authorizationCodeGrant(code);
		pino.info("The token expires in " + data.body["expires_in"]);
		pino.info("The access token is " + data.body["access_token"]);
		pino.info("The refresh token is " + data.body["refresh_token"]);
		// Set the access token on the API object to use it in later calls
		spotifyApi.setAccessToken(data.body["access_token"]);
		spotifyApi.setRefreshToken(data.body["refresh_token"]);
		const user = await spotifyApi.getMe();
		req.session.user = user.body["id"];
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
	spotifyApi,
};
