require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");

const CREDENTIALS = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};
const SCOPES = ["user-library-read", "user-read-email", "user-read-currently-playing"];

const NUM_OF_LEVELS = 10;
const OPTIONS_PER_LEVEL = 4;

module.exports = {
	CREDENTIALS,
	SCOPES: SCOPES,
	MY_API: new SpotifyWebApi(CREDENTIALS),
	NUM_OF_LEVELS,
	OPTIONS_PER_LEVEL,
};
