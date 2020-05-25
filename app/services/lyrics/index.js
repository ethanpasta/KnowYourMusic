const { Song } = require("../../models");
const { pino } = require("../../utils");

/**
 * LyricManager - class manages all interactions with lyrics:
 * - add lyrics of a song ID to the DB
 * - find lyrics of a song ID in the DB
 * - get lyrics for a song by its ID, title and artist:
 *     1. return lyrics if found in DB,
 *     2. if not find lyrics from scrapers and add them to DB,
 *     3. if can't find them in scrapers update song as "no lyrics song"
 */

class LyricManager {
	constructor() {
		this.scrapers = require("./scrapers");
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
	async getLyricsAndHandle({ _id, title, artist }) {
		let lyrics = await LyricManager.findLyricsInDB(_id);
		if (lyrics) {
			pino.info(`Found lyrics in DB for ${title} - ${artist}`);
			return lyrics;
		}
		lyrics = await this.scrapers.findLyrics(title, artist);
		if (!lyrics) {
			pino.warn(`No lyrics for ${title} - ${artist}. Updating song as broken in DB`);
			await LyricManager.updateSongAsBroken(_id);
			return;
		}
		await LyricManager.addLyricsToDB(_id, lyrics);
		pino.info(`Found lyrics in scrapers for ${title} - ${artist}`);
		return lyrics;
	}
}

module.exports = new LyricManager();
