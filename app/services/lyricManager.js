const { Song } = require("../models");
const { pino } = require("../utils");

/**
 * LyricManager - class manages all interactions with lyrics:
 * - add lyrics of a song ID to the DB
 * - find lyrics of a song ID from the DB
 * - get lyrics for a song by its ID, title and artist:
 *     1. return lyrics if found in DB,
 *     2. if not find lyrics from scrapers and add them to DB,
 *     3. if can't find them in scrapers update song as "no lyrics song"
 */

class LyricManager {
	constructor() {
		this.lyricsScraper = require("./lyrics");
	}

	// Finding lyrics (if exists) of a song from DB
	static findLyricsInDB(id) {
		return Song.findLyricsIfExists(id);
	}

	// Add lyrics to an existing song in the DB
	static addLyricsToDB(id, lyrics) {
		return Song.addLyricsToSong(id, lyrics);
	}

	// If lyrics couln't be found anywhere for a certain song, update it in the DB
	static updateSongAsBroken(id) {
		return Song.updateNoLyrics(id);
	}

	// Find lyrics for a song
	async getLyrics(id, title, artist) {
		pino.info(`>>> Searching for lyrics for song '${title}' in DB`);
		let lyrics = await this.findSongInDB(id);
		if (lyrics) {
			return lyrics;
		}
		pino.info(`>>> Searching for lyrics for song '${title}' in scrapers`);
		lyrics = await this.lyricScraper.findLyrics(title, artist);
		if (!lyrics) {
			this.updateSongAsBroken(id);
			throw new Error(`No lyrics for '${title}' - '${artist}'`);
		}
		await this.addLyricsToDB(id, lyrics);
		return lyrics;
	}
}

module.exports = new LyricManager();
