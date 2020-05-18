const SpotifyWebApi = require("spotify-web-api-node");
const { credentials } = require("../utils/constants");

/**
 * --- Spotify API Service ---
 * The class SpotifyAPI extends the SpotifyWebApi package, and adds custom functionalities
 */
class SpotifyAPI extends SpotifyWebApi {
	constructor() {
		super(credentials);
		this.expiresIn = 3500 * 1000;
	}
	// this.updatedAt is the last time the access_token was refreshed, including the first time
	setUpdatedAt(time = Date.now()) {
		this.updatedAt = time;
	}
	getUpdatedAt() {
		return this.updatedAt;
	}
	setExpiresIn(timeSeconds) {
		this.expiresIn = timeSeconds * 1000;
	}
	// Check if the access token is still valid (true if valid, false otherwise)
	needsToRefresh() {
		return Date.now() - this.updatedAt > this.expiresIn;
	}
	// Get all of the users saved songs
	async getAllSongs() {
		try {
			let response = (await this.getMySavedTracks({ limit: 50 })).body;
			let allSongs = extractSongs(response);
			// Create a list of promises: each promise is an api request fetching 50 songs with an offset (length of list = number of total songs / 50)
			let songRequests = [...Array(Math.ceil((response.total - 50) / 50)).keys()].map(val =>
				this.getMySavedTracks({ limit: 50, offset: (val + 1) * 50 })
			);
			let finishedPromises = await Promise.all(songRequests);
			finishedPromises.map(item => {
				// Add songs from each object to the total list of songs
				allSongs = allSongs.concat(extractSongs(item.body));
			});
			return allSongs;
		} catch (error) {
			return new Error("Error while fetching songs: " + error);
		}
	}
}

// Function extracts the track names from the response object
const extractSongs = apiResponse => apiResponse.items.map(item => item.track.name);

module.exports = SpotifyAPI;
