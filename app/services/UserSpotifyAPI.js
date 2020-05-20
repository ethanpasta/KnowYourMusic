const SpotifyWebApi = require("spotify-web-api-node");
const { credentials } = require("../utils/constants");
const { sanitizeSongTitle } = require("../utils/sanitizer");

/**
 * --- Spotify API Service ---
 * The class SpotifyAPI uses SpotifyWebApi package, and adds custom functionalities
 */
class UserSpotifyAPI {
	constructor(access_token, refresh_token, expires_in = 3600) {
		const api = new SpotifyWebApi(credentials);
		api.setAccessToken(access_token);
		api.setRefreshToken(refresh_token);
		this.api = api;
		this.expiresIn = (expires_in - 100) * 1000;
		this.lastRefresh = Date.now();
	}
	updateRefreshTime() {
		return (this.lastRefresh = Date.now());
	}
	getUpdatedAt() {
		return this.lastRefresh;
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
			let response = (await this.api.getMySavedTracks({ limit: 50 })).body;
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

// Function extracts the relevant track information from the response body
const extractSongs = apiResponse =>
	apiResponse.items.map(item => ({
		id: item.track.id,
		title: sanitizeSongTitle(item.track.name),
		artist: item.track.artists[0].name,
	}));

module.exports = UserSpotifyAPI;
