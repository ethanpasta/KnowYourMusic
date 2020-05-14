const SpotifyWebApi = require("spotify-web-api-node");
const { credentials } = require("./constants");

class SpotifyAPI extends SpotifyWebApi {
	constructor() {
		super(credentials);
		this.expiresIn = 3600 * 1000;
	}
	setUpdatedAt(time = Date.now()) {
		this.updatedAt = time;
	}
	getUpdatedAt() {
		return this.updatedAt;
	}
	setExpiresIn(timeSeconds) {
		this.expiresIn = timeSeconds * 1000;
	}
	needsToRefresh() {
		return Date.now() - this.updatedAt > this.expiresIn;
	}
	async getAllSongs() {
		try {
			let response = (await this.getMySavedTracks({ limit: 50 })).body;
			let allSongs = extractSongs(response);
			// Wait for all promises to finish
			let finishedPromises = await Promise.all(createAllPromises(this, response.total));
			finishedPromises.map(item => {
				// Add songs from each object to the total list of songs
				allSongs = allSongs.concat(extractSongs(item.body));
			});
			return Promise.resolve(allSongs);
		} catch (error) {
			return Promise.reject("Error while fetching songs: " + error);
		}
	}
}

// Function extracts the track names from the response object
const extractSongs = apiResponse => apiResponse.items.map(item => item.track.name);

/**
 * Function returns a list of promise requests 50 songs (with different offsets) from the users library
 */
function createAllPromises(api, totalSongs) {
	const promises = [];
	for (let i = 50; i <= totalSongs; i += 50) {
		promises.push(
			api.getMySavedTracks({
				limit: 50,
				offset: i,
			})
		);
	}
	return promises;
}

module.exports = SpotifyAPI;
