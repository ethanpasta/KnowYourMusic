const { pino } = require("../utils").logger;
const gameManager = require("../services/game");

// Function returns Spotify account information
async function getMe(req, res) {
	if (req.session.user) {
		try {
			const me = await req.api.getMe();
			res.send({
				loggedIn: true,
				user: me,
				err: null,
			});
		} catch (e) {
			pino.error("Something went wrong with user info: " + e);
			res.send({ user: null, err: e, loggedIn: false });
		}
	} else {
		res.send({
			loggedIn: false,
			user: null,
			err: null,
		});
	}
}

function getPlaylists(req, res) {
	const playlists = [
		"https://66.media.tumblr.com/486d3bad2798e90c93463f35aab125d9/tumblr_pqn0951d9u1u4k328o1_400.jpg",
		"https://data.whicdn.com/images/295426049/original.jpg",
		"https://images.squarespace-cdn.com/content/v1/5a4518c618b27d634a12e374/1525450645042-XIBMO7CPAX320UNP2ULT/ke17ZwdGBToddI8pDm48kFGVtuGS9Igc_JmFJFuCkf57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmJdLpeZW_ttQnjXwTxihzWGOSK126mPv9r-SyoyB9KdwWXnfJ1qM3rss4H2p_MN9s/Sunny+Days+Playlist+Cover.jpg",
		"https://i.pinimg.com/originals/1e/c9/f6/1ec9f61d87ea36e3cd2ef15f571a7eaf.jpg",
		"https://data.whicdn.com/images/339688701/original.jpg",
		"https://i.pinimg.com/originals/be/14/88/be148863c1b38268192e240be7dd3428.jpg",
	];
	res.send(
		playlists.reduce((acc, curr, i) => {
			acc[i] = curr;
			return acc;
		}, {})
	);
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
	getPlaylists,
};
