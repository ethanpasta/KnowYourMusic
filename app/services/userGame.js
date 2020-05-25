const { User, Song } = require("../models");
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
		const gameData = {
			withLyrics: await this.getSongsForGame(10, true),
			withoutLyrics: await this.getSongsForGame(30, false),
		};
	}

	/**
	 * Function returns {numSongs} random songs, either with or without lyrics
	 * @param {*} numSongs Number of songs to get
	 * @param {*} withLyrics If songs should include lyrics
	 */
	async getSongsForGame(numSongs, withLyrics) {
		return withLyrics
			? this.getLyricsForGame(numSongs)
			: Song.getSongsByIds(await User.getRandomUserSongs(this.username, numSongs), false);
	}

	/**
	 * A recursive function that returns a list of song objects with lyrics
	 * @param {Number} numSongs Number of total songs with lyrics needed
	 * @param {*} totalLyrics A growing list of songs with lyrics
	 * @param {*} exclude Which song ids to exclude from the search
	 */
	async getLyricsForGame(numSongs, totalLyrics = [], exclude = []) {
		// Get a list of {numSongs} songs (that aren't definitely  without lyrics)
		const randomSongIds = await User.getRandomUserSongs(this.username, numSongs, exclude);
		let songs = await Song.getSongsByIds(randomSongIds, true);
		// Concurrently try to find lyrics of all the songs returned
		let moreLyrics = await Promise.allSettled(
			songs.map(song => lyricManager.getLyricsAndHandle(song))
		);

		// Filter out songs that their lyrics couldn't be found (value of undefined or null)
		moreLyrics = songs.reduce((acc, curr, i) => {
			if (moreLyrics[i]) {
				curr.lyrics = moreLyrics[i];
				acc.push(curr);
			}
			return acc;
		}, []);

		totalLyrics.push(...moreLyrics);

		if (totalLyrics.length >= numSongs) {
			return totalLyrics.slice(0, numSongs);
		}
		return this.getAllLyrics(totalLyrics, exclude.concat(randomSongIds));
	}
}

module.exports = UserGame;
