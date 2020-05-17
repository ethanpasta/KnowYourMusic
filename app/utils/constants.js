require("dotenv").config();

const credentials = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI,
};
const scopes = ["user-library-read", "user-read-email", "user-read-currently-playing"];

module.exports = {
	credentials,
	scopes,
};
