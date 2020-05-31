const { pino } = require("../utils").logger;
const gameManager = require("../services/game");

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
function startGame(req) {
	const newGame = new gameManager(req.session.user);
	newGame.start();
}

module.exports = {
	getMe,
	getSongs,
	startGame,
};
