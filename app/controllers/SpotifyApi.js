const { pino } = require("../utils");
const gameManager = require("../services/userGame");

// Function returns Spotify account information
function getMe(req, res) {
	req.api
		.getMe()
		.then(data => res.send(data))
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

// Function gets all data for game play
function getGame(req, res) {
	const newGame = new gameManager(req.session.user);
	newGame
		.prepGame()
		.then(data => res.send(data))
		.catch(err => {
			pino.error(`Failed trying to retrieve game data: ${err}`);
			res.send(new Error("Failed :("));
		});
}

module.exports = {
	getMe,
	getSongs,
	getGame,
};
