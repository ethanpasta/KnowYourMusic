const { Song } = require("../../models");
const { pino } = require("../../utils").logger;

/** Class manages all interactions with lyrics */
class LyricManager {
	/** Create a LyricManager instance */
	constructor() {
		this.scraper = require("./scrapers");
	}

	static findLyricsInDB(id) {
		return Song.findLyricsIfExists(id);
	}

	static addLyricsToDB(id, lyrics) {
		return Song.addLyricsToSong(id, lyrics);
	}

	static updateSongAsBroken(id) {
		return Song.updateNoLyrics(id);
	}

	/**
	 * Find lyrics for a song
	 * @return {Object} lyrics if they were found, or undefinded
	 */
	async getLyricsAndHandle({ _id, title, artist }) {
		// Search first in DB
		let lyrics = await LyricManager.findLyricsInDB(_id);
		if (lyrics) {
			pino.info(`Found lyrics in DB for ${title} - ${artist}`);
			return lyrics;
		}
		// If not found in DB, find in scrapers
		lyrics = await this.scraper.findLyrics(title, artist);
		if (!lyrics) {
			pino.warn(`No lyrics for ${title} - ${artist}. Updating song as broken in DB`);
			// If not found in scrapers, update song as broken
			await LyricManager.updateSongAsBroken(_id);
			return;
		}
		// Update song with its new lyrics
		await LyricManager.addLyricsToDB(_id, lyrics);
		pino.info(`Found lyrics in scraper for ${title} - ${artist}`);
		return lyrics;
	}
}

module.exports = new LyricManager();
