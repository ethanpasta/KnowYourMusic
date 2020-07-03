const { pino } = require("../utils").logger;
const gameManager = require("../services/gameService");

// Function returns Spotify account information
async function getMe(req, res) {
	try {
		const me = await req.api.getMe();
		res.send({
			loggedIn: true,
			profile: me,
			err: null,
		});
	} catch (e) {
		pino.error("Something went wrong with user info: " + e);
		res.send({ user: null, err: e, loggedIn: false });
	}
}

function getPlaylists(req, res) {
	const playlists = {
		"Wake Up Gently": "https://i.scdn.co/image/ab67706f0000000286de24710c7230fcb6e08c13",
		Rise: "https://i.scdn.co/image/ab67706f000000022db541a3493ce312d4abc9dd",
		"#ThrowbackThursday": "https://i.scdn.co/image/ab67706f0000000297caa0117cf5c17830e83354",
		"Mellow Morning": "https://i.scdn.co/image/ab67706f0000000294d851cc78e04406e373f156",
		"Country Rock Classics": "https://i.scdn.co/image/ab67706f0000000246edbf0e750d9bab7073d801",
		"Peace Of Mind": "https://i.scdn.co/image/ab67706f00000002dc724966dfa4ccf0863fb04a",
	};
	res.send(playlists);
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
function startGame(req, res) {
	console.log("game is startingggg");
	try {
		const newGame = new gameManager(req.session.user);
		newGame.start();
		res.send({ success: true });
	} catch (error) {
		console.log("HELLO");
		res.send({ success: false, error: error });
	}
}

module.exports = {
	getMe,
	getSongs,
	startGame,
	getPlaylists,
};
