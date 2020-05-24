const { User } = require("../models");
const lyricManager = require("./lyrics");

class UserGame {
	constructor(username) {
		this.username = username;
		this.gameData = {};
	}

	/** Method is in charge of prepping the game data object:
	 *  - Find 10 songs from the users library with 10 random lines from the song lyrics
	 *  - Find 30 songs from the users library without lyrics
	 */
	async prepGame() {
		const res = await User.getRandomUserSongs(this.username, 10);
		const songs = res.map(item => item.song);
		const fetchLyrics = songs.map(song => lyricManager.getLyricsAndHandle(song));
		const allLyrics = await Promise.all(fetchLyrics);
		return allLyrics;
	}
}

module.exports = UserGame;
