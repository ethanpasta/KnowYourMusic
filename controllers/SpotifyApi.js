const { pino } = require("../utils/logger");

// Function returns Spotify account information
function getMe(req, res) {
	req.api
		.getMe()
		.then(data => res.send(data.body))
		.catch(err => {
			pino.error("Something went wrong!" + err);
			res.send({ err: true });
		});
}
// Function returns all songs found in the users library
function getSongs(req, res) {
	req.api
		.getAllSongs()
		.then(allSongs => res.send({ allSongs }))
		.catch(err => {
			pino.error(err);
			res.send({ err: true });
		});
}

module.exports = {
	getMe,
	getSongs,
};
