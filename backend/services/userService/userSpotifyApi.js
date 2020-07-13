const SpotifyWebApi = require("spotify-web-api-node");
const { CREDENTIALS } = require("../../utils/constants");
const { sanitizeSongTitle, checkIfMostlyEnglish } = require("../../utils").helperFuncs;

/** Class manages usage with Spotify Web Api.
 *  It extends the SpotifyWebApi package, and adds custom functionalities */
class UserSpotifyAPI {
	/**
	 * Create new UserSpotifyAPI
	 * @param {String} access_token - Spotify API access token
	 * @param {String} refresh_token - Spotify API refresh token
	 * @param {Number} expires_in - Expiration time of the access token
	 */
	constructor(access_token, refresh_token, expires_in = 3600) {
		const api = new SpotifyWebApi(CREDENTIALS);
		api.setAccessToken(access_token);
		api.setRefreshToken(refresh_token);
		this.api = api;
		this.expiresIn = (expires_in - 100) * 1000;
		this.lastRefresh = Date.now();
	}

	/**
	 * Updates the last refresh time of the access token to current time
	 * @return {Number} The last refresh time
	 */
	updateRefreshTime() {
		return (this.lastRefresh = Date.now());
	}

	/**  Sets the expiration time of the access token */
	setExpiresIn(timeSeconds) {
		this.expiresIn = timeSeconds * 1000;
	}

	/**
	 * Checks and returns if the access token needs to be refreshed
	 * @return {Boolean} True if valid, false otherwise
	 */
	needsToRefresh() {
		return Date.now() - this.lastRefresh >= this.expiresIn;
	}

	/**
	 * Gets all songs saved in the library of the current api
	 * @return {List} A collection of all songs
	 */
	async getAllSongs() {
		try {
			// get first 50 songs from library
			let response = (await this.api.getMySavedTracks({ limit: 50 })).body;
			let allSongs = extractSongs(response);
			// Create a list of promises: each promise is a request fetching 50 songs with an offset (length of list = number of total songs / 50)
			let songRequests = [...Array(Math.ceil((response.total - 50) / 50)).keys()].map(val =>
				this.api.getMySavedTracks({ limit: 50, offset: (val + 1) * 50 })
			);
			let finishedPromises = await Promise.all(songRequests);
			// Concat all other songs found to the initial list of 50
			allSongs = finishedPromises.reduce((songs, curr) => {
				return songs.concat(extractSongs(curr.body));
			}, allSongs);
			return allSongs;
		} catch (error) {
			throw new Error("Error while fetching songs: " + error);
		}
	}

	/**
	 * Get current user profile
	 * @return {Object} user profile
	 */
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

/**
 * Function parses and extracts the relevant track information
 * @param {Object} apiResponse - The response from the "api.getMySavedTracks" request
 * @return {Object} A list of extracked track information
 */
const extractSongs = apiResponse => {
	return apiResponse.items.reduce((songs, curr) => {
		// Only songs in English (for now)
		if (checkIfMostlyEnglish(curr.track.name)) {
			const song = {
				_id: curr.track.id,
				title: sanitizeSongTitle(curr.track.name),
				artist: curr.track.artists[0].name,
			};
			songs.push(song);
		} else {
			console.log(`Skipping song '${curr.track.name}' ಠ_ಠ`);
		}
		return songs;
	}, []);
};

module.exports = UserSpotifyAPI;
