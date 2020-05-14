const { pino } = require("../utils/logger");

// Function returns Spotify account information
function getMe(req, res) {
	req.api
		.getMe()
		.then(data => res.send(data.body))
		.catch(err => {
			pino.error("Something went wrong!" + err);
			res.send({ err });
		});
}
// Function returns all songs found in the users library
async function getSongs(req, res) {
	// Get the first 50 tracks, and the total number of tracks
	try {
		let response = (await req.api.getMySavedTracks({ limit: 50 })).body;
		let allSongs = extractSongs(response);
		// Wait for all promises to finish
		let finishedPromises = await Promise.all(createAllPromises(req.api, response.total));
		finishedPromises.map(item => {
			// Add songs from each object to the total list of songs
			allSongs = allSongs.concat(extractSongs(item.body));
		});
		pino.info("Found " + allSongs.length + " total songs");
		res.send({ allSongs });
	} catch (error) {
		pino.error("Error while fetching songs: " + error);
		res.redirect("/");
	}
}

// Function extracts the track names from the response object
const extractSongs = apiResponse => apiResponse.items.map(item => item.track.name);

/**
 * Function returns a list of promise requests 50 songs (with different offsets) from the users library
 */
function createAllPromises(api, totalSongs) {
	pino.info("Creating promises list");
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

module.exports = {
	getMe,
	getSongs,
};
