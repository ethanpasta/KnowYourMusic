const SpotifyWebApi = require("spotify-web-api-node");
const { credentials } = require("../utils/constants");
const { sanitizeSongTitle, checkIfMostlyEnglish } = require("../utils");

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
	setExpiresIn(timeSeconds) {
		this.expiresIn = timeSeconds * 1000;
	}
	// Check if the access token is still valid (true if valid, false otherwise)
	needsToRefresh() {
		return Date.now() - this.lastRefresh >= this.expiresIn;
	}
	// Get all of the users saved songs
	async getAllSongs() {
		try {
			let response = (await this.api.getMySavedTracks({ limit: 50 })).body;
			let allSongs = extractSongs(response);
			// Create a list of promises: each promise is an api request fetching 50 songs with an offset (length of list = number of total songs / 50)
			let songRequests = [...Array(Math.ceil((response.total - 50) / 50)).keys()].map(val =>
				this.api.getMySavedTracks({ limit: 50, offset: (val + 1) * 50 })
			);
			let finishedPromises = await Promise.all(songRequests);
			allSongs = finishedPromises.reduce((songs, curr) => {
				return songs.concat(extractSongs(curr.body));
			}, allSongs);
			return allSongs;
		} catch (error) {
			throw new Error("Error while fetching songs: " + error);
		}
	}
	getMe() {
		if (this.profile) return Promise.resolve(this.profile);
		return this.api.getMe().then(res => {
			if (!this.profile) {
				this.profile = res.body;
			}
			return res.body;
		});
	}
	setAccessToken(access_token) {
		this.api.setAccessToken(access_token);
	}
	refreshAccessToken() {
		return this.api.refreshAccessToken();
	}
}

// Function extracts the relevant track information from the response body
const extractSongs = apiResponse => {
	return apiResponse.items.reduce((songs, curr) => {
		// Only extract songs in English (for now)
		if (checkIfMostlyEnglish(curr.track.name)) {
			const song = {
				_id: curr.track.id,
				title: sanitizeSongTitle(curr.track.name),
				artist: curr.track.artists[0].name,
			};
			songs.push(song);
		} else {
			console.log(`Skipping: ${curr.track.name} 😫`);
		}
		return songs;
	}, []);
};

module.exports = UserSpotifyAPI;
