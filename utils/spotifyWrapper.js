const SpotifyWebApi = require("spotify-web-api-node");
const { credentials } = require("./constants");

class SpotifyAPI extends SpotifyWebApi {
	constructor() {
		super(credentials);
	}
	setUpdatedAt(time = Date.now()) {
		this.updatedAt = time;
	}
	setExpiresIn(timeMilliSeconds) {
		this.expiresIn = timeMilliSeconds * 1000;
	}
	getExpiresIn() {
		return this.expiresIn;
	}
	needsToRefresh() {
		console.log("NEED TO REFRESH: " + (this.updatedAt + this.expiresIn > Date.now()));
		return this.updatedAt + this.expiresIn > Date.now();
	}
}

module.exports = SpotifyAPI;
